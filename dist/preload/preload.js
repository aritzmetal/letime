"use strict";
const electron = require("electron");
const API = {
  close: () => {
    console.log("closing");
    electron.ipcRenderer.send("app/close");
  },
  minimize: () => electron.ipcRenderer.send("app/minimize"),
  maximize: () => electron.ipcRenderer.send("app/maximize")
};
electron.contextBridge.exposeInMainWorld("app", API);
