import { Application, Container, EventEmitter, Graphics, Rectangle, Sprite, Text, Texture, /*Rectangle, Sprite, Texture*/ } from "pixi.js";
import { GameConstants } from "../Constants/GameConstants";
//import { Select } from "@pixi/ui";


export class GameScene extends Container {
    private app: Application;
    private emitter: EventEmitter;
    private pivotContainer: any;
    private win: boolean = false;
    private winText: Text;
    private currentPic: string;
    private pics: string[] = [GameConstants.AA, GameConstants.RC, GameConstants.PK, GameConstants.KAMAL, GameConstants.KRISHNAM, GameConstants.MOHANLAL, GameConstants.MAMMOOTTY, GameConstants.MAHESH,
    GameConstants.KRISHNA, GameConstants.RAJINI, GameConstants.SHOBHAN, GameConstants.VENKATESH, GameConstants.PRABHASH, GameConstants.NTR, GameConstants.ANR, GameConstants.AMITHABH, GameConstants.JRNTR,
    GameConstants.BALAKR, GameConstants.NAGARJUN, GameConstants.EMPTY, GameConstants.CHIRU, GameConstants.BRAMHI];
    private numbers: number[] = [];//1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
    //private pics: string[] = [GameConstants.BRAMHI];
    private currentRows: number = 4;
    private currentColumns: number = 4;
    private sliceWidth: number = 50;
    private sliceHeight: number = 50;
    private currentLevel: number = 0;
    constructor(app: Application, emitter: EventEmitter) {
        super();
        this.app = app;
        this.emitter = emitter;
        this.app.stage.addChild(this);
        //this.x = app.screen.width / 2;
        this.y = app.screen.height / 2;
        this.pivotContainer;
        this.currentPic = this.pics[this.pics.length - 1];
        this.addGameImage();
        let hintText = new Text("HINT IMAGE", GameConstants.TEXT_FONT);
        hintText.x = 88;
        hintText.y = 75;
        this.addChild(hintText);
        let insText = new Text("SWAP IMAGES WITH EMPTY\n SLOT BY CLICK ", GameConstants.TEXT_FONT);
        insText.x = 0;
        insText.y = -300;
        this.addChild(insText);
        //let recallRest = ()=>{this.resetTheGame(this.currentPic), this};
        //recallRest();
        this.addOtherPics();
        this.winText = new Text("Congrats\nYou have\nCompleted\nClick \non this\nTo Reset", GameConstants.TITLE_FONT);
        this.addChild(this.winText)
        this.winText.anchor.set(0.5);
        this.winText.x = 165;
        this.winText.visible = false;
        this.winText.on('pointerup', () => { this.resetTheGame(this.currentPic), this });
        this.winText.cursor = "pointer";
        this.winText.interactive = true;
        this.emitter;
    }

    private handleFileInput(event: any): void {
        const file = event.target.files[0];
        if (!file) return;
        const self = this;
        const reader = new FileReader();
        reader.onload = function (e: any) {
            const image = new Image();
            image.src = e.target.result;
            image.onload = () => {
                const texture = Texture.from(image);
                self.resetTheGame(GameConstants.EMPTY, texture);
            };
        };

        reader.readAsDataURL(file);
        //});
    }

