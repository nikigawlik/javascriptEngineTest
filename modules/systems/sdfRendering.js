import { GameSystem } from "../gameSystem.js";
import { SDFRenderer, Instruction } from "../sdfRenderer.js";

export class SDFRendering extends GameSystem {
    constructor() {
        super();
        this.canvas = null;
        this.sdfRenderer = new SDFRenderer();
    }
    
    // static objectIsValid(object) {
    //     return object.sdf && typeof(object.sdf) == "string";
    // }
    static objectIsValid(object) {
        return object.x != undefined && object.y != undefined;
    }

    start(objects) {
        let main = document.querySelector("main");
        this.canvas = document.querySelector("canvas");
        this.sdfRenderer.canvas = this.canvas;
    }

    update(objects) {
        let instructions = [];
        for(let object of objects) {
            instructions.push(Instruction.fromText(`++ circ ${object.x} ${object.y} ${object.radius || 1}`));
        }
        this.sdfRenderer.instructions = instructions;
        this.sdfRenderer.redraw();
    }
}

export let sdfRendering = new SDFRendering();
sdfRendering.use();