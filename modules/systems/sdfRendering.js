import { GameSystem } from "../gameSystem.js";

export class SDFRendering extends GameSystem {
    constructor() {
        super();
        this.canvas = null;
    }
    
    static objectIsValid(object) {
        return object.shape != undefined && object.x != undefined && object.y != undefined;
    }

    start(objects) {
        let main = document.querySelector("main");
        this.canvas = document.querySelector("canvas");
    }

    update(objects) {
        for(let object of objects) {

        }
    }
}

export let sdfRendering = new SDFRendering();
sdfRendering.use();