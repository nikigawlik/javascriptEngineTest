/**
 * populate static variables with operators and SDFs
 */
const SDFs = [
    {
        id: "circ",
        paramNum: 3,
        func: (x, y, params) => (Math.sqrt(sqr(x - params[0]) + sqr(y - params[1])) - params[2]),
    },
    {
        id: "cross",
        paramNum: 4,
        func: (x, y, params) => (Math.min(Math.abs(x - params[0]) - params[2], Math.abs(y - params[1]) - params[3])),
    },
    {
        id: "rect",
        paramNum: 4,
        func: (x, y, params) => (Math.max(Math.abs(x - params[0]) - params[2], Math.abs(y - params[1]) - params[3])),
    },
    {
        id: "const",
        paramNum: 1,
        func: (x, y, params) => (params[0])
    }
];
const OPs = [
    {
        id: "+",
        func: (a, b) => (Math.min(a, b)),
    },
    {
        id: "-",
        func: (a, b) => (Math.max(a, -b)),
    },
    {
        id: "++",
        func: (d1, d2) => {
            const k = 1;
            let h = Math.min(Math.max(0.5 + 0.5 * (d2 - d1) / k, 0), 1);
            return d2 * (1 - h) + d1 * h - k * h * (1 - h);
        }
    },
    {
        id: "--",
        func: (d1, d2) => {
            const k = 0.5;
            d2 = -d2;
            let h = Math.min(Math.max(0.5 - 0.5 * (d2 - d1) / k, 0), 1);
            return d2 * (1 - h) + d1 * h + k * h * (1 - h);
        }
    },
    {
        id: "o",
        func: (d1, d2) => (Math.abs(d1) - d2 / 2)
    },
    {
        id: "mul",
        func: (d1, d2) => (d1 * d2)
    }
];
function sqr(a) {
    return a * a;
}

export class Instruction {
    constructor(params, operator, sdf) {
        this.params = params;
        this.operator = operator;
        this.sdf = sdf;
    }
    static fromText(text) {
        const tokens = text.trim().split(" ").filter((tok) => (tok.length > 0));
        if (tokens.length == 0)
            throw new Error(`String is empty.`);
        const op = OPs.find((op) => (op.id === tokens[0]));
        if (op == null) {
            throw new Error(`Operator ${tokens[0]} does not exist.`);
        }
        const sdf = SDFs.find((sdf) => (sdf.id === tokens[1]));
        if (sdf == null) {
            throw new Error(`Signed distance function ${tokens[1]} does not exist.`);
        }
        const params = tokens.splice(2).map(num => Number(num));
        if (params.length != sdf.paramNum) {
            throw new Error(`Signed distance function ${tokens[1]} expects ${sdf.paramNum} parameters, but ${params.length} were given.`);
        }

        return new Instruction(params, op, sdf);
    }
}

export class SDFRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.instructions = [];
    }
    redraw() {
        let ctx = this.canvas.getContext("2d");
        let dat = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        for (let x = 0; x < this.canvas.width; x++)
            for (let y = 0; y < this.canvas.height; y++) {
                let val = this.calcAt(x / this.canvas.width * 20 - 10, y / this.canvas.height * 20 - 10);
                // val = val > 0 ? (1 - (val % 1)) * 255 : 0;
                val = val > 0 ? 255 : 0;
                let index = (y * this.canvas.width + x) * 4;
                dat.data[index] = dat.data[index + 1] = dat.data[index + 2] = val;
                dat.data[index + 3] = 255;
            }
        ctx.putImageData(dat, 0, 0);
    }
    calcAt(x, y) {
        let val = Number.MAX_VALUE;
        for (let instr of this.instructions) {
            val = instr.operator.func(val, instr.sdf.func(x, y, instr.params));
        }
        return val;
    }
}