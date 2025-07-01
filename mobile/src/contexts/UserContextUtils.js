/**
 * UserContext Utilities
 * Comprehensive helper functions and utilities for user management
 * Created on: 2025-07-01 09:17:07 UTC
 * Author: aadityabinod
 * 
 * This file contains utility functions for:
 * - Date and time operations
 * - User validation
 * - Role and permission management
 * - KYC status handling
 * - File operations
 * - Financial calculations
 * - Local storage management
 * - Error handling
 * - Device detection
 * - Notifications
 * - System information
 */

// ============================================================================
// DATE AND TIME UTILITIES
// ============================================================================

export const dateUtils = {
  /**
   * Format date to readable string
   * @param {string|Date} date - Date to format
   * @param {string} format - Format type ('short', 'long', 'time', 'datetime', 'iso', 'utc')
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
      case 'readable':
        return dateObj.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
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
   * Get current local date time
   * @returns {string} Current local datetime
   */
  getCurrentLocal: () => {
    return new Date().toLocaleString();
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
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);

    if (diffSecs < 60) return 'just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
    if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
    
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
  },

  /**
   * Check if date is within range
   * @param {string|Date} date - Date to check
   * @param {number} days - Number of days from now
   * @returns {boolean} True if within range
   */
  isWithinDays: (date, days) => {
    if (!date) return false;
    const now = new Date();
    const checkDate = new Date(date);
    const diffTime = Math.abs(checkDate - now);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= days;
  },

  /**
   * Add days to a date
   * @param {string|Date} date - Base date
   * @param {number} days - Days to add
   * @returns {Date} New date
   */
  addDays: (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },

  /**
   * Get age from date of birth
   * @param {string|Date} dateOfBirth - Date of birth
   * @returns {number} Age in years
   */
  getAge: (dateOfBirth) => {
    if (!dateOfBirth) return 0;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }
};

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

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
  },

  /**
   * Validate URL
   * @param {string} url - URL to validate
   * @returns {boolean} True if valid
   */
  isValidUrl: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Validate credit card number (basic Luhn algorithm)
   * @param {string} cardNumber - Card number to validate
   * @returns {boolean} True if valid
   */
  isValidCreditCard: (cardNumber) => {
    const cleanNumber = cardNumber.replace(/\s+/g, '');
    if (!/^\d{13,19}$/.test(cleanNumber)) return false;

    let sum = 0;
    let isEven = false;
    
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber[i]);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  },

  /**
   * Validate postal/ZIP code
   * @param {string} postalCode - Postal code to validate
   * @param {string} country - Country code (US, UK, CA, etc.)
   * @returns {boolean} True if valid
   */
  isValidPostalCode: (postalCode, country = 'US') => {
    const patterns = {
      US: /^\d{5}(-\d{4})?$/,
      UK: /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i,
      CA: /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,
      AU: /^\d{4}$/,
      DE: /^\d{5}$/,
      FR: /^\d{5}$/,
      NP: /^\d{5}$/
    };
    
    const pattern = patterns[country.toUpperCase()];
    return pattern ? pattern.test(postalCode) : true;
  }
};

// ============================================================================
// ROLE AND PERMISSION UTILITIES
// ============================================================================

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
      guest: 'Guest',
      manager: 'Manager',
      support: 'Support Agent',
      developer: 'Developer'
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
        'manage_currency_rates',
        'access_admin_panel',
        'manage_roles',
        'view_analytics',
        'export_data',
        'manage_notifications'
      ],
      manager: [
        'view_all_users',
        'edit_users',
        'view_kyc',
        'approve_kyc',
        'reject_kyc',
        'view_transactions',
        'view_dashboard',
        'view_analytics',
        'manage_notifications'
      ],
      moderator: [
        'view_kyc',
        'approve_kyc',
        'reject_kyc',
        'view_transactions',
        'view_dashboard',
        'moderate_content'
      ],
      support: [
        'view_users',
        'view_kyc',
        'view_transactions',
        'view_dashboard',
        'respond_tickets'
      ],
      user: [
        'view_profile',
        'edit_profile',
        'submit_kyc',
        'view_own_transactions',
        'currency_exchange',
        'upload_documents',
        'view_notifications'
      ],
      guest: [
        'view_profile',
        'view_public_content'
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
        label: 'Admin',
        priority: 10
      },
      manager: {
        color: 'bg-indigo-100 text-indigo-800',
        icon: '💼',
        label: 'Manager',
        priority: 8
      },
      moderator: {
        color: 'bg-purple-100 text-purple-800',
        icon: '🛡️',
        label: 'Moderator',
        priority: 6
      },
      support: {
        color: 'bg-cyan-100 text-cyan-800',
        icon: '🎧',
        label: 'Support',
        priority: 4
      },
      user: {
        color: 'bg-blue-100 text-blue-800',
        icon: '👤',
        label: 'User',
        priority: 2
      },
      guest: {
        color: 'bg-gray-100 text-gray-800',
        icon: '👥',
        label: 'Guest',
        priority: 1
      }
    };
    return badges[role] || badges.guest;
  },

  /**
   * Check if role is higher than another role
   * @param {string} role1 - First role
   * @param {string} role2 - Second role
   * @returns {boolean} True if role1 is higher than role2
   */
  isRoleHigher: (role1, role2) => {
    const badge1 = roleUtils.getRoleBadge(role1);
    const badge2 = roleUtils.getRoleBadge(role2);
    return badge1.priority > badge2.priority;
  }
};

