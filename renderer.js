'use strict';

const ICONS = {
  'files':'<path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H10l2 2h7.5A1.5 1.5 0 0 1 21 9.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z"/><path d="M3 10h18"/>',
  'file-text':'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
  'search':'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  'network':'<circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="m10.8 7.2-4.4 9.6M13.2 7.2l4.4 9.6M7.5 19h9"/>',
  'tag':'<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z"/><circle cx="7.5" cy="7.5" r="1.2"/>',
  'star':'<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z"/>',
  'calendar':'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  'plus':'<path d="M12 5v14M5 12h14"/>',
  'folder-plus':'<path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H10l2 2h7.5A1.5 1.5 0 0 1 21 9.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z"/><path d="M12 12v5m-2.5-2.5h5"/>',
  'more':'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  'settings':'<path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"/><path d="m19.4 15 .1.1 1.4 1.1-1.5 2.6-1.7-.6a8 8 0 0 1-1.6.9l-.3 1.8h-3l-.4-1.8a8 8 0 0 1-1.6-.9l-1.7.6-1.5-2.6 1.4-1.1a7 7 0 0 1 0-1.9l-1.4-1.1 1.5-2.6 1.7.6a8 8 0 0 1 1.6-.9l.4-1.8h3l.3 1.8a8 8 0 0 1 1.6.9l1.7-.6 1.5 2.6-1.4 1.1a7 7 0 0 1-.1 1.8Z" transform="translate(-1 -1) scale(.98)"/>',
  'chevron-down':'<path d="m6 9 6 6 6-6"/>','chevron-left':'<path d="m15 18-6-6 6-6"/>','chevron-right':'<path d="m9 18 6-6-6-6"/>',
  'bold':'<path d="M6 4h7a4 4 0 0 1 0 8H6zM6 12h8a4 4 0 0 1 0 8H6z"/>',
  'italic':'<path d="M19 4h-9M14 20H5M15 4 9 20"/>','strikethrough':'<path d="M3 12h18M16 5.5c-1-1-2.3-1.5-4-1.5-2.4 0-4 1.2-4 3 0 1.4.8 2.2 2.4 3M8 17c.6 1.7 2 3 4.5 3 2.7 0 4.5-1.3 4.5-3.2 0-1.1-.6-1.9-1.7-2.5"/>',
  'heading':'<path d="M5 4v16M19 4v16M5 12h14"/>','list':'<path d="M9 6h12M9 12h12M9 18h12M4 6h.01M4 12h.01M4 18h.01"/>','list-ordered':'<path d="M10 6h11M10 12h11M10 18h11M4 5h1v4M3 9h3M3 14c0-1 3-1.5 3-.2 0 .6-1 1.2-3 3.2h3"/>','quote':'<path d="M3 21c3-1 5-4 5-8V5H2v8h4M14 21c3-1 5-4 5-8V5h-6v8h4"/>',
  'link':'<path d="M10 13a5 5 0 0 0 7.5.5l3-3A5 5 0 0 0 13.5 3l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3A5 5 0 0 0 10.5 21l1.7-1.7"/>','code':'<path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-12-2 16"/>',
  'paperclip':'<path d="m21 11.5-8.5 8.5a5 5 0 0 1-7.1-7.1l9.2-9.2a3.5 3.5 0 0 1 5 5l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5"/>',
  'book-open':'<path d="M12 7v14M3 18V5a2 2 0 0 1 2-2h2a5 5 0 0 1 5 5 5 5 0 0 1 5-5h2a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-2a5 5 0 0 0-5 2 5 5 0 0 0-5-2H5a2 2 0 0 1-2-2Z"/>',
  'eye':'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  'eye-off':'<path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a16 16 0 0 1-3.2 4.2M6.2 6.2C3.5 8 2 12 2 12s3.5 7 10 7c1.4 0 2.6-.3 3.7-.8"/>',
  'trash':'<path d="M3 6h18M8 6V4h8v2m-11 0 1 14h10l1-14M10 10v6m4-6v6"/>','download':'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  'copy':'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>','x':'<path d="m18 6-12 12M6 6l12 12"/>','check':'<path d="m5 12 4 4L19 6"/>',
  'shield-check':'<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>','clock':'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  'sun':'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>','moon':'<path d="M20.5 14.5A8 8 0 0 1 9.5 3.5 8 8 0 1 0 20.5 14.5Z"/>',
  'keyboard':'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M8 15h8"/>','folder-open':'<path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H10l2 2h7.5A1.5 1.5 0 0 1 21 9.5v1M3 7.5V18a2 2 0 0 0 2 2h13l3-9H6z"/>',
  'layout-panel-right':'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M15 4v16"/>','command':'<path d="M9 9V5a2 2 0 1 0-2 2h10a2 2 0 1 0-2-2v14a2 2 0 1 0 2-2H7a2 2 0 1 0 2 2V9Z"/>',
  'refresh':'<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.5 9A7 7 0 0 1 17 6l3 6M4 12l3 6a7 7 0 0 0 11.5-3"/>','book-mark':'<path d="M6 4h12v17l-6-4-6 4z"/>','clipboard':'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M9 10h6M9 14h6"/>','filter':'<path d="M4 5h16M7 12h10m-7 7h4"/>','arrow-up-down':'<path d="m8 7 4-4 4 4M12 3v18m-4-4 4 4 4-4"/>',
  'calendar-days':'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01"/>','external-link':'<path d="M14 3h7v7m0-7-9 9"/><path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"/>','info':'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7h.01"/>','arrow-right':'<path d="M5 12h14m-7-7 7 7-7 7"/>','sparkles':'<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9z"/>','list-tree':'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>','panel-left':'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>','pin':'<path d="m16 3 5 5-4 1-4 5-1-1-1 7-2-2 1-7-1-1 5-4z"/>','hash':'<path d="M4 9h16M4 15h16M10 3 8 21m8-18-2 18"/>'
};
function icon(name, size = 17) { return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS['file-text']}</svg>`; }
const $ = (id) => document.getElementById(id);
const defaults = { theme: 'dark', fontSize: 16, lineHeight: 1.8, autoSave: true, showRightPane: true, favoritePaths: [], recentPaths: [], lastNote: '', showWordCount: true };
let settings = { ...defaults };
let files = [];
let currentPath = '';
let currentContent = '';
let dirty = false;
let saveTimer = null;
let saveInProgress = false;
let selectedPanel = 'files';
let collapsedFolders = new Set();
let openTabs = [];
let editorMode = 'edit'; // edit | split | reading
let contentCache = new Map();
let isRenamingTitle = false;
let commandEntries = [];
let lastSearchResults = [];
let modalResolve = null;

const buttonIcons = {
  'btn-quick-switch': 'search', 'btn-command': 'command', 'btn-settings': 'settings',
  'btn-new-folder': 'folder-plus', 'btn-new-note': 'plus', 'btn-pane-menu': 'more', 'btn-open-folder': 'folder-open',
  'pane-search-icon': 'search', 'btn-tab-add': 'plus', 'btn-toggle-right': 'layout-panel-right',
  'btn-favorite': 'star', 'btn-copy-link': 'link', 'btn-export': 'download', 'btn-trash-note': 'trash',
  'btn-add-tag': 'plus', 'btn-source': 'code', 'btn-note-menu': 'more', 'btn-close-right': 'x',
  'btn-open-graph-small': 'network', 'btn-manage-tags': 'tag', 'modal-close': 'x'
};
function setIcon(el, name, size) { if (el) el.innerHTML = icon(name, size); }
function setupIcons() {
  Object.entries(buttonIcons).forEach(([id, name]) => setIcon($(id), name));
  if ($('btn-add-tag')) $('btn-add-tag').innerHTML = `${icon('plus',12)} إضافة وسم`;
  document.querySelectorAll('.ribbon-btn').forEach((el) => setIcon(el, ({files:'files',search:'search',graph:'network',tags:'tag',favorites:'star',daily:'calendar', 'new-note':'plus',vault:'folder-open'})[el.dataset.panel || el.dataset.action] || 'files'));
  document.querySelectorAll('[data-format]').forEach((el) => setIcon(el, ({bold:'bold',italic:'italic',strike:'strikethrough'})[el.dataset.format]));
  document.querySelectorAll('[data-insert]').forEach((el) => setIcon(el, ({heading:'heading',bullet:'list',numbered:'list-ordered',quote:'quote',link:'link',wikilink:'network',code:'code',attachment:'paperclip'})[el.dataset.insert]));
  document.querySelectorAll('[data-icon]').forEach((el) => setIcon(el, el.dataset.icon, 18));
  setIcon($('welcome-plus'), 'plus', 15); setIcon($('welcome-folder'), 'folder-open', 15);
  setIcon(document.querySelector('.reading-icon'), 'book-open', 14);
  document.querySelectorAll('.search-icon').forEach((el) => setIcon(el, 'search', 14));
}
function toast(message, error = false) {
  const node = document.createElement('div'); node.className = `toast${error ? ' error' : ''}`; node.textContent = message; $('toast-stack').append(node);
  setTimeout(() => node.remove(), 3000);
}
function esc(value = '') { return String(value).replace(/[&<>"']/g, (ch) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }
function relBase(path) { return String(path || '').replace(/\.(md|markdown)$/i, '').replaceAll('\\', '/'); }
function basename(path) { return String(path || '').split('/').pop().replace(/\.(md|markdown)$/i, ''); }
function parentPath(path) { const arr = String(path || '').split('/'); arr.pop(); return arr.join('/'); }
function prettyDate(ms) { if (!ms) return 'غير معروف'; try { return new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(ms)); } catch { return ''; } }
function words(content) { return (String(content || '').trim().match(/[\p{L}\p{N}]+/gu) || []).length; }
function noteItems() { return files.filter((f) => f.type === 'note'); }
function findFile(path) { return files.find((f) => f.path === path); }
function resolveNote(target) {
  const clean = String(target || '').trim().replace(/\\/g, '/').replace(/^\.\//, '').replace(/\.(md|markdown)$/i, '');
  if (!clean) return null;
  const exact = noteItems().find((f) => relBase(f.path).toLowerCase() === clean.toLowerCase());
  if (exact) return exact;
  const nameMatch = noteItems().find((f) => f.name.toLowerCase() === basename(clean).toLowerCase());
  return nameMatch || null;
}
function getTags(content) { return [...new Set((String(content || '').match(/(^|\s)#([\p{L}\p{N}_/-]+)/gu) || []).map((v) => v.trim().replace(/^#/, '').toLowerCase()).filter(Boolean))]; }
function getWikiLinks(content) { return [...String(content || '').matchAll(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g)].map((m) => ({ target: m[1].trim(), label: (m[2] || m[1]).trim() })); }
async function getContent(path) {
  if (contentCache.has(path)) return contentCache.get(path);
  try { const result = await window.waraq.read(path); contentCache.set(path, result.content); return result.content; } catch { return ''; }
}
async function scanAllNotes() {
  const result = [];
  for (const file of noteItems()) result.push({ file, content: await getContent(file.path) });
  return result;
}
async function refreshFiles() {
  files = await window.waraq.list();
  const valid = new Set(noteItems().map((f) => f.path));
  for (const p of [...contentCache.keys()]) if (!valid.has(p)) contentCache.delete(p);
  renderSidebar(); renderRightPane(); updateStatusVault();
}
function updateStatusVault() {
  const initialName = (window.initialData?.vaultPath || '').split(/[\\/]/).filter(Boolean).pop() || 'Waraq Vault';
  const display = (window.currentVaultPath || initialName);
  $('vault-name').textContent = display.split(/[\\/]/).filter(Boolean).pop() || display;
  $('vault-location').textContent = display;
  $('status-vault').textContent = display.split(/[\\/]/).filter(Boolean).pop() || 'وِرَاق';
}
function buildTreeMarkup(query = '') {
  const notes = noteItems();
  if (query) {
    const matching = notes.filter((f) => `${f.name} ${f.path}`.toLowerCase().includes(query.toLowerCase()));
    if (!matching.length) return '<div class="tree-empty">لا توجد نتائج مطابقة.</div>';
    return matching.map((f) => `<button class="tree-row ${f.path === currentPath ? 'active' : ''}" data-open-note="${esc(f.path)}"><span class="row-icon">${icon('file-text',15)}</span><span class="row-name">${esc(f.name)}</span>${settings.favoritePaths.includes(f.path) ? `<span class="row-star">${icon('star',12)}</span>` : ''}</button>`).join('');
  }
  const folders = files.filter((f) => f.type === 'folder');
  const children = new Map();
  function add(parent, item) { if (!children.has(parent)) children.set(parent, []); children.get(parent).push(item); }
  for (const folder of folders) add(parentPath(folder.path), folder);
  for (const note of notes) add(parentPath(note.path), note);
  for (const items of children.values()) items.sort((a,b) => a.type === b.type ? a.name.localeCompare(b.name,'ar') : a.type === 'folder' ? -1 : 1);
  const renderLevel = (parent, depth = 0) => (children.get(parent) || []).map((item) => {
    if (item.type === 'folder') {
      const collapsed = collapsedFolders.has(item.path);
      const childCount = (children.get(item.path) || []).length;
      return `<button class="tree-row folder-row" data-folder="${esc(item.path)}" style="padding-right:${8 + depth * 13}px"><span class="folder-chevron">${icon(collapsed ? 'chevron-left' : 'chevron-down',12)}</span><span class="row-icon">${icon('files',14)}</span><span class="row-name">${esc(item.name)}</span>${childCount ? `<span class="count-badge">${childCount}</span>` : ''}</button>${collapsed ? '' : renderLevel(item.path, depth + 1)}`;
    }
    return `<button class="tree-row ${item.path === currentPath ? 'active' : ''}" data-open-note="${esc(item.path)}" style="padding-right:${8 + depth * 13}px"><span class="folder-chevron"></span><span class="row-icon">${icon('file-text',14)}</span><span class="row-name">${esc(item.name)}</span>${settings.favoritePaths.includes(item.path) ? `<span class="row-star">${icon('star',12)}</span>` : ''}</button>`;
  }).join('');
  return renderLevel('') || '<div class="tree-empty">المجلد فارغ. أنشئ ملاحظة للبدء.</div>';
}
async function renderSidebar() {
  const content = $('sidebar-content');
  const query = $('tree-filter').value.trim();
  $('pane-title').textContent = ({files:'مستكشف الملفات',tags:'الوسوم',favorites:'المفضلة'})[selectedPanel] || 'مستكشف الملفات';
  if (selectedPanel === 'files') { content.innerHTML = buildTreeMarkup(query); return; }
  if (selectedPanel === 'favorites') {
    const favorites = noteItems().filter((f) => settings.favoritePaths.includes(f.path));
    content.innerHTML = `<div class="tree-section-label"><span>الملاحظات المفضلة</span><span class="count-badge">${favorites.length}</span></div>` + (favorites.map((f) => `<button class="tree-row ${f.path === currentPath ? 'active' : ''}" data-open-note="${esc(f.path)}"><span class="row-icon">${icon('star',14)}</span><span class="row-name">${esc(f.name)}</span></button>`).join('') || '<div class="tree-empty">لا توجد مفضلات حتى الآن.<br>استخدم النجمة بجوار عنوان الملاحظة.</div>'); return;
  }
  const all = await scanAllNotes(); const map = new Map();
  all.forEach(({content:c}) => getTags(c).forEach((tag) => map.set(tag, (map.get(tag)||0)+1)));
  const tags = [...map.entries()].sort((a,b) => a[0].localeCompare(b[0],'ar'));
  content.innerHTML = `<div class="tree-section-label"><span>كل الوسوم</span><span class="count-badge">${tags.length}</span></div>` + (tags.map(([tag,count]) => `<button class="tree-row" data-filter-tag="${esc(tag)}"><span class="row-icon">${icon('tag',14)}</span><span class="row-name">#${esc(tag)}</span><span class="count-badge">${count}</span></button>`).join('') || '<div class="tree-empty">أضف وسومًا مثل #أفكار إلى ملاحظاتك.</div>');
}
function setSelectedPanel(panel) {
  selectedPanel = panel;
  document.querySelectorAll('.ribbon-btn[data-panel]').forEach((b) => b.classList.toggle('active', b.dataset.panel === panel));
  renderSidebar();
}
function updateTabs() {
  const strip = $('tab-strip');
  const activeItem = findFile(currentPath);
  const label = activeItem?.name || 'ابدأ مع وِرَاق';
  strip.innerHTML = `<div class="tab active" title="${esc(currentPath || 'البداية')}"><span class="tab-mark"></span><span>${esc(label)}${dirty ? ' •' : ''}</span></div><button class="tab-add" id="btn-tab-add" title="ملاحظة جديدة">${icon('plus')}</button><div class="tabs-spacer"></div><button class="icon-btn small" id="btn-toggle-right" title="إظهار / إخفاء اللوحة الجانبية">${icon('layout-panel-right')}</button>`;
  $('btn-tab-add').addEventListener('click', createNoteDialog);
  $('btn-toggle-right').addEventListener('click', toggleRightPane);
}
async function openNote(path, skipSave = false) {
  if (!path) return;
  if (currentPath && dirty && !skipSave) await saveCurrent();
  try {
    const result = await window.waraq.read(path);
    currentPath = result.path; currentContent = result.content; contentCache.set(path, result.content); dirty = false; editorMode = 'edit';
    if (!openTabs.includes(path)) openTabs.push(path);
    settings.lastNote = path; settings.recentPaths = [path, ...(settings.recentPaths || []).filter((p) => p !== path)].slice(0, 8);
    await window.waraq.setSettings({ lastNote: path, recentPaths: settings.recentPaths });
    $('welcome-screen').classList.add('hidden'); $('special-view').classList.add('hidden'); $('note-view').classList.remove('hidden'); $('editor-toolbar').classList.remove('hidden');
    $('markdown-editor').value = currentContent; $('note-title').value = basename(path); $('breadcrumb-current').textContent = basename(path); setEditorMode('edit');
    $('note-breadcrumb').firstElementChild.textContent = parentPath(path) || 'الملاحظات';
    $('note-meta').innerHTML = `<span class="meta-icon">${icon('file-text',12)} Markdown</span><span class="meta-icon">${icon('clock',12)} ${prettyDate(result.modified)}</span><span class="meta-icon">${icon('info',12)} ${Math.max(1, Math.round(result.size/1024))} ك.ب</span>`;
    updateSaveUI(); updateCounts(); updateTabs(); renderSidebar(); await renderRightPane(); await renderPreview(); $('markdown-editor').focus();
  } catch (e) { toast(`تعذّر فتح الملاحظة: ${e.message}`, true); }
}
function showWelcome() {
  currentPath = ''; currentContent = ''; dirty = false;
  $('welcome-screen').classList.remove('hidden'); $('note-view').classList.add('hidden'); $('special-view').classList.add('hidden'); $('editor-toolbar').classList.add('hidden');
  updateTabs(); renderSidebar(); renderRightPane();
}
function updateCounts() {
  const value = $('markdown-editor').value;
  $('word-count').textContent = `${words(value)} كلمة · ${value.length} حرف`;
  $('file-size').textContent = `${new Blob([value]).size} بايت`;
}
function updateSaveUI(state) {
  const label = state || (saveInProgress ? 'جارٍ الحفظ…' : dirty ? 'تغييرات غير محفوظة' : 'جميع التغييرات محفوظة');
  $('save-state').innerHTML = `<span class="tiny-dot" style="background:${dirty ? 'var(--warn)' : 'var(--good)'}"></span> ${esc(label)}`;
  $('status-text').textContent = label;
  $('btn-favorite').style.color = settings.favoritePaths.includes(currentPath) ? 'var(--accent)' : '';
  $('btn-favorite').title = settings.favoritePaths.includes(currentPath) ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة';
  updateTabs();
}
async function saveCurrent(force = false) {
  if (!currentPath || (!dirty && !force) || saveInProgress) return;
  clearTimeout(saveTimer); saveInProgress = true; updateSaveUI('جارٍ الحفظ…');
  const snapshot = $('markdown-editor').value;
  try {
    const result = await window.waraq.write(currentPath, snapshot);
    currentContent = snapshot; contentCache.set(currentPath, snapshot); dirty = $('markdown-editor').value !== snapshot;
    saveInProgress = false; updateSaveUI(dirty ? 'تعديلات جديدة' : 'جميع التغييرات محفوظة');
    $('note-meta').innerHTML = `<span class="meta-icon">${icon('file-text',12)} Markdown</span><span class="meta-icon">${icon('clock',12)} ${prettyDate(result.modified)}</span><span class="meta-icon">${icon('info',12)} ${Math.max(1, Math.round(result.size/1024))} ك.ب</span>`;
    updateCounts(); renderSidebar(); renderRightPane();
    return true;
  } catch (e) { saveInProgress = false; updateSaveUI('فشل الحفظ'); toast(`فشل الحفظ: ${e.message}`, true); return false; }
}
function onEditorInput() {
  dirty = true; updateSaveUI(); updateCounts(); renderNoteTags();
  clearTimeout(saveTimer);
  if (settings.autoSave) saveTimer = setTimeout(() => saveCurrent(), 550);
  renderPreview();
  clearTimeout(onEditorInput.rightTimer); onEditorInput.rightTimer = setTimeout(() => renderRightPane(), 400);
}
function insertAtCursor(text, wrap = null) {
  const editor = $('markdown-editor'); const start = editor.selectionStart, end = editor.selectionEnd; const selected = editor.value.slice(start, end);
  const insert = wrap ? `${wrap[0]}${selected || 'نص'}${wrap[1]}` : text;
  editor.setRangeText(insert, start, end, 'select'); editor.focus(); onEditorInput();
}
function insertBlock(type) {
  const editor = $('markdown-editor'); const start = editor.selectionStart; const lineStart = editor.value.lastIndexOf('\n', start - 1) + 1;
  const prefix = ({heading:'# ',bullet:'- ',numbered:'1. ',quote:'> '})[type] || '';
  if (type === 'link') return insertAtCursor('[نص الرابط](https://example.com)');
  if (type === 'wikilink') return insertAtCursor('[[اسم الملاحظة]]');
  if (type === 'code') return insertAtCursor('\n```\nاكتب الكود هنا\n```\n');
  if (type === 'attachment') return addAttachment();
  editor.setRangeText(prefix, lineStart, lineStart, 'end'); editor.focus(); onEditorInput();
}
async function renderPreview() {
  if (!currentPath) return;
  const preview = $('markdown-preview');
  preview.innerHTML = await markdownToHtml($('markdown-editor').value);
}
async function markdownToHtml(source) {
  let text = String(source || '').replace(/\r/g, '');
  const codeBlocks = [];
  text = text.replace(/```([^\n]*)\n([\s\S]*?)```/g, (_, lang, body) => { const token = `@@CODE${codeBlocks.length}@@`; codeBlocks.push(`<pre><code class="language-${esc(lang.trim())}">${esc(body.replace(/\n$/, ''))}</code></pre>`); return token; });
  text = esc(text);
  text = text.replace(/!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, rawPath, alt) => `<img alt="${esc(alt || basename(rawPath))}" data-asset="${rawPath}" src="" loading="lazy" />`);
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, rawPath) => `<img alt="${alt}" data-asset="${rawPath}" src="" loading="lazy" />`);
  text = text.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, rawTarget, rawLabel) => { const target = rawTarget.trim(); const label = (rawLabel || rawTarget).trim(); const found = resolveNote(target); return `<a href="#" class="wikilink ${found ? '' : 'broken-link'}" data-wikilink="${esc(target)}" title="${found ? 'فتح الملاحظة' : 'سيُنشئ رابطًا لملاحظة غير موجودة'}">${esc(label)}</a>`; });
  text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+)\)/g, '<a href="$2" data-external="$2" rel="noreferrer">$1</a>');
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/__([^_]+)__/g, '<strong>$1</strong>');
  text = text.replace(/\*([^*\n]+)\*/g, '<em>$1</em>').replace(/_([^_\n]+)_/g, '<em>$1</em>').replace(/~~([^~]+)~~/g, '<del>$1</del>');
  const lines = text.split('\n'); const html = []; let inUl = false, inOl = false;
  const closeLists = () => { if (inUl) { html.push('</ul>'); inUl = false; } if (inOl) { html.push('</ol>'); inOl = false; } };
  for (const line of lines) {
    if (/^@@CODE\d+@@$/.test(line)) { closeLists(); html.push(line); continue; }
    let m;
    if ((m = line.match(/^(#{1,6})\s+(.+)$/))) { closeLists(); const n=m[1].length; html.push(`<h${n}>${m[2]}</h${n}>`); }
    else if (/^\s*---+\s*$/.test(line)) { closeLists(); html.push('<hr>'); }
    else if ((m = line.match(/^&gt;\s?(.*)$/))) { closeLists(); html.push(`<blockquote>${m[1]}</blockquote>`); }
    else if (/^\s*[-*+]\s+/.test(line)) { if (inOl) { html.push('</ol>'); inOl=false; } if (!inUl) { html.push('<ul>'); inUl=true; } html.push(`<li>${line.replace(/^\s*[-*+]\s+/, '')}</li>`); }
    else if (/^\s*\d+\.\s+/.test(line)) { if (inUl) { html.push('</ul>'); inUl=false; } if (!inOl) { html.push('<ol>'); inOl=true; } html.push(`<li>${line.replace(/^\s*\d+\.\s+/, '')}</li>`); }
    else if (!line.trim()) { closeLists(); }
    else { closeLists(); html.push(`<p>${line}</p>`); }
  }
  closeLists();
  let rendered = html.join('\n');
  rendered = rendered.replace(/@@CODE(\d+)@@/g, (_, i) => codeBlocks[Number(i)] || '');
  // Local image references are converted to data URLs through the restricted preload API.
  const assetAttrs = [...rendered.matchAll(/<img[^>]*data-asset="([^"]+)"[^>]*>/g)];
  for (const match of assetAttrs) {
    const raw = match[1];
    try {
      const normalized = raw.replaceAll('\\', '/').replace(/^\.\//, '');
      const dataUrl = await window.waraq.readAsset(normalized);
      rendered = rendered.replace(match[0], match[0].replace('src=""', `src="${dataUrl}"`).replace(` data-asset="${esc(raw)}"`, ''));
    } catch { rendered = rendered.replace(match[0], `<p class="empty-small">تعذّر عرض المرفق: ${esc(raw)}</p>`); }
  }
  return rendered;
}
async function renderRightPane() {
  if (!currentPath || $('right-pane').classList.contains('right-hidden')) return;
  const current = $('markdown-editor').value; const links = getWikiLinks(current);
  const all = await scanAllNotes();
  const backlinks = all.filter(({file,content}) => file.path !== currentPath && getWikiLinks(content).some((l) => { const found = resolveNote(l.target); return found?.path === currentPath || l.target.toLowerCase() === basename(currentPath).toLowerCase() || l.target.toLowerCase() === relBase(currentPath).toLowerCase(); }));
  $('backlink-count').textContent = backlinks.length;
  $('backlinks-list').innerHTML = backlinks.map(({file}) => `<button class="right-row" data-open-note="${esc(file.path)}"><span class="row-icon">${icon('file-text',14)}</span><span>${esc(file.name)}</span></button>`).join('') || '<div class="empty-small">لا توجد روابط عكسية بعد.</div>';
  const outline = current.split('\n').map((line, i) => { const m = line.match(/^(#{1,6})\s+(.+)$/); return m ? {level:m[1].length, title:m[2].replace(/[*_`]/g,''), line:i} : null; }).filter(Boolean);
  $('outline-list').innerHTML = outline.map((o,i) => `<button class="right-row" data-goto-line="${o.line}" style="padding-right:${7+(o.level-1)*8}px"><span class="row-icon" style="color:var(--muted-2)">${icon('hash',12)}</span><span>${esc(o.title)}</span></button>`).join('') || '<div class="empty-small">أضف عناوين مثل ## الفكرة لتنظيم الملاحظة.</div>';
  const tags = getTags(current);
  $('all-tags').innerHTML = tags.map((t) => `<button class="tag-pill" data-filter-tag="${esc(t)}">#${esc(t)}</button>`).join('') || '<span class="empty-small">لا توجد وسوم في هذه الملاحظة.</span>';
  const favs = noteItems().filter((f) => settings.favoritePaths.includes(f.path));
  $('favorite-count').textContent = favs.length;
  $('right-favorites').innerHTML = favs.slice(0,8).map((f) => `<button class="right-row" data-open-note="${esc(f.path)}"><span class="row-icon">${icon('star',14)}</span><span>${esc(f.name)}</span></button>`).join('') || '<div class="empty-small">أضف ملاحظات مهمة إلى المفضلة.</div>';
  drawMiniGraph(links);
}
function drawMiniGraph(links) {
  const box = $('mini-graph'); if (!box) return;
  const related = [...new Set(links.map((l) => resolveNote(l.target)).filter((x) => x && x.path !== currentPath))].slice(0,5);
  const w=250,h=110,cx=w/2,cy=h/2; let body='';
  related.forEach((n,i) => { const a = (2*Math.PI*i/Math.max(related.length,1))-Math.PI/2; const x=cx+75*Math.cos(a), y=cy+34*Math.sin(a); body += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#514269" stroke-width="1"/><circle cx="${x}" cy="${y}" r="4" fill="#9271d9"/><text x="${x}" y="${Math.min(h-6,y+17)}" fill="#aca5bd" font-size="8" text-anchor="middle">${esc(n.name.slice(0,12))}</text>`; });
  body += `<circle cx="${cx}" cy="${cy}" r="12" fill="#4c2c80" stroke="#b49af4" stroke-width="1.2"/><text x="${cx}" y="${cy+3}" fill="#fff" font-size="7" text-anchor="middle">أنا</text>`;
  box.innerHTML = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="روابط الملاحظة">${body}</svg>`;
}
function renderNoteTags() {
  const tags = getTags($('markdown-editor').value);
  $('note-tags').innerHTML = tags.map((t) => `<button class="tag-pill" data-filter-tag="${esc(t)}">#${esc(t)}</button>`).join('');
}
function toggleRightPane() {
  $('right-pane').classList.toggle('right-hidden'); settings.showRightPane = !$('right-pane').classList.contains('right-hidden');
  window.waraq.setSettings({ showRightPane: settings.showRightPane });
}
function setEditorMode(mode) {
  editorMode = mode; const wrap=$('editor-wrap'); wrap.classList.toggle('split', mode === 'split'); wrap.classList.toggle('reading', mode === 'reading');
  $('markdown-editor').classList.toggle('hidden', mode === 'reading'); $('markdown-preview').classList.toggle('hidden', mode === 'edit');
  $('btn-reading').classList.toggle('active', mode === 'reading'); $('btn-reading').querySelector('span:last-child').textContent = mode === 'reading' ? 'تحرير الملاحظة' : 'عرض القراءة';
  $('btn-source').innerHTML = `${mode === 'split' ? 'إخفاء المعاينة' : 'Markdown'} ${icon(mode === 'split' ? 'eye-off' : 'code',12)}`;
  renderPreview();
}

function openModal(title, body, buttons = [{label:'إغلاق',value:false}], options = {}) {
  $('modal').classList.toggle('wide', !!options.wide);
  $('modal-title').textContent = title; $('modal-eyebrow').textContent = options.eyebrow || 'وِرَاق'; $('modal-body').innerHTML = body;
  $('modal-footer').innerHTML = buttons.map((b,i) => `<button class="modal-btn ${b.primary ? 'primary' : ''} ${b.danger ? 'danger' : ''}" data-modal-value="${i}">${esc(b.label)}</button>`).join('');
  $('modal-backdrop').classList.remove('hidden');
  return new Promise((resolve) => {
    modalResolve = resolve;
    $('modal-footer').querySelectorAll('[data-modal-value]').forEach((btn) => btn.addEventListener('click', () => closeModal(buttons[Number(btn.dataset.modalValue)]?.value ?? false)));
    $('modal-close').onclick = () => closeModal(false);
    $('modal-backdrop').onclick = (event) => { if (event.target === $('modal-backdrop')) closeModal(false); };
    const input = $('modal-body').querySelector('input:not([type=checkbox]),textarea'); if (input) setTimeout(() => { input.focus(); if (input.select) input.select(); }, 40);
  });
}
function closeModal(result = false) {
  $('modal-backdrop').classList.add('hidden'); const resolve = modalResolve; modalResolve = null;
  if (resolve) resolve(result);
}
async function askInput(title, label, placeholder = '', initial = '') {
  const result = await openModal(title, `<div class="form-row"><label class="field-label" for="modal-input">${esc(label)}</label><input class="field-input" id="modal-input" value="${esc(initial)}" placeholder="${esc(placeholder)}" autocomplete="off"><div class="field-help">يمكنك استخدام العربية والإنجليزية. سيُحفظ المحتوى كملف Markdown عادي.</div></div>`, [{label:'إلغاء',value:null},{label:'متابعة',value:'submit',primary:true}]);
  if (result !== 'submit') return null;
  return $('modal-input')?.value.trim() || null;
}
async function createNoteDialog(suggestedFolder = '') {
  const name = await askInput('ملاحظة جديدة', 'اسم الملاحظة', 'مثال: فكرة جديدة');
  if (!name) return;
  const folder = suggestedFolder || (currentPath ? parentPath(currentPath) : '');
  let rel = name.replace(/\\/g,'/').replace(/^\/+|\/+$/g,'');
  if (!/\.(md|markdown)$/i.test(rel)) rel += '.md';
  if (folder && !rel.includes('/')) rel = `${folder}/${rel}`;
  if (rel.split('/').some((s) => !s || s === '.' || s === '..')) { toast('اسم أو مسار الملاحظة غير صالح.', true); return; }
  const title = basename(rel);
  try {
    const path = rel;
    await window.waraq.createNote(path, `# ${title}\n\n`);
    contentCache.delete(path); await refreshFiles(); await openNote(path); $('markdown-editor').setSelectionRange($('markdown-editor').value.length, $('markdown-editor').value.length); $('markdown-editor').focus();
    toast('تم إنشاء الملاحظة.');
  } catch (e) { toast(e.message || 'تعذّر إنشاء الملاحظة.', true); }
}
async function createFolderDialog() {
  const name = await askInput('مجلد جديد', 'اسم المجلد', 'مثال: أفكار ومشاريع'); if (!name) return;
  const rel = name.replace(/\\/g,'/').replace(/^\/+|\/+$/g,'');
  if (rel.split('/').some((s) => !s || s === '.' || s === '..')) { toast('اسم المجلد غير صالح.', true); return; }
  try { await window.waraq.createFolder(rel); await refreshFiles(); toast('تم إنشاء المجلد.'); }
  catch (e) { toast(`تعذّر إنشاء المجلد: ${e.message}`, true); }
}
async function addAttachment() {
  try {
    const result = await window.waraq.addAttachment(); if (!result) return;
    insertAtCursor(`\n${result.markdown}\n`); toast('تمت إضافة المرفق إلى مجلد الملاحظات.');
  } catch (e) { toast(`تعذّر إضافة المرفق: ${e.message}`, true); }
}
async function renameCurrentNote(newName) {
  const clean = newName.trim().replace(/[\\/:*?"<>|]/g,'-');
  if (!clean || clean === basename(currentPath)) return;
  const nextPath = [parentPath(currentPath), /\.(md|markdown)$/i.test(clean) ? clean : `${clean}.md`].filter(Boolean).join('/');
  if (findFile(nextPath)) { toast('توجد ملاحظة بهذا الاسم.', true); $('note-title').value = basename(currentPath); return; }
  try {
    await saveCurrent(); await window.waraq.rename(currentPath, nextPath); contentCache.delete(currentPath); currentPath = nextPath; contentCache.set(nextPath, currentContent);
    settings.favoritePaths = settings.favoritePaths.map((p) => p === nextPath ? nextPath : p === $('note-title').dataset.oldPath ? nextPath : p);
    if (settings.recentPaths) settings.recentPaths = settings.recentPaths.map((p) => p === $('note-title').dataset.oldPath ? nextPath : p);
    settings.lastNote = nextPath; await window.waraq.setSettings({ lastNote: nextPath, favoritePaths: settings.favoritePaths, recentPaths: settings.recentPaths });
    $('note-title').value = basename(nextPath); $('breadcrumb-current').textContent = basename(nextPath); await refreshFiles(); await renderRightPane(); updateTabs(); toast('تم تغيير اسم الملاحظة.');
  } catch (e) { toast(`تعذّر تغيير الاسم: ${e.message}`, true); $('note-title').value = basename(currentPath); }
}
async function toggleFavorite() {
  if (!currentPath) return;
  if (settings.favoritePaths.includes(currentPath)) settings.favoritePaths = settings.favoritePaths.filter((p) => p !== currentPath);
  else settings.favoritePaths = [...settings.favoritePaths, currentPath];
  await window.waraq.setSettings({ favoritePaths: settings.favoritePaths }); updateSaveUI(); renderSidebar(); renderRightPane(); toast(settings.favoritePaths.includes(currentPath) ? 'أضيفت إلى المفضلة.' : 'أزيلت من المفضلة.');
}
async function deleteCurrentNote() {
  if (!currentPath) return;
  const path = currentPath;
  const result = await openModal('نقل إلى سلة المهملات', `<p style="line-height:1.9;color:var(--muted)">سيتم نقل <strong style="color:var(--text)">${esc(basename(path))}</strong> إلى سلة مهملات وِرَاق داخل مجلد الملاحظات. لن يُحذف نهائيًا.</p>`, [{label:'إلغاء',value:false},{label:'نقل إلى السلة',value:true,danger:true}]);
  if (!result) return;
  try { await saveCurrent(); await window.waraq.trash(path); contentCache.delete(path); settings.favoritePaths = settings.favoritePaths.filter((p) => p !== path); await window.waraq.setSettings({ favoritePaths: settings.favoritePaths, lastNote: '' }); currentPath=''; dirty=false; await refreshFiles(); showWelcome(); toast('تم نقل الملاحظة إلى سلة المهملات.'); }
  catch(e) { toast(`تعذّر نقل الملاحظة: ${e.message}`, true); }
}
async function exportCurrentNote() {
  if (!currentPath) return; await saveCurrent();
  try { const result = await window.waraq.exportNote(`${basename(currentPath)}.md`, $('markdown-editor').value); if (result) toast('تم تصدير الملاحظة بنجاح.'); }
  catch(e) { toast(`تعذّر التصدير: ${e.message}`, true); }
}
async function copyNoteLink() {
  if (!currentPath) return;
  const text = `[[${relBase(currentPath)}]]`;
  try { await window.waraq.copyText(text); toast('تم نسخ رابط الملاحظة بصيغة Markdown.'); }
  catch { const ta = document.createElement('textarea'); ta.value=text; document.body.append(ta); ta.select(); document.execCommand('copy'); ta.remove(); toast('تم نسخ رابط الملاحظة.'); }
}
async function createDailyNote() {
  const now = new Date(); const date = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  const folder='اليوميات'; const path=`${folder}/${date}.md`;
  try { if (!findFile(path)) await window.waraq.createNote(path, `# ${date}\n\n## أهم ما حدث\n- \n\n## أفكار\n- \n\n## مهام\n- [ ] \n`); await refreshFiles(); await openNote(path); toast('تم فتح ملاحظة اليوم.'); }
  catch (e) { toast(`تعذّر إنشاء ملاحظة اليوم: ${e.message}`, true); }
}
async function openVaultDialog() {
  try {
    const result = await window.waraq.chooseVault(); if (!result) return;
    currentPath=''; currentContent=''; dirty=false; contentCache.clear(); files=result.files; window.currentVaultPath=result.vaultPath;
    settings.lastNote=''; await window.waraq.setSettings({ lastNote: '' }); await refreshFiles();
    const first = noteItems()[0]; if (first) await openNote(first.path); else showWelcome();
    toast('تم فتح مجلد الملاحظات.');
  } catch (e) { toast(`تعذّر فتح المجلد: ${e.message}`, true); }
}
async function openSearch(initialQuery = '', quick = false) {
  const body = `<div class="form-row"><input id="modal-search" class="field-input" placeholder="ابحث في العناوين والمحتوى والوسوم..." value="${esc(initialQuery)}" autocomplete="off"><div class="field-help">اضغط Enter لفتح أول نتيجة، أو استخدم الأسهم للتنقل.</div></div><div id="modal-search-results" class="search-results"><div class="tree-empty">اكتب كلمة للبحث في ملاحظاتك.</div></div>`;
  const promise = openModal(quick ? 'الانتقال السريع' : 'بحث شامل', body, [{label:'إغلاق',value:false}], { wide:true });
  const input=$('modal-search'), results=$('modal-search-results'); let matches=[]; let cursor=0; let timer=null;
  const doSearch = async () => {
    const q=input.value.trim().toLowerCase();
    if (!q) { results.innerHTML='<div class="tree-empty">اكتب كلمة للبحث في ملاحظاتك.</div>'; matches=[]; return; }
    results.innerHTML='<div class="tree-empty">جارٍ البحث في الملاحظات…</div>';
    const all=await scanAllNotes(); matches=all.map(({file,content})=>({file,content,score:(file.name.toLowerCase().includes(q)?3:0)+(content.toLowerCase().includes(q)?1:0)+(getTags(content).some(t=>t.includes(q.replace(/^#/,'')))?2:0)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,80); cursor=0;
    results.innerHTML=matches.length ? matches.map((m,i)=>`<button class="search-result" data-search-open="${esc(m.file.path)}" data-result-index="${i}"><span class="result-icon">${icon('file-text',18)}</span><span class="result-main"><strong>${esc(m.file.name)}</strong><small>${esc(m.file.path)} · ${esc((m.content.replace(/^#+\s/gm,'').replace(/\[\[([^\]]+)\]\]/g,'$1').replace(/\s+/g,' ').match(new RegExp(`.{0,36}${escapeRegex(q)}.{0,45}`,'i'))||[m.content.slice(0,90)])[0])}</small></span><kbd>${i===0?'Enter':''}</kbd></button>`).join('') : '<div class="tree-empty">لم يتم العثور على نتائج.</div>';
  };
  input.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(doSearch,120);});
  input.addEventListener('keydown',(e)=>{ if(e.key==='Enter' && matches.length){e.preventDefault(); const first=matches[Math.max(0,cursor)]; closeModal(false); openNote(first.file.path);} if(e.key==='ArrowDown'){e.preventDefault();cursor=Math.min(matches.length-1,cursor+1);setCursor();} if(e.key==='ArrowUp'){e.preventDefault();cursor=Math.max(0,cursor-1);setCursor();} });
  function setCursor(){results.querySelectorAll('.search-result').forEach((n,i)=>n.style.borderColor=i===cursor?'var(--accent)':'');}
  if (initialQuery) doSearch(); return promise;
}
function escapeRegex(text) { return String(text).replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }
async function openQuickSwitcher() {
  const body=`<div class="form-row"><input id="modal-switcher" class="field-input" placeholder="اكتب اسم الملاحظة..." autocomplete="off"></div><div id="switcher-results" class="search-results"></div>`;
  const p=openModal('الانتقال السريع',body,[{label:'إغلاق',value:false}],{wide:true});
  const input=$('modal-switcher'), results=$('switcher-results'); let list=[]; let cursor=0;
  const paint=()=>{const q=input.value.toLowerCase().trim();list=noteItems().filter(f=>!q||f.name.toLowerCase().includes(q)||f.path.toLowerCase().includes(q)).slice(0,40);cursor=Math.min(cursor,Math.max(0,list.length-1));results.innerHTML=list.map((f,i)=>`<button class="search-result" data-switch-path="${esc(f.path)}" data-switch-index="${i}" style="border-color:${i===cursor?'var(--accent)':''}"><span class="result-icon">${icon('file-text',18)}</span><span class="result-main"><strong>${esc(f.name)}</strong><small>${esc(f.path)}</small></span><kbd>${i===0?'Enter':''}</kbd></button>`).join('')||'<div class="tree-empty">لا توجد ملاحظات مطابقة.</div>';};
  input.addEventListener('input',paint); input.addEventListener('keydown',(e)=>{if(e.key==='ArrowDown'){e.preventDefault();cursor=Math.min(list.length-1,cursor+1);paint();}if(e.key==='ArrowUp'){e.preventDefault();cursor=Math.max(0,cursor-1);paint();}if(e.key==='Enter'&&list.length){const f=list[cursor];closeModal(false);openNote(f.path);}}); paint(); return p;
}
function showCommandPalette() {
  const items = [
    ['plus','ملاحظة جديدة','new-note','Ctrl+N'],['folder-plus','مجلد جديد','new-folder',''],['search','بحث شامل','search','Ctrl+Shift+F'],['network','خريطة المعرفة','graph','Ctrl+G'],['calendar','ملاحظة اليوم','daily',''],['tag','عرض كل الوسوم','tags',''],['star','المفضلة','favorites',''],['folder-open','فتح مجلد ملاحظات','vault',''],['settings','الإعدادات','settings',''],['book-open','عرض القراءة','reading',''],['download','تصدير الملاحظة الحالية','export',''],['paperclip','إضافة مرفق','attachment',''],['clipboard','قالب محضر اجتماع','template-meeting',''],['keyboard','اختصارات لوحة المفاتيح','shortcuts','']
  ];
  const body=`<div class="form-row"><input id="command-filter" class="field-input" placeholder="اكتب اسم الأمر..." autocomplete="off"></div><div id="command-results" class="search-results"></div>`;
  openModal('لوحة الأوامر',body,[{label:'إغلاق',value:false}],{wide:true}); const input=$('command-filter'), results=$('command-results');
  const paint=()=>{const q=input.value.trim().toLowerCase();const found=items.filter(i=>i[1].toLowerCase().includes(q));results.innerHTML=found.map((i)=>`<button class="search-result" data-command="${i[2]}"><span class="result-icon">${icon(i[0],18)}</span><span class="result-main"><strong>${esc(i[1])}</strong></span><kbd>${esc(i[3])}</kbd></button>`).join('')||'<div class="tree-empty">لا يوجد أمر بهذا الاسم.</div>';};
  input.addEventListener('input',paint); input.addEventListener('keydown',(e)=>{if(e.key==='Enter'){const first=results.querySelector('[data-command]'); if(first){closeModal(false);runCommand(first.dataset.command);}}}); paint();
}
function runCommand(command) {
  switch(command){
    case 'new-note': createNoteDialog(); break; case 'new-folder': createFolderDialog(); break; case 'search': openSearch(); break; case 'graph': showGraph(); break; case 'daily': createDailyNote(); break;
    case 'tags': setSelectedPanel('tags'); break; case 'favorites': setSelectedPanel('favorites'); break; case 'vault': openVaultDialog(); break; case 'settings': showSettings(); break;
    case 'reading': setEditorMode(editorMode==='reading'?'edit':'reading'); break; case 'export': exportCurrentNote(); break; case 'attachment': addAttachment(); break;
    case 'template-meeting': insertAtCursor('\n## محضر اجتماع\n**التاريخ:** \n**الحاضرون:** \n\n### جدول الأعمال\n- \n\n### القرارات\n- \n\n### المهام التالية\n- [ ] \n'); break; case 'shortcuts': showShortcuts(); break;
  }
}
async function showGraph() {
  await saveCurrent(); $('welcome-screen').classList.add('hidden'); $('note-view').classList.add('hidden'); $('editor-toolbar').classList.add('hidden'); $('special-view').classList.remove('hidden');
  const all=await scanAllNotes(); const nodes=all.slice(0,100).map((x)=>x.file); const byPath=new Map(nodes.map((n)=>[n.path,n])); const w=1000,h=610,cx=w/2,cy=h/2;
  const positions=new Map(); nodes.forEach((n,i)=>{const a=(2*Math.PI*i/Math.max(nodes.length,1))-Math.PI/2; const r=nodes.length<8?150:Math.min(245,130+nodes.length*1.6);positions.set(n.path,{x:cx+r*Math.cos(a),y:cy+r*.68*Math.sin(a)});});
  let edges=''; for(const {file,content} of all){const from=positions.get(file.path); if(!from)continue;for(const link of getWikiLinks(content)){const to=resolveNote(link.target);const dest=to&&positions.get(to.path);if(dest&&to.path!==file.path)edges+=`<line class="graph-edge" x1="${from.x}" y1="${from.y}" x2="${dest.x}" y2="${dest.y}"/>`;}}
  let nodeHtml=nodes.map((n)=>{const p=positions.get(n.path); const active=n.path===currentPath;return `<g class="graph-node ${active?'active':''}" data-graph-open="${esc(n.path)}" transform="translate(${p.x},${p.y})"><circle r="${active?8:5.5}"/><text y="-13">${esc(n.name.slice(0,24))}</text></g>`;}).join('');
  $('special-view').innerHTML=`<div class="special-header"><div><p class="eyebrow">شبكة المعرفة</p><h1>خريطة الملاحظات</h1><p>استكشف الروابط بين ملاحظاتك. اضغط على أي عقدة لفتح الملاحظة المرتبطة.</p></div><div class="graph-tools"><span class="count-badge">${nodes.length} ملاحظة</span><button id="graph-refresh" class="secondary-btn">${icon('refresh',14)} تحديث</button></div></div>${nodes.length?`<div class="graph-canvas"><svg viewBox="0 0 ${w} ${h}" role="img" aria-label="خريطة المعرفة">${edges}${nodeHtml}</svg></div><div class="welcome-bottom"><span class="tiny-dot"></span> تظهر الروابط المكتوبة بصيغة [[اسم الملاحظة]]</div>`:`<div class="tree-empty">أنشئ ملاحظاتك واربطها باستخدام [[اسم الملاحظة]] لتظهر خريطة المعرفة هنا.</div>`}`;
  $('graph-refresh').addEventListener('click',showGraph);
}
async function showTagSearch(tag) {
  const all=await scanAllNotes(); const matched=all.filter(({content})=>getTags(content).includes(String(tag).toLowerCase()));
  $('welcome-screen').classList.add('hidden');$('note-view').classList.add('hidden');$('editor-toolbar').classList.add('hidden');$('special-view').classList.remove('hidden');
  $('special-view').innerHTML=`<div class="special-header"><div><p class="eyebrow">استكشاف الوسوم</p><h1>#${esc(tag)}</h1><p>الملاحظات التي تستخدم هذا الوسم.</p></div><span class="count-badge">${matched.length} ملاحظة</span></div><div class="search-results">${matched.map(({file,content})=>`<button class="search-result" data-open-note="${esc(file.path)}"><span class="result-icon">${icon('file-text',19)}</span><span class="result-main"><strong>${esc(file.name)}</strong><small>${esc(file.path)} · ${esc(content.replace(/\s+/g,' ').slice(0,95))}</small></span></button>`).join('')||'<div class="tree-empty">لا توجد ملاحظات بهذا الوسم.</div>'}</div>`;
}
async function showSettings() {
  const s=settings;
  const body=`<div class="settings-list">
    <div class="setting-row"><div><strong>المظهر</strong><small>اختيار النمط البصري للتطبيق.</small></div><div class="setting-control"><select class="field-select" id="setting-theme"><option value="dark" ${s.theme!=='light'?'selected':''}>داكن</option><option value="light" ${s.theme==='light'?'selected':''}>فاتح</option></select></div></div>
    <div class="setting-row"><div><strong>حجم الخط</strong><small>تغيير حجم الكتابة داخل المحرر.</small></div><div class="setting-control"><input id="setting-font" type="range" min="13" max="22" value="${Number(s.fontSize)||16}"><span id="setting-font-val">${Number(s.fontSize)||16}</span></div></div>
    <div class="setting-row"><div><strong>الحفظ التلقائي</strong><small>حفظ تعديلاتك بعد توقف الكتابة قليلًا.</small></div><div class="setting-control"><button id="setting-autosave" class="toggle ${s.autoSave?'on':''}" aria-label="الحفظ التلقائي"></button></div></div>
    <div class="setting-row"><div><strong>اللوحة الجانبية</strong><small>عرض الروابط العكسية والوسوم والعناوين.</small></div><div class="setting-control"><button id="setting-rightpane" class="toggle ${s.showRightPane?'on':''}" aria-label="اللوحة الجانبية"></button></div></div>
    <div class="setting-row"><div><strong>مجلد الملاحظات</strong><small>ملفات Markdown ومرفقاتك مخزنة محليًا.</small></div><div class="setting-control"><button class="modal-btn" id="setting-vault">تغيير المجلد</button></div></div>
    <div class="setting-row"><div><strong>صيغة الملفات</strong><small>توافق مباشر مع ملفات Obsidian النصية.</small></div><div class="setting-control"><span class="count-badge">Markdown · UTF-8</span></div></div>
  </div><p class="field-help">المزامنة السحابية لا تُقدَّم كخدمة داخلية في وِرَاق. يمكنك اختيار مجلد داخل OneDrive أو Dropbox أو أي مجلد متزامن من جهازك.</p>`;
  openModal('الإعدادات',body,[{label:'إغلاق',value:false},{label:'تم',value:true,primary:true}]);
  $('setting-theme').addEventListener('change',async(e)=>{settings.theme=e.target.value; applySettings(); await window.waraq.setSettings({theme:settings.theme});});
  $('setting-font').addEventListener('input',async(e)=>{$('setting-font-val').textContent=e.target.value;settings.fontSize=Number(e.target.value);document.documentElement.style.setProperty('--font-size',`${settings.fontSize}px`);await window.waraq.setSettings({fontSize:settings.fontSize});});
  $('setting-autosave').addEventListener('click',async()=>{settings.autoSave=!settings.autoSave;$('setting-autosave').classList.toggle('on',settings.autoSave);await window.waraq.setSettings({autoSave:settings.autoSave});toast(settings.autoSave?'تم تفعيل الحفظ التلقائي.':'تم إيقاف الحفظ التلقائي.');});
  $('setting-rightpane').addEventListener('click',async()=>{settings.showRightPane=!settings.showRightPane;$('setting-rightpane').classList.toggle('on',settings.showRightPane);$('right-pane').classList.toggle('right-hidden',!settings.showRightPane);await window.waraq.setSettings({showRightPane:settings.showRightPane});});
  $('setting-vault').addEventListener('click',()=>{closeModal(false);openVaultDialog();});
}
function applySettings() {
  document.body.classList.toggle('light',settings.theme==='light');
  document.documentElement.style.setProperty('--font-size',`${Number(settings.fontSize)||16}px`);
  document.documentElement.style.setProperty('--line-height',`${Number(settings.lineHeight)||1.8}`);
  $('right-pane').classList.toggle('right-hidden',settings.showRightPane===false);
}
function showShortcuts() {
  const rows=[['ملاحظة جديدة','Ctrl + N'],['بحث شامل في المحتوى','Ctrl + Shift + F'],['البحث في الملفات','Ctrl + K'],['الانتقال السريع إلى ملاحظة','Ctrl + O'],['لوحة الأوامر','Ctrl + P'],['حفظ الملاحظة','Ctrl + S'],['نص عريض','Ctrl + B'],['نص مائل','Ctrl + I'],['خريطة المعرفة','Ctrl + G'],['إغلاق نافذة','Esc']];
  const body=`<div class="search-results">${rows.map(([name,key])=>`<div class="setting-row"><strong>${esc(name)}</strong><kbd style="border:1px solid var(--line);padding:4px 7px;border-radius:4px;color:var(--muted);direction:ltr">${esc(key)}</kbd></div>`).join('')}</div>`;
  openModal('اختصارات لوحة المفاتيح',body,[{label:'إغلاق',value:false}]);
}
function showFavoritesView() {
  selectedPanel='favorites'; document.querySelectorAll('.ribbon-btn[data-panel]').forEach((b)=>b.classList.toggle('active',b.dataset.panel==='favorites'));
  const favs=noteItems().filter((f)=>settings.favoritePaths.includes(f.path));
  $('welcome-screen').classList.add('hidden');$('note-view').classList.add('hidden');$('editor-toolbar').classList.add('hidden');$('special-view').classList.remove('hidden');
  $('special-view').innerHTML=`<div class="special-header"><div><p class="eyebrow">مساحة المعرفة الشخصية</p><h1>المفضلة</h1><p>الملاحظات التي وضعتها في متناول يدك.</p></div><span class="count-badge">${favs.length} ملاحظة</span></div><div class="search-results">${favs.map(f=>`<button class="search-result" data-open-note="${esc(f.path)}"><span class="result-icon">${icon('star',18)}</span><span class="result-main"><strong>${esc(f.name)}</strong><small>${esc(f.path)}</small></span></button>`).join('')||'<div class="tree-empty">لا توجد مفضلات بعد. افتح ملاحظة واضغط على النجمة.</div>'}</div>`;
}
function showAllTagsView() {
  selectedPanel='tags'; document.querySelectorAll('.ribbon-btn[data-panel]').forEach((b)=>b.classList.toggle('active',b.dataset.panel==='tags'));
  scanAllNotes().then((all)=>{const tags=new Map();all.forEach(({file,content})=>getTags(content).forEach(t=>{if(!tags.has(t))tags.set(t,[]);tags.get(t).push(file);}));const list=[...tags.entries()].sort((a,b)=>a[0].localeCompare(b[0],'ar'));$('welcome-screen').classList.add('hidden');$('note-view').classList.add('hidden');$('editor-toolbar').classList.add('hidden');$('special-view').classList.remove('hidden');$('special-view').innerHTML=`<div class="special-header"><div><p class="eyebrow">نظام التنظيم</p><h1>كل الوسوم</h1><p>اجمع الملاحظات حسب موضوعاتها.</p></div><span class="count-badge">${list.length} وسم</span></div><div class="tag-results">${list.map(([tag,items])=>`<button class="tag-card" data-filter-tag="${esc(tag)}"><strong>#${esc(tag)}</strong><small>${items.length} ملاحظة</small></button>`).join('')||'<div class="tree-empty">أضف الوسوم إلى محتوى ملاحظاتك.</div>'}</div>`;});
}
function bindEvents() {
  $('btn-new-note').addEventListener('click',()=>createNoteDialog()); $('btn-new-folder').addEventListener('click',createFolderDialog); $('btn-open-vault').addEventListener('click',openVaultDialog); $('welcome-open-vault').addEventListener('click',openVaultDialog);
  $('welcome-new-note').addEventListener('click',()=>createNoteDialog()); $('btn-open-folder').addEventListener('click',()=>window.waraq.revealVault()); $('btn-settings').addEventListener('click',showSettings); $('btn-command').addEventListener('click',showCommandPalette); $('btn-quick-switch').addEventListener('click',openQuickSwitcher);
  $('btn-toggle-right').addEventListener('click',toggleRightPane); $('btn-close-right').addEventListener('click',toggleRightPane); $('btn-open-graph-small').addEventListener('click',showGraph); $('btn-favorite').addEventListener('click',toggleFavorite); $('btn-copy-link').addEventListener('click',copyNoteLink); $('btn-export').addEventListener('click',exportCurrentNote); $('btn-trash-note').addEventListener('click',deleteCurrentNote);
  $('btn-add-tag').addEventListener('click',async()=>{const tag=await askInput('إضافة وسم','اسم الوسم','مثال: دراسة');if(tag){const clean=tag.replace(/^#/,'').replace(/\s+/g,'-');insertAtCursor(`${$('markdown-editor').value.endsWith('\n')?'':'\n'}#${clean}\n`);}});
  $('btn-tab-add').addEventListener('click',()=>createNoteDialog()); $('btn-source').addEventListener('click',()=>setEditorMode(editorMode==='split'?'edit':'split'));
  $('btn-reading').addEventListener('click',()=>setEditorMode(editorMode==='reading'?'edit':'reading'));
  $('btn-note-menu').addEventListener('click',()=>openModal('خيارات الملاحظة',`<div class="search-results"><button class="search-result" data-note-action="rename"><span class="result-icon">${icon('file-text')}</span><span class="result-main"><strong>إعادة تسمية الملاحظة</strong><small>تغيير اسم ملف Markdown.</small></span></button><button class="search-result" data-note-action="export"><span class="result-icon">${icon('download')}</span><span class="result-main"><strong>تصدير</strong><small>حفظ نسخة من الملاحظة في أي مكان.</small></span></button><button class="search-result" data-note-action="daily"><span class="result-icon">${icon('calendar')}</span><span class="result-main"><strong>ملاحظة اليوم</strong><small>إنشاء صفحة يومية.</small></span></button></div>`,[{label:'إغلاق',value:false}],{wide:true}));
  $('tree-filter').addEventListener('input',()=>renderSidebar());
  document.querySelectorAll('.ribbon-btn[data-panel]').forEach((btn)=>btn.addEventListener('click',()=>{if(btn.dataset.panel==='tags')showAllTagsView(); else if(btn.dataset.panel==='favorites')showFavoritesView(); else {setSelectedPanel(btn.dataset.panel);if($('special-view').classList.contains('hidden')===false && currentPath) { $('special-view').classList.add('hidden');$('note-view').classList.remove('hidden');$('editor-toolbar').classList.remove('hidden');}}}));
  document.querySelectorAll('.ribbon-btn[data-action]').forEach((btn)=>btn.addEventListener('click',()=>runCommand(btn.dataset.action)));
  document.querySelectorAll('[data-format]').forEach((btn)=>btn.addEventListener('click',()=>insertAtCursor('',({bold:['**','**'],italic:['*','*'],strike:['~~','~~']})[btn.dataset.format])));
  document.querySelectorAll('[data-insert]').forEach((btn)=>btn.addEventListener('click',()=>insertBlock(btn.dataset.insert)));
  $('markdown-editor').addEventListener('input',onEditorInput);
  $('markdown-editor').addEventListener('keydown',(e)=>{if(e.key==='Tab'){e.preventDefault();insertAtCursor('  ');}if(e.key==='s'&&(e.ctrlKey||e.metaKey)){e.preventDefault();saveCurrent(true);} });
  $('note-title').addEventListener('focus',()=>{$('note-title').dataset.oldPath=currentPath;});
  $('note-title').addEventListener('keydown',(e)=>{if(e.key==='Enter'){e.preventDefault();$('note-title').blur();}if(e.key==='Escape'){$('note-title').value=basename(currentPath);$('note-title').blur();}});
  $('note-title').addEventListener('blur',()=>{if(currentPath&&$('note-title').value.trim()!==basename(currentPath))renameCurrentNote($('note-title').value);});
  $('modal-body').addEventListener('click',(e)=>{
    const searchButton=e.target.closest('[data-search-open]'); if(searchButton){const p=searchButton.dataset.searchOpen;closeModal(false);openNote(p);return;}
    const switchButton=e.target.closest('[data-switch-path]'); if(switchButton){const p=switchButton.dataset.switchPath;closeModal(false);openNote(p);return;}
    const cmd=e.target.closest('[data-command]');if(cmd){const name=cmd.dataset.command;closeModal(false);runCommand(name);return;}
    const noteAction=e.target.closest('[data-note-action]');if(noteAction){const what=noteAction.dataset.noteAction;closeModal(false);if(what==='rename')askInput('إعادة تسمية الملاحظة','الاسم الجديد','اسم الملاحظة',basename(currentPath)).then((v)=>v&&renameCurrentNote(v));if(what==='export')exportCurrentNote();if(what==='daily')createDailyNote();}
  });
  document.addEventListener('click',async(e)=>{
    const open=e.target.closest('[data-open-note]'); if(open){const p=open.dataset.openNote;if(p){await openNote(p);if(!$('special-view').classList.contains('hidden')){$('special-view').classList.add('hidden');$('note-view').classList.remove('hidden');$('editor-toolbar').classList.remove('hidden');}}return;}
    const folder=e.target.closest('[data-folder]'); if(folder){const p=folder.dataset.folder;collapsedFolders.has(p)?collapsedFolders.delete(p):collapsedFolders.add(p);renderSidebar();return;}
    const tag=e.target.closest('[data-filter-tag]'); if(tag){showTagSearch(tag.dataset.filterTag);return;}
    const goto=e.target.closest('[data-goto-line]');if(goto){const line=Number(goto.dataset.gotoLine);const editor=$('markdown-editor');const lines=editor.value.split('\n');const pos=lines.slice(0,line).reduce((n,s)=>n+s.length+1,0);editor.focus();editor.setSelectionRange(pos,pos);return;}
    const wiki=e.target.closest('[data-wikilink]'); if(wiki){e.preventDefault();const target=wiki.dataset.wikilink;const found=resolveNote(target);if(found)openNote(found.path);else{const create=await openModal('ملاحظة غير موجودة',`<p style="line-height:1.9;color:var(--muted)">لا توجد ملاحظة باسم <strong>${esc(target)}</strong>. هل تريد إنشاءها الآن؟</p>`,[{label:'إلغاء',value:false},{label:'إنشاء ملاحظة',value:true,primary:true}]);if(create){try{const p=/\.(md|markdown)$/i.test(target)?target:`${target}.md`;await window.waraq.createNote(p,`# ${basename(p)}\n\n`);await refreshFiles();await openNote(p);}catch(err){toast(err.message,true);}}}return;}
    const external=e.target.closest('[data-external]');if(external){e.preventDefault();window.waraq.openExternal(external.dataset.external);return;}
    const graph=e.target.closest('[data-graph-open]');if(graph){openNote(graph.dataset.graphOpen);return;}
  });
  $('special-view').addEventListener('click',(e)=>{const graph=e.target.closest('[data-graph-open]');if(graph)openNote(graph.dataset.graphOpen);});
  $('btn-pane-menu').addEventListener('click',()=>openModal('مستكشف الملفات',`<div class="search-results"><button class="search-result" data-panel-action="collapse"><span class="result-icon">${icon('chevron-down')}</span><span class="result-main"><strong>طي كل المجلدات</strong></span></button><button class="search-result" data-panel-action="expand"><span class="result-icon">${icon('folder-open')}</span><span class="result-main"><strong>توسيع كل المجلدات</strong></span></button><button class="search-result" data-panel-action="vault"><span class="result-icon">${icon('folder-open')}</span><span class="result-main"><strong>تغيير مجلد الملاحظات</strong></span></button></div>`,[{label:'إغلاق',value:false}]));
  $('modal-body').addEventListener('click',(e)=>{const b=e.target.closest('[data-panel-action]');if(b){const cmd=b.dataset.panelAction;closeModal(false);if(cmd==='collapse')files.filter(f=>f.type==='folder').forEach(f=>collapsedFolders.add(f.path));if(cmd==='expand')collapsedFolders.clear();if(cmd==='vault')openVaultDialog();renderSidebar();}});
  document.addEventListener('keydown',(e)=>{
    const mod=e.ctrlKey||e.metaKey;
    if(e.key==='Escape'&&!$('modal-backdrop').classList.contains('hidden')){closeModal(false);return;}
    if(mod&&e.key.toLowerCase()==='n'){e.preventDefault();createNoteDialog();}
    else if(mod&&e.shiftKey&&e.key.toLowerCase()==='f'){e.preventDefault();openSearch();}
    else if(mod&&e.key.toLowerCase()==='k'){e.preventDefault();$('tree-filter').focus();$('tree-filter').select();}
    else if(mod&&e.key.toLowerCase()==='o'){e.preventDefault();openQuickSwitcher();}
    else if(mod&&e.key.toLowerCase()==='p'){e.preventDefault();showCommandPalette();}
    else if(mod&&e.key.toLowerCase()==='s'){e.preventDefault();saveCurrent(true);}
    else if(mod&&e.key.toLowerCase()==='b'&&$('note-view').classList.contains('hidden')===false){e.preventDefault();insertAtCursor('', ['**','**']);}
    else if(mod&&e.key.toLowerCase()==='i'&&$('note-view').classList.contains('hidden')===false){e.preventDefault();insertAtCursor('', ['*','*']);}
    else if(mod&&e.key.toLowerCase()==='g'){e.preventDefault();showGraph();}
  });
}
async function initialize() {
  setupIcons();
  try {
    const data=await window.waraq.initial(); window.initialData=data; window.currentVaultPath=data.vaultPath;
    settings={...defaults,...(data.settings||{})}; if(!Array.isArray(settings.favoritePaths))settings.favoritePaths=[];
    if(!Array.isArray(settings.recentPaths))settings.recentPaths=[];
    applySettings(); await refreshFiles(); bindEvents();
    if(settings.lastNote && noteItems().some(f=>f.path===settings.lastNote)) await openNote(settings.lastNote);
    else if(noteItems().length) await openNote(noteItems()[0].path);
    else showWelcome();
  } catch(e) { toast(`تعذّر بدء وِرَاق: ${e.message}`,true); showWelcome(); }
}
initialize();
