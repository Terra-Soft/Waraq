const { app, BrowserWindow, ipcMain, dialog, shell, clipboard } = require('electron');
const fs = require('node:fs/promises');
const path = require('node:path');

let mainWindow;
let vaultPath = '';
const userData = app.getPath('userData');
const settingsFile = path.join(userData, 'settings.json');
const DEFAULT_VAULT = path.join(app.getPath('documents'), 'Waraq Vault');

function inside(base, target) {
  const relative = path.relative(base, target);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}
function safeVaultPath(relative = '') {
  if (!vaultPath) throw new Error('لا يوجد مجلد ملاحظات مفتوح.');
  const target = path.resolve(vaultPath, relative);
  if (!inside(vaultPath, target)) throw new Error('المسار المطلوب خارج مجلد الملاحظات.');
  return target;
}
async function ensureVault(dir) {
  await fs.mkdir(dir, { recursive: true });
  await fs.mkdir(path.join(dir, '.waraq', 'history'), { recursive: true });
  await fs.mkdir(path.join(dir, '.attachments'), { recursive: true });
  return dir;
}
async function readSettings() {
  try { return JSON.parse(await fs.readFile(settingsFile, 'utf8')); }
  catch { return {}; }
}
async function writeSettings(patch) {
  const current = await readSettings();
  const next = { ...current, ...patch };
  await fs.mkdir(userData, { recursive: true });
  await fs.writeFile(settingsFile, JSON.stringify(next, null, 2), 'utf8');
  return next;
}
async function walk(dir, base = dir, result = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  entries.sort((a, b) => (a.isDirectory() === b.isDirectory() ? a.name.localeCompare(b.name, 'ar') : a.isDirectory() ? -1 : 1));
  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const abs = path.join(dir, entry.name);
    const rel = path.relative(base, abs).split(path.sep).join('/');
    if (entry.isDirectory()) {
      result.push({ path: rel, name: entry.name, type: 'folder' });
      await walk(abs, base, result);
    } else if (/\.(md|markdown)$/i.test(entry.name)) {
      result.push({ path: rel, name: entry.name.replace(/\.(md|markdown)$/i, ''), type: 'note', size: (await fs.stat(abs)).size, modified: (await fs.stat(abs)).mtimeMs });
    }
  }
  return result;
}
async function makeWindow() {
  mainWindow = new BrowserWindow({
    width: 1440, height: 920, minWidth: 970, minHeight: 640,
    backgroundColor: '#101014', show: false,
    title: 'وِرَاق',
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, nodeIntegration: false, sandbox: true, webSecurity: true
    }
  });
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://') || url.startsWith('http://') || url.startsWith('mailto:')) shell.openExternal(url);
    return { action: 'deny' };
  });
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (url !== `file://${path.join(__dirname, 'index.html').replaceAll('\\', '/')}`) event.preventDefault();
  });
  await mainWindow.loadFile('index.html');
  mainWindow.once('ready-to-show', () => mainWindow.show());
}

app.whenReady().then(async () => {
  const settings = await readSettings();
  vaultPath = settings.lastVault || DEFAULT_VAULT;
  await ensureVault(vaultPath);
  await makeWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) makeWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });

