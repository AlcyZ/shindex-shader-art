<template>
    <b-container>
        <b-row>
            <b-col cols="1">
                <b-button variant="outline-dark" @click="compile">
                    <i class="material-icons">
                        play_arrow
                    </i>
                </b-button>
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

    button.btn {
        display: flex;
    }
</style>

<script lang="ts">
    import CodeMirror from 'codemirror';
    import initialContent from '../../shader/fragment/fa_initial.glsl';
    import {removeGLSLIfyStr} from '../../utility/helper';

    export default {
        data: function () {
            return {
                editor: null,
                iPoints: this.points
            }
        },
        methods: {
            compile() {
                this.$emit('compile', {
                    fShader: this.editor.getValue()
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
