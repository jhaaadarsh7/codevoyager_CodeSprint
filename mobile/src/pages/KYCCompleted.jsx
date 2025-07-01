import React from "react";

import { useState, useEffect } from "react";

export default function KycCompleted() {
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleBackToHome = () => {
    console.log("Navigating back to home...");
    // Handle navigation logic here
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="w-full h-screen bg-white flex flex-col">
        {/* Top blue section with curved bottom (SVG) */}
        <div className="relative bg-[#2563eb] h-44 flex flex-col items-center justify-center flex-shrink-0">
          {/* Top bar (time, signal, battery) */}
          <div className="absolute top-2 left-0 w-full flex justify-between items-center px-4 text-xs text-black">
            <div className="flex items-center">
              <div className="bg-blue-500 text-white rounded-lg px-2 py-0.5 font-bold">{currentTime}</div>
            </div>
            <div className="flex gap-2 items-center">
              <svg width="20" height="14" fill="none">
                <rect x="2" y="3" width="14" height="8" rx="2" fill="#000" />
              </svg>
              <svg width="18" height="14" fill="none">
                <rect x="2" y="3" width="10" height="8" rx="2" fill="#000" />
              </svg>
              <svg width="16" height="16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="#000" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>
          {/* Title and Subtitle */}
          <div className="flex flex-col items-center justify-center mt-8 text-center px-4">
            <h2 className="text-lg font-bold text-white">Verification Complete</h2>
            <p className="text-white text-xs mt-1">
              Your KYC has been
              <br />
              successfully verified
            </p>
          </div>
          {/* SVG Curve */}
          <svg
            className="absolute bottom-0 left-0 w-full"
            height="32"
            viewBox="0 0 400 32"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C100,32 300,32 400,0 L400,32 L0,32 Z" />
          </svg>
        </div>

        {/* Content Section - Takes remaining space */}
        <div className="flex-1 px-6 pt-8 pb-6 flex flex-col items-center justify-center text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-[#2563eb] rounded-full flex items-center justify-center relative">
              {/* Decorative elements around the circle */}
              <div className="absolute -top-1 -left-1 w-4 h-4 bg-[#2563eb] rounded-full opacity-60"></div>
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-[#2563eb] rounded-full opacity-40"></div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#2563eb] rounded-full opacity-50"></div>
              <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-[#2563eb] rounded-full opacity-30"></div>
              <div className="absolute top-1 -right-3 w-2 h-2 bg-[#2563eb] rounded-full opacity-25"></div>
              <div className="absolute -top-3 left-1 w-3 h-3 bg-[#2563eb] rounded-full opacity-35"></div>
              
              {/* Checkmark */}
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-3">KYC Completed</h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-12 leading-relaxed px-4">
            Thanks for submitting your documents! we'll verify 
            and complete your KYC as soon as possible.
          </p>

          {/* Back to Home Button */}
          <div className="w-full px-2">
            <button
              onClick={handleBackToHome}
              className="w-full bg-[#2563eb] text-white rounded-full py-3 font-semibold shadow-md hover:bg-blue-700 transition-all flex items-center justify-center"
            >
              <svg 
                width="20" 
                height="20" 
                fill="none" 
                viewBox="0 0 24 24" 
                className="mr-2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 18l-6-6 6-6"
                />
              </svg>
              Back to home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}