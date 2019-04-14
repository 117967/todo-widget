import { app, BrowserWindow, screen } from "electron";

let w: BrowserWindow;

console.log("hello")

const createWindow = () =>
{
	const ww = screen.getPrimaryDisplay().workAreaSize.width;
	w = new BrowserWindow({
		frame: false,
		transparent: true,
		type: "desktop",
		width: 280,
		height: 420,
		resizable: false,
		darkTheme: true,
		fullscreenable: false,
		maximizable: false,
		minimizable: false,
		show: false,
		alwaysOnTop: true
	});
	w.setPosition(ww - 300, 50, false);
	w.loadURL("http://localhost:3000");
	w.on("closed", () => w = null);
};

app.on("ready", createWindow);
app.on("window-all-closed", app.quit);