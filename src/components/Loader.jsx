import React, { useEffect, useState } from "react";
import { Html, useProgress } from "@react-three/drei";

export const Loader = () => {
  const { progress } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    setDisplayProgress(progress);
  }, [progress]);

  return (
    <Html fullscreen>
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm transition-all duration-300">
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-ping rounded-full bg-white/30 transition-all duration-1000"></div>
          <div className="relative flex h-24 w-24 animate-spin items-center justify-center rounded-full border-b-2 border-t-2 border-white transition-all duration-300">
            <div className="h-16 w-16 rounded-full border-4 border-white/20 border-r-white/80 transition-all duration-300"></div>
          </div>
          <div className="absolute inset-0 animate-pulse rounded-full bg-white/10 blur-xl transition-all duration-1000"></div>
        </div>
        <div className="w-64 bg-white/10 rounded-full h-2 mb-2 overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-300 ease-out rounded-full"
            style={{ width: `${displayProgress}%` }}
          ></div>
        </div>
        <div className="text-white font-medium text-sm">
          {Math.round(displayProgress)}%
        </div>
      </div>
    </Html>
  );
};