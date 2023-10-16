// #version 330 core
// layout (location = 0) in vec3 aPos;
// layout(location = 1) in vec3 vertexColor;
// uniform mat4 MVP;
// uniform vec4 myUniform;

// out vec3 fragmentColor;
// out vec4 mvp;

// void main()
// {
//     gl_Position = MVP * vec4(aPos, 1.0);
//     fragmentColor = vertexColor;
//     mvp = myUniform;
// };

#version 330 core
layout(location = 0) in vec3 model;

void main() {
    gl_Position.xyz = model;
    gl_Position.w = 1.0;
}