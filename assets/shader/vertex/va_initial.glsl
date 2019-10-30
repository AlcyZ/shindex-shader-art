#version 300 es

uniform float time;
out vec4 v_color;

void main() {
    int id = gl_VertexID;

    float a = 3.;

    float x = mod(float(id), a);
    float y = floor(float(id) / a);

    float u = x / a * (sin(time));
    float v = y / a * (sin(time));

    gl_Position = vec4(u, v, 0, 1);
    gl_PointSize = 10.;
    v_color = vec4(1, 1, 1, 1);
}
