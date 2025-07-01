/**
 * UserContext Utilities
 * Additional helper functions and utilities for user management
 * Created on: 2025-07-01 08:30:35 UTC
 * Author: aadityabinod
 */

// Date and time utilities
export const dateUtils = {
  /**
   * Format date to readable string
   * @param {string|Date} date - Date to format
   * @param {string} format - Format type ('short', 'long', 'time', 'datetime', 'iso')
   * @returns {string} Formatted date string
   */
  formatDate: (date, format = 'short') => {
    if (!date) return '';
    
    const dateObj = new Date(date);
    
    switch (format) {
      case 'short':
        return dateObj.toLocaleDateString();
      case 'long':
        return dateObj.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      case 'time':
        return dateObj.toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
      case 'datetime':
        return dateObj.toLocaleString();
      case 'iso':
        return dateObj.toISOString().split('T')[0];
      case 'utc':
        return dateObj.toISOString().replace('T', ' ').split('.')[0];
      default:
        return dateObj.toLocaleDateString();
    }
  },

  /**
   * Get current UTC date time in YYYY-MM-DD HH:MM:SS format
   * @returns {string} Current UTC datetime
   */
  getCurrentUTC: () => {
    const now = new Date();
    return now.toISOString().replace('T', ' ').split('.')[0];
  },

  /**
   * Get relative time (e.g., "2 hours ago")
   * @param {string|Date} date - Date to compare
   * @returns {string} Relative time string
   */
  getRelativeTime: (date) => {
    if (!date) return '';
    
    const now = new Date();
    const dateObj = new Date(date);
    const diffMs = now - dateObj;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return 'just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return dateUtils.formatDate(date, 'short');
  },

  /**
   * Check if date is expired
   * @param {string|Date} date - Date to check
   * @returns {boolean} True if expired
   */
  isExpired: (date) => {
    if (!date) return false;
    return new Date(date) < new Date();
  },

  /**
   * Get days until expiry
   * @param {string|Date} date - Date to check
   * @returns {number} Days until expiry (negative if expired)
   */
  getDaysUntilExpiry: (date) => {
    if (!date) return 0;
    const now = new Date();
    const expiryDate = new Date(date);
    const diffTime = expiryDate - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
};

// User validation utilities
export const validationUtils = {
  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} True if valid
   */
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {object} Validation result with score and feedback
   */
  validatePassword: (password) => {
    const result = {
      isValid: false,
      score: 0,
      feedback: [],
      strength: 'weak'
    };

    if (!password) {
      result.feedback.push('Password is required');
      return result;
    }

    if (password.length >= 8) result.score += 1;
    else result.feedback.push('At least 8 characters');

    if (/[A-Z]/.test(password)) result.score += 1;
    else result.feedback.push('At least one uppercase letter');

    if (/[a-z]/.test(password)) result.score += 1;
    else result.feedback.push('At least one lowercase letter');

    if (/\d/.test(password)) result.score += 1;
    else result.feedback.push('At least one number');

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) result.score += 1;
    else result.feedback.push('At least one special character');

    // Determine strength
    if (result.score >= 4) {
      result.strength = 'strong';
      result.isValid = true;
    } else if (result.score >= 3) {
      result.strength = 'medium';
    } else {
      result.strength = 'weak';
    }

    return result;
  },

  /**
   * Validate phone number
   * @param {string} phone - Phone number to validate
   * @returns {boolean} True if valid
   */
  isValidPhone: (phone) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  },

  /**
   * Validate passport number
   * @param {string} passport - Passport number to validate
   * @returns {boolean} True if valid
   */
  isValidPassport: (passport) => {
    const passportRegex = /^[A-Z0-9]{6,9}$/;
    return passportRegex.test(passport?.toUpperCase());
  },

  /**
   * Validate name (only letters and spaces)
   * @param {string} name - Name to validate
   * @returns {boolean} True if valid
   */
  isValidName: (name) => {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    return nameRegex.test(name);
  }
};