// ============================================================================
// KYC STATUS UTILITIES
// ============================================================================

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
        description: 'Your KYC is under review',
        priority: 3
      },
      approved: {
        label: 'Verified',
        color: 'green',
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        borderColor: 'border-green-300',
        icon: '✅',
        description: 'Your identity has been verified',
        priority: 4
      },
      rejected: {
        label: 'Rejected',
        color: 'red',
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        borderColor: 'border-red-300',
        icon: '❌',
        description: 'Your KYC was rejected',
        priority: 2
      },
      draft: {
        label: 'Incomplete',
        color: 'gray',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-800',
        borderColor: 'border-gray-300',
        icon: '📝',
        description: 'Please complete your KYC',
        priority: 1
      },
      expired: {
        label: 'Expired',
        color: 'orange',
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-800',
        borderColor: 'border-orange-300',
        icon: '🕐',
        description: 'Your KYC has expired',
        priority: 2
      },
      suspended: {
        label: 'Suspended',
        color: 'purple',
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-800',
        borderColor: 'border-purple-300',
        icon: '🚫',
        description: 'Your KYC is suspended',
        priority: 1
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
  },

  /**
   * Get KYC step progress
   * @param {object} kycData - KYC data object
   * @returns {object} Step progress info
   */
  getStepProgress: (kycData) => {
    const steps = {
      1: ['firstName', 'lastName', 'dateOfBirth', 'nationality'],
      2: ['passportNumber', 'passportIssuePlace', 'passportIssueDate', 'passportExpiryDate'],
      3: ['visaType', 'visaIssueDate', 'visaExpiryDate', 'expectedExitDate'],
      4: ['sourceOfFunds', 'estimatedAmountToConvert', 'monthlyIncomeRange'],
      5: ['passportPhotoPage', 'visaPage', 'selfie', 'proofOfAddress']
    };

    const progress = {};
    
    Object.keys(steps).forEach(step => {
      const fields = steps[step];
      const completedFields = fields.filter(field => 
        kycData?.[field] && kycData[field] !== ''
      );
      progress[step] = {
        completed: completedFields.length,
        total: fields.length,
        percentage: Math.round((completedFields.length / fields.length) * 100),
        isComplete: completedFields.length === fields.length
      };
    });

    return progress;
  },

  /**
   * Validate KYC expiry
   * @param {object} kycData - KYC data object
   * @returns {object} Expiry validation result
   */
  validateExpiry: (kycData) => {
    if (!kycData) return { hasExpiry: false };

    const result = {
      hasExpiry: false,
      expired: [],
      expiringSoon: [],
      valid: []
    };

    const documents = [
      { field: 'passportExpiryDate', name: 'Passport' },
      { field: 'visaExpiryDate', name: 'Visa' }
    ];

    documents.forEach(doc => {
      if (kycData[doc.field]) {
        result.hasExpiry = true;
        const expiryDate = new Date(kycData[doc.field]);
        const now = new Date();
        const daysUntilExpiry = dateUtils.getDaysUntilExpiry(kycData[doc.field]);

        if (daysUntilExpiry < 0) {
          result.expired.push({ ...doc, expiryDate, daysUntilExpiry });
        } else if (daysUntilExpiry <= 30) {
          result.expiringSoon.push({ ...doc, expiryDate, daysUntilExpiry });
        } else {
          result.valid.push({ ...doc, expiryDate, daysUntilExpiry });
        }
      }
    });

    return result;
  }
};

