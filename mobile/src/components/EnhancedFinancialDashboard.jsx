import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { financialUtils, dateUtils, kycUtils, roleUtils } from "../contexts/UserContextUtils";
import { 
  Bell, 
  Settings, 
  LogOut, 
  X, 
  Smartphone, 
  Building2, 
  CreditCard, 
  Wallet,
  Hotel,
  ShoppingBag,
  Ticket,
  Plane,
  CheckCircle,
  PlusCircle,
  BarChart3,
  Home,
  History,
  Camera,
  User,
  DollarSign,
  TrendingUp,
  Zap,
  Handshake,
  Star,
  Shield,
  Globe,
  Activity,
  Clock
} from "lucide-react";

export default function EnhancedFinancialDashboard() {
  // Use actual user context
  const { 
    user, 
    getFullName, 
    getInitials, 
    isVerified, 
    isAdmin,
    logout: contextLogout,
    isAuthenticated,
    loading,
    refreshUser 
  } = useUser();
  
  const navigate = useNavigate();
  
  // Current date and time - July 1, 2025 09:20:55 UTC
  const [currentTime, setCurrentTime] = useState(() => {
    const utcTime = new Date('2025-07-01T09:20:55Z');
    return utcTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  });
  
  const [balance] = useState(145789.23); // Updated balance for July 2025
  const [conversionRate, setConversionRate] = useState(134.7); // Updated NPR rate
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentDate] = useState('2025-07-01');

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates from the base time
      const baseTime = new Date('2025-07-01T09:20:55Z');
      const now = new Date(baseTime.getTime() + Date.now() % (24 * 60 * 60 * 1000));
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate real-time rate updates
  useEffect(() => {
    const interval = setInterval(() => {
      setConversionRate(prev => prev + (Math.random() - 0.5) * 0.2);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Handle logout with navigation
  const handleLogout = () => {
    contextLogout();
    navigate("/login");
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const formatNumber = (num) => {
    return financialUtils.formatNumber(num);
  };

  // Get user display name - prioritize actual user data
  const getUserDisplayName = () => {
    if (user?.Fullname) return user.Fullname.split(' ')[0];
    if (user?.email) return user.email.split('@')[0];
    return 'aadityabinod'; // fallback to current user
  };

  const quickPayments = [
    {
      id: 1,
      name: "Mobile Top-up",
      icon: <Smartphone className="w-6 h-6" />,
      color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
      action: () => alert("📱 Mobile Top-up: Coming in Q3 2025! Stay tuned for Ncell, NTC, and Smart Cell integration.")
    },
    {
      id: 2,
      name: "Bank Transfer",
      icon: <Building2 className="w-6 h-6" />,
      color: "bg-gradient-to-br from-green-400 to-green-600",
      action: () => alert("🏦 Bank Transfer: Direct integration with major Nepali banks launching soon!")
    },
    {
      id: 3,
      name: "Card Payment",
      icon: <CreditCard className="w-6 h-6" />,
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      action: () => alert("💳 Card Payment: Secure card processing with international support coming next month!")
    },
    {
      id: 4,
      name: "Digital Wallet",
      icon: <Wallet className="w-6 h-6" />,
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
      action: () => alert("💰 Digital Wallet: Top-up your wallet instantly - launching July 15, 2025!")
    }
  ];

  const merchantPartners = [
    {
      id: 1,
      name: "Hotels",
      icon: <Hotel className="w-7 h-7" />,
      color: "bg-blue-50 hover:bg-blue-100",
      textColor: "text-blue-700",
      iconColor: "text-blue-600",
      action: () => alert("🏨 Hotels: Partner with 500+ hotels across Nepal. Book with special tourist rates!")
    },
    {
      id: 2,
      name: "Shopping",
      icon: <ShoppingBag className="w-7 h-7" />,
      color: "bg-green-50 hover:bg-green-100",
      textColor: "text-green-700",
      iconColor: "text-green-600",
      action: () => alert("🛒 Shopping: Exclusive deals at Durbar Marg, New Road, and major shopping centers!")
    },
    {
      id: 3,
      name: "Transport",
      icon: <Ticket className="w-7 h-7" />,
      color: "bg-purple-50 hover:bg-purple-100",
      textColor: "text-purple-700",
      iconColor: "text-purple-600",
      action: () => alert("🎫 Transport: Book buses, flights, and local transport with tourist discounts!")
    },
    {
      id: 4,
      name: "Adventure",
      icon: <Plane className="w-7 h-7" />,
      color: "bg-orange-50 hover:bg-orange-100",
      textColor: "text-orange-700",
      iconColor: "text-orange-600",
      action: () => alert("✈️ Adventure: Trekking, rafting, and mountain flights - experience Nepal like never before!")
    }
  ];

  const specialFeatures = [
    {
      id: 1,
      name: "KYC Verification",
      icon: <CheckCircle className="w-7 h-7" />,
      color: "bg-green-50 hover:bg-green-100",
      textColor: "text-green-700",
      iconColor: "text-green-600",
      status: isVerified() ? "Verified" : "Pending",
      action: () => !isVerified() ? navigate("/kyc") : alert("✅ KYC Status: Verified! You can now access all premium features.")
    },
    {
      id: 2,
      name: "Currency Exchange",
      icon: <PlusCircle className="w-7 h-7" />,
      color: "bg-indigo-50 hover:bg-indigo-100",
      textColor: "text-indigo-700",
      iconColor: "text-indigo-600",
      action: () => alert("💱 Currency Exchange: Live rates updated! Exchange USD, EUR, GBP to NPR with best rates.")
    },
    {
      id: 3,
      name: "Travel Analytics",
      icon: <BarChart3 className="w-7 h-7" />,
      color: "bg-cyan-50 hover:bg-cyan-100",
      textColor: "text-cyan-700",
      iconColor: "text-cyan-600",
      action: () => alert("📊 Travel Analytics: Track your spending, budget insights, and expense categories!")
    }
  ];

  const bottomNavItems = [
    { 
      name: "Home", 
      icon: <Home className="w-5 h-5" />, 
      active: true, 
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      action: () => {}
    },
    { 
      name: "History", 
      icon: <History className="w-5 h-5" />, 
      active: false, 
      color: "text-gray-400",
      bgColor: "bg-transparent",
      action: () => alert("📋 Transaction History: View all your currency exchanges, payments, and travel expenses.")
    },
    { 
      name: "Scan", 
      icon: <Camera className="w-5 h-5" />, 
      active: false, 
      color: "text-gray-400",
      bgColor: "bg-transparent",
      action: () => alert("📷 QR Scanner: Scan QR codes for instant payments at partner merchants!")
    },
    { 
      name: "Cards", 
      icon: <CreditCard className="w-5 h-5" />, 
      active: false, 
      color: "text-gray-400",
      bgColor: "bg-transparent",
      action: () => alert("💳 Card Management: Add, manage, and secure your payment cards.")
    },
    { 
      name: "Profile", 
      icon: <User className="w-5 h-5" />, 
      active: false, 
      color: "text-gray-400",
      bgColor: "bg-transparent",
      action: () => navigate("/dashboard")
    }
  ];

  // Updated notifications with current context
  const notifications = [
    { 
      id: 1, 
      title: "Welcome to Nepal! 🇳🇵", 
      message: `Hi ${getUserDisplayName()}, enjoy your visit! Exchange rate: USD 1 = NPR ${conversionRate.toFixed(2)}`, 
      time: "Just now",
      type: "success"
    },
    { 
      id: 2, 
      title: "KYC Status Update", 
      message: isVerified() ? "✅ Your identity is verified! All features unlocked." : "⏳ Please complete your KYC verification to unlock all features.", 
      time: "5 min ago",
      type: isVerified() ? "success" : "warning"
    },
    { 
      id: 3, 
      title: "Tourist Rate Alert 📈", 
      message: "Special tourist exchange rates available! Save up to 2% on currency conversion.", 
      time: "1 hour ago",
      type: "info"
    },
    { 
      id: 4, 
      title: "Account Security", 
      message: `Account ${user?.email || 'aadityabinod@example.com'} - Last login: ${dateUtils.formatDate(currentDate, 'readable')}`, 
      time: user?.createdAt ? dateUtils.getRelativeTime(user.createdAt) : "Recently joined",
      type: "feature"
    }
  ];

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  const handleRefreshData = async () => {
    try {
      await refreshUser();
      alert("📊 Data refreshed! Exchange rates and account info updated.");
    } catch (error) {
      alert("❌ Failed to refresh data. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-sm mx-auto bg-white min-h-screen flex flex-col relative shadow-xl">
        {/* Status Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 flex justify-between items-center text-white text-sm font-medium">
          <div className="flex items-center space-x-2">
            <Clock className="w-3 h-3" />
            <span className="font-bold">{currentTime}</span>
            <span className="text-xs opacity-75">NPL</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-1 h-3 bg-white rounded-full opacity-100"></div>
              <div className="w-1 h-3 bg-white rounded-full opacity-100"></div>
              <div className="w-1 h-3 bg-white rounded-full opacity-75"></div>
              <div className="w-1 h-3 bg-white rounded-full opacity-50"></div>
            </div>
            <div className="w-6 h-3 bg-white rounded-sm relative">
              <div className="w-5 h-2 bg-green-500 rounded-sm absolute top-0.5 left-0.5"></div>
              <div className="w-1 h-1 bg-white rounded-full absolute -right-0.5 top-1"></div>
            </div>
            <div className="text-xs font-bold">5G</div>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-6 relative">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-5"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <span className="text-blue-600 font-bold text-lg">
                    {getInitials() || 'AB'}
                  </span>
                </div>
                <div>
                  <h1 className="text-white font-bold text-xl">
                    Namaste, {getUserDisplayName()}! 🙏
                  </h1>
                  <p className="text-blue-100 text-sm flex items-center">
                    <Globe className="w-3 h-3 mr-1" />
                    Tourist in Nepal
                  </p>
                  {isAdmin() && (
                    <p className="text-yellow-200 text-xs flex items-center mt-1">
                      <Shield className="w-3 h-3 mr-1" />
                      Admin Access
                    </p>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all relative backdrop-blur-sm"
                >
                  <Bell className="w-5 h-5 text-white" />
                  {notifications.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">{notifications.length}</span>
                    </div>
                  )}
                </button>
                <button 
                  onClick={handleRefreshData}
                  className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all backdrop-blur-sm"
                >
                  <Activity className="w-5 h-5 text-white" />
                </button>
                <button 
                  onClick={() => navigate("/dashboard")}
                  className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all backdrop-blur-sm"
                >
                  <Settings className="w-5 h-5 text-white" />
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all backdrop-blur-sm"
                >
                  <LogOut className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <>
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={handleCloseNotifications}
            ></div>
            
            <div className="absolute top-24 right-4 bg-white rounded-2xl shadow-2xl border z-50 w-80 max-w-xs overflow-hidden">
              <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-800 flex items-center">
                  <Bell className="w-4 h-4 mr-2 text-blue-600" />
                  Notifications ({notifications.length})
                </h3>
                <button 
                  onClick={handleCloseNotifications}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map(notification => (
                  <div key={notification.id} className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notification.type === 'success' ? 'bg-green-500' :
                        notification.type === 'warning' ? 'bg-yellow-500' :
                        notification.type === 'info' ? 'bg-blue-500' : 'bg-purple-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-gray-800">{notification.title}</div>
                        <div className="text-sm text-gray-600 mt-1">{notification.message}</div>
                        <div className="text-xs text-gray-400 mt-2">{notification.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-gray-50 text-center">
                <button 
                  onClick={() => alert("📱 View all notifications in the mobile app!")}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  View All Notifications
                </button>
              </div>
            </div>
          </>
        )}

        {/* Main Content */}
        <div className="flex-1 px-4 py-6 space-y-8 bg-gradient-to-b from-white to-gray-50">
          {/* Balance Card */}
          <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-700 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
            <div className="absolute top-4 right-4 text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
              July 1, 2025
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <span className="text-blue-100 font-medium">Tourist Account Balance</span>
                </div>
                <div className="text-right">
                  <p className="text-blue-200 text-xs">Live USD Rate</p>
                  <p className="text-white font-bold text-sm">
                    NPR {conversionRate.toFixed(2)}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-300">Live</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-4xl font-bold mb-1">
                  NPR {formatNumber(balance)}
                </p>
                <p className="text-blue-200 text-sm">
                  ≈ ${(balance / conversionRate).toFixed(2)} USD
                </p>
                <p className="text-blue-300 text-xs mt-1">
                  Updated: {currentTime} • Available for exchange
                </p>
              </div>

              {/* Quick stats */}
              <div className="flex justify-between text-center mt-4 pt-4 border-t border-white border-opacity-20">
                <div>
                  <p className="text-xs text-blue-200">Today's Savings</p>
                  <p className="font-bold">NPR 2,847</p>
                </div>
                <div>
                  <p className="text-xs text-blue-200">Exchange Count</p>
                  <p className="font-bold">12 times</p>
                </div>
                <div>
                  <p className="text-xs text-blue-200">Tourist Bonus</p>
                  <p className="font-bold">+2.5%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Payments */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-yellow-600" />
                </div>
                <h2 className="font-bold text-gray-800 text-xl">Quick Services</h2>
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">4 available</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {quickPayments.map((payment) => (
                <button
                  key={payment.id}
                  onClick={payment.action}
                  className="flex items-center space-x-4 p-4 bg-white rounded-2xl shadow-sm border hover:shadow-lg hover:scale-105 transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 ${payment.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    {payment.icon}
                  </div>
                  <span className="text-sm text-gray-700 font-semibold flex-1 text-left">
                    {payment.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Merchant Partners */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Handshake className="w-4 h-4 text-green-600" />
                </div>
                <h2 className="font-bold text-gray-800 text-xl">Tourist Partners</h2>
              </div>
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">500+ locations</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {merchantPartners.map((merchant) => (
                <button
                  key={merchant.id}
                  onClick={merchant.action}
                  className={`flex items-center space-x-4 p-4 ${merchant.color} rounded-2xl border-2 border-transparent hover:border-opacity-20 transition-all duration-300 group`}
                >
                  <div className={`${merchant.iconColor} group-hover:scale-110 transition-transform`}>
                    {merchant.icon}
                  </div>
                  <span className={`text-sm font-semibold ${merchant.textColor} flex-1 text-left`}>
                    {merchant.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Special Features */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-purple-600" />
                </div>
                <h2 className="font-bold text-gray-800 text-xl">Premium Features</h2>
              </div>
              <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">VIP access</span>
            </div>
            
            <div className="space-y-4">
              {specialFeatures.map((feature) => (
                <button
                  key={feature.id}
                  onClick={feature.action}
                  className={`w-full flex items-center justify-between p-4 ${feature.color} rounded-2xl border-2 border-transparent hover:border-opacity-20 transition-all duration-300 group`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`${feature.iconColor} group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <span className={`text-sm font-semibold ${feature.textColor}`}>
                      {feature.name}
                    </span>
                  </div>
                  {feature.status && (
                    <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                      feature.status === 'Verified' 
                        ? 'bg-green-200 text-green-800 animate-pulse' 
                        : 'bg-yellow-200 text-yellow-800'
                    }`}>
                      {feature.status}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Nepal Travel Tips */}
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-5 border border-orange-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Globe className="w-4 h-4 text-orange-600" />
              </div>
              <h3 className="font-bold text-orange-800">Nepal Travel Tip</h3>
            </div>
            <p className="text-sm text-orange-700 mb-3">
              💡 <strong>Currency Exchange Tip:</strong> Best exchange rates are typically found in Thamel and New Road areas. Always carry some NPR cash for local markets and street vendors!
            </p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-orange-600">🌡️ Weather: 24°C | 🏔️ Visibility: Clear</span>
              <span className="text-orange-600">July 1, 2025</span>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bg-white border-t shadow-2xl px-4 py-4">
          <div className="flex justify-around items-center">
            {bottomNavItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className={`flex flex-col items-center space-y-2 py-2 px-4 rounded-2xl transition-all duration-300 ${
                  item.active ? `${item.bgColor} scale-105 shadow-md` : 'hover:bg-gray-50'
                }`}
              >
                <div className={item.color}>
                  {item.icon}
                </div>
                <span className={`text-xs font-semibold ${item.color}`}>
                  {item.name}
                </span>
                {item.active && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}