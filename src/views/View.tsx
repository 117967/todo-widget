import * as React from "react";
import { getClassFromProps, ReactHTMLProps } from "../utils";

import "./styles/view.scss";

export const View: React.FC<IViewProps> = ({ className, position, centered, fill, ...props }) => {
	const cn = getClassFromProps("view", { className, position, centered, fill });
	return (
		<div className={cn} {...props} />
	);
}

interface IViewProps extends ReactHTMLProps
{
	position?: "absolute" | "fixed" | "relative";
	centered?: boolean | "horizontal" | "vertical";
	fill?: boolean;
}