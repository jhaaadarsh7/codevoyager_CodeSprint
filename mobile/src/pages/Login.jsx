import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token and user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Optional: Handle remember me functionality
      if (formData.rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      console.log("Login successful:", data);
      
      // Redirect to dashboard or home page
      navigate("/dashboard"); // Adjust route as needed
      
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="w-full h-screen bg-white flex flex-col">
        {/* Top blue section with curved bottom (SVG) */}
        <div className="relative bg-[#2563eb] h-70 flex flex-col items-center justify-center flex-shrink-0">
          {/* Top bar (time, signal, battery) */}
          <div className="absolute top-2 left-0 w-full flex justify-between items-center px-4 text-xs text-black">
            <div className="flex items-center">
              <div className="bg-blue-500 text-white rounded-lg px-2 py-0.5 font-bold">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
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
            <h1 className="text-4xl font-bold text-white">Welcome Back</h1>
            <p className="text-white text-sm mt-1">
              Sign in to your account
              <br />
              to continue
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
        <br /> <br /> 

        {/* Content area - scrollable */}
        <div className="flex-1 overflow-y-auto">
          {/* Login Form */}
          <div className="px-6 pt-2 pb-4">
            {/* Centered Section Header */}
            <div className="flex items-center justify-center space-x-2 mb-3 mt-2">
              <svg width="22" height="22" fill="none">
                <circle cx="11" cy="7" r="4" fill="#333" />
                <rect x="4" y="14" width="14" height="6" rx="3" fill="#333" />
              </svg>
              <span className="font-bold text-gray-800 text-base">Account Login</span>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block text-sm text-gray-700 mb-1 font-medium">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                  />
                  <span className="absolute right-3 top-2.5 text-gray-400">
                    <svg width="20" height="20" fill="none">
                      <path
                        d="M2 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2l-8 5-8-5V4zm0 3.5l8 5 8-5v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8z"
                        fill="#a3a3a3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              
              <div className="mb-2">
                <label className="block text-sm text-gray-700 mb-1 font-medium">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] pr-10"
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M14.12 14.12l1.415 1.415M8.464 8.464l-1.415-1.415m7.071 7.071l1.415 1.415"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#2563eb] bg-gray-100 border-gray-300 rounded focus:ring-[#2563eb] focus:ring-2"
                    disabled={loading}
                  />
                  <label htmlFor="rememberMe" className="text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-[#2563eb] hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-full py-2 font-semibold shadow-md transition-all mb-4 ${
                  loading
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-[#2563eb] text-white hover:bg-blue-700"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>

              <br />
              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="mx-3 text-gray-400 text-sm">or</span>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>

              <div className="text-center">
                <span className="text-sm text-gray-600">Don't have an account? </span>
                <a href="/signup" className="text-sm text-[#2563eb] font-semibold hover:underline">
                  Create new account
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}