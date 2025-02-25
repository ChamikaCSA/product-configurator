import React, { useEffect, useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

export const CameraControl = () => {
    const { scene, camera } = useThree();
    const orbitControls = useRef(null);

    useEffect(() => {
        const box = new THREE.Box3().setFromObject(scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3()).length();

        orbitControls.current.maxDistance = size;
        orbitControls.current.minDistance = size * 0.1;
        camera.near = size / 100;
        camera.far = size * 100;
        camera.fov = 54;

        camera.position.copy(center);
        camera.position.x += -size / 2.5;
        camera.position.y += size / 3.5;
        camera.position.z += size / 2.5;
        camera.updateProjectionMatrix();
        orbitControls.current.target.copy(center);
    });

    return (
        <OrbitControls ref={orbitControls} />
    )
}