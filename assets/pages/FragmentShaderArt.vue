<template>
    <b-container class="mt-3" fluid>
        <b-row>
            <b-col md="12" lg="6">
                <div class="canvas-container"></div>
            </b-col>
            <b-col md="12" lg="6">
                <Editor v-on:compile="compile"></Editor>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
    import {setupShader, setupProgram, resizeCanvas} from '../utility/gl';
    import Editor from '../components/FragmentArt/Editor';
    import vShaderSrc from '../shader/vertex/fa_default.glsl';
    import fShaderSrc from '../shader/fragment/fa_initial.glsl';

    export default {
        data: () => ({
            canvas: null,
            gl: null,
            vShader: null,
            program: null,
            renderLoop: null
        }),
        components: {
            Editor
        },
        methods: {
            compile(event): void {
                const fShader = setupShader(this.gl, event.fShader, this.gl.FRAGMENT_SHADER);
                cancelAnimationFrame(this.renderLoop);

                this.startGlProgram(fShader);
            },
            startGlProgram(fShader: WebGLShader) {
                this.program = setupProgram(this.gl, this.vShader, fShader);
                this.gl.useProgram(this.program);

                this.gl.uniform2fv(this.gl.getUniformLocation(this.program, 'iResolution'),
                    new Float32Array([this.canvas.width, this.canvas.height])
                );

                let time: number = 0;

                const loop = (): number => {
                    time += 1 / 60;
                    this.gl.uniform1f(
                        this.gl.getUniformLocation(this.program, 'iTime'),
                        time
                    );

                    // console.log(this.renderLoop, this.gl);
                    resizeCanvas(this.canvas);
                    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
                    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
                    this.renderLoop = window.requestAnimationFrame(loop);
                };
                this.renderLoop = loop();
            }
        },
        async mounted(): void {
            this.canvas = document.createElement('canvas');
            this.gl = this.canvas.getContext('webgl2');
            this.vShader = setupShader(this.gl, vShaderSrc, this.gl.VERTEX_SHADER);

            document.querySelector('.canvas-container').append(this.canvas);
            const initFShader: WebGLShader = setupShader(this.gl, fShaderSrc, this.gl.FRAGMENT_SHADER);
            this.startGlProgram(initFShader);
        }
    }
</script>
