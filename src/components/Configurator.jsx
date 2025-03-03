import { useGLTF, useTexture } from '@react-three/drei';
import React, { useRef, useEffect, useState, Suspense, useCallback } from 'react';
import { useEquirectangularHDR } from '../utils/SkyBox';
import { GLTFLoader } from 'three/addons';
import * as THREE from 'three';
import { CameraControl } from './CameraControl';
import { getModelUrl } from '../utils/s3Client';
import { Loader } from './Loader';

const gltfLoader = new GLTFLoader();
import ao from '../assets/ao.png';
import { ConfigurableObject } from './ConfigurableObject';

const pathname = window.location.pathname;
const singer = pathname === "/triton-sofa-single-seater";
const singerThree = pathname === "/triton-sofa-three-seater";
const aoPath = ao;

const TextureLoader = ({ onTexturesLoaded }) => {
    const aoTexture = useTexture(aoPath);
    const skybox = useEquirectangularHDR();

    useEffect(() => {
        if (aoTexture && skybox) {
            aoTexture.flipY = false;
            aoTexture.colorSpace = THREE.NoColorSpace;
            onTexturesLoaded({ aoTexture, skybox });
        }
    }, [aoTexture, skybox, onTexturesLoaded]);

    if (!aoTexture || !skybox) return null;
    return null;
};

const TexturedModel = ({ nodes, materials }) => {
    const [textures, setTextures] = useState(null);

    const handleTexturesLoaded = useCallback(({ aoTexture, skybox }) => {
        setTextures({ aoTexture, skybox });
    }, []);

    useEffect(() => {
        if (!textures) return;

        for (const key in materials) {
            const material = materials[key];

            if (material) {
                material.envMap = textures.skybox;
                material.envMapIntensity = 1.2;

                if(!singer && !singerThree) {
                    // material.aoMap = textures.aoTexture;
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
    }, [textures, materials, nodes]);

    return (
        <>
            <TextureLoader onTexturesLoaded={handleTexturesLoaded} />
            {textures && (
                <group position={[0, -0.4, 0]}>
                    <ambientLight />
                    <directionalLight position={[3.4, 7.27, 8.34]} intensity={0.05} />
                    <ConfigurableObject nodes={nodes} materials={materials} />
                    <CameraControl />
                </group>
            )}
        </>
    );
};

const ModelWithMaterials = ({ modelUrl }) => {
    const { nodes, animations, materials } = useGLTF(modelUrl, gltfLoader);
    return <TexturedModel nodes={nodes} materials={materials} />;
};

const Configurator = () => {
    const [modelUrl, setModelUrl] = useState(null);

    useEffect(() => {
        const loadModelUrl = async () => {
            try {
                const modelKey = singer ? 'OneSeater.glb' : singerThree ? 'ThreeSeater.glb' : 'chair_citizen.glb';
                const url = await getModelUrl(modelKey);
                setModelUrl(url);
            } catch (error) {
                console.error('Error loading model URL:', error);
            }
        };
        loadModelUrl();
    }, [singer, singerThree]);

    return (
        <Suspense fallback={<Loader />}>
            {modelUrl && <ModelWithMaterials modelUrl={modelUrl} />}
        </Suspense>
    );
};

export { Configurator };