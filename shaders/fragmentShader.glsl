#version 300 es

precision highp float;

// Uniforms that can be set by JavaScript code
uniform sampler2D texture_diffuse;
uniform sampler2D texture_normal;
uniform sampler2D texture_specular;
uniform vec3 lightPosition;
uniform vec3 cameraPosition;

// Varyings received from the vertex shader
in vec2 vUv;
in vec3 vNormal;
in vec3 vPosition;

// Specular calculation function
float calculateSpecular(vec3 lightDir, vec3 viewDir, vec3 normal) {
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
    return spec;
}

// Main fragment shader function
void main() {
    // Texture color
    vec4 texColor = texture(texture_diffuse, vUv);

    // Lighting calculations
    vec3 lightDir = normalize(lightPosition - vPosition);
    vec3 viewDir = normalize(cameraPosition - vPosition);
    vec3 normal = normalize(vNormal);

    // Diffuse light intensity
    float diff = max(dot(normal, lightDir), 0.0);

    // Specular light intensity
    float spec = calculateSpecular(lightDir, viewDir, normal);

    // Specular texture
    vec3 specColor = texture(texture_specular, vUv).rgb;

    // Final color calculation
    vec4 finalColor = vec4((diff * texColor.rgb) + (spec * specColor), texColor.a);

    // Output the color
    gl_FragColor = finalColor;
}