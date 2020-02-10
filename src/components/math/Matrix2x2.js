export default class Matrix2x2 extends Float32Array {

    constructor() {
        super(4);
    }

    static identity() {
        const mat4 = new Matrix2x2();
        for (let i = 0; i < mat4.length; i+=3) {
            mat4[i] = 1; 
        }
        return mat4;
    }

    static rotate(out, a, rad) {
        const x0 = a[0], x1 = a[1],
              y0 = a[2], y1 = a[3];
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        out[0] = x0 *  c + y0 * s; out[1] = x1 *  c + y1 * s;
        out[2] = x0 * -s + y0 * c; out[3] = x1 * -s + y1 * c;
        return out;
    }

    /**
     * Creates a matrix from a given angle
     * This is equivalent to (but much faster than):
     *
     *     mat2.identity(dest);
     *     mat2.rotate(dest, dest, rad);
     *
     * @param {mat2} out mat2 receiving operation result
     * @param {Number} rad the angle to rotate the matrix by
     * @returns {mat2} out
     */
    static fromRotation(out, rad) {
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        out[0] =  c; out[1] = s;
        out[2] = -s; out[3] = c;
        return out;
    }
}