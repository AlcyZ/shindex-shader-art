<template>
    <b-container class="mt-3" fluid>
        <b-row>
            <b-col>
                <div class="canvas-container"></div>
            </b-col>
            <b-col md="12" lg="6">
                <Editor v-on:points="updatePoints" :points="points" v-on:compile="compile"></Editor>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
    import Editor from '../components/VertexArt/Editor';
    import vShaderSrc from '../shader/vertex/va_initial.glsl';
    import fShaderSrc from '../shader/fragment/va_default.glsl';

    // for testing purposes
    import {resizeCanvas, setupProgram, setupShader} from '../utility/gl';

    export default {
        data: () => ({
            points: 9,
            time: 0,

            gl: null,
            canvas: null,
            fShader: null,
            program: null,
            renderLoop: null
        }),
        components: {
            Editor,
        },
        methods: {
            updatePoints(points): void {
                this.points = points;
            },
            compile(event): void {
                cancelAnimationFrame(this.renderLoop);
                this.time = 0;
                this.prepareShaderProgram(event.vShader);
            },
            prepareShaderProgram(vShaderSrc: string): void {
                const vShader = setupShader(this.gl, vShaderSrc, this.gl.VERTEX_SHADER);
                this.program = setupProgram(this.gl, vShader, this.fShader);

                this.gl.useProgram(this.program);

                const location = this.gl.getUniformLocation(this.program, 'resolution');
                this.gl.uniform2fv(location,
                    new Float32Array([this.canvas.clientWidth, this.canvas.clientHeight]));

                const loop = (): void => {
                    resizeCanvas(this.canvas);
                    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
                    this.gl.drawArrays(this.gl.POINTS, 0, this.points);

                    this.time += 2 / 60;
                    this.gl.uniform1f(
                        this.gl.getUniformLocation(this.program, 'time'),
                        this.time
                    );

                    this.renderLoop = window.requestAnimationFrame(loop)
                };
                loop();
            }
        },
        mounted(): void {
            this.canvas = document.createElement('canvas');
            this.canvas.setAttribute('id', 'magic');
            document.querySelector('.canvas-container').appendChild(this.canvas);
            this.gl = this.canvas.getContext('webgl2');

            this.fShader = setupShader(this.gl, fShaderSrc, this.gl.FRAGMENT_SHADER);

            this.prepareShaderProgram(vShaderSrc);
        }
    }
</script>