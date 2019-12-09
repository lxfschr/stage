import textureShaderVert from 'shaders/texture.vs.glsl';
import textureShaderFrag from 'shaders/texture.fs.glsl';

class Matrix4 extends Float32Array {
    static identity() {
        const mat4 = new Float32Array(16);
        for (let i = 0; i < mat4.length; i+=5) {
            mat4[i] = 1; 
        }
        return mat4;
    }
}

async function Application() {
    const canvas = document.getElementById('surface');
    const gl = canvas.getContext('webgl');

    if (!gl) {
        console.log('WebGL not supportedm, falling back on experimental-webgl');
        gl - canvas.getContext('experimental-webgl');
    }

    if (!gl) {
        console.log('Your browser does not support WebGL');
    }

    canvas.width = 800;//window.innerWidth;
    canvas.height = 600;//window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT, gl.DEPTH_BUFFER_BIT);

    //
    // Create shaders
    //
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, textureShaderVert);
    gl.shaderSource(fragmentShader, textureShaderFrag);

    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error('ERROR compling vertex shader!', gl.getShaderInfoLog(vertexShader));
    }
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error('ERROR compling fragment shader!', gl.getShaderInfoLog(fragmentShader));
    }

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('ERROR linking program!', gl.getProgramInfoLog(program));
        return;
    }
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error('ERROR linking program!', gl.getProgramInfoLog(program));
        return;
    }

    //
    // Create buffer
    //
    const triangleVertices =
    [
        // X, Y      U, V
        0.0, 0.5,    0.4, 0.5,
        -0.5, -0.5,  0.8, 0.9,
        0.5, -0.5,   0.0, 1.0,
    ];

    const triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

    const positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    const texCoordAttribLocation = gl.getAttribLocation(program, 'verTexCoord');
    gl.vertexAttribPointer(
        positionAttribLocation, // Attribute location
        2, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        gl.FALSE,
        4 * Float32Array.BYTES_PER_ELEMENT,// Size of individual vertex
        0 // Offset from the beginning of a single vertex to this attribute
    );
    gl.vertexAttribPointer(
        texCoordAttribLocation, // Attribute location
        2, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        gl.FALSE,
        4 * Float32Array.BYTES_PER_ELEMENT,// Size of individual vertex
        2 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
    );

    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(texCoordAttribLocation);

    //
    // Create Texture
    //
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const imageElement = document.getElementById('texture-image');

    gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
        imageElement);

    // gl.bindTexture(gl.TEXTURE_2D, null);

    //
    // Main render loop
    //
    gl.useProgram(program);

    var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
	var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
	var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');

	var worldMatrix = Matrix4.identity();
	var viewMatrix = Matrix4.identity();
    var projMatrix = Matrix4.identity();



    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
	gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
	gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
    

    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

export default Application;