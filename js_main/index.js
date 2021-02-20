import path from "path"
import { app, BrowserWindow, ipcMain } from "electron"

app.allowRendererProcessReuse = true
const isDev = process.env.NODE_ENV === 'development'

const winURL = isDev
  ? `http://localhost:9080`
  : "file://"+__dirname+"/index.html";

function createWindow () {

  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    useContentSize: true,
    webPreferences:{
      nodeIntegration:true,
      webSecurity: false // 允许加载本地资源
    }
  })
  // react 调试工具
  // 加载应用的index.html
  BrowserWindow.addDevToolsExtension(path.resolve(__dirname, "../devtools/react_devtools"));
  BrowserWindow.addDevToolsExtension(path.resolve(__dirname, "../devtools/redux_devtools"));
  win.loadURL(winURL)
  win.webContents.openDevTools()

  sendRenderer(app.getPath('desktop'));
}
function sendRenderer(message){
  ipcMain.on('init', event => {
    event.reply('main-message', message)
  })
}
app.on('ready', createWindow)
