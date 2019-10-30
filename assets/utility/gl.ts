/*
 * Check https://webgl2fundamentals.org/ !!
 * There is everything explained and i use and adjusted version of the boilerplate code on my own.
 */

const setupShader = (gl: WebGL2RenderingContext, shaderSrc: string, type: GLenum): WebGLShader => {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, shaderSrc);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        let shaderType = 'unknown';
        if (type === gl.VERTEX_SHADER) {
            shaderType = 'vertex';
        }
        if (type === gl.FRAGMENT_SHADER) {
            shaderType = 'fragment';
        }

        const msg = `Failed to compile (${shaderType}) shader.\n${gl.getShaderInfoLog(shader)}`;
        throw new Error(msg);
    }

    return shader;
};

const setupProgram = (gl: WebGL2RenderingContext, vShader: WebGLShader, fShader: WebGLShader): WebGLProgram => {
    const program = gl.createProgram();

    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const msg = `Failed to link shaders into program.\n${gl.getProgramInfoLog(program)}`;
        throw new Error(msg);
    }

    return program;
};

const createSimpleProgram = (gl: WebGL2RenderingContext, vShaderSrc: string, fShaderSrc: string): WebGLProgram => {
    const vShader = setupShader(gl, vShaderSrc, gl.VERTEX_SHADER);
    const fShader = setupShader(gl, fShaderSrc, gl.FRAGMENT_SHADER);

    return setupProgram(gl, vShader, fShader);
};

const resizeCanvas = (canvas: HTMLCanvasElement) => {
    // resize display, otherwise the pixels would blur out
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // Check if the canvas is not the same size.
    if (canvas.width !== displayWidth ||
        canvas.height !== displayHeight) {

        // Make the canvas the same size
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }
};

export {setupShader, setupProgram, createSimpleProgram, resizeCanvas};