// ============================================================================
// FILE HANDLING UTILITIES
// ============================================================================

export const fileUtils = {
  /**
   * Format file size
   * @param {number} bytes - File size in bytes
   * @returns {string} Formatted size string
   */
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
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
  },

  /**
   * Convert file to base64
   * @param {File} file - File to convert
   * @returns {Promise<string>} Base64 string
   */
  fileToBase64: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  },

  /**
   * Get file MIME type from base64
   * @param {string} base64 - Base64 string
   * @returns {string} MIME type
   */
  getMimeTypeFromBase64: (base64) => {
    const match = base64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    return match ? match[1] : '';
  },

  /**
   * Compress image file
   * @param {File} file - Image file to compress
   * @param {number} quality - Compression quality (0-1)
   * @param {number} maxWidth - Maximum width
   * @returns {Promise<File>} Compressed file
   */
  compressImage: (file, quality = 0.8, maxWidth = 1024) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob(resolve, file.type, quality);
      };

      img.src = URL.createObjectURL(file);
    });
  }
};

// ============================================================================
// FINANCIAL UTILITIES
// ============================================================================

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
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(number);
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
      CAD: 'C$',
      CHF: 'Fr.',
      SEK: 'kr',
      NOK: 'kr',
      DKK: 'kr',
      PLN: 'zł',
      CZK: 'Kč',
      HUF: 'Ft',
      RUB: '₽',
      BRL: 'R$',
      MXN: '$',
      SGD: 'S$',
      HKD: 'HK$',
      NZD: 'NZ$',
      ZAR: 'R',
      TRY: '₺',
      KRW: '₩',
      THB: '฿'
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
  },

  /**
   * Calculate percentage change
   * @param {number} oldValue - Old value
   * @param {number} newValue - New value
   * @returns {number} Percentage change
   */
  calculatePercentageChange: (oldValue, newValue) => {
    if (oldValue === 0) return newValue === 0 ? 0 : 100;
    return ((newValue - oldValue) / oldValue) * 100;
  },

  /**
   * Calculate compound interest
   * @param {number} principal - Principal amount
   * @param {number} rate - Annual interest rate (as decimal)
   * @param {number} time - Time in years
   * @param {number} compound - Compound frequency per year
   * @returns {number} Final amount
   */
  calculateCompoundInterest: (principal, rate, time, compound = 1) => {
    return principal * Math.pow((1 + rate / compound), compound * time);
  },

  /**
   * Format percentage
   * @param {number} value - Value to format
   * @param {number} decimals - Number of decimal places
   * @returns {string} Formatted percentage
   */
  formatPercentage: (value, decimals = 2) => {
    if (isNaN(value)) return 'N/A';
    return `${value.toFixed(decimals)}%`;
  },

  /**
   * Parse amount from string
   * @param {string} amountStr - Amount string
   * @returns {number} Parsed amount
   */
  parseAmount: (amountStr) => {
    if (typeof amountStr === 'number') return amountStr;
    const cleaned = amountStr.replace(/[^\d.-]/g, '');
    return parseFloat(cleaned) || 0;
  },

  /**
   * Get currency info
   * @param {string} currency - Currency code
   * @returns {object} Currency information
   */
  getCurrencyInfo: (currency) => {
    const currencyData = {
      USD: { name: 'US Dollar', symbol: '$', decimals: 2, country: 'United States' },
      EUR: { name: 'Euro', symbol: '€', decimals: 2, country: 'European Union' },
      GBP: { name: 'British Pound', symbol: '£', decimals: 2, country: 'United Kingdom' },
      JPY: { name: 'Japanese Yen', symbol: '¥', decimals: 0, country: 'Japan' },
      NPR: { name: 'Nepalese Rupee', symbol: 'Rs.', decimals: 2, country: 'Nepal' },
      INR: { name: 'Indian Rupee', symbol: '₹', decimals: 2, country: 'India' },
      CNY: { name: 'Chinese Yuan', symbol: '¥', decimals: 2, country: 'China' },
      AUD: { name: 'Australian Dollar', symbol: 'A$', decimals: 2, country: 'Australia' },
      CAD: { name: 'Canadian Dollar', symbol: 'C$', decimals: 2, country: 'Canada' }
    };
    
    return currencyData[currency] || { 
      name: currency, 
      symbol: currency, 
      decimals: 2, 
      country: 'Unknown' 
    };
  }
};

