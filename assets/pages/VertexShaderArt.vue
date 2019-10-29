<template>
    <b-container class="mt-3" fluid>
        <b-row>
            <b-col>
                <Editor initial-content="Todo: load in component" :points="points" v-on:compile="compile"></Editor>
            </b-col>
            <b-col>
                <div class="canvas-container"></div>
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
            points: 1,

            gl: null,
            canvas: null,

            fShader: null
        }),
        components: {
            Editor,
        },
        methods: {
            compile(event): void {
                console.log(event);

                this.points = event.points;
                this.asd();
            },
            asd(): void {
                resizeCanvas(this.canvas);
                this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
                this.gl.drawArrays(this.gl.POINTS, 0, this.points);
            },
            foo() {


            }
        },
        mounted(): void {
            this.canvas = document.createElement('canvas');
            this.canvas.setAttribute('id', 'magic');
            document.querySelector('.canvas-container').appendChild(this.canvas);
            this.gl = this.canvas.getContext('webgl2');

            const vShader = setupShader(this.gl, vShaderSrc, this.gl.VERTEX_SHADER);
            this.fShader = setupShader(this.gl, fShaderSrc, this.gl.FRAGMENT_SHADER);

            const program = setupProgram(this.gl, vShader, this.fShader);
            this.gl.useProgram(program);
            this.asd();
        }
    }
</script>