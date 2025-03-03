import sky from '../assets/footprint_court_2k.hdr'
import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react';

const rgbeLoader = new RGBELoader();

export const useEquirectangularHDR = () => {
    const { gl } = useThree();
    const [hdrTexture, setHdrTexture] = useState(null);

    useEffect(() => {
        const pmremGenerator = new THREE.PMREMGenerator(gl);
        pmremGenerator.compileEquirectangularShader();

        rgbeLoader.load(sky, (texture) => {
            const hdrCubeRenderTarget = pmremGenerator.fromEquirectangular(texture);
            texture.dispose();
            pmremGenerator.dispose();
            setHdrTexture(hdrCubeRenderTarget.texture);
        });
    }, [gl]);

    return hdrTexture;
};

export const useRenderedSky = () => {
    const { scene, gl } = useThree();
    const [skyTexture, setSkyTexture] = useState(null);

    useEffect(() => {
        const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(512, {
            format: THREE.RGBFormat,
            generateMipmaps: true,
            minFilter: THREE.LinearMipmapLinearFilter
        });
        const cubeCamera = new THREE.CubeCamera(0.001, 100, cubeRenderTarget);
        scene.add(cubeCamera);

        cubeCamera.position.y = 3.5;
        cubeCamera.position.z = -20.0;
        cubeCamera.update(gl, scene);

        setSkyTexture(cubeRenderTarget.texture);

        return () => {
            cubeRenderTarget.dispose();
            scene.remove(cubeCamera);
        };
    }, [scene, gl]);

    return skyTexture;
}