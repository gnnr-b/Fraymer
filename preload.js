const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  complete: (opts) => ipcRenderer.invoke('openai:complete', opts),
});
