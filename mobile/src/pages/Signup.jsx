import React from "react";

export default function Signup() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-lg bg-white">
        {/* Top blue section with curved bottom (SVG) */}
        <div className="relative bg-[#6495ED] h-48 flex flex-col items-center justify-center">
          {/* Welcome Text */}
          <div className="flex flex-col items-center justify-center mt-10 text-center px-4">
            <h2 className="text-2xl font-bold text-white">Create Account</h2>
            <p className="text-white text-sm mt-1">Sign up to get started</p>
          </div>
          {/* SVG Curve */}
          <svg
            className="absolute bottom-0 left-0 w-full"
            height="50"
            viewBox="0 0 400 50"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C100,50 300,50 400,0 L400,50 L0,50 Z" />
          </svg>
        </div>

<br />
        {/* Form section overlapping the curve */}
        <div className="px-6 pt-6 pb-4 -mt-8">
          <form className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-800 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#6495ED]"
                  placeholder="Enter your name"
                />
                <span className="absolute right-3 top-2.5 text-gray-400">
                  {/* User Icon */}
                  <svg width="20" height="20" fill="none">
                    <circle cx="10" cy="7" r="4" fill="#a3a3a3" />
                    <rect x="3" y="13" width="14" height="5" rx="2.5" fill="#a3a3a3" />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <label className="block font-semibold text-gray-800 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#6495ED]"
                  placeholder="Enter your email"
                />
                <span className="absolute right-3 top-2.5 text-gray-400">
                  {/* Mail Icon */}
                  <svg width="20" height="20" fill="none">
                    <path
                      d="M2 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2l-8 5-8-5V4zm0 3.5l8 5 8-5v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8z"
                      fill="#a3a3a3"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <label className="block font-semibold text-gray-800 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#6495ED]"
                  placeholder="Create a password"
                />
                <span className="absolute right-3 top-2.5 text-gray-400">
                  {/* Key Icon */}
                  <svg width="20" height="20" fill="none">
                    <path
                      d="M10.1 16.1a5 5 0 1 0-4.2-4.2A5 5 0 0 0 10.1 16.1zm0-8.6A3.6 3.6 0 1 1 6.5 11 3.6 3.6 0 0 1 10.1 7.5zm4.4 4.6a1 1 0 1 0-1 1v2a1 1 0 1 0 1-1v-2z"
                      fill="#a3a3a3"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <label className="block font-semibold text-gray-800 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#6495ED]"
                  placeholder="Confirm your password"
                />
                <span className="absolute right-3 top-2.5 text-gray-400">
                  {/* Key Icon */}
                  <svg width="20" height="20" fill="none">
                    <path
                      d="M10.1 16.1a5 5 0 1 0-4.2-4.2A5 5 0 0 0 10.1 16.1zm0-8.6A3.6 3.6 0 1 1 6.5 11 3.6 3.6 0 0 1 10.1 7.5zm4.4 4.6a1 1 0 1 0-1 1v2a1 1 0 1 0 1-1v-2z"
                      fill="#a3a3a3"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="flex-1 bg-[#6495ED] text-white rounded-full py-2 font-semibold shadow-md hover:bg-blue-700 transition-all"
              >
                Sign up
              </button>
            </div>
            <div className="text-center mt-2">
              <span className="text-gray-700 text-sm">Already have an account? </span>
              <a href="#" className="text-[#6495ED] text-sm font-semibold hover:underline">
                Log in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}