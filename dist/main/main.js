"use strict";
const electron = require("electron");
const path = require("path");
let mainWindow;
const innerDimensions = {
  height: 200,
  width: 600
};
const savedDimensions = innerDimensions;
function createWindow() {
  mainWindow = new electron.BrowserWindow({
    height: savedDimensions.height,
    width: savedDimensions.width,
    maxWidth: 1800,
    maxHeight: 1300,
    show: false,
    frame: false,
    titleBarStyle: "customButtonsOnHover",
    resizable: true,
    // titleBarOverlay: {
    //   color: "red",
    //   symbolColor: "red",
    //   height: 60,
    // },
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      devTools: true,
      preload: path.join(__dirname, "../preload/preload.js")
    }
  });
  mainWindow.loadURL("http://localhost:5173");
  mainWindow.on("closed", () => mainWindow = null);
  mainWindow.webContents.openDevTools();
  mainWindow.on("ready-to-show", () => {
    mainWindow?.show();
  });
  electron.ipcMain.on("app/close", () => {
    electron.app.quit();
  });
  electron.ipcMain.on("app/minimize", () => {
    mainWindow?.minimize();
  });
  electron.ipcMain.on("app/maximize", () => {
    if (mainWindow?.isMaximized()) {
      mainWindow.restore();
    } else {
      mainWindow?.maximize();
    }
  });
}
electron.app.whenReady().then(() => {
  createWindow();
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.app.on("activate", () => {
  if (mainWindow == null) {
    createWindow();
  }
});
