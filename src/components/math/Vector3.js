import Vector4 from "./Vector4";

export default class Vector3 extends Float32Array {

    constructor(...args) {
        super(3);
        if (args) {
            this.x = args && args.length > 0 ? args[0] : this.x;
            this.y = args && args.length > 1 ? args[1] : this.y;
            this.z = args && args.length > 2 ? args[2] : this.z;
        }
    }

    static get ZERO() { return ZERO; }
    static get ONE() { return ONE; }
    static get UNIT_X() { return UNIT_X; }
    static get UNIT_Y() { return UNIT_Y; }
    static get UNIT_Z() { return UNIT_Z; }

    set x(v) { this[0] = v; }
    set y(v) { this[1] = v; }
    set z(v) { this[2] = v; }
    get x() { return this[0]; }
    get y() { return this[1]; }
    get z() { return this[2]; }

    static length(a) {
        const x = a[0];
        const y = a[1];
        const z = a[2];
        return Math.hypot(x, y, z);
    }
    get length() { return Vector4.length(this); }

    static squaredLength(a) {
        const x = a[0];
        const y = a[1];
        const z = a[2];
        return x*x + y*y + z*z;
    }
    get squaredLength() { return Vector4.squaredLength(this); }

    static add(out, a, b) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        out[2] = a[2] + b[2];
        return out;
    }

    // So you don't have to type Vector3.add(vectorVariableName, vectorVariableName, [0, 1, 0])
    // You can just type vectorVariableName.add([0, 1, 0])
    add(...args) { return Vector3.add(this, this, ...args); }

    static subtract(out, a, b) {
        return Vector3.add(out, a, -b);
    }
    static sub(...args) { return Vector3.subtract(...args); }
    subtract(...args) { return Vector3.subtract(this, this, ...args); }

    static multiply(out, a, b) {
        out[0] = a[0] * b[0];
        out[1] = a[1] * b[1];
        out[2] = a[2] * b[2];
        return out;
    }
    static mul(...args) { return Vector3.multiply(...args); }
    multiply(...args) { return Vector3.multiply(this, this, ...args); }

    static divide(out, a, b) {
        out[0] = a[0] / b[0];
        out[1] = a[1] / b[1];
        out[2] = a[2] / b[2];
        return out;
    }
    divide(...args) { return Vector3.divide(this, this, ...args); }

    static scale(out, a, b) {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
        return out;
    }
    scale(...args) { return Vector3.scale(this, this, ...args); }

    static distance(a, b) {
        const x = b[0] - a[0];
        const y = b[1] - a[1];
        const z = b[2] - a[2];
        return Math.hypot(x, y, z);
    }
    distanceTo(...args) { return Vector3.distance(this, ...args); }

    static squaredDistance(a, b) {
        const x = b[0] - a[0];
        const y = b[1] - a[1];
        const z = b[2] - a[2];
        return x*x + y*y + z*z;
    }
    squaredDistanceTo(...args) { return Vector3.squaredDistance(this, ...args); }

    static negate(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        out[2] = -a[2];
        return out;
    }
    negate() { return Vector3.negate(this, this); }

    inverse(out, a) {
        out[0] = 1.0 / a[0];
        out[1] = 1.0 / a[1];
        out[2] = 1.0 / a[2];
        return out;
    }
    invert() { return Vector3.inverse(this, this); }

    normalize(out, a) {
        const x = a[0];
        const y = a[1];
        const z = a[2];
        const len = x*x + y*y + z*z;
        // Optimization to only perform sqrt if it passes checks for 0
        if (len > 0) {
            len = 1 / Math.sqrt(len);
        }
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
        return out;
    }
    normalize() { return Vector3.normalize(this, this); }

    static dot(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    }
    dot(...args) { return Vector3.dot(this, ...args); }
    
    cross(out, a, b) {
        const ax = a[0], ay = a[1], az = a[2];
        const bx = b[0], by = b[1], bz = b[2];
      
        out[0] = ay * bz - az * by;
        out[1] = az * bx - ax * bz;
        out[2] = ax * by - ay * bx;
        return out;
    }
    cross(...args) { return Vector3.dot(this, this, ...args); }
}

const ZERO = new Vector3(0, 0, 0);
const ONE = new Vector3(1, 1, 1);
const UNIT_X = new Vector3(1, 0, 0);
const UNIT_Y = new Vector3(0, 1, 0);
const UNIT_Z = new Vector3(0, 0, 1);