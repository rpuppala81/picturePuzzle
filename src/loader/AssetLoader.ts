import { Assets, EventEmitter } from "pixi.js";
import manifest from "../../assets/data/manifest.json";
import { GameConstants } from "../Constants/GameConstants";

/**
 * @description - load all game assets.
 */
export class AssetLoader {
    private static instance: AssetLoader;

    private constructor(emitter: EventEmitter) {
        this.onAssetsLoaded(emitter);
    }

    /**
    * @description - to get the singleton instance.
    * @returns instance.
    */
    public static getInstance(emitter: EventEmitter): AssetLoader {
        if (!AssetLoader.instance) {
            AssetLoader.instance = new AssetLoader(emitter);
        }
        return AssetLoader.instance;
    }

    /**
    * @description - Initiates the asset loading process.
    * @private
    */
    private onAssetsLoaded(emitter: EventEmitter): void {
        this.loadAssets()
            .then((): void => {
                console.info("Assets are loaded");
                emitter.emit("ASSETS_LOADED");

            })
            .catch((error): void => {
                console.error("Error in assets loading:", error);
            });
    }


    /**
    * @description - Loads the game assets.
    * @returns {Promise<void>}.
    * @public
    */
    public async loadAssets(): Promise<void> {
        await Assets.init({ manifest: manifest });
        await Assets.loadBundle([GameConstants.GAME_ASSETS]);
        console.info("Assets loaded");
    }
}