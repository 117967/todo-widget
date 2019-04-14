import { app, BrowserWindow } from "electron";

let w: BrowserWindow;


const createWindow = () =>
{
	w = new BrowserWindow({
		frame: false,
		type: "desktop",
		width: 280,
		height: 420,
		backgroundColor: "rgba(0, 0, 0, 0)",
		resizable: false,
		darkTheme: true,
		fullscreenable: false,
		maximizable: false,
		minimizable: false,
		show: false,
		transparent: true
		// alwaysOnTop: true
	});
	w.loadURL("http://localhost:3000");
	w.on("closed", () => w = null);
};

app.on("ready", () => createWindow);
app.on("window-all-closed", app.quit);