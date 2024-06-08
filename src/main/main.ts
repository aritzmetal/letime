import { app, BrowserWindow, ipcMain } from "electron";



import path from "path";

let mainWindow: BrowserWindow | null;

export interface Dimensions {
  width: number;
  height: number;
}
const innerDimensions: Dimensions = {
  height: 200,
  width: 600,
};

const savedDimensions: Dimensions =innerDimensions
//store.get("window-dimensions") as Dimensions  ?? ;

function createWindow() {
  mainWindow = new BrowserWindow({
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

  // Vite dev server URL
  mainWindow.loadURL("http://localhost:5173");
  mainWindow.on("closed", () => (mainWindow = null));
  
  mainWindow.webContents.openDevTools()
  //Espera a que cargue del todo para abrir
  mainWindow.on("ready-to-show", () => {
    mainWindow?.show()
  })


  ipcMain.on("app/close", () => {
    app.quit()
  })

  ipcMain.on("app/minimize", () => {
  mainWindow?.minimize()
})

ipcMain.on("app/maximize", () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.restore()
  } else {
    mainWindow?.maximize()
  }
})
  
}

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    // store.set("window-dimensions", {
    //   width: 1234,
    //   height: 1234,
    // });
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow == null) {
    createWindow();
  }
});


