export default class Vector4 extends Float32Array {

    constructor(...args) {
        super(4);
        if (args) {
            this[0] = args && args.length > 0 ? args[0] : this[0];
            this[1] = args && args.length > 1 ? args[1] : this[1];
            this[2] = args && args.length > 2 ? args[2] : this[2];
            this[3] = args && args.length > 3 ? args[3] : this[3];
        }
    }

    static get ZERO() { return ZERO; }
    static get ONE() { return ONE; }
    static get UNIT_X() { return UNIT_X; }
    static get UNIT_Y() { return UNIT_X; }
    static get UNIT_Z() { return UNIT_X; }
}

const ZERO = new Vector4(0, 0, 0, 0);
const ONE = new Vector4(1, 1, 1, 1);
const UNIT_X = new Vector4(1, 0, 0, 0);
const UNIT_Y = new Vector4(0, 1, 0, 0);
const UNIT_Z = new Vector4(0, 0, 1, 0);