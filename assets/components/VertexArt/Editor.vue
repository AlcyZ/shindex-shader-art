<template>
    <b-container>
        <b-row>
            <b-col>
                <input v-model="points" min="1" max="100000" type="range" class="form-control">
            </b-col>
            <b-col cols="2">
                <input v-model="points" type="text" disabled class="form-control">
            </b-col>
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

    export default {
        data: () => ({
            editor: null,
            points: 1
        }),
        props: {
            initialContent: {
                required: true,
                type: String
            }
        },
        methods: {
            compile() {
                this.$emit('compile', {
                    points: this.points,
                    vShader: this.editor.getValue()
                });
            }
        },
        mounted(): void {
            const editorSelector = document.querySelector(".editor");
            this.editor = CodeMirror(editorSelector, {
                value: this.initialContent,
                mode: "x-shader/x-vertex",
                lineNumbers: true
            });
        }
    }
</script>
