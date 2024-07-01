import { contextBridge,  ipcRenderer} from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

export interface API {
  close: () => void,
  minimize: () => void,
  maximize: () => void,
}

// Custom APIs for renderer
const api: API = {
  close: () => {  
      console.log("closing")
      ipcRenderer.send("app/close")
  },
  minimize: () => ipcRenderer.send("app/minimize"),
  maximize: () => ipcRenderer.send("app/maximize"),
  

}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}