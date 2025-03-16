const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  // Resolve the icon path correctly:
  const iconPath = path.join(__dirname, 'assets', 'pandoro.ico');
  console.log('Icon path:', iconPath);  // Check the path in the console

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
    resizable: false,
    icon: iconPath, // Use the resolved icon path
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  // mainWindow.webContents.openDevTools(); // Uncomment for debugging
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
