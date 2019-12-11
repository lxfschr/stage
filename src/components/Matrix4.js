export default class Matrix4 extends Float32Array {

    constructor() {
        return new Float32Array(16);   
    }

    static identity() {
        const mat4 = new Float32Array(16);
        for (let i = 0; i < mat4.length; i+=5) {
            mat4[i] = 1; 
        }
        return mat4;
    }

    static rotate(out, a, rad) {
        var a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3];
        var s = Math.sin(rad);
        var c = Math.cos(rad);
        out[0] = a0 * c + a2 * s;
        out[1] = a1 * c + a3 * s;
        out[2] = a0 * -s + a2 * c;
        out[3] = a1 * -s + a3 * c;
        return out;
    }

    static lookAt(out, target, center, up) {
        let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
        const targetX = target[0];
        const targetY = target[1];
        const targetZ = target[2];
        const upX = up[0];
        const upY = up[1];
        const upZ = up[2];
        const centerX = center[0];
        const centerY = center[1];
        const centerZ = center[2];

        const EPSILON = 0.00001;

        if (Math.abs(targetX - centerX) < EPSILON &&
            Math.abs(targetY - centerY) < EPSILON &&
            Math.abs(targetZ - centerZ) < EPSILON) {
            return identity();
        }

        z0 = targetX - centerX;
        z1 = targetY - centerY;
        z2 = targetZ - centerZ;

        len = 1 / Math.hypot(z0, z1, z2);
        z0 *= len;
        z1 *= len;
        z2 *= len;

        x0 = upY * z2 - upZ * z1;
        x1 = upZ * z0 - upX * z2;
        x2 = upX * z1 - upY * z0;
        len = Math.hypot(x0, x1, x2);
        if (!len) {
            x0 = 0;
            x1 = 0;
            x2 = 0;
        } else {
            len = 1 / len;
            x0 *= len;
            x1 *= len;
            x2 *= len;
        }

        y0 = z1 * x2 - z2 * x1;
        y1 = z2 * x0 - z0 * x2;
        y2 = z0 * x1 - z1 * x0;

        len = Math.hypot(y0, y1, y2);
        if (!len) {
            y0 = 0;
            y1 = 0;
            y2 = 0;
        } else {
            len = 1 / len;
            y0 *= len;
            y1 *= len;
            y2 *= len;
        }
        
        out[0] = x0;
        out[1] = y0;
        out[2] = z0;
        out[3] = 0;
        out[4] = x1;
        out[5] = y1;
        out[6] = z1;
        out[7] = 0;
        out[8] = x2;
        out[9] = y2;
        out[10] = z2;
        out[11] = 0;
        out[12] = -(x0 * targetX + x1 * targetY + x2 * targetZ);
        out[13] = -(y0 * targetX + y1 * targetY + y2 * targetZ);
        out[14] = -(z0 * targetX + z1 * targetY + z2 * targetZ);
        out[15] = 1;

        return out;
    }

    static perspective(out, fovy, aspect, near, far) {
        let f = 1.0 / Math.tan(fovy / 2), nf;
        out[0] = f / aspect;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = f;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[11] = -1;
        out[12] = 0;
        out[13] = 0;
        out[15] = 0;
        if (far != null && far !== Infinity) {
          nf = 1 / (near - far);
          out[10] = (far + near) * nf;
          out[14] = (2 * far * near) * nf;
        } else {
          out[10] = -1;
          out[14] = -2 * near;
        }
        return out;
      }
}