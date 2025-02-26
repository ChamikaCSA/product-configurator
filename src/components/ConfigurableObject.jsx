import { useStore, data as d, singerData, singerThreeData } from "../store";
import alpha from '../assets/alpha.jpg';
import singeralpha from '../assets/singerAlpha.jpg';
import threeSeaterAlpha from '../assets/threeSeaterAlpha.jpg';
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from 'three';

const pathname = window.location.pathname;
const singer = pathname === "/triton-sofa-single-seater";
const singerThree = pathname === "/triton-sofa-three-seater";
const data = singer ? singerData : singerThree ? singerThreeData : d;
const alphaPath = singer ? singeralpha : singerThree ? threeSeaterAlpha : alpha;
const nodeName = singer ? "single_seater" : singerThree ? "single_seater" : "citizen_base";

const ConfigurableObject = (props) => {
    const alphaMap = useTexture(alphaPath);
    alphaMap.colorSpace = THREE.NoColorSpace;

    const selectedObject = useStore(state => state.selectedObject);
    const selectedType = data.types[selectedObject.typeId];
    const groupRef = useRef();
    const [scale, setScale] = useState(1);
    const [hovering, setHovering] = useState(false);
    const [interacting, setInteracting] = useState(false);
    const interactionTimeoutRef = useRef(null);

    useEffect(() => {
        setScale(0.9);
        setTimeout(() => setScale(1), 200);
    }, [selectedObject]);

    useFrame(({ clock }) => {
        if (groupRef.current && !interacting) {
            const time = clock.elapsedTime;

            const rotationY = Math.sin(time * 0.3) * 0.12;
            groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                rotationY,
                0.025
            );

            const floatOffset = Math.sin(time * 1.2) * 0.035;
            groupRef.current.position.y = THREE.MathUtils.lerp(
                groupRef.current.position.y,
                floatOffset,
                0.03
            );

            const breathingScale = 1 + (hovering ? Math.sin(time * 1.5) * 0.015 : 0);
            const targetScale = scale * breathingScale;
            groupRef.current.scale.setScalar(
                THREE.MathUtils.lerp(
                    groupRef.current.scale.x,
                    targetScale,
                    0.04
                )
            );
        }
    });

    const handleInteractionStart = () => {
        if (interactionTimeoutRef.current) {
            clearTimeout(interactionTimeoutRef.current);
        }
        setInteracting(true);
    };

    const handleInteractionEnd = () => {
        interactionTimeoutRef.current = setTimeout(() => {
            setInteracting(false);
        }, 1000);
    };

    const meshes = selectedType.meshes.map((meshId, index) => {
        const material = (index === 0) ? data.materialTypes[selectedObject.selectedMaterialId0] : data.materialTypes[selectedObject.selectedMaterialId1];
        const color = (index === 0) ? material.colors[selectedObject.selectedColorId0] : material.colors[selectedObject.selectedColorId1];

        return <primitive
            material={props.materials[color]}
            key={"mesh_" + meshId}
            object={props.nodes[meshId]}
            dispose={null}
            onPointerOver={() => setHovering(true)}
            onPointerOut={() => setHovering(false)}
            onPointerDown={handleInteractionStart}
            onPointerUp={handleInteractionEnd}
        />
    });

    const floorMaterial = props.nodes.floor.material;
    floorMaterial.transparent = true;
    floorMaterial.map = alphaMap;
    floorMaterial.alphaMap = alphaMap;
    floorMaterial.needsUpdate = true;

    return (
        <group
            ref={groupRef}
            onPointerDown={handleInteractionStart}
            onPointerUp={handleInteractionEnd}
        >
            {meshes}
            <primitive
                object={props.nodes[nodeName]}
                dispose={null}
                onPointerDown={handleInteractionStart}
                onPointerUp={handleInteractionEnd}
            />
            <primitive
                object={props.nodes.floor}
                position={[0, 0.001, 0]}
                dispose={null}
                onPointerDown={handleInteractionStart}
                onPointerUp={handleInteractionEnd}
            />
        </group>
    );
};

export { ConfigurableObject };