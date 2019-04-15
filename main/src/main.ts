import { app } from "electron";
import App from "./App";

(process as any).env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = true;

app.on("ready", App.onReady);
app.on("window-all-closed", App.onQuit() ? app.quit : null);