import { GameSystem } from "../gameSystem.js";

export class Physics extends GameSystem {
    constructor() {
        super();
    }

    static objectIsValid(object) {
        return object.shape == "circle" && object.x != undefined && object.y != undefined;
    }

    start(objects) {

    }

    update(objects) {
        console.log("update physics");
    }
}

export let physics = new Physics();
physics.use();