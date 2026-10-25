const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('waraq', Object.freeze({
  initial: () => ipcRenderer.invoke('app:initial'),
  list: () => ipcRenderer.invoke('vault:list'),
  read: (p) => ipcRenderer.invoke('vault:read', p),
  write: (p, c) => ipcRenderer.invoke('vault:write', p, c),
  createNote: (p, c) => ipcRenderer.invoke('vault:create-note', p, c),
  createFolder: (p) => ipcRenderer.invoke('vault:create-folder', p),
  rename: (a, b) => ipcRenderer.invoke('vault:rename', a, b),
  trash: (p) => ipcRenderer.invoke('vault:trash', p),
  chooseVault: () => ipcRenderer.invoke('vault:choose'),
  revealVault: () => ipcRenderer.invoke('vault:reveal'),
  addAttachment: () => ipcRenderer.invoke('vault:attachment'),
  readAsset: (p) => ipcRenderer.invoke('vault:read-asset', p),
  exportNote: (n, c) => ipcRenderer.invoke('vault:export', n, c),
  getSettings: () => ipcRenderer.invoke('settings:get'),
  setSettings: (s) => ipcRenderer.invoke('settings:set', s),
  openExternal: (u) => ipcRenderer.invoke('app:open-external', u),
  copyText: (v) => ipcRenderer.invoke('app:copy-text', v)
}));
