// #version 330 core
// in vec4 mvp;
// out vec4 color;

// void main(){
//     // Output color = color specified in the vertex shader,
//     // interpolated between all 3 surrounding vertices
//     // color = mvp;
//     color = mvp;
// }

#version 330 core
out vec3 color;

void main() {
    color = vec3(1, 0, 0);
}