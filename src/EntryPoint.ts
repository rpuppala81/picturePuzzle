import { MainScene } from "./MainScene";
import { Application, Renderer } from "pixi.js";

/**
 * @description - it is a entry point to Main scene of the application
 */
const app: Application<Renderer> = new Application();
await app.init({
    width: window.innerWidth,
    height: window.innerHeight,
    resizeTo: window
});
document.getElementById("gameContent")!.appendChild(app.canvas);

// creating main Scene
new MainScene(app);