// User role and permission utilities
export const roleUtils = {
  /**
   * Get role display name
   * @param {string} role - Role code
   * @returns {string} Display name
   */
  getRoleDisplayName: (role) => {
    const roleNames = {
      admin: 'Administrator',
      user: 'User',
      moderator: 'Moderator',
      guest: 'Guest'
    };
    return roleNames[role] || role;
  },

  /**
   * Get role permissions
   * @param {string} role - Role code
   * @returns {array} Array of permissions
   */
  getRolePermissions: (role) => {
    const permissions = {
      admin: [
        'view_all_users',
        'edit_users',
        'delete_users',
        'view_kyc',
        'approve_kyc',
        'reject_kyc',
        'view_transactions',
        'manage_settings',
        'view_dashboard',
        'manage_currency_rates'
      ],
      moderator: [
        'view_kyc',
        'approve_kyc',
        'reject_kyc',
        'view_transactions',
        'view_dashboard'
      ],
      user: [
        'view_profile',
        'edit_profile',
        'submit_kyc',
        'view_own_transactions',
        'currency_exchange'
      ],
      guest: [
        'view_profile'
      ]
    };
    return permissions[role] || [];
  },

  /**
   * Check if user has permission
   * @param {string} userRole - User's role
   * @param {string} permission - Permission to check
   * @returns {boolean} True if has permission
   */
  hasPermission: (userRole, permission) => {
    const permissions = roleUtils.getRolePermissions(userRole);
    return permissions.includes(permission);
  },

  /**
   * Get role badge configuration
   * @param {string} role - Role code
   * @returns {object} Badge configuration
   */
  getRoleBadge: (role) => {
    const badges = {
      admin: {
        color: 'bg-red-100 text-red-800',
        icon: '👑',
        label: 'Admin'
      },
      moderator: {
        color: 'bg-purple-100 text-purple-800',
        icon: '🛡️',
        label: 'Moderator'
      },
      user: {
        color: 'bg-blue-100 text-blue-800',
        icon: '👤',
        label: 'User'
      },
      guest: {
        color: 'bg-gray-100 text-gray-800',
        icon: '👥',
        label: 'Guest'
      }
    };
    return badges[role] || badges.guest;
  }
};

// KYC status utilities
export const kycUtils = {
  /**
   * Get KYC status display info
   * @param {string} status - KYC status
   * @returns {object} Status display info
   */
  getKycStatusInfo: (status) => {
    const statusInfo = {
      pending: {
        label: 'Pending Review',
        color: 'yellow',
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
        borderColor: 'border-yellow-300',
        icon: '⏳',
        description: 'Your KYC is under review'
      },
      approved: {
        label: 'Verified',
        color: 'green',
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        borderColor: 'border-green-300',
        icon: '✅',
        description: 'Your identity has been verified'
      },
      rejected: {
        label: 'Rejected',
        color: 'red',
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        borderColor: 'border-red-300',
        icon: '❌',
        description: 'Your KYC was rejected'
      },
      draft: {
        label: 'Incomplete',
        color: 'gray',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-800',
        borderColor: 'border-gray-300',
        icon: '📝',
        description: 'Please complete your KYC'
      }
    };
    return statusInfo[status] || statusInfo.draft;
  },

  /**
   * Get KYC completion percentage
   * @param {object} kycData - KYC data object
   * @returns {number} Completion percentage
   */
  getCompletionPercentage: (kycData) => {
    if (!kycData) return 0;

    const requiredFields = [
      'firstName',
      'lastName',
      'dateOfBirth',
      'nationality',
      'passportNumber',
      'passportIssuePlace',
      'passportIssueDate',
      'passportExpiryDate',
      'visaType',
      'visaIssueDate',
      'visaExpiryDate',
      'expectedExitDate',
      'sourceOfFunds',
      'estimatedAmountToConvert',
      'monthlyIncomeRange',
      'passportPhotoPage',
      'visaPage',
      'selfie',
      'proofOfAddress'
    ];

    const completedFields = requiredFields.filter(field => 
      kycData[field] && kycData[field] !== ''
    );

    return Math.round((completedFields.length / requiredFields.length) * 100);
  },

  /**
   * Get missing KYC fields
   * @param {object} kycData - KYC data object
   * @returns {array} Array of missing field names
   */
  getMissingFields: (kycData) => {
    if (!kycData) return [];

    const requiredFields = [
      'firstName',
      'lastName',
      'dateOfBirth',
      'nationality',
      'passportNumber',
      'passportIssuePlace',
      'passportIssueDate',
      'passportExpiryDate',
      'visaType',
      'visaIssueDate',
      'visaExpiryDate',
      'expectedExitDate',
      'sourceOfFunds',
      'estimatedAmountToConvert',
      'monthlyIncomeRange',
      'passportPhotoPage',
      'visaPage',
      'selfie',
      'proofOfAddress'
    ];

    return requiredFields.filter(field => 
      !kycData[field] || kycData[field] === ''
    );
  }
};

