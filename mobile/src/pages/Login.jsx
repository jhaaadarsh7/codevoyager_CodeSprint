import React from "react";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-lg bg-white">
        {/* Top blue section with curved bottom (SVG) */}
        <div className="relative bg-[#6495ED] h-48 flex flex-col items-center justify-center">
          {/* Welcome Text */}
          <div className="flex flex-col items-center justify-center mt-10 text-center px-4">
            <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
            <p className="text-white text-sm mt-1">Log in to your account</p>
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
                  placeholder="Enter your password"
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
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="accent-[#6495ED]"
              />
              <label
                htmlFor="remember"
                className="text-[#6495ED] text-sm"
              >
                Remember me
              </label>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="flex-1 bg-[#6495ED] text-white rounded-full py-2 font-semibold shadow-md hover:bg-blue-700 transition-all"
              >
                Sign in
              </button>
            </div>
            <div className="text-center mt-2">
              <a href="#" className="text-[#6495ED] text-sm hover:underline">
                Forget Password?
              </a>
            </div>
          </form>
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-2 text-gray-400 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          <div className="text-center mb-2">
            <a
              href="#"
              className="text-[#6495ED] font-semibold hover:underline"
            >
              Create new account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}