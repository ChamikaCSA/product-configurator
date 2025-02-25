import React from 'react';
import { useStore } from '../store';

export const ARButton = () => {
    const setShowQRCode = useStore((state) => state.setShowQRCode);
    const setQRCodeUrl = useStore((state) => state.setQRCodeUrl);
    const color = useStore((state) => state.color);
    const pathname = window.location.pathname;

    const isIPhoneDevice = /iPhone/g.test(navigator.userAgent);
    const isAndroidDevice = /android/i.test(navigator.userAgent);
    const isIPadDevice = /iPad/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    const device = isIPhoneDevice ? "iphone" : isAndroidDevice ? "android" : isIPadDevice ? "ipad" : "device";
    const isSingleSeater = pathname === "/triton-sofa-single-seater";
    const isThreeSeater = pathname === "/triton-sofa-three-seater";

    const androidModels = {
        singleSeater: {
            gray: "grayoneseater.glb",
            yellow: "yellowoneseater.glb"
        },
        threeSeater: {
            gray: "graythreeseater.glb",
            yellow: "yellowthreeseater.glb"
        }
    };

    const iosModels = {
        singleSeater: {
            gray: "oneseatergray.usdz",
            yellow: "oneseateryellow.usdz"
        },
        threeSeater: {
            gray: "graythreeseater.usdz",
            yellow: "yellowthreeseater.usdz"
        }
    };

    const handleARClick = () => {
        if (device === 'device') {
            const modelFileName = isSingleSeater
                ? color === 0 ? iosModels.singleSeater.gray : iosModels.singleSeater.yellow
                : isThreeSeater
                    ? color === 0 ? iosModels.threeSeater.gray : iosModels.threeSeater.yellow
                    : iosModels.singleSeater.gray;
            const url = `${window.location.origin}/${modelFileName}`;
            setQRCodeUrl(url);
            setShowQRCode(true);
            return;
        }

        if (device === 'android') {
            const modelFileName = isSingleSeater
                ? color === 0 ? androidModels.singleSeater.gray : androidModels.singleSeater.yellow
                : isThreeSeater
                    ? color === 0 ? androidModels.threeSeater.gray : androidModels.threeSeater.yellow
                    : androidModels.singleSeater.gray;
            const url = `intent://arvr.google.com/scene-viewer/1.0?file=${window.location.origin}/${modelFileName}&mode=ar_only#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;end;`;
            window.location.href = url;
            return;
        }
    };

    return (
        <button
            onClick={handleARClick}
            className="group w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="View in Augmented Reality"
        >
            <div className="flex items-center justify-center space-x-2">
                <svg
                    className="w-6 h-6 text-white/90 group-hover:text-white transition-colors duration-200"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                    />
                </svg>
                <span className="font-medium text-white group-hover:text-white transition-colors duration-200">
                    View in AR
                </span>
            </div>
        </button>
    );
};