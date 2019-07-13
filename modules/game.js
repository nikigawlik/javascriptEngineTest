export class Game {
    constructor(fps) {
        // fields
        this.fps = fps;
        this.frameID = 0;
        this.systems = [];

        window.addEventListener("load", () => this.run());
    }

    async run() {
        // the game loop
        await this.start();
        while(true) {
            let endOfFramePromise = timeout(1000 / this.fps);
            let abort = await this.update();
            await endOfFramePromise;
            if(abort) break;
        }
        await this.end();
    }

    async start() {

    }

    async update() {
        for(let system of this.systems) {
            system.update();
        }
        
        this.frameID++;
        return false; // false means don't abort game
    }

    async end() {

    }

    addGameSystem(gameSystem) {
        this.systems.push(gameSystem);
    }
}

export function timeout(milliseconds) {
    return new Promise(resolve => window.setTimeout(resolve, milliseconds));
}

export let game = new Game(5); // singleton instance of the game