ipcMain.handle('app:initial', async () => {
  const settings = await readSettings();
  return { vaultPath, settings, version: app.getVersion(), platform: process.platform };
});
ipcMain.handle('vault:list', async () => walk(vaultPath));
ipcMain.handle('vault:read', async (_e, relative) => {
  const target = safeVaultPath(relative);
  const stat = await fs.stat(target);
  if (!stat.isFile() || !/\.(md|markdown)$/i.test(target)) throw new Error('الملف ليس ملاحظة Markdown.');
  return { path: relative, content: await fs.readFile(target, 'utf8'), modified: stat.mtimeMs, size: stat.size };
});
ipcMain.handle('vault:write', async (_e, relative, content) => {
  const target = safeVaultPath(relative);
  if (!/\.(md|markdown)$/i.test(target)) throw new Error('يمكن حفظ ملفات Markdown فقط.');
  await fs.mkdir(path.dirname(target), { recursive: true });
  try {
    const old = await fs.readFile(target, 'utf8');
    if (old !== content && old.length) {
      const historyDir = safeVaultPath(path.join('.waraq', 'history', relative.replaceAll('/', '__')));
      await fs.mkdir(path.dirname(historyDir), { recursive: true });
      const historyFile = `${historyDir}.${Date.now()}.md`;
      await fs.writeFile(historyFile, old, 'utf8').catch(() => {});
    }
  } catch {}
  await fs.writeFile(target, content, 'utf8');
  return { ok: true, modified: (await fs.stat(target)).mtimeMs, size: Buffer.byteLength(content, 'utf8') };
});
ipcMain.handle('vault:create-note', async (_e, relative, initial = '') => {
  const target = safeVaultPath(relative);
  if (!/\.(md|markdown)$/i.test(target)) throw new Error('اسم الملاحظة يجب أن ينتهي بـ .md');
  await fs.mkdir(path.dirname(target), { recursive: true });
  try { await fs.access(target); throw new Error('توجد ملاحظة بهذا الاسم بالفعل.'); }
  catch (e) { if (e.message === 'توجد ملاحظة بهذا الاسم بالفعل.') throw e; }
  await fs.writeFile(target, initial, { encoding: 'utf8', flag: 'wx' });
  return { path: relative, ok: true };
});
ipcMain.handle('vault:create-folder', async (_e, relative) => {
  const target = safeVaultPath(relative);
  await fs.mkdir(target, { recursive: false });
  return { ok: true };
});
ipcMain.handle('vault:rename', async (_e, oldRelative, newRelative) => {
  const source = safeVaultPath(oldRelative);
  const dest = safeVaultPath(newRelative);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.rename(source, dest);
  return { ok: true, path: newRelative };
});
ipcMain.handle('vault:trash', async (_e, relative) => {
  const source = safeVaultPath(relative);
  const target = safeVaultPath(path.join('.waraq', 'trash', `${Date.now()}-${path.basename(relative)}`));
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.rename(source, target);
  return { ok: true };
});
ipcMain.handle('vault:choose', async () => {
  const picked = await dialog.showOpenDialog(mainWindow, { title: 'اختر مجلد الملاحظات', properties: ['openDirectory', 'createDirectory'] });
  if (picked.canceled || !picked.filePaths[0]) return null;
  vaultPath = await ensureVault(picked.filePaths[0]);
  await writeSettings({ lastVault: vaultPath });
  return { vaultPath, files: await walk(vaultPath) };
});
ipcMain.handle('vault:reveal', async () => { await shell.openPath(vaultPath); return true; });
ipcMain.handle('vault:read-asset', async (_e, relative) => {
  const target = safeVaultPath(relative);
  if (!inside(safeVaultPath('.attachments'), target) && !inside(vaultPath, target)) throw new Error('المرفق خارج مجلد الملاحظات.');
  const stat = await fs.stat(target);
  if (!stat.isFile() || stat.size > 20 * 1024 * 1024) throw new Error('حجم المرفق غير مدعوم.');
  const ext = path.extname(target).toLowerCase();
  const mime = ({'.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.gif':'image/gif','.webp':'image/webp','.svg':'image/svg+xml','.pdf':'application/pdf','.txt':'text/plain','.mp3':'audio/mpeg','.wav':'audio/wav','.mp4':'video/mp4','.webm':'video/webm'})[ext] || 'application/octet-stream';
  return `data:${mime};base64,${(await fs.readFile(target)).toString('base64')}`;
});
ipcMain.handle('vault:attachment', async () => {
  const picked = await dialog.showOpenDialog(mainWindow, { title: 'إضافة مرفق', properties: ['openFile'], filters: [{ name: 'صور ومستندات وملفات', extensions: ['png','jpg','jpeg','gif','webp','svg','pdf','txt','zip','mp3','wav','mp4','webm'] }] });
  if (picked.canceled || !picked.filePaths[0]) return null;
  const original = picked.filePaths[0];
  const folder = safeVaultPath('.attachments');
  await fs.mkdir(folder, { recursive: true });
  const rawName = path.basename(original).replace(/[^\p{L}\p{N}._ -]/gu, '_');
  const destName = `${Date.now()}-${rawName}`;
  await fs.copyFile(original, path.join(folder, destName));
  return { name: destName, relative: `.attachments/${destName}`, markdown: /\.(png|jpe?g|gif|webp|svg)$/i.test(destName) ? `![${path.basename(original)}](.attachments/${destName})` : `[${path.basename(original)}](.attachments/${destName})` };
});
ipcMain.handle('vault:export', async (_e, suggestedName, content) => {
  const picked = await dialog.showSaveDialog(mainWindow, { title: 'تصدير الملاحظة', defaultPath: suggestedName || 'ملاحظة.md', filters: [{ name: 'Markdown', extensions: ['md'] }, { name: 'نص عادي', extensions: ['txt'] }] });
  if (picked.canceled || !picked.filePath) return null;
  await fs.writeFile(picked.filePath, content, 'utf8');
  return { ok: true, path: picked.filePath };
});
ipcMain.handle('settings:get', async () => readSettings());
ipcMain.handle('settings:set', async (_e, patch) => writeSettings(patch));
ipcMain.handle('app:copy-text', async (_e, value) => { clipboard.writeText(String(value ?? '')); return true; });
ipcMain.handle('app:open-external', async (_e, url) => {
  if (typeof url === 'string' && /^(https?:|mailto:)/i.test(url)) return shell.openExternal(url);
  throw new Error('الرابط غير مسموح.');
});
