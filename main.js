const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const apiClient = require('./api/client');

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.handle('openai:complete', async (event, { prompt, model, params }) => {
  try {
    const data = await apiClient.complete({ prompt, model, params });
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: err.message || String(err) };
  }
});
