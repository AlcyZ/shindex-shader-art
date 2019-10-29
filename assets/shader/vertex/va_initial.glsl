#version 300 es

void main() {
    int id = gl_VertexID;

    float a = 3.;

    float x = mod(float(id), a);
    float y = floor(float(id) / a);

    float u = x / a;
    float v = y / a;

    gl_Position = vec4(u, v, 0, 1);
    gl_PointSize = 10.;
}
