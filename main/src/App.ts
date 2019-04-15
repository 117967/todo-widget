import { app, screen, BrowserView, BrowserWindow, remote } from "electron";
import * as path from "path";
import * as fs from "fs";

export default class App
{
	private constructor() { }

	private static window: BrowserWindow = null;

	public static paths: IPathCollection;

	public static readonly onReady = (): void =>
	{
		const appDataPath = path.join(app.getPath("appData"), "todo-widget");
		if (!fs.existsSync(appDataPath))
			fs.mkdirSync(appDataPath);
		App.paths = {
			appData: appDataPath,
			settings: path.join(appDataPath, "settings.json"),
		}
		App.window = new BrowserWindow({
			frame: false,
			transparent: true,
			type: "desktop",
			width: 250,
			height: 420,
			resizable: false,
			darkTheme: true,
			fullscreenable: false,
			maximizable: false,
			minimizable: false,
			show: false,
			alwaysOnTop: true,
		});
		App.window["App"] = App;
		const settings = App.getSettings();
		if (settings.windowState.hidden)
		{
			const ws = screen.getPrimaryDisplay().workAreaSize;
			App.window.setPosition(ws.width - 75, ws.height - 75, false);
		}
		else
		{
			const { x, y } = settings.windowState.position;
			App.window.setPosition(x, y, false);
		}
		App.window.setSkipTaskbar(true);
		App.window.loadURL("http://localhost:3000");
		App.window.on("close", App.onClose);
		App.window.on("closed", () => App.window = null);
	}

	private static onClose = (): void => 
	{
		const settings = App.getSettings();
		if (!settings.windowState.hidden)
		{
			const pos = App.window.getPosition();
			App.setSettings({ windowState: { position: { x: pos[0], y: pos[1] } } });
		}
	}

	public static readonly onQuit = (): boolean => true;

	public static getSettings = (): IAppSettings => 
	{
		if (!fs.existsSync(App.paths.settings))
		{
			const ws: Electron.Size = screen.getPrimaryDisplay().workAreaSize;
			const settings: IAppSettings = {
				windowState: {
					position: {
						x: ws.width - 270,
						y: ws.height / 2 - 160
					},
					hidden: false
				}
			}
			fs.writeFileSync(App.paths.settings, JSON.stringify(settings), "utf-8");
			return settings;
		}
		return JSON.parse(fs.readFileSync(App.paths.settings, "utf-8"));
	}

	public static setSettings = (settings: Partial<IAppSettings>): void =>
	{
		let s = App.getSettings();
		fs.writeFileSync(App.paths.settings, JSON.stringify(Object.assign(s, settings)), "utf-8");
	}
}

interface IPathCollection
{
	appData: string;
	settings: string;
}

interface IAppSettings
{
	windowState: {
		position?: {
			x: number;
			y: number;
		},
		hidden?: boolean;
	}
}