// ============================================================================
// LOCAL STORAGE UTILITIES
// ============================================================================

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
    const keysToRemove = [
      'token', 
      'user', 
      'rememberMe', 
      'kycData', 
      'preferences',
      'theme',
      'language',
      'lastLogin',
      'sessionData'
    ];
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
    return prefs ? JSON.parse(prefs) : {
      theme: 'light',
      language: 'en',
      notifications: true,
      autoSave: true,
      currency: 'USD'
    };
  },

  /**
   * Check storage quota usage
   * @returns {object} Storage usage information
   */
  getStorageUsage: () => {
    if (!navigator.storage || !navigator.storage.estimate) {
      return { supported: false };
    }
    
    return navigator.storage.estimate().then(estimate => ({
      supported: true,
      quota: estimate.quota,
      usage: estimate.usage,
      usageDetails: estimate.usageDetails,
      percentUsed: estimate.quota ? (estimate.usage / estimate.quota) * 100 : 0
    }));
  },

  /**
   * Export all localStorage data
   * @returns {object} All localStorage data
   */
  exportData: () => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      data[key] = localStorage.getItem(key);
    }
    return data;
  },

  /**
   * Import localStorage data
   * @param {object} data - Data to import
   */
  importData: (data) => {
    Object.keys(data).forEach(key => {
      localStorage.setItem(key, data[key]);
    });
  }
};

// ============================================================================
// ERROR HANDLING UTILITIES
// ============================================================================

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
      504: 'Request timeout. Please try again.'
    };
    return messages[statusCode] || 'An error occurred. Please try again.';
  },

  /**
   * Log error with context
   * @param {Error} error - Error object
   * @param {string} context - Error context
   * @param {object} additionalData - Additional data to log
   */
  logError: (error, context = '', additionalData = {}) => {
    const timestamp = dateUtils.getCurrentUTC();
    const errorInfo = {
      timestamp,
      context,
      message: error.message,
      stack: error.stack,
      ...additionalData
    };
    
    console.error(`[${timestamp}] ${context}:`, errorInfo);
    
    // In production, you might want to send this to an error tracking service
    // Example: sendToErrorTracker(errorInfo);
  },

  /**
   * Create error boundary compatible error
   * @param {string} message - Error message
   * @param {string} code - Error code
   * @param {object} metadata - Additional metadata
   * @returns {Error} Formatted error
   */
  createError: (message, code = 'UNKNOWN_ERROR', metadata = {}) => {
    const error = new Error(message);
    error.code = code;
    error.metadata = metadata;
    error.timestamp = dateUtils.getCurrentUTC();
    return error;
  },

  /**
   * Retry function with exponential backoff
   * @param {Function} fn - Function to retry
   * @param {number} maxRetries - Maximum number of retries
   * @param {number} baseDelay - Base delay in milliseconds
   * @returns {Promise} Promise that resolves when function succeeds
   */
  retryWithBackoff: async (fn, maxRetries = 3, baseDelay = 1000) => {
    let lastError;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        
        if (attempt === maxRetries) {
          throw lastError;
        }
        
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError;
  }
};

