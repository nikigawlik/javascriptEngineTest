import { GameSystem } from "../gameSystem.js";

export class Physics extends GameSystem {
    constructor() {
        super();
    }

    static objectIsValid(object) {
        return object.x != undefined && object.y != undefined;
    }

    start(objects) {
        for(let obj of objects) {
            obj.vX = (Math.random()-Math.random()) * 0.6;
            obj.vY = (Math.random()-Math.random()) * 0.6;
        }
    }

    update(objects) {
        console.log("update physics");
        for(let obj of objects) {
            obj.vX += (obj.x) * -0.01;
            obj.vY += (obj.y) * -0.01;

            obj.vX += (Math.random()-Math.random()) * 0.01;
            obj.vY += (Math.random()-Math.random()) * 0.01;

            obj.x += obj.vX;
            obj.y += obj.vY;
        }
    }
}

export let physics = new Physics();
physics.use();