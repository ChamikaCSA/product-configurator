import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { WebGLRenderer } from 'three';
import { Helmet } from 'react-helmet-async';
import { Configurator } from './components/Configurator';
import { CameraControl } from './components/CameraControl';
import { QRCodePopup } from './components/QRCodePopup';
import { Menu } from './components/Menu';
import { Loader } from './components/Loader';

const pathname = window.location.pathname;
const singer = pathname === "/triton-sofa-single-seater";
const singerThree = pathname === "/triton-sofa-three-seater";

let pageTitle = "3D Product Configurator | OGMO";

if (singer) {
  window.history.replaceState({}, "", '/triton-sofa-single-seater');
  pageTitle = "One Seater Configurator | Singer";
} else if (singerThree) {
  window.history.replaceState({}, "", '/triton-sofa-three-seater');
  pageTitle = "Three Seater Configurator | Singer";
} else {
  window.history.replaceState({}, "", '/');
}

function App() {
  const [fullScreen, setFullScreen] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const isIPhoneDevice = /iPhone/g.test(navigator.userAgent);
  const isAndroidDevice = /android/i.test(navigator.userAgent);
  const isIPadDevice = /iPad/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  const device = isIPhoneDevice ? "iphone" : isAndroidDevice ? "android" : isIPadDevice ? "ipad" : "device";

  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
  };

  const FullScreenButton = () => (
    <button
      className="p-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-200 group"
      onClick={toggleFullScreen}
      aria-label="Toggle fullscreen"
    >
      <svg
        className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors duration-200"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {fullScreen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
          />
        )}
      </svg>
    </button>
  );

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        {showQRCode && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300">
            <QRCodePopup setShowQRCode={setShowQRCode} />
          </div>
        )}
        {fullScreen ? (
          <div className="fixed inset-0 z-40 bg-white">
            <div className="absolute top-6 right-6 z-50">
              <FullScreenButton />
            </div>
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
        ) : (
          <div className="flex flex-col md:grid md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-4 h-screen">
            <div className="relative bg-white shadow-lg transition-all duration-300 ease-in-out md:col-span-3 lg:col-span-2 xl:col-span-3 h-[55vh] md:h-full">
              <div className="absolute left-6 bottom-6 z-20 md:hidden">
                <FullScreenButton />
              </div>
              <div className="absolute top-6 right-6 z-20 hidden md:block">
                <FullScreenButton />
              </div>
              <Canvas
                className="h-full"
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
            <div className="h-[45vh] overflow-auto md:h-full flex-grow bg-white md:col-span-2 lg:col-span-1 xl:col-span-1 md:border-l border-gray-200">
              <div className="h-full overflow-auto">
                <Menu device={device} setShowQRCode={setShowQRCode} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
