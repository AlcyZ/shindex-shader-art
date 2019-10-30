#version 300 es

precision highp float;

in vec4 v_color;

out vec4 col;

void main() {
//    col = vec4(1, 1, 1, 1);
    col = v_color;
}
