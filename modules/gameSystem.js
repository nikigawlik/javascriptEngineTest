import { game } from "./game.js";

export class GameSystem {
    constructor() {
    }

    static objectIsValid(object) {
        return true;
    }

    use() {
        console.log(`Using system: ${this.constructor.name}`);
        game.addGameSystem(this);
    }

    start(objects) {

    }

    update(objects) {

    }
}