// File handling utilities
export const fileUtils = {
  /**
   * Format file size
   * @param {number} bytes - File size in bytes
   * @returns {string} Formatted size string
   */
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  /**
   * Validate file type
   * @param {File} file - File to validate
   * @param {array} allowedTypes - Array of allowed MIME types
   * @returns {boolean} True if valid
   */
  isValidFileType: (file, allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']) => {
    return allowedTypes.includes(file.type);
  },

  /**
   * Validate file size
   * @param {File} file - File to validate
   * @param {number} maxSizeMB - Maximum size in MB
   * @returns {boolean} True if valid
   */
  isValidFileSize: (file, maxSizeMB = 5) => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes;
  },

  /**
   * Get file extension
   * @param {string} filename - File name
   * @returns {string} File extension
   */
  getFileExtension: (filename) => {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
  },

  /**
   * Validate document file
   * @param {File} file - File to validate
   * @param {string} type - Document type ('image' or 'document')
   * @returns {object} Validation result
   */
  validateDocumentFile: (file, type = 'image') => {
    const result = {
      isValid: false,
      errors: []
    };

    if (!file) {
      result.errors.push('File is required');
      return result;
    }

    // Size validation
    if (!fileUtils.isValidFileSize(file, 5)) {
      result.errors.push('File size must be less than 5MB');
    }

    // Type validation
    const imageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const documentTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    const allowedTypes = type === 'document' ? documentTypes : imageTypes;

    if (!fileUtils.isValidFileType(file, allowedTypes)) {
      result.errors.push(`Invalid file type. Allowed: ${allowedTypes.join(', ')}`);
    }

    result.isValid = result.errors.length === 0;
    return result;
  }
};

// Currency and financial utilities
export const financialUtils = {
  /**
   * Format currency amount
   * @param {number} amount - Amount to format
   * @param {string} currency - Currency code
   * @returns {string} Formatted currency string
   */
  formatCurrency: (amount, currency = 'USD') => {
    if (isNaN(amount)) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  },

  /**
   * Format number with commas
   * @param {number} number - Number to format
   * @returns {string} Formatted number string
   */
  formatNumber: (number) => {
    if (isNaN(number)) return 'N/A';
    return new Intl.NumberFormat('en-US').format(number);
  },

  /**
   * Calculate exchange rate
   * @param {number} amount - Amount to convert
   * @param {number} rate - Exchange rate
   * @returns {number} Converted amount
   */
  convertCurrency: (amount, rate) => {
    if (isNaN(amount) || isNaN(rate)) return 0;
    return amount * rate;
  },

  /**
   * Get currency symbols
   * @returns {object} Currency symbol mappings
   */
  getCurrencySymbols: () => {
    return {
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
      NPR: 'Rs.',
      INR: '₹',
      CNY: '¥',
      AUD: 'A$',
      CAD: 'C$'
    };
  },

  /**
   * Format amount with currency symbol
   * @param {number} amount - Amount to format
   * @param {string} currency - Currency code
   * @returns {string} Formatted amount with symbol
   */
  formatAmountWithSymbol: (amount, currency = 'USD') => {
    const symbols = financialUtils.getCurrencySymbols();
    const symbol = symbols[currency] || currency;
    return `${symbol}${financialUtils.formatNumber(amount)}`;
  }
};

