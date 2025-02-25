import React from 'react';
import { useStore } from '../store';
import { QRCodeCanvas } from 'qrcode.react';

export const QRCodePopup = () => {
    const showQRCode = useStore((state) => state.showQRCode);
    const setShowQRCode = useStore((state) => state.setShowQRCode);
    const qrCodeUrl = useStore((state) => state.qrCodeUrl);

    if (!showQRCode) return null;

    return (
        <div className="absolute w-screen h-screen flex justify-center items-center z-50">
            <div className="flex w-11/12 max-w-4xl md:w-4/5 lg:w-3/4 xl:w-2/3 shadow-2xl">
                <div className="w-1/2 flex flex-col items-center justify-center bg-white p-8 space-y-6 rounded-tl-3xl rounded-bl-3xl">
                    <div className="w-full max-w-[256px]">
                        <QRCodeCanvas value={qrCodeUrl} size={256} className="w-full h-auto" />
                    </div>
                    <p className="font-popp text-sm text-center text-gray-600 max-w-sm">
                        Works in ARKit supported iOS devices and ARCore supported Android devices
                    </p>
                </div>
                <div className="w-1/2 flex flex-col bg-gradient-to-br from-indigo-900 to-indigo-800 p-8 rounded-tr-3xl rounded-br-3xl">
                    <button 
                        className="self-end p-2 hover:bg-white/10 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/20" 
                        onClick={() => setShowQRCode(false)}
                        aria-label="Close QR code popup"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="h-full flex flex-col justify-center space-y-8 mt-4">
                        <div className="space-y-2">
                            <h2 className="font-popp text-white text-2xl font-bold md:text-3xl lg:text-4xl leading-tight">
                                You're one step away from the magic!
                            </h2>
                            <div className="h-1 w-20 bg-white/30 rounded"></div>
                        </div>
                        <p className="font-popp text-white/90 text-base md:text-lg leading-relaxed">
                            Scan the QR code with your smartphone or tablet to experience it in Augmented Reality.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};