import sky from '../assets/footprint_court_2k.hdr'
import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { useThree, useLoader } from '@react-three/fiber'

const rgbeLoader = new RGBELoader();

export const useEquirectangularHDR = () => {
    const { gl } = useThree();
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    pmremGenerator.compileEquirectangularShader();

    const hdrEquirect = useLoader(rgbeLoader, sky);

    const hdrCubeRenderTarget = pmremGenerator.fromEquirectangular(hdrEquirect);
    hdrEquirect.dispose();
    pmremGenerator.dispose();

    return hdrCubeRenderTarget.texture;
};

export const useRenderedSky = () => {
    const { scene, gl } = useThree();

    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(512, { format: THREE.RGBFormat, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter });
    const cubeCamera = new THREE.CubeCamera(0.001, 100, cubeRenderTarget);
    scene.add(cubeCamera);

    cubeCamera.position.y = 3.5
    cubeCamera.position.z = -20.0
    cubeCamera.update(gl, scene);

    return cubeRenderTarget.texture;
}