// Local storage utilities
export const storageUtils = {
  /**
   * Set item in localStorage with expiry
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   * @param {number} expiryHours - Hours until expiry
   */
  setWithExpiry: (key, value, expiryHours = 24) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + (expiryHours * 60 * 60 * 1000)
    };
    localStorage.setItem(key, JSON.stringify(item));
  },

  /**
   * Get item from localStorage with expiry check
   * @param {string} key - Storage key
   * @returns {any} Stored value or null if expired
   */
  getWithExpiry: (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    try {
      const item = JSON.parse(itemStr);
      const now = new Date();

      if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }

      return item.value;
    } catch (error) {
      localStorage.removeItem(key);
      return null;
    }
  },

  /**
   * Clear all app-related storage
   */
  clearAppStorage: () => {
    const keysToRemove = ['token', 'user', 'rememberMe', 'kycData', 'preferences'];
    keysToRemove.forEach(key => localStorage.removeItem(key));
  },

  /**
   * Save user preferences
   * @param {object} preferences - User preferences object
   */
  savePreferences: (preferences) => {
    localStorage.setItem('preferences', JSON.stringify(preferences));
  },

  /**
   * Get user preferences
   * @returns {object} User preferences
   */
  getPreferences: () => {
    const prefs = localStorage.getItem('preferences');
    return prefs ? JSON.parse(prefs) : {};
  }
};

// Error handling utilities
export const errorUtils = {
  /**
   * Parse API error response
   * @param {Error} error - Error object
   * @returns {string} User-friendly error message
   */
  parseApiError: (error) => {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.message) {
      return error.message;
    }
    return 'An unexpected error occurred. Please try again.';
  },

  /**
   * Get error message for common HTTP status codes
   * @param {number} statusCode - HTTP status code
   * @returns {string} Error message
   */
  getStatusCodeMessage: (statusCode) => {
    const messages = {
      400: 'Invalid request. Please check your input.',
      401: 'Authentication required. Please log in.',
      403: 'You do not have permission to perform this action.',
      404: 'The requested resource was not found.',
      409: 'This action conflicts with existing data.',
      422: 'The provided data is invalid.',
      429: 'Too many requests. Please try again later.',
      500: 'Server error. Please try again later.',
      502: 'Service temporarily unavailable.',
      503: 'Service temporarily unavailable.',
    };
    return messages[statusCode] || 'An error occurred. Please try again.';
  },

  /**
   * Log error with context
   * @param {Error} error - Error object
   * @param {string} context - Error context
   */
  logError: (error, context = '') => {
    const timestamp = dateUtils.getCurrentUTC();
    console.error(`[${timestamp}] ${context}:`, error);
  }
};

// Device and browser utilities
export const deviceUtils = {
  /**
   * Check if device is mobile
   * @returns {boolean} True if mobile
   */
  isMobile: () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  },

  /**
   * Get device type
   * @returns {string} Device type
   */
  getDeviceType: () => {
    const ua = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(ua)) return 'mobile';
    return 'desktop';
  },

  /**
   * Get browser name
   * @returns {string} Browser name
   */
  getBrowserName: () => {
    const ua = navigator.userAgent;
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    if (ua.includes('Opera')) return 'Opera';
    return 'Unknown';
  },

  /**
   * Get screen dimensions
   * @returns {object} Screen width and height
   */
  getScreenDimensions: () => {
    return {
      width: window.screen.width,
      height: window.screen.height,
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight
    };
  }
};

// Notification utilities
export const notificationUtils = {
  /**
   * Show browser notification
   * @param {string} title - Notification title
   * @param {string} body - Notification body
   * @param {string} icon - Notification icon URL
   */
  showNotification: (title, body, icon = null) => {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications");
      return;
    }

    if (Notification.permission === "granted") {
      new Notification(title, { body, icon });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification(title, { body, icon });
        }
      });
    }
  },

  /**
   * Request notification permission
   * @returns {Promise} Permission result
   */
  requestPermission: () => {
    if (!("Notification" in window)) {
      return Promise.reject("Notifications not supported");
    }
    return Notification.requestPermission();
  }
};

// System info utilities
export const systemUtils = {
  /**
   * Get system information
   * @returns {object} System information
   */
  getSystemInfo: () => {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      deviceType: deviceUtils.getDeviceType(),
      browser: deviceUtils.getBrowserName(),
      screen: deviceUtils.getScreenDimensions(),
      timestamp: dateUtils.getCurrentUTC(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  },

  /**
   * Check if localStorage is available
   * @returns {boolean} True if available
   */
  isLocalStorageAvailable: () => {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
};