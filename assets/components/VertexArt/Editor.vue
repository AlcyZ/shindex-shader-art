<template>
    <b-container>
        <b-row>
            <b-col>
                <input v-model="iPoints" min="1" max="100000" type="range" class="form-control">
            </b-col>
            <b-col cols="2">
                <input v-model="iPoints" type="text" class="form-control">
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <input type="range" class="form-control">
            </b-col>
            <b-col cols="2">
                <input v-model="iPoints" disabled type="text" class="form-control">
            </b-col>
        </b-row>

        <b-row>
            <b-col cols="1">
                <b-button variant="outline-dark" @click="compile">C</b-button>
            </b-col>
        </b-row>

        <b-row class="mt-2">
            <b-col>
                <div class="editor"></div>
            </b-col>
        </b-row>
    </b-container>
</template>

<style scoped lang="scss">
    input.form-control {
        text-align: center;
    }
</style>

<script lang="ts">
    import CodeMirror from 'codemirror';
    import initialContent from '../../shader/vertex/va_initial.glsl';
    import {removeGLSLIfyStr} from '../../utility/helper';

    export default {
        data: function () {
            return {
                editor: null,
                iPoints: this.points
            }
        },
        props: {
            points: {
                required: true,
                type: Number|String,

            }
        },
        watch: {
            iPoints(newVal) {
                this.$emit('points', newVal);
            }
        },
        methods: {
            compile() {
                this.$emit('compile', {
                    vShader: this.editor.getValue()
                });
            }
        },
        mounted(): void {
            const editorSelector = document.querySelector(".editor");
            this.editor = CodeMirror(<HTMLElement>editorSelector, {
                value: removeGLSLIfyStr(initialContent),
                mode: "x-shader/x-vertex",
                lineNumbers: true
            });
        }
    }
</script>