    private addOtherPics(): void {
        let threeText = new Text("3X3", GameConstants.LEVEL_FONT);
        threeText.interactive = true;
        threeText.cursor = 'pointer';
        threeText.x = 10;
        threeText.y = 70;
        this.addChild(threeText);
        threeText.on('pointerup', () => { this.currentLevel = 3; this.resetTheGame(), this });
        let fourText = new Text("4X4", GameConstants.LEVEL_FONT);
        fourText.interactive = true;
        fourText.cursor = 'pointer';
        fourText.x = 50;
        fourText.y = 70;
        this.addChild(fourText);
        fourText.on('pointerup', () => { this.currentLevel = 4; this.resetTheGame(), this });
        let emptyText = new Text("OWN PIC", GameConstants.OPT_FONT);
        emptyText.interactive = true;
        emptyText.cursor = 'pointer';
        emptyText.y = 90;
        this.addChild(emptyText);
        let ntrText = new Text("NTR", GameConstants.OPT_FONT);
        ntrText.interactive = true;
        ntrText.cursor = 'pointer';
        ntrText.y = 110;
        ntrText.on('pointerup', () => { this.resetTheGame(GameConstants.NTR), this });
        this.addChild(ntrText);
        let anrText = new Text("ANR", GameConstants.OPT_FONT);
        anrText.interactive = true;
        anrText.y = 130;
        anrText.cursor = 'pointer';
        anrText.on('pointerup', () => { this.resetTheGame(GameConstants.ANR), this });
        this.addChild(anrText);
        let krishnaText = new Text("KRISHNA", GameConstants.OPT_FONT);
        krishnaText.interactive = true;
        krishnaText.y = 150;
        krishnaText.cursor = 'pointer';
        krishnaText.on('pointerup', () => { this.resetTheGame(GameConstants.KRISHNA), this });
        this.addChild(krishnaText);
        let krajuText = new Text("KRAJU", GameConstants.OPT_FONT);
        krajuText.interactive = true;
        krajuText.y = 170;
        krajuText.cursor = 'pointer';
        krajuText.on('pointerup', () => { this.resetTheGame(GameConstants.KRISHNAM), this });
        this.addChild(krajuText);
        let pkText = new Text("PK", GameConstants.OPT_FONT);
        pkText.interactive = true;
        pkText.cursor = 'pointer';
        pkText.y = 190;
        pkText.on('pointerup', () => { this.resetTheGame(GameConstants.PK), this });
        this.addChild(pkText);
        let mammottyText = new Text("MAMMU", GameConstants.OPT_FONT);
        mammottyText.interactive = true;
        mammottyText.cursor = 'pointer';
        mammottyText.y = 210;
        mammottyText.on('pointerup', () => { this.resetTheGame(GameConstants.MAMMOOTTY), this });
        this.addChild(mammottyText);
        let shobhanText = new Text("SHOBAN", GameConstants.OPT_FONT);
        shobhanText.interactive = true;
        shobhanText.cursor = 'pointer';
        shobhanText.y = 230;
        shobhanText.on('pointerup', () => { this.resetTheGame(GameConstants.SHOBHAN), this });
        this.addChild(shobhanText);
        let prabhaText = new Text("PRABHASH", GameConstants.OPT_FONT);
        prabhaText.interactive = true;
        prabhaText.cursor = 'pointer';
        prabhaText.y = 250;
        prabhaText.on('pointerup', () => { this.resetTheGame(GameConstants.PRABHASH), this });
        this.addChild(prabhaText);
        let rcText = new Text("CHERRY", GameConstants.OPT_FONT);
        rcText.interactive = true;
        rcText.cursor = 'pointer';
        rcText.y = 270;
        rcText.on('pointerup', () => { this.resetTheGame(GameConstants.RC), this });
        this.addChild(rcText);
        let balakText = new Text("BALAYYA", GameConstants.OPT_FONT);
        balakText.interactive = true;
        balakText.cursor = 'pointer';
        balakText.y = 290;
        balakText.on('pointerup', () => { this.resetTheGame(GameConstants.BALAKR), this });
        this.addChild(balakText);

        let fiveText = new Text("5X5", GameConstants.LEVEL_FONT);
        fiveText.interactive = true;
        fiveText.cursor = 'pointer';
        fiveText.x = 240;
        fiveText.y = 70;
        this.addChild(fiveText);
        fiveText.on('pointerup', () => { this.currentLevel = 5; this.resetTheGame(), this });
        let sixText = new Text("6X6", GameConstants.LEVEL_FONT);
        sixText.interactive = true;
        sixText.cursor = 'pointer';
        sixText.x = 285;
        sixText.y = 70;
        this.addChild(sixText);
        sixText.on('pointerup', () => { this.currentLevel = 6; this.resetTheGame(), this });
        let chiruText = new Text("CHIRU", GameConstants.OPT_FONT);
        chiruText.interactive = true;
        chiruText.cursor = 'pointer';
        chiruText.x = 275;
        chiruText.y = 90;
        chiruText.on('pointerup', () => { this.resetTheGame(GameConstants.CHIRU), this });
        this.addChild(chiruText);
        let amithabText = new Text("AMITHAB", GameConstants.OPT_FONT);
        amithabText.interactive = true;
        amithabText.cursor = 'pointer';
        amithabText.x = 275;
        amithabText.y = 110;
        amithabText.on('pointerup', () => { this.resetTheGame(GameConstants.AMITHABH), this });
        this.addChild(amithabText);
        let rajiniText = new Text("RAJINI", GameConstants.OPT_FONT);
        rajiniText.interactive = true;
        rajiniText.cursor = 'pointer';
        rajiniText.x = 275;
        rajiniText.y = 130;
        rajiniText.on('pointerup', () => { this.resetTheGame(GameConstants.RAJINI), this });
        this.addChild(rajiniText);
        let kamalText = new Text("KAMAL", GameConstants.OPT_FONT);
        kamalText.interactive = true;
        kamalText.x = 275;
        kamalText.y = 150;
        kamalText.cursor = 'pointer';
        kamalText.on('pointerup', () => { this.resetTheGame(GameConstants.KAMAL), this });
        this.addChild(kamalText);
        let mlalText = new Text("MOHANLAL", GameConstants.OPT_FONT);
        mlalText.interactive = true;
        mlalText.cursor = 'pointer';
        mlalText.x = 275;
        mlalText.y = 170;
        mlalText.on('pointerup', () => { this.resetTheGame(GameConstants.MOHANLAL), this });
        this.addChild(mlalText);
        let maheshText = new Text("MAHESH", GameConstants.OPT_FONT);
        maheshText.interactive = true;
        maheshText.cursor = 'pointer';
        maheshText.x = 275;
        maheshText.y = 190;
        maheshText.on('pointerup', () => { this.resetTheGame(GameConstants.MAHESH), this });
        this.addChild(maheshText);
        let jrntrText = new Text("JRNTR", GameConstants.OPT_FONT);
        jrntrText.interactive = true;
        jrntrText.cursor = 'pointer';
        jrntrText.x = 275;
        jrntrText.y = 210;
        jrntrText.on('pointerup', () => { this.resetTheGame(GameConstants.JRNTR), this });
        this.addChild(jrntrText);
        let aaText = new Text("AA", GameConstants.OPT_FONT);
        aaText.interactive = true;
        aaText.cursor = 'pointer';
        aaText.x = 275;
        aaText.y = 230;
        aaText.on('pointerup', () => { this.resetTheGame(GameConstants.AA), this });
        this.addChild(aaText);
        let venkyText = new Text("VENKY", GameConstants.OPT_FONT);
        venkyText.interactive = true;
        venkyText.cursor = 'pointer';
        venkyText.x = 275;
        venkyText.y = 250;
        venkyText.on('pointerup', () => { this.resetTheGame(GameConstants.VENKATESH), this });
        this.addChild(venkyText);
        let bramhiText = new Text("BRAMHI", GameConstants.OPT_FONT);
        bramhiText.interactive = true;
        bramhiText.cursor = 'pointer';
        bramhiText.x = 275;
        bramhiText.y = 270;
        bramhiText.on('pointerup', () => { this.resetTheGame(GameConstants.BRAMHI), this });
        this.addChild(bramhiText);
        let nagText = new Text("NAG", GameConstants.OPT_FONT);
        nagText.interactive = true;
        nagText.cursor = 'pointer';
        nagText.x = 275;
        nagText.y = 290;
        nagText.on('pointerup', () => { this.resetTheGame(GameConstants.NAGARJUN), this });
        this.addChild(nagText);

        const fileInput: HTMLInputElement = document.getElementById('fileInput') as HTMLInputElement;
        fileInput.addEventListener('change', this.handleFileInput.bind(this));
        emptyText.on('pointerup', () => { fileInput.click(); this.resetTheGame(GameConstants.EMPTY), this });
    }

