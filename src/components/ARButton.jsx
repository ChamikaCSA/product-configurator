import React from "react";
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
        <div className="mt-8 px-6 pb-6">
            <button
                className="focus:outline-none w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-700 hover:to-indigo-700 shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                onClick={handleARClick}
            >
                <div className="flex justify-center items-center">
                    <div className="mr-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 11C21 7.5 19 4.5 16 3L16 19C19 17.5 21 14.5 21 11Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 3C14.4 2.2 12.7 1.8 11 2C6.6 2.5 3 6.5 3 11C3 15.5 6.6 19.5 11 20C12.7 20.2 14.4 19.8 16 19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className="text-white text-center text-base font-medium md:text-xl">View in Augmented Reality</div>
                </div>
            </button>
        </div>
    );
};