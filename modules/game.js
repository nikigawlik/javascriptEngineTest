export class Game {
    constructor(fps) {
        // fields
        this.fps = fps;
        this.frameID = 0;
        this.systems = [];
        this.config = null;
        this.scene = null;
        this.gameObjects = [];

        console.log("--- set up ---");
        window.addEventListener("load", () => this.run());
    }

    async run() {
        // the game loop
        await this.start();
        console.log("--- run game ---");
        while(true) {
            let endOfFramePromise = timeout(1000 / this.fps);
            let abort = await this.update();
            await endOfFramePromise;
            if(abort) break;
        }
    }

    async start() {
        console.log("loading initial scene...");
        this.config = await loadDataFile("config");
        this.scene = await loadDataFile("scenes/main");
        this.gameObjects = this.scene.objects || this.gameObjects;

        console.log("starting game systems...");
        for(let system of this.systems) {
            let objects = this.gameObjects.filter(obj => system.constructor.objectIsValid(obj));
            system.start(objects);
        }
    }

    async update() {
        for(let system of this.systems) {
            let objects = this.gameObjects.filter(obj => system.objectIsValid(obj));
            system.update(objects);
        }
        
        this.frameID++;
        return false; // false means don't abort game
    }

    addGameSystem(gameSystem) {
        this.systems.push(gameSystem);
    }
}

export function timeout(milliseconds) {
    return new Promise(resolve => window.setTimeout(resolve, milliseconds));
}

export async function loadDataFile(path) {
    let response = await fetch(`/data/${path}.json`, {headers: {"Accept": "application/json"}});
    if(!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`) 
    return await response.json();
}

export let game = new Game(5); // singleton instance of the game