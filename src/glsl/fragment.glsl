uniform sampler2D uPerlinNoise;
uniform float uTime;

// we receive the uv from the vertex shader
varying vec2 vUv;

void main() {

    vec2 smokeUv = vUv;
    smokeUv.y *= 0.3;
    smokeUv.x *= 0.5;
    smokeUv.y +=  -uTime * 0.03;




    // smoke 
    float smoke = texture(uPerlinNoise, smokeUv).r;

    smoke = smoothstep(0.4, 1.0, smoke);

    smoke *= smoothstep(0.0, 0.1, vUv.x);
    smoke *= smoothstep(1.0, 0.9, vUv.x);
    smoke *= smoothstep(0.0, 0.1, vUv.y);
    smoke *= smoothstep(1.0, 0.9, vUv.y);

    // gl_FragColor = vec4(0.6, 0.3, 0.2, smoke);
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}