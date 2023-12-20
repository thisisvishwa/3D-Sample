#version 300 es

// Standard vertex shader attributes for position, normal and texture coordinates
in vec3 position;
in vec3 normal;
in vec2 uv;

// Uniforms for model, view and projection matrices
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

// Varyings to pass data to the fragment shader
out vec3 vNormal;
out vec2 vUv;

void main() {
    // Pass the normal and UV to the fragment shader
    vNormal = normal;
    vUv = uv;

    // Calculate the position of the vertex in clip space
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}