// ============================================================================
// DEVICE AND BROWSER UTILITIES
// ============================================================================

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
   * Get browser name and version
   * @returns {object} Browser information
   */
  getBrowserInfo: () => {
    const ua = navigator.userAgent;
    let browserName = 'Unknown';
    let version = 'Unknown';

    if (ua.includes('Firefox')) {
      browserName = 'Firefox';
      version = ua.match(/Firefox\/([0-9.]+)/)?.[1] || 'Unknown';
    } else if (ua.includes('Chrome')) {
      browserName = 'Chrome';
      version = ua.match(/Chrome\/([0-9.]+)/)?.[1] || 'Unknown';
    } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
      browserName = 'Safari';
      version = ua.match(/Version\/([0-9.]+)/)?.[1] || 'Unknown';
    } else if (ua.includes('Edge')) {
      browserName = 'Edge';
      version = ua.match(/Edge\/([0-9.]+)/)?.[1] || 'Unknown';
    } else if (ua.includes('Opera')) {
      browserName = 'Opera';
      version = ua.match(/Opera\/([0-9.]+)/)?.[1] || 'Unknown';
    }

    return { name: browserName, version };
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
      availHeight: window.screen.availHeight,
      devicePixelRatio: window.devicePixelRatio || 1,
      orientation: screen.orientation?.type || 'unknown'
    };
  },

  /**
   * Check if device supports feature
   * @param {string} feature - Feature to check
   * @returns {boolean} True if supported
   */
  supportsFeature: (feature) => {
    const features = {
      geolocation: 'geolocation' in navigator,
      notification: 'Notification' in window,
      serviceWorker: 'serviceWorker' in navigator,
      localStorage: 'localStorage' in window,
      sessionStorage: 'sessionStorage' in window,
      camera: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
      webgl: (() => {
        try {
          const canvas = document.createElement('canvas');
          return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
        } catch {
          return false;
        }
      })(),
      webrtc: 'RTCPeerConnection' in window,
      websocket: 'WebSocket' in window,
      indexeddb: 'indexedDB' in window,
      fullscreen: 'requestFullscreen' in document.documentElement
    };

    return features[feature] || false;
  },

  /**
   * Get device capabilities
   * @returns {object} Device capabilities
   */
  getCapabilities: () => {
    return {
      isMobile: deviceUtils.isMobile(),
      deviceType: deviceUtils.getDeviceType(),
      browser: deviceUtils.getBrowserInfo(),
      screen: deviceUtils.getScreenDimensions(),
      features: {
        geolocation: deviceUtils.supportsFeature('geolocation'),
        notification: deviceUtils.supportsFeature('notification'),
        camera: deviceUtils.supportsFeature('camera'),
        localStorage: deviceUtils.supportsFeature('localStorage'),
        webgl: deviceUtils.supportsFeature('webgl')
      },
      connection: navigator.connection ? {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt
      } : null
    };
  }
};

// ============================================================================
// NOTIFICATION UTILITIES
// ============================================================================

export const notificationUtils = {
  /**
   * Show browser notification
   * @param {string} title - Notification title
   * @param {string} body - Notification body
   * @param {object} options - Notification options
   */
  showNotification: (title, body, options = {}) => {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications");
      return;
    }

    const defaultOptions = {
      body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: 'app-notification',
      requireInteraction: false,
      ...options
    };

    if (Notification.permission === "granted") {
      new Notification(title, defaultOptions);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification(title, defaultOptions);
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
  },

  /**
   * Check notification permission status
   * @returns {string} Permission status
   */
  getPermissionStatus: () => {
    if (!("Notification" in window)) {
      return "not-supported";
    }
    return Notification.permission;
  },

  /**
   * Create in-app notification
   * @param {string} type - Notification type (success, error, warning, info)
   * @param {string} message - Notification message
   * @param {number} duration - Duration in milliseconds
   * @returns {object} Notification object
   */
  createInAppNotification: (type, message, duration = 5000) => {
    const notification = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date(),
      duration,
      isVisible: true
    };

    // Automatically hide after duration
    if (duration > 0) {
      setTimeout(() => {
        notification.isVisible = false;
      }, duration);
    }

    return notification;
  },

  /**
   * Format notification for display
   * @param {object} notification - Notification object
   * @returns {object} Formatted notification
   */
  formatNotification: (notification) => {
    const typeConfig = {
      success: {
        icon: '✅',
        color: 'green',
        bgColor: 'bg-green-100',
        textColor: 'text-green-800'
      },
      error: {
        icon: '❌',
        color: 'red',
        bgColor: 'bg-red-100',
        textColor: 'text-red-800'
      },
      warning: {
        icon: '⚠️',
        color: 'yellow',
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800'
      },
      info: {
        icon: 'ℹ️',
        color: 'blue',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-800'
      }
    };

    return {
      ...notification,
      config: typeConfig[notification.type] || typeConfig.info,
      relativeTime: dateUtils.getRelativeTime(notification.timestamp)
    };
  }
};

// ============================================================================
// SYSTEM UTILITIES
// ============================================================================

