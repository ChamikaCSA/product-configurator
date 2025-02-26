import { useGLTF, useTexture } from '@react-three/drei';
import React from 'react';
import { OrbitControls } from '@react-three/drei';
import { useEquirectangularHDR } from '../utils/SkyBox';
import { GLTFLoader } from 'three/addons';

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

    const aoMap = useTexture(aoPath);
    aoMap.flipY = false;

    for (const key in materials) {
        const material = materials[key];

        if (material) {
            material.envMap = skybox;
           if(!singer && !singerThree) {material.aoMap = aoMap;};
        }
    }

    if (nodes.citizen_base) {
        nodes.citizen_base.material.metalness = 1.0;
        nodes.citizen_base.material.roughness = 0.46;
    }

    return (
        <group>
            <ambientLight />
            <directionalLight position={[3.4, 7.27, 8.34]} intensity={0.05} />
            <ConfigurableObject nodes={nodes} materials={materials} />
            <OrbitControls enablePan={false} minDistance={2} maxDistance={10} />
        </group>
    );
};

export { Configurator };