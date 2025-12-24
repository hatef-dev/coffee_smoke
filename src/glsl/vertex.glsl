mat2 rotate2D(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(
        c, -s,
        s,  c
    );
}


// varying means that we can send this to the fragment shader
varying vec2 vUv;



void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    // we send uv to the fragment shader
    vUv = uv;
}