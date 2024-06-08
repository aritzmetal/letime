import { ipcRenderer, contextBridge } from "electron";


const API = {
    close: () => {  
        console.log("closing")
        ipcRenderer.send("app/close")
    },
    minimize: () => ipcRenderer.send("app/minimize"),
    maximize: () => ipcRenderer.send("app/maximize"),
    

}

contextBridge.exposeInMainWorld("app", API)