import React, { useEffect, useRef, useState } from 'react'
import { OrbitControls } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const CameraControl = () => {
    const { scene, camera } = useThree();
    const orbitControls = useRef(null);
    const [animationComplete, setAnimationComplete] = useState(false);
    const animationRef = useRef({
        startTime: null,
        duration: 2000,
        initialPosition: null,
        targetPosition: null,
        initialTarget: null,
        targetCenter: null,
        easing: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1
    });

    useEffect(() => {
        const box = new THREE.Box3().setFromObject(scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3()).length();

        camera.near = size / 200;
        camera.far = size * 100;
        camera.fov = 54;

        const targetPosition = new THREE.Vector3();
        targetPosition.copy(center);
        targetPosition.x += -size / 2;
        targetPosition.y += size / 3;
        targetPosition.z += size / 1.8;

        const initialPosition = new THREE.Vector3();
        initialPosition.copy(targetPosition);
        initialPosition.z += size;
        initialPosition.y += size / 2;

        animationRef.current.startTime = Date.now();
        animationRef.current.initialPosition = initialPosition;
        animationRef.current.targetPosition = targetPosition;
        animationRef.current.initialTarget = new THREE.Vector3().copy(center);
        animationRef.current.targetCenter = new THREE.Vector3().copy(center);

        camera.position.copy(initialPosition);
        camera.updateProjectionMatrix();
        orbitControls.current.target.copy(center);
    }, []);

    useFrame(() => {
        if (animationComplete) return;

        const { startTime, duration, initialPosition, targetPosition,
                initialTarget, targetCenter, easing } = animationRef.current;

        const elapsed = Date.now() - startTime;
        if (elapsed >= duration) {
            camera.position.copy(targetPosition);
            orbitControls.current.target.copy(targetCenter);
            setAnimationComplete(true);
            return;
        }

        const progress = easing(elapsed / duration);

        camera.position.lerpVectors(initialPosition, targetPosition, progress);

        orbitControls.current.target.lerpVectors(initialTarget, targetCenter, progress);
    });

    return (
        <OrbitControls
            ref={orbitControls}
            enableDamping={true}
            dampingFactor={0.05}
            enablePan={false}
            minDistance={0.5}
            maxDistance={15}
            makeDefault
        />
    )
}