    private resetTheGame(picStr: any = null, texture: any = null): void {
        console.log(" in reset the game " + picStr);
        texture;
        this.winText.visible = false;
        this.currentRows = this.currentLevel;
        this.currentColumns = this.currentLevel;
        this.sliceWidth = GameConstants.IMAGE_WIDTH / this.currentRows;
        this.sliceHeight = GameConstants.IMAGE_HEIGHT/ this.currentColumns;
        let levelSliceWidth = this.sliceWidth;
        let levelSliceHeight = this.sliceHeight;
        this.updateNumarr();
        //let numbers:number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36];
        this.numbers.sort(() => Math.random() - 0.5);
        let containerId: number = 0;
        let rows: number = this.currentRows;
        let cols: number = this.currentColumns;
        let hitContainer: any;
        let numbers: number[] = [];
        hitContainer = this.getChildByName("hitContainer")?.getChildByName("image" + this.currentPic);
        this.offOtherHintPics();
        this.offOtherPics();
        //console.log("this.currentPic " + this.currentPic);
        if(picStr != null)
        this.currentPic = picStr;
        //console.log("this.currentPic " + this.currentPic);
        /*let container: any = this.getChildByName("slots" + this.currentLevel.toString() + this.currentPic);
        //console.log("container.name " + container.name);
        container.visible = true;*/
        //for(let containerId=1; containerId<=36; containerId++) {
        //let count: number = 1;
        for(let l = 0; l < GameConstants.LEVELS.length; l++) {
            let level: number;
            console.log(l);
            if(texture == null) 
                level = this.currentLevel;
            else {
                level = GameConstants.LEVELS[l];
                console.log(l + " " + level);
                //this.currentRows = l;
                //this.currentColumns = l;
                rows = level;
                cols = level;
                levelSliceWidth = GameConstants.IMAGE_WIDTH / rows;
                levelSliceHeight = GameConstants.IMAGE_HEIGHT/ cols;
                //this.updateNumarr();
                //this.numbers.sort(() => Math.random() - 0.5);
                numbers = [];
                let totalSlots: number = level * level;
                //console.log("totalSlots " + totalSlots) ;
                for(let k = 1; k <= totalSlots; k++) numbers.push(k);
                    numbers.sort(() => Math.random() - 0.5);
            }
            let container: any = this.getChildByName("slots" + level.toString() + this.currentPic);
            console.log("slots" + level.toString() + this.currentPic);
            console.log("container.name " + container.name);
            //container.x = 300 * l; 
            container.visible = true;
            containerId = 0;
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    let num: number;
                    let numLength: number;
                    if(texture == null) {
                        num = this.numbers[containerId];
                        numLength = this.numbers.length;
                    }
                    else {
                        num = numbers[containerId];
                        numLength = numbers.length;
                    }
                    let child;
                    if (num == numLength) {
                        child = container.getChildByName("block" + level.toString() + " ") as any;
                        child.getChildAt(2).alpha = 0.01;
                        //if(texture == null)
                        this.pivotContainer = child;
                    } else {
                        child = container.getChildByName("block" + level.toString() + num.toString()) as any;
                        //console.log("name " + "block" + this.currentLevel.toString() + num.toString());
                        child.getChildAt(2).alpha = 1;
                    }
                    if (texture != null) {
                        let numString: string;
                        numString = numbers[containerId] == numLength ? " " : numbers[containerId].toString();
                        let actualWidth = texture.width;
                        let actualHeight = texture.height;
                        //console.log("actual width " + actualWidth);
                        //let widthRatio = image.width/actualWidth;
                        //let heightRatio = image.height/actualHeight;
                        //let texture = image.texture;
                        let sliceWidth = actualWidth / rows;
                        let sliceHeight = actualHeight / cols;
                        //this.offOtherPics(container);
                        let imageRow: number = Math.floor(numbers[containerId] / cols);
                        let imageCol: number = numbers[containerId] % rows;
                        //console.log(this.numbers[containerId] + " " + imageRow + " " + imageCol)
                        let rect: any;
                        if (numString == " ")
                            rect = new Rectangle(0, 0, sliceWidth, sliceHeight)
                        else
                            rect = new Rectangle(imageCol * sliceWidth, imageRow * sliceHeight, sliceWidth, sliceHeight);
                        //text.anchor.set(0.5);
                        //container.name = numString;
                        //console.log(rect);
                        //this.addSlot(container, rect, image, numString, row, col, actualWidth, actualHeight, this.pics[imageIndex]);
                        //this.addChild(container);
                        this.updateSlot(rect, child, texture, actualWidth, actualHeight)
                    }
                    child.visible = true;
                    child.interactive = true;
                    if(texture != null) {
                        console.log("levelSliceWidth " + levelSliceWidth);
                        child.x = 75 + col * levelSliceWidth;//this.sliceWidth;
                        child.y = -190 + row * levelSliceHeight;//this.sliceHeight;
                    } else {
                        child.x = 75 + col * this.sliceWidth;
                        child.y = -190 + row * this.sliceHeight;
                    }
                    
                    containerId++;
                }
            }
            console.log(" reset " + l);
            if(texture == null) {
                l = GameConstants.LEVELS.length;
                console.log(" level length update ...." + l);
            }
            console.log('reset game for end ' + l); 
        }
        
        hitContainer = this.getChildByName("hitContainer")?.getChildByName("image" + this.currentPic);
        //console.log("this.currentPic " + this.currentPic);
        hitContainer.visible = true;
        if (texture != null)
        {
            hitContainer.texture = texture;
            this.setOwnPic();
        }
        console.log(" reset game end");
    }

    private setOwnPic(): void {
        
    }

    private offOtherPics(): void {
        //let pics: string[] = [GameConstants.AA, GameConstants.RC, GameConstants.PK, GameConstants.KAMAL, GameConstants.KRISHNAM, GameConstants.MOHANLAL, GameConstants.MAMMOOTTY, GameConstants.MAHESH, GameConstants.KRISHNA, GameConstants.RAJINI,GameConstants.SHOBHAN, GameConstants.VENKATESH, GameConstants.PRABHASH, GameConstants.NTR, GameConstants.ANR, GameConstants.AMITHABH, GameConstants.JRNTR, GameConstants.CHIRU];
        for(let l = 0; l < GameConstants.LEVELS.length; l++)
        {
            let level = GameConstants.LEVELS[l];
            //let numbers: number[] = [];
            let totalSlots: number = level * level;
            //for(let l = 0; l < le)
            for (let i = 0; i < this.pics.length; i++) {
                let hitContainer: any = this.getChildByName("slots" + level.toString() + this.pics[i]);
                for (let j = 1; j <= totalSlots; j++) {
                    let slotImage: any;
                    if (j == totalSlots)
                        slotImage = hitContainer.getChildByName("block" + level.toString() + " ");
                    else
                        slotImage = hitContainer.getChildByName("block" + level.toString() + j.toString());
                    slotImage.visible = false;
                    slotImage.interactive = false;
                }
                hitContainer.visible = false;
            }
        }
    }

    private offOtherHintPics(): void {
        //let pics: string[] = [GameConstants.AA, GameConstants.RC, GameConstants.PK, GameConstants.KAMAL, GameConstants.KRISHNAM, GameConstants.MOHANLAL, GameConstants.MAMMOOTTY, GameConstants.MAHESH, GameConstants.KRISHNA, GameConstants.RAJINI,GameConstants.SHOBHAN, GameConstants.VENKATESH, GameConstants.PRABHASH, GameConstants.NTR, GameConstants.ANR, GameConstants.AMITHABH, GameConstants.JRNTR, GameConstants.CHIRU];
        for (let i = 0; i < this.pics.length; i++) {
            let hitContainer: any = this.getChildByName("hitContainer");
            let hintImage: any = hitContainer.getChildByName("image" + this.pics[i]);
            hintImage.visible = false;
        }
    }

    private addGameImage(): void {

        let count: number = 1;
        let hintContainer: Container = new Container();
        hintContainer.name = "hitContainer";
        this.addChild(hintContainer);

        //let pics: string[] = [GameConstants.AA, GameConstants.RC, GameConstants.PK, GameConstants.KAMAL, GameConstants.KRISHNAM, GameConstants.MOHANLAL, GameConstants.MAMMOOTTY, GameConstants.MAHESH, GameConstants.KRISHNA, GameConstants.RAJINI,GameConstants.SHOBHAN, GameConstants.VENKATESH, GameConstants.PRABHASH, GameConstants.NTR, GameConstants.ANR, GameConstants.AMITHABH, GameConstants.JRNTR, GameConstants.CHIRU];
        for (let imageIndex: number = 0; imageIndex < this.pics.length; imageIndex++) {
            count = 1;
            let image = Sprite.from(this.pics[imageIndex]);//GameConstants.CHIRU);
            let actualWidth = image.width;
            let actualHeight = image.height;
            //console.log("actual width " + actualWidth);
            image.width = GameConstants.IMAGE_WIDTH;
            image.height = GameConstants.IMAGE_HEIGHT;
            image.anchor.set(0.5);
            this.addHintImage(hintContainer, image, this.pics[imageIndex]);
            (hintContainer.getChildByName("image" + this.pics[imageIndex]) as any).visible = false;
            for (let level: number = 0; level < GameConstants.LEVELS.length; level++) {
                this.currentLevel =  GameConstants.LEVELS[level];
                this.currentRows = this.currentLevel;
                this.currentColumns = this.currentLevel;
                let rows: number = this.currentRows;
                let cols: number = this.currentColumns;
                let slotsContainer: Container = new Container();
                slotsContainer.name = "slots"+this.currentLevel.toString() + this.pics[imageIndex];
                this.addChild(slotsContainer);
                this.updateNumarr();
                this.numbers.sort(() => Math.random() - 0.5);
                //console.log(this.numbers);
                count = 1;
                //let widthRatio = image.width/actualWidth;
                //let heightRatio = image.height/actualHeight;
                //let texture = image.texture;
                let sliceWidth = actualWidth / rows;
                let sliceHeight = actualHeight / cols;
                this.sliceWidth = GameConstants.IMAGE_WIDTH/rows;
                this.sliceHeight = GameConstants.IMAGE_HEIGHT/cols;
                //console.log("slice width " + sliceWidth);
                //console.log("this.slice width " + this.sliceWidth);
                //console.log("slice height " + sliceHeight);
                //console.log("this.slice height " + this.sliceHeight);
                //console.log("rows " + rows + " columns " + cols);
                for (let row = 0; row < rows; row++) {
                    for (let col = 0; col < cols; col++) {
                        let numString: string;
                        //this.updateNumarr();
                        //console.log(this.numbers);
                        //console.log("this.numbers[count - 1] " + this.numbers[count - 1]);
                        numString = this.numbers[count - 1] == this.numbers.length ? " " : this.numbers[count - 1].toString();
                        let text = new Text(numString, GameConstants.TEXT_FONT);
                        let graphics = new Graphics();
                        numString == " " ? graphics.beginFill(0x201b1f) : graphics.beginFill(0x6e1a65);
                        //graphics.lineStyle(1, 0x000000);
                        graphics.drawRect(-50, -50, this.sliceWidth, this.sliceHeight);
                        graphics.endFill();
                        let container = new Container();
                        container.addChild(graphics);
                        container.addChild(text);
                        this.allignAssetAsPerLevel(text);
                        //text.x -= 25;
                        //text.y -= 25;
                        slotsContainer.addChild(container);
                        let imageRow: number = Math.floor(this.numbers[count - 1] / cols);
                        let imageCol: number = this.numbers[count - 1] % rows;
                        //console.log(this.numbers[count - 1] + " " + imageRow + " " + imageCol)
                        let rect: any;
                        if (numString == " ")
                            rect = new Rectangle(0, 0, sliceWidth, sliceHeight)
                        else
                            rect = new Rectangle(imageCol * sliceWidth, imageRow * sliceHeight, sliceWidth, sliceHeight);
                        text.anchor.set(0.5);
                        container.name = "block" + this.currentLevel.toString() + numString;
                        ////console.log(rect);
                        this.addSlot(container, rect, image, numString, row, col, actualWidth, actualHeight, this.pics[imageIndex]);
                        //this.addChild(container);
                        container.interactive = true;
                        container.on('pointerup', (event) => {
                            event;
                            // This will be triggered when the mouse button is released over the rectangle
                            // //console.log('Mouse button released!');
                            ////console.log('Mouse Position:', event.data.global);
                            ////console.log(container.name + " " +container.x + " " + container.y);
                            //console.log(this.pivotContainer.x + " " + this.pivotContainer.y);
                            let position = this.pivotContainer.position.clone();
                            this.pivotContainer.position = container.position;
                            container.position = position;
                            //console.log(container.name + " " + container.x + " " + container.y);
                            setTimeout(() => {
                                this.checkWin();
                                if (this.win) this.showWin();
                            }, 250);

                        });
                        count++;
                    }
                }
            }

            (hintContainer.getChildByName("image" + this.pics[imageIndex]) as any).visible = true;
        }
    }

    private updateNumarr(): void {
        this.numbers = [];
        let totalSlots: number = this.currentRows * this.currentColumns;
        //console.log("totalSlots " + totalSlots) ;
        for(let i = 1; i <= totalSlots; i++) this.numbers.push(i);
    }

    private updateSlot(rect: Rectangle, child: any, texture: any, actualWidth: number, actualHeight: number): void {

        actualWidth;
        actualHeight;
        /*let rows = this.currentRows;
        let cols = this.currentColumns;
        //numString;
        //picName;
        //let widthRatio = image.width/actualWidth;
        //let heightRatio = image.height/actualHeight;
        //let texture = image.texture;
        ////console.log("actual width in function " + actualWidth);
        //image.anchor.set(0.5);
        let sliceWidth = actualWidth / rows;
        let sliceHeight = actualHeight / cols;
        //console.log("slice width in function " + sliceWidth);
        //console.log("slice height in function " + sliceHeight);
        //console.log(" in fucntion ");
        //console.log(rect);*/
        const slicedTexture = new Texture({
            source: texture.source,
            frame: rect
        });
        child.getChildAt(2).texture = slicedTexture;

    }

    private addSlot(container: Container, rect: Rectangle, image: any, numString: string, row: number, col: number, actualWidth: number, actualHeight: number, picName: string): void {

        actualHeight;
        actualWidth;
        //let rows = this.currentRows;
        //let cols = this.currentColumns;
        //let widthRatio = image.width/actualWidth;
        //let heightRatio = image.height/actualHeight;
        let texture = image.texture;
        ////console.log("actual width in function " + actualWidth);
        image.anchor.set(0.5);
        /*let sliceWidth = actualWidth / rows;
        let sliceHeight = actualHeight / cols;
        //console.log("slice width in function " + sliceWidth);
        //console.log("slice height in function " + sliceHeight);
        //console.log(" in fucntion ");
        //console.log(rect);*/
        const slicedTexture = new Texture({
            source: texture.source,
            frame: rect
        });
        const sliceSprite = new Sprite(slicedTexture);
        sliceSprite.width = this.sliceWidth;//sliceWidth * widthRatio;
        sliceSprite.height = this.sliceHeight;//sliceHeight * heightRatio;
        //console.log(" slot slice " + sliceSprite.width);
        //console.log(" slot slice " + sliceSprite.height);
        sliceSprite.anchor.set(0.5);
        container.x = 75 + col * this.sliceWidth;
        container.y = -190 + row * this.sliceHeight;
        //console.log(container.x + " " + container.y);
        if (numString == " ") {
            this.pivotContainer = container;
            sliceSprite.alpha = 0.01;
        }
        //else
        //sliceSprite.alpha = 0.05;
        this.allignAssetAsPerLevel(sliceSprite);
        //sliceSprite.x -= 25;
        //sliceSprite.y -= 25;
        sliceSprite.name = "block" + this.currentLevel.toString() + picName + numString;
        container.addChild(sliceSprite);
    }

    private allignAssetAsPerLevel(asset:any): void {
        switch(this.currentLevel) {
            case 4:
                asset.x = -12;
                asset.y = -12;
                break;
            case 5:
                asset.x = -20;
                asset.y = -20;
                break;
            case 6:
                asset.x = -25;
                asset.y = -25;
                break;
            default:
            case 3:
                asset.x = 0;
                asset.y = 0;
                break;
        }
    }

    private addHintImage(hitCointainer: Container, image: any, name: string): void {
        hitCointainer.addChild(image);
        image.width = 200;
        image.height = 200;
        image.x = 170;
        image.y = 200;
        image.name = "image" + name;
    }

    private showWin(): void {
        this.winText.visible = true;
        let container: any = this.getChildByName("slots" + this.currentLevel.toString() + this.currentPic);
        for (let containerId = 1; containerId <= this.numbers.length - 1; containerId++) {
            let child = container.getChildByName("block" + this.currentLevel.toString() + containerId.toString());
            (child as any).interactive = false;
        }
        let child = container.getChildByName("block" + this.currentLevel.toString() + " ");
        (child as any).interactive = false;
        (child as any).getChildAt(2).alpha = 1;
    }

    private checkWin(): void {
        let win = true;
        //console.log("this.currentPic " + this.currentPic);
        let container: any = this.getChildByName("slots" + this.currentLevel.toString() + this.currentPic);
        for (let containerId = 1; containerId <= this.numbers.length - 1; containerId++) {
            let child = container.getChildByName("block" + this.currentLevel.toString() + containerId.toString());
            let imageRow: number = Math.floor(containerId / this.currentRows);
            let imageCol: number = containerId % this.currentColumns;
            let X = Math.floor(child?.position._x as any);
            let Y = Math.floor(child?.position._y as any);
            let rowAlign: boolean = false;
            rowAlign = X == 75 + this.sliceWidth * imageCol ? true : false;
            if (!rowAlign) { /*//console.log(containerId.toString() + " rowalign " + X + " " + Y + " " + rowAlign + " row col " + imageRow + " " + imageCol);*/ win = false; break; }
            let colAlign: boolean = false;
            colAlign = Y == -190 + this.sliceHeight * imageRow ? true : false;
            if (!colAlign) { /*//console.log(containerId.toString() + " colalign " + X + " " + Y + " " + colAlign + " row col " + imageRow + " " + imageCol);*/ win = false; break; };
            win = (rowAlign && colAlign) ? true : false;
            //console.log(containerId.toString() + " " + X + " " + Y + " " + rowAlign + " " + colAlign + " row col " + imageRow + " " + imageCol);
        }
        this.win = win;
        //console.log("this.win " + this.win)
    }
}