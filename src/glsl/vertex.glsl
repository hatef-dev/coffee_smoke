vec2 rotate2D(vec2 value, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(
        c, s,
        -s,  c
    ) * value;
}

uniform float uTime;
uniform sampler2D uPerlinNoise;

// varying means that we can send this to the fragment shader
varying vec2 vUv;



void main() {
    vec3 newPosition = position; 

    float twinPelin = texture(uPerlinNoise, vec2(0.5, uv.y * 0.25 - uTime * 0.005)).r;

    float angle = twinPelin * 10.0;
    newPosition.xz = rotate2D(newPosition.xz, angle);



    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    // we send uv to the fragment shader
    vUv = uv;
}