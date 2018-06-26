const electron = require("electron")
const ipc = electron.ipcMain
const path = require("path")
const url = require("url")

const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow = null

app.on("window-all-closed", () => {
	if(process.platform != "darwin") app.quit()
})

app.on("ready", () => {
	mainWindow = new BrowserWindow({ width: 800, height: 600 })
	mainWindow.webContents.openDevTools()
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, "./index.html"),
		protocol: "file:",
		slashes: true
	}))
	mainWindow.on("closed", () => {
		mainWindow = null
	})
})

ipc.on("message", (event, arg) => {
	console.log(arg)
	setTimeout(() => {
		event.sender.send("reply", "pong")
	}, 1000)
})
