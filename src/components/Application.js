import vShaderSource from 'shaders/texture.vs.glsl';
import fShaderSource from 'shaders/texture.fs.glsl';
import Matrix4 from "components/Matrix4";
import MathUtils from "components/MathUtils";
import ShaderUtil from "components/ShaderUtil";
import GLInstance from "components/GLInstance";

async function Application() {
    let width = 600, height = 480;
    // width = window.innerWidth, height = window.innerHeight;
    const gl = GLInstance('surface').fSetSize(width, height).fClear();

    const ELEMENT_TYPE = gl.FLOAT;
    const ELEMENT_IS_NORMALIZED = gl.FALSE;
    const ELEMENT_TYPE_SIZE = Float32Array.BYTES_PER_ELEMENT;
    const VERTEX_STRIDE = 5 * ELEMENT_TYPE_SIZE;
    const NUM_POSITION_VERTICES = 3;
    const NUM_UV_VERTICES = 2;

    const program = ShaderUtil.shaderProgram(gl, vShaderSource, fShaderSource);

    //
    // Create buffer
    //
    const triangleVertices =
    [
        // X, Y, Z        U, V
        0.0, 0.5, 0.0,    0.4, 0.5,
        -0.5, -0.5, 0.0,  0.8, 0.9,
        0.5, -0.5, 0.0,   0.0, 1.0,
    ];

    const triangleVertexBufferObject = gl.fCreateArrayBuffer(new Float32Array(triangleVertices));

    ShaderUtil.enableVertexAttribArray(gl, program, 'vertPosition', 
        NUM_POSITION_VERTICES,
        ELEMENT_TYPE,
        ELEMENT_IS_NORMALIZED,
        VERTEX_STRIDE,
        0 // Offset from the beginning of a single vertex to this attribute)
    );
    
    ShaderUtil.enableVertexAttribArray(gl, program, 'verTexCoord', 
        NUM_UV_VERTICES,
        ELEMENT_TYPE,
        ELEMENT_IS_NORMALIZED,
        VERTEX_STRIDE,
        NUM_POSITION_VERTICES * ELEMENT_TYPE_SIZE // Offset from the beginning of a single vertex to this attribute
    );


    //
    // Create Texture
    //
    const texture = ShaderUtil.createTexture(gl, 
        gl.TEXTURE_2D, // target e.g. TEXTURE_2D, TEXTURE_CUBE_MAP, TEXTURE_3D (WebGL2 only)
        gl.CLAMP_TO_EDGE, // Wrapping function for s e.g. CLAMP_TO_EDGE, REPEAT, MIRRORED_REPEAT 
        gl.CLAMP_TO_EDGE, // Wrapping function for t e.g. CLAMP_TO_EDGE, REPEAT, MIRRORED_REPEAT 
        gl.LINEAR, // Texture minification filter e.g. LINEAR, NEAREST, NEAREST_MIPMAP_NEAREST
        gl.LINEAR // Texture magnification filter LINEAR or NEAREST
    );

    const imageElement = document.getElementById('texture-image');

    gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
        imageElement);

    //
    // Main render loop
    //
    gl.useProgram(program);

    const matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
	const matViewUniformLocation = gl.getUniformLocation(program, 'mView');
	const matProjUniformLocation = gl.getUniformLocation(program, 'mProj');

    let worldMatrix = Matrix4.identity();
	let viewMatrix = new Matrix4();
    let projMatrix = new Matrix4();

    const target = [0, 0, 0];
    const cameraPosition = [0, 0, -5];
    const cameraUp = [0, 1, 0];
    Matrix4.lookAt(viewMatrix, cameraPosition, target, cameraUp);

    Matrix4.perspective(projMatrix, MathUtils.toRadians(45), width / height, 0.1, 1000.0);

    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
	gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
    
    const identityMatrix = Matrix4.identity();
    let angle = 0;
    const loop = () => {
        angle = performance.now() / 1000 / 6 * 2 * Math.PI;
        Matrix4.rotate(worldMatrix, identityMatrix, angle, [0, 1, 0]);
        gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

        gl.clearColor(0.75, 0.85, 0.8, 1.0);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

        gl.drawArrays(gl.TRIANGLES, 0, 3);

        requestAnimationFrame(loop);
    };
    
    requestAnimationFrame(loop);
}

export default Application;