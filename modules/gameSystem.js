import { game } from "./game.js";

export class GameSystem {
    constructor() {
    }

    use() {
        game.addGameSystem(this);
    }

    start(objects) {

    }

    update(objects) {

    }
}