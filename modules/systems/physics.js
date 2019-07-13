import { GameSystem } from "../gameSystem.js";

export class Physics extends GameSystem {
    constructor() {
        super();
    }

    start() {
        
    }

    update(objects) {
        console.log("update physics");
    }
}

export let physics = new Physics();
physics.use();