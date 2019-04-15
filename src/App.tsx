import * as React from "react";
import { remote, BrowserWindow, screen } from "electron";
import { View } from "./views";

import "./app.scss";

export default class App extends React.PureComponent<any, IAppState>
{
	public static readonly window: BrowserWindow = remote.getCurrentWindow();
	public static readonly close = () => App.window.close();

	public static readonly getSettings = () => (App.window as any).App.getSettings();
	public static readonly setSettings = (settings: any) => (App.window as any).App.setSettings(settings);

	constructor(props: any)
	{
		super(props);
		const settings = App.getSettings();
		this.state = {
			loaded: false,
			focus: false,
			hidden: settings.windowState.hidden,
			faded: false
		};
		window.addEventListener("focus", () => this.fadeIn());
		window.addEventListener("blur", () => this.fadeOut());
	}

	public componentDidMount()
	{
		App.window.show();
		App.window.focus();
		this.fadeIn();
		App.window.webContents.openDevTools({ mode: "detach" });
	}

	private fadeOut = () => { if (this.state.focus) this.setState({ focus: false }); }
	private fadeIn = () => { if (!this.state.focus) this.setState({ focus: true }); }

	private hide = () =>
	{
		if (!this.state.hidden)
		{
			const settings = App.getSettings();
			settings.windowState.hidden = true;
			const pos = App.window.getPosition();
			settings.windowState.position.x = pos[0];
			settings.windowState.position.y = pos[1];
			App.setSettings(settings);
			this.setState({ hidden: true, faded: true }, () => 
			{
				App.window.setSize(64, 64, false);
				const ws = screen.getPrimaryDisplay().workAreaSize;
				App.window.setPosition(ws.width - 75, ws.height - 75, false);
				setTimeout(() => this.setState({ faded: false }), 200);
			});

		}
	}

	private show = () =>
	{
		if (this.state.hidden)
		{
			const settings = App.getSettings();
			settings.windowState.hidden = false;
			App.setSettings(settings);
			this.setState({ hidden: false, faded: true }, () => 
			{
				setTimeout(() =>
				{
					App.window.setSize(250, 420, false);
					const { x, y } = settings.windowState.position;
					App.window.setPosition(x, y, false);
					this.setState({ faded: false })
				}, 200);
			});
		}
	}

	public render()
	{
		if (this.state.hidden)
			return (
				<View id="app-hidden" className={this.state.faded ? "fade-out" : ""} onClick={this.show}>
					<View>
						HOHOHO
					</View>
				</View>
			);
		else
			return (
				<View id="app" className={(this.state.focus ? "focus" : "") + (this.state.faded ? " fade-out" : "")}>
					<View id="titlebar">
						<View id="title">
							TODO
					</View>
						<View className="btn-group">
							<View id="btn-hide" className="btn" onClick={this.hide} />
							<View id="btn-close" className="btn" onClick={App.close} />
						</View>
					</View>
				</View>
			);
	}
}

interface IAppState
{
	focus: boolean;
	loaded: boolean;
	hidden: boolean;
	faded: boolean;
}