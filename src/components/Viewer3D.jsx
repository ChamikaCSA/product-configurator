import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { WebGLRenderer } from 'three';
import { Helmet } from 'react-helmet-async';
import { Configurator } from './Configurator';
import { CameraControl } from './CameraControl';
import { Loader } from './Loader';

const Viewer3D = () => {
  return (
    <>
      <Helmet>
        <title>3D Viewer | OGMO</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <div className="fixed inset-0 z-40 bg-white">
          <div className="relative h-full w-full">
            <Canvas
              className="h-full w-full"
              style={{ touchAction: "none" }}
              gl={(props) => new WebGLRenderer({ ...props, antialias: true, alpha: true })}
              dpr={window.devicePixelRatio}
            >
              <Suspense fallback={<Loader />}>
                <Configurator />
              </Suspense>
              <CameraControl />
            </Canvas>
          </div>
        </div>
      </div>
    </>
  );
};

export { Viewer3D };