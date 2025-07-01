import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create the context
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// API base URL
export const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

// API utility function
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }

  return data;
};

// UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize authentication state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        try {
          // Verify token is still valid by fetching user profile
          const userData = await apiCall("/api/auth/me");
          setUser(userData);
          setToken(storedToken);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Token validation failed:", error);
          // Clear invalid tokens
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
          setToken(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      setLoading(true);
      const data = await apiCall("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      // Store token and user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      setLoading(true);
      const data = await apiCall("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      // Store token and user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      
      return data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("rememberMe");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      const data = await apiCall("/api/auth/profile", {
        method: "PUT",
        body: JSON.stringify(profileData),
      });

      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      return data;
    } catch (error) {
      console.error("Profile update error:", error);
      throw error;
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    try {
      const userData = await apiCall("/api/auth/me");
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error("Refresh user error:", error);
      throw error;
    }
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if user is admin
  const isAdmin = () => {
    return hasRole("admin");
  };

  // Check if user is verified (KYC)
  const isVerified = () => {
    return user?.kycVerified === true;
  };

  // Get user's full name
  const getFullName = () => {
    return user?.Fullname || "";
  };

  // Get user's initials for avatar
  const getInitials = () => {
    const name = getFullName();
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Context value
  const value = {
    // State
    user,
    token,
    loading,
    isAuthenticated,
    
    // Auth functions
    login,
    signup,
    logout,
    
    // User functions
    updateProfile,
    refreshUser,
    
    // Utility functions
    hasRole,
    isAdmin,
    isVerified,
    getFullName,
    getInitials,
    
    // API utility for components that need it
    apiCall: (endpoint, options) => apiCall(endpoint, options),
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Higher-order component for protected routes
export const withAuth = (Component) => {
  return function AuthenticatedComponent(props) {
    const { isAuthenticated, loading } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        navigate("/login");
      }
    }, [isAuthenticated, loading, navigate]);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
};

// Higher-order component for admin-only routes
export const withAdminAuth = (Component) => {
  return function AdminAuthenticatedComponent(props) {
    const { isAuthenticated, isAdmin, loading } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
      if (!loading) {
        if (!isAuthenticated) {
          navigate("/login");
        } else if (!isAdmin()) {
          navigate("/dashboard"); // Redirect non-admins to dashboard
        }
      }
    }, [isAuthenticated, loading, navigate]);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (!isAuthenticated || !isAdmin()) {
      return null;
    }

    return <Component {...props} />;
  };
};