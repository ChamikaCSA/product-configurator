import { useGLTF, useTexture } from '@react-three/drei';
import React, { useRef } from 'react';
import { useEquirectangularHDR } from '../utils/SkyBox';
import { GLTFLoader } from 'three/addons';
import * as THREE from 'three';
import { CameraControl } from './CameraControl';

const gltfLoader = new GLTFLoader();
import ao from '../assets/ao.png';
import { ConfigurableObject } from './ConfigurableObject';

const pathname = window.location.pathname;
const singer = pathname === "/triton-sofa-single-seater";
const singerThree = pathname === "/triton-sofa-three-seater";
const aoPath = ao;

const Configurator = () => {
    const { nodes, animations, materials } = useGLTF(singer ? '/OneSeater.glb' : singerThree ? '/ThreeSeater.glb' : '/chair_citizen.glb', gltfLoader);
    const skybox = useEquirectangularHDR();

    const aoTexture = useTexture(aoPath);
    aoTexture.flipY = false;
    aoTexture.colorSpace = THREE.NoColorSpace;

    for (const key in materials) {
        const material = materials[key];

        if (material) {
            material.envMap = skybox;
            material.envMapIntensity = 1.2;

            if(!singer && !singerThree) {
                // material.aoMap = aoTexture;
                // material.aoMapIntensity = 1;
            }

            if (material.map) {
                material.map.colorSpace = THREE.SRGBColorSpace;
            }
        }
    }

    if (nodes.citizen_base) {
        nodes.citizen_base.material.metalness = 1.0;
        nodes.citizen_base.material.roughness = 0.46;
    }

    return (
        <group position={[0, -0.4, 0]}>
            <ambientLight />
            <directionalLight position={[3.4, 7.27, 8.34]} intensity={0.05} />
            <ConfigurableObject nodes={nodes} materials={materials} />
            <CameraControl />
        </group>
    );
};

export { Configurator };