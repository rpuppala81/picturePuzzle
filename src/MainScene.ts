import { Application, EventEmitter, Sprite } from "pixi.js";
import { AssetLoader } from "./loader/AssetLoader";
import { GameScene } from "./GameScenes/GameScene";
import { GameConstants } from "./Constants/GameConstants";
import { GameEventConstants } from "./Constants/GameEventConstants";

/**
 * @description - Main class. It has game scene as member which contains all screenf of the game
 * event eitters to raise custom events
 */
export class MainScene {
    private app: Application;
    private emitter: EventEmitter;
    private gameScene?: GameScene;

    constructor(app: Application) {
        this.app = app;
        this.emitter = new EventEmitter();
        this.addEvents();
        this.init();
    }

    /**
     * @description - Initiate and triggering the asset loadings
     * @private
     */
    private init(): void {
        AssetLoader.getInstance(this.emitter);
        this.gameScene;
    }

    /**
     * @description - adding custom evetns to the main scenes
     * @private
     */
    private addEvents(): void {
        this.emitter.on(GameEventConstants.ADD_BG, () => {
            this.addBG();
            this.addGameScenes();
            console.info(" in add bg ");
        })
        this.emitter.on(GameEventConstants.ASSETS_LOADED, () => {
            this.emitter.emit(GameEventConstants.ADD_BG);
            //this.emitter.emit(GameEventConstants.ALLIGN_SCREENS);
        })
    }

    /**
     * @description - it will create bg from sprites and add to main stage
     * @private
     */
    private addBG(): void {
        let bg = Sprite.from(GameConstants.ASSET_BG);
        bg.width = this.app.renderer.width;
        bg.height = this.app.renderer.height;
        this.app.stage.addChild(bg);
    }

    /**
     * @description - it will add game scene which contains all other game screens
     * @private
     */
    private addGameScenes(): void {
        this.gameScene = new GameScene(this.app, this.emitter);
    }
}