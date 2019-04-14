import * as React from "react";

export default class App extends React.Component
{
	public static window = (window as any).require("electron").remote.getCurrentWindow();

	constructor(props: any)
	{
		super(props);
		this.state = {
			loaded: false
		};
	}

	componentDidMount()
	{
		App.window.show();
	}

	render()
	{
		return (
			<div>
				Hello, World!
			</div>
		);
	}
}