export const systemUtils = {
  /**
   * Get comprehensive system information
   * @returns {object} System information
   */
  getSystemInfo: () => {
    return {
      timestamp: dateUtils.getCurrentUTC(),
      user: {
        agent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        languages: navigator.languages,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      device: deviceUtils.getCapabilities(),
      storage: {
        localStorage: systemUtils.isLocalStorageAvailable(),
        sessionStorage: systemUtils.isSessionStorageAvailable(),
        indexedDB: 'indexedDB' in window
      },
      performance: performance.memory ? {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
      } : null
    };
  },

  /**
   * Check if localStorage is available
   * @returns {boolean} True if available
   */
  isLocalStorageAvailable: () => {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * Check if sessionStorage is available
   * @returns {boolean} True if available
   */
  isSessionStorageAvailable: () => {
    try {
      const test = '__sessionStorage_test__';
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * Get app version info
   * @returns {object} Version information
   */
  getVersionInfo: () => {
    return {
      app: '1.0.0', // You can set this from package.json
      build: process.env.REACT_APP_BUILD_NUMBER || 'dev',
      environment: process.env.NODE_ENV || 'development',
      timestamp: '2025-07-01 09:17:07',
      author: 'aadityabinod'
    };
  },

  /**
   * Generate unique session ID
   * @returns {string} Unique session ID
   */
  generateSessionId: () => {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  },

  /**
   * Get app configuration
   * @returns {object} App configuration
   */
  getAppConfig: () => {
    return {
      name: 'Fintech App',
      version: systemUtils.getVersionInfo(),
      features: {
        kyc: true,
        dashboard: true,
        financialDashboard: true,
        notifications: true,
        multiLanguage: false,
        darkMode: false
      },
      api: {
        baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:8000',
        timeout: 30000,
        retries: 3
      },
      storage: {
        prefix: 'fintech_app_',
        encryption: false,
        compression: false
      }
    };
  },

  /**
   * Debug information for troubleshooting
   * @returns {object} Debug information
   */
  getDebugInfo: () => {
    return {
      system: systemUtils.getSystemInfo(),
      config: systemUtils.getAppConfig(),
      storage: {
        localStorage: storageUtils.exportData(),
        preferences: storageUtils.getPreferences()
      },
      errors: [], // This could be populated from an error tracking system
      performance: {
        loadTime: performance.now(),
        navigationStart: performance.timing?.navigationStart || 0,
        domContentLoaded: performance.timing?.domContentLoadedEventEnd || 0
      }
    };
  }
};

// ============================================================================
// UTILITY CONSTANTS
// ============================================================================

export const CONSTANTS = {
  // Date formats
  DATE_FORMATS: {
    SHORT: 'short',
    LONG: 'long',
    TIME: 'time',
    DATETIME: 'datetime',
    ISO: 'iso',
    UTC: 'utc',
    READABLE: 'readable'
  },

  // KYC statuses
  KYC_STATUS: {
    DRAFT: 'draft',
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    EXPIRED: 'expired',
    SUSPENDED: 'suspended'
  },

  // User roles
  USER_ROLES: {
    ADMIN: 'admin',
    MANAGER: 'manager',
    MODERATOR: 'moderator',
    SUPPORT: 'support',
    USER: 'user',
    GUEST: 'guest'
  },

  // File types
  FILE_TYPES: {
    IMAGE: ['image/jpeg', 'image/png', 'image/jpg'],
    DOCUMENT: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
    ALL: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
  },

  // Notification types
  NOTIFICATION_TYPES: {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
  },

  // Currency codes
  CURRENCIES: {
    USD: 'USD',
    EUR: 'EUR',
    GBP: 'GBP',
    JPY: 'JPY',
    NPR: 'NPR',
    INR: 'INR',
    CNY: 'CNY',
    AUD: 'AUD',
    CAD: 'CAD'
  },

  // Default values
  DEFAULTS: {
    CURRENCY: 'USD',
    LANGUAGE: 'en',
    THEME: 'light',
    PAGE_SIZE: 20,
    MAX_FILE_SIZE_MB: 5,
    SESSION_TIMEOUT_HOURS: 24,
    NOTIFICATION_DURATION: 5000
  }
};

// Export all utilities as a single object for convenience
export default {
  dateUtils,
  validationUtils,
  roleUtils,
  kycUtils,
  fileUtils,
  financialUtils,
  storageUtils,
  errorUtils,
  deviceUtils,
  notificationUtils,
  systemUtils,
  CONSTANTS
};