import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { validationUtils, fileUtils, errorUtils, dateUtils, storageUtils } from "../contexts/UserContextUtils";

// Stepper Component
function Stepper({ currentStep, totalSteps }) {
  return (
    <div>
      <div className="flex items-center justify-center space-x-2 mt-2 mb-4">
        {[...Array(totalSteps)].map((_, idx) => (
          <React.Fragment key={idx}>
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                currentStep === idx + 1
                  ? "bg-[#2563eb] border-[#2563eb] text-white"
                  : currentStep > idx + 1
                  ? "bg-green-500 border-green-500 text-white"
                  : "bg-white border-gray-300 text-gray-400"
              } font-semibold`}
            >
              {currentStep > idx + 1 ? "✓" : idx + 1}
            </div>
            {idx + 1 < totalSteps && (
              <div 
                className={`w-4 h-1 rounded ${
                  currentStep > idx + 1 ? "bg-green-500" : "bg-gray-200"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="px-6">
        <div
          className={`h-1 bg-[#2563eb] rounded`}
          style={{
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100 || 0}%`,
            transition: "width 0.3s",
          }}
        ></div>
      </div>
    </div>
  );
}

// Step 1: Personal Information
function Step1({ formData, onChange, errors }) {
  return (
    <div className="px-6 pt-2 pb-4">
      <div className="flex items-center space-x-2 mb-3 mt-2">
        <svg width="22" height="22" fill="none">
          <circle cx="11" cy="7" r="4" fill="#333" />
          <rect x="4" y="14" width="14" height="6" rx="3" fill="#333" />
        </svg>
        <span className="font-bold text-gray-800 text-base">Personal Information</span>
      </div>
      
      <div className="mb-2">
        <label className="block text-sm text-gray-700 mb-1 font-medium">
          First Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
          className={`w-full px-3 py-2 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] ${
            errors.firstName ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="First Name"
          required
        />
        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
      </div>

      <div className="mb-2">
        <label className="block text-sm text-gray-700 mb-1 font-medium">
          Middle Name
        </label>
        <input
          type="text"
          name="middleName"
          value={formData.middleName}
          onChange={onChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
          placeholder="Middle Name"
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm text-gray-700 mb-1 font-medium">
          Last Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
          className={`w-full px-3 py-2 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] ${
            errors.lastName ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Last Name"
          required
        />
        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
      </div>

      <div className="mb-2">
        <label className="block text-sm text-gray-700 mb-1 font-medium">
          Date of Birth <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={onChange}
            className={`w-full px-3 py-2 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] pr-10 ${
              errors.dateOfBirth ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          <span className="absolute right-3 top-2.5 text-gray-400">
            <svg width="20" height="20" fill="none">
              <rect x="3" y="6" width="14" height="11" rx="2" fill="#a3a3a3" />
              <path d="M7 3v2M13 3v2" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
        {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-1 font-medium">
          Nationality <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            name="nationality"
            value={formData.nationality}
            onChange={onChange}
            className={`w-full px-3 py-2 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] appearance-none ${
              errors.nationality ? "border-red-500" : "border-gray-300"
            }`}
            required
          >
            <option value="" disabled>
              Select Country
            </option>
            <option value="Nepal">Nepal</option>
            <option value="India">India</option>
            <option value="China">China</option>
            <option value="USA">USA</option>
            <option value="UK">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="Canada">Canada</option>
            <option value="Japan">Japan</option>
            <option value="South Korea">South Korea</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Italy">Italy</option>
            <option value="Spain">Spain</option>
            <option value="Netherlands">Netherlands</option>
            <option value="Switzerland">Switzerland</option>
          </select>
          <span className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
            <svg width="20" height="20" fill="none">
              <path
                d="M6 8l4 4 4-4"
                stroke="#a3a3a3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality}</p>}
      </div>
    </div>
  );
}

// Step 2: Passport Details
function Step2({ formData, onChange, errors }) {
  return (
    <div className="px-6 pt-2 pb-4">
      <div className="flex items-center space-x-2 mb-3 mt-2">
        <svg width="22" height="22" fill="none">
          <rect x="5" y="5" width="12" height="8" rx="2" fill="#333" />
          <rect x="3" y="13" width="16" height="4" rx="2" fill="#333" />
        </svg>
        <span className="font-bold text-gray-800 text-base">Passport Details</span>
      </div>

      <div className="mb-2">
        <label className="block text-sm text-gray-700 mb-1 font-medium">
          Passport Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="passportNumber"
          value={formData.passportNumber}
          onChange={onChange}
          className={`w-full px-3 py-2 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] ${
            errors.passportNumber ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Passport Number"
          required
        />
        {errors.passportNumber && <p className="text-red-500 text-xs mt-1">{errors.passportNumber}</p>}
      </div>

      <div className="mb-2">
        <label className="block text-sm text-gray-700 mb-1 font-medium">
          Place of Issue <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="passportIssuePlace"
          value={formData.passportIssuePlace}
          onChange={onChange}
          className={`w-full px-3 py-2 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] ${
            errors.passportIssuePlace ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Place of issue"
          required
        />
        {errors.passportIssuePlace && <p className="text-red-500 text-xs mt-1">{errors.passportIssuePlace}</p>}
      </div>

      <div className="mb-2">
        <label className="block text-sm text-gray-700 mb-1 font-medium">
          Issue Date <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="date"
            name="passportIssueDate"
            value={formData.passportIssueDate}
            onChange={onChange}
            className={`w-full px-3 py-2 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] pr-10 ${
              errors.passportIssueDate ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          <span className="absolute right-3 top-2.5 text-gray-400">
            <svg width="20" height="20" fill="none">
              <rect x="3" y="6" width="14" height="11" rx="2" fill="#a3a3a3" />
              <path d="M7 3v2M13 3v2" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
        {errors.passportIssueDate && <p className="text-red-500 text-xs mt-1">{errors.passportIssueDate}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-1 font-medium">
          Expiry Date <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="date"
            name="passportExpiryDate"
            value={formData.passportExpiryDate}
            onChange={onChange}
            className={`w-full px-3 py-2 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] pr-10 ${
              errors.passportExpiryDate ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          <span className="absolute right-3 top-2.5 text-gray-400">
            <svg width="20" height="20" fill="none">
              <rect x="3" y="6" width="14" height="11" rx="2" fill="#a3a3a3" />
              <path d="M7 3v2M13 3v2" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
        {errors.passportExpiryDate && <p className="text-red-500 text-xs mt-1">{errors.passportExpiryDate}</p>}
      </div>
    </div>
  );
}

// Step 3: Visa & Travel Information
function Step3({ formData, onChange, errors }) {
  return (
    <div className="px-6 pt-2 pb-4">
      <div className="flex items-center space-x-2 mb-3 mt-2">
        <svg width="22" height="22" fill="none">
          <rect x="4" y="4" width="14" height="10" rx="2" fill="#333" />
          <rect x="8" y="2" width="6" height="4" rx="2" fill="#333" />
        </svg>
        <span className="font-bold text-gray-800 text-base">Visa & Travel Information</span>
      </div>

      <div className="mb-2">
        <label className="block text-sm text-gray-700 mb-1 font-medium">
          Visa Type <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            name="visaType"
            value={formData.visaType}
            onChange={onChange}
            className={`w-full px-3 py-2 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] appearance-none ${
              errors.visaType ? "border-red-500" : "border-gray-300"
            }`}
            required
          >
            <option value="" disabled>
              Select Visa Type
            </option>
            <option value="Tourist">Tourist</option>
            <option value="Business">Business</option>
            <option value="Student">Student</option>
            <option value="Work">Work</option>
            <option value="Transit">Transit</option>
            <option value="Diplomatic">Diplomatic</option>
            <option value="Official">Official</option>
          </select>
          <span className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
            <svg width="20" height="20" fill="none">
              <path
                d="M6 8l4 4 4-4"
                stroke="#a3a3a3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        {errors.visaType && <p className="text-red-500 text-xs mt-1">{errors.visaType}</p>}
      </div>

      <div className="mb-2">
        <label className="block text-sm text-gray-700 mb-1 font-medium">
          Visa Issue Date <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="date"
            name="visaIssueDate"
            value={formData.visaIssueDate}
            onChange={onChange}
            className={`w-full px-3 py-2 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] pr-10 ${
              errors.visaIssueDate ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          <span className="absolute right-3 top-2.5 text-gray-400">
            <svg width="20" height="20" fill="none">
              <rect x="3" y="6" width="14" height="11" rx="2" fill="#a3a3a3" />
              <path d="M7 3v2M13 3v2" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
        {errors.visaIssueDate && <p className="text-red-500 text-xs mt-1">{errors.visaIssueDate}</p>}
      </div>

      <div className="mb-2">
        <label className="block text-sm text-gray-700 mb-1 font-medium">
          Visa Expiry Date <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="date"
            name="visaExpiryDate"
            value={formData.visaExpiryDate}
            onChange={onChange}
            className={`w-full px-3 py-2 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] pr-10 ${
              errors.visaExpiryDate ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          <span className="absolute right-3 top-2.5 text-gray-400">
            <svg width="20" height="20" fill="none">
              <rect x="3" y="6" width="14" height="11" rx="2" fill="#a3a3a3" />
              <path d="M7 3v2M13 3v2" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
        {errors.visaExpiryDate && <p className="text-red-500 text-xs mt-1">{errors.visaExpiryDate}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-1 font-medium">
          Expected Exit Date <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="date"
            name="expectedExitDate"
            value={formData.expectedExitDate}
            onChange={onChange}
            className={`w-full px-3 py-2 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] pr-10 ${
              errors.expectedExitDate ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          <span className="absolute right-3 top-2.5 text-gray-400">
            <svg width="20" height="20" fill="none">
              <rect x="3" y="6" width="14" height="11" rx="2" fill="#a3a3a3" />
              <path d="M7 3v2M13 3v2" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
        {errors.expectedExitDate && <p className="text-red-500 text-xs mt-1">{errors.expectedExitDate}</p>}
      </div>
    </div>
  );
}

// Step 4: Financial Information
function Step4({ formData, onChange, errors }) {
  return (
    <div className="px-6 pt-2 pb-4">
      <div className="flex items-center space-x-2 mb-3 mt-2">
        <svg width="22" height="22" fill="none">
          <rect x="4" y="4" width="14" height="10" rx="2" fill="#333" />
          <circle cx="11" cy="9" r="3" fill="white" />
          <path d="M11 7v4M9 9h4" stroke="#333" strokeWidth="1" />
        </svg>
        <span className="font-bold text-gray-800 text-base">Financial Information</span>
      </div>

      <div className="mb-2">
        <label className="block text-sm text-gray-700 mb-1 font-medium">
          Source of Funds <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            name="sourceOfFunds"
            value={formData.sourceOfFunds}
            onChange={onChange}
            className={`w-full px-3 py-2 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] appearance-none ${
              errors.sourceOfFunds ? "border-red-500" : "border-gray-300"
            }`}
            required
          >
            <option value="" disabled>
              Select Source
            </option>
            <option value="Salary">Salary</option>
            <option value="Business">Business</option>
            <option value="Savings">Savings</option>
            <option value="Investment">Investment</option>
            <option value="Family Support">Family Support</option>
            <option value="Government Benefits">Government Benefits</option>
            <option value="Other">Other</option>
          </select>
          <span className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
            <svg width="20" height="20" fill="none">
              <path
                d="M6 8l4 4 4-4"
                stroke="#a3a3a3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        {errors.sourceOfFunds && <p className="text-red-500 text-xs mt-1">{errors.sourceOfFunds}</p>}
      </div>

      <div className="mb-2">
        <label className="block text-sm text-gray-700 mb-1 font-medium">
          Estimated Amount to Convert (USD) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="estimatedAmountToConvert"
          value={formData.estimatedAmountToConvert}
          onChange={onChange}
          className={`w-full px-3 py-2 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] ${
            errors.estimatedAmountToConvert ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter amount in USD"
          min="0"
          step="0.01"
          required
        />
        {errors.estimatedAmountToConvert && <p className="text-red-500 text-xs mt-1">{errors.estimatedAmountToConvert}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-1 font-medium">
          Monthly Income Range <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            name="monthlyIncomeRange"
            value={formData.monthlyIncomeRange}
            onChange={onChange}
            className={`w-full px-3 py-2 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] appearance-none ${
              errors.monthlyIncomeRange ? "border-red-500" : "border-gray-300"
            }`}
            required
          >
            <option value="" disabled>
              Select Range
            </option>
            <option value="Below $1000">Below $1,000</option>
            <option value="$1000-$3000">$1,000 - $3,000</option>
            <option value="$3000-$5000">$3,000 - $5,000</option>
            <option value="$5000-$10000">$5,000 - $10,000</option>
            <option value="$10000-$25000">$10,000 - $25,000</option>
            <option value="Above $25000">Above $25,000</option>
          </select>
          <span className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
            <svg width="20" height="20" fill="none">
              <path
                d="M6 8l4 4 4-4"
                stroke="#a3a3a3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        {errors.monthlyIncomeRange && <p className="text-red-500 text-xs mt-1">{errors.monthlyIncomeRange}</p>}
      </div>
    </div>
  );
}

// Step 5: Document Upload
function Step5({ formData, onChange, errors, onFileChange }) {
  const handleFileSelect = (fieldName, event) => {
    const file = event.target.files[0];
    if (file) {
      const validation = fileUtils.validateDocumentFile(file, fieldName === 'proofOfAddress' ? 'document' : 'image');
      if (!validation.isValid) {
        alert(validation.errors.join('\n'));
        event.target.value = ''; // Clear the input
        return;
      }
      onFileChange(fieldName, file);
    }
  };

  const FileUploadBox = ({ fieldName, label, description, accept = "image/*", required = true }) => (
    <div className="mb-3">
      <label className="block text-sm text-gray-700 mb-2 font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className={`border-2 border-dashed rounded-lg p-6 text-center bg-gray-50 transition-colors ${
        errors[fieldName] ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-blue-300"
      }`}>
        <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        {formData[fieldName] && (
          <div className="text-xs text-green-600 mb-2 p-2 bg-green-50 rounded border">
            <p className="font-medium">✓ {formData[fieldName].name}</p>
            <p>Size: {fileUtils.formatFileSize(formData[fieldName].size)}</p>
            <p>Type: {formData[fieldName].type}</p>
          </div>
        )}
        <input 
          type="file" 
          className="hidden" 
          accept={accept}
          onChange={(e) => handleFileSelect(fieldName, e)}
          id={fieldName}
        />
        <label 
          htmlFor={fieldName}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 cursor-pointer transition-colors"
        >
          {formData[fieldName] ? "Change File" : "Choose File"}
        </label>
      </div>
      {errors[fieldName] && <p className="text-red-500 text-xs mt-1">{errors[fieldName]}</p>}
    </div>
  );

  return (
    <div className="px-6 pt-2 pb-4">
      <div className="flex items-center space-x-2 mb-3 mt-2">
        <svg width="22" height="22" fill="none">
          <rect x="4" y="6" width="14" height="10" rx="2" stroke="#333" strokeWidth="2" fill="none" />
          <path d="M8 12l2 2 4-4" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-bold text-gray-800 text-base">Document Upload</span>
      </div>
      
      <FileUploadBox
        fieldName="passportPhotoPage"
        label="Passport Photo Page"
        description="Clear photo of passport information page with your photo and details"
        accept="image/jpeg,image/png,image/jpg"
      />

      <FileUploadBox
        fieldName="visaPage"
        label="Visa Page"
        description="Clear photo of the visa page from your passport"
        accept="image/jpeg,image/png,image/jpg"
      />

      <FileUploadBox
        fieldName="selfie"
        label="Current Selfie"
        description="Recent clear selfie for identity verification"
        accept="image/jpeg,image/png,image/jpg"
      />

      <FileUploadBox
        fieldName="proofOfAddress"
        label="Proof of Address"
        description="Utility bill, bank statement, or official document showing your address"
        accept="image/jpeg,image/png,image/jpg,application/pdf"
      />

      <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-3 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Document Requirements:
        </h4>
        <ul className="text-xs text-blue-800 space-y-1.5">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            All documents must be clear, readable, and in color
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            No screenshots, photocopies, or edited images accepted
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            Documents should be recent (within 3 months for financial documents)
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            File size must not exceed 5MB per document
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            Supported formats: JPEG, PNG for images; PDF for proof of address
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            Ensure all text and details are clearly visible
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function KycMultiStep() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});
  const totalSteps = 5;
  const navigate = useNavigate();
  const { updateUserKycStatus } = useUser();

  // Current time - July 1, 2025 10:31:43 UTC
  const [currentTime, setCurrentTime] = useState(() => {
    const utcTime = new Date('2025-07-01T10:31:43Z');
    return utcTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      // Update time based on 2025-07-01 10:31:43 UTC
      const baseTime = new Date('2025-07-01T10:31:43Z');
      const now = new Date(baseTime.getTime() + Date.now() % (24 * 60 * 60 * 1000));
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [form, setForm] = useState({
    // Step 1
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    nationality: "",
    // Step 2
    passportNumber: "",
    passportIssuePlace: "",
    passportIssueDate: "",
    passportExpiryDate: "",
    // Step 3
    visaType: "",
    visaIssueDate: "",
    visaExpiryDate: "",
    expectedExitDate: "",
    // Step 4
    sourceOfFunds: "",
    estimatedAmountToConvert: "",
    monthlyIncomeRange: "",
    // Step 5
    passportPhotoPage: null,
    visaPage: null,
    selfie: null,
    proofOfAddress: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleFileChange = (fieldName, file) => {
    setForm(prev => ({
      ...prev,
      [fieldName]: file
    }));
    
    // Clear file error
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ""
      }));
    }
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};

    switch (stepNumber) {
      case 1:
        if (!form.firstName.trim()) newErrors.firstName = "First name is required";
        else if (!validationUtils.isValidName(form.firstName)) newErrors.firstName = "Invalid first name (letters and spaces only)";
        
        if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
        else if (!validationUtils.isValidName(form.lastName)) newErrors.lastName = "Invalid last name (letters and spaces only)";
        
        if (!form.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
        else {
          const birthDate = new Date(form.dateOfBirth);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age;
          }
          
          if (age < 18) newErrors.dateOfBirth = "Must be at least 18 years old";
          if (age > 100) newErrors.dateOfBirth = "Invalid date of birth";
          if (birthDate > today) newErrors.dateOfBirth = "Date of birth cannot be in the future";
        }
        
        if (!form.nationality) newErrors.nationality = "Nationality is required";
        break;

      case 2:
        if (!form.passportNumber.trim()) newErrors.passportNumber = "Passport number is required";
        else if (!validationUtils.isValidPassport(form.passportNumber)) {
          newErrors.passportNumber = "Invalid passport number format (6-9 alphanumeric characters)";
        }
        
        if (!form.passportIssuePlace.trim()) newErrors.passportIssuePlace = "Place of issue is required";
        if (!form.passportIssueDate) newErrors.passportIssueDate = "Issue date is required";
        if (!form.passportExpiryDate) newErrors.passportExpiryDate = "Expiry date is required";
        
        // Validate dates
        if (form.passportIssueDate && form.passportExpiryDate) {
          const issueDate = new Date(form.passportIssueDate);
          const expiryDate = new Date(form.passportExpiryDate);
          const today = new Date();
          
          if (issueDate >= expiryDate) {
            newErrors.passportExpiryDate = "Expiry date must be after issue date";
          }
          if (expiryDate <= today) {
            newErrors.passportExpiryDate = "Passport has expired";
          }
          if (issueDate > today) {
            newErrors.passportIssueDate = "Issue date cannot be in the future";
          }
        }
        break;

      case 3:
        if (!form.visaType) newErrors.visaType = "Visa type is required";
        if (!form.visaIssueDate) newErrors.visaIssueDate = "Visa issue date is required";
        if (!form.visaExpiryDate) newErrors.visaExpiryDate = "Visa expiry date is required";
        if (!form.expectedExitDate) newErrors.expectedExitDate = "Expected exit date is required";
        
        // Validate dates
        if (form.visaIssueDate && form.visaExpiryDate) {
          const issueDate = new Date(form.visaIssueDate);
          const expiryDate = new Date(form.visaExpiryDate);
          const today = new Date();
          
          if (issueDate >= expiryDate) {
            newErrors.visaExpiryDate = "Visa expiry date must be after issue date";
          }
          if (expiryDate <= today) {
            newErrors.visaExpiryDate = "Visa has expired";
          }
          if (issueDate > today) {
            newErrors.visaIssueDate = "Issue date cannot be in the future";
          }
        }
        
        if (form.expectedExitDate && form.visaExpiryDate) {
          const exitDate = new Date(form.expectedExitDate);
          const visaExpiry = new Date(form.visaExpiryDate);
          const today = new Date();
          
          if (exitDate > visaExpiry) {
            newErrors.expectedExitDate = "Exit date cannot be after visa expiry";
          }
          if (exitDate < today) {
            newErrors.expectedExitDate = "Exit date cannot be in the past";
          }
        }
        break;

      case 4:
        if (!form.sourceOfFunds) newErrors.sourceOfFunds = "Source of funds is required";
        if (!form.estimatedAmountToConvert) newErrors.estimatedAmountToConvert = "Estimated amount is required";
        else {
          const amount = parseFloat(form.estimatedAmountToConvert);
          if (isNaN(amount) || amount <= 0) {
            newErrors.estimatedAmountToConvert = "Amount must be a positive number";
          } else if (amount > 1000000) {
            newErrors.estimatedAmountToConvert = "Amount seems too large, please verify";
          }
        }
        if (!form.monthlyIncomeRange) newErrors.monthlyIncomeRange = "Monthly income range is required";
        break;

      case 5:
        if (!form.passportPhotoPage) newErrors.passportPhotoPage = "Passport photo page is required";
        if (!form.visaPage) newErrors.visaPage = "Visa page is required";
        if (!form.selfie) newErrors.selfie = "Selfie is required";
        if (!form.proofOfAddress) newErrors.proofOfAddress = "Proof of address is required";
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleNext = (e) => {
    e && e.preventDefault();
    setError("");

    if (!validateStep(step)) {
      return;
    }

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Simulate KYC submission offline - store data locally
      const kycData = {
        ...form,
        submissionDate: '2025-07-01T10:31:43Z',
        status: 'pending',
        userId: 'aadityabinod',
        submissionId: `KYC_${Date.now()}`,
        // Convert files to base64 for storage simulation
        documents: {
          passportPhotoPage: form.passportPhotoPage ? {
            name: form.passportPhotoPage.name,
            size: form.passportPhotoPage.size,
            type: form.passportPhotoPage.type,
            uploaded: true
          } : null,
          visaPage: form.visaPage ? {
            name: form.visaPage.name,
            size: form.visaPage.size,
            type: form.visaPage.type,
            uploaded: true
          } : null,
          selfie: form.selfie ? {
            name: form.selfie.name,
            size: form.selfie.size,
            type: form.selfie.type,
            uploaded: true
          } : null,
          proofOfAddress: form.proofOfAddress ? {
            name: form.proofOfAddress.name,
            size: form.proofOfAddress.size,
            type: form.proofOfAddress.type,
            uploaded: true
          } : null
        }
      };

      // Store KYC data locally
      storageUtils.setWithExpiry('kycData', kycData, 24 * 7); // Store for 7 days
      
      // Update user KYC status in context
      if (updateUserKycStatus) {
        updateUserKycStatus('pending');
      }

      console.log("KYC Data Stored Locally:", kycData);
      
      setSuccess("🎉 KYC submitted successfully! Your application is under review and you will be notified once it's processed.");
      
      // Simulate processing time with loading animation
      setTimeout(() => {
        navigate("/kyc-completed");
      }, 2000);

    } catch (err) {
      errorUtils.logError(err, "KYC Submission");
      setError("Failed to submit KYC. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="w-full h-screen bg-white flex flex-col">
        {/* Top blue section with curved bottom (SVG) */}
        <div className="relative bg-[#2563eb] h-60 flex flex-col items-center justify-center flex-shrink-0">
          {/* Top bar (time, signal, battery) */}
          <div className="absolute top-2 left-0 w-full flex justify-between items-center px-4 text-xs text-black">
            <div className="flex items-center">
              <div className="bg-blue-500 text-white rounded-lg px-2 py-0.5 font-bold">{currentTime}</div>
            </div>
            <div className="flex gap-2 items-center"> 
              <svg width="20" height="14" fill="none"><rect x="2" y="3" width="14" height="8" rx="2" fill="#000" /></svg>
              <svg width="18" height="14" fill="none"><rect x="2" y="3" width="10" height="8" rx="2" fill="#000" /></svg>
              <svg width="16" height="16" fill="none"><circle cx="8" cy="8" r="6" stroke="#000" strokeWidth="2" fill="none" /></svg>
            </div>
          </div>
          {/* Title and Subtitle */}
          <div className="flex flex-col items-center justify-center mt-8 text-center px-4">
            <h2 className="text-lg font-bold text-white">Tourist KYC Verification</h2>
            <p className="text-white text-xs mt-1">
              Complete verification to convert
              <br />
              currency to NPR
            </p>
            <div className="mt-2 text-white text-xs opacity-75">
              Step {step} of {totalSteps} • Offline Mode ✓
            </div>
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

        {/* Content area - scrollable */}
        <div className="flex-1 overflow-y-auto">
          {/* Stepper */}
          <Stepper currentStep={step} totalSteps={totalSteps} />

          {/* Error/Success Messages */}
          {error && (
            <div className="mx-6 mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            </div>
          )}

          {success && (
            <div className="mx-6 mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {success}
              </div>
            </div>
          )}

          {/* Step Forms */}
          <div>
            {step === 1 && <Step1 formData={form} onChange={handleChange} errors={errors} />}
            {step === 2 && <Step2 formData={form} onChange={handleChange} errors={errors} />}
            {step === 3 && <Step3 formData={form} onChange={handleChange} errors={errors} />}
            {step === 4 && <Step4 formData={form} onChange={handleChange} errors={errors} />}
            {step === 5 && <Step5 formData={form} onChange={handleChange} errors={errors} onFileChange={handleFileChange} />}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-2 px-6 pb-6">
            <button
              type="button"
              className={`flex-1 rounded-full py-3 font-semibold shadow transition-all ${
                step === 1 || loading ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
              onClick={handlePrev}
              disabled={step === 1 || loading}
            >
              ← Previous
            </button>
            <button
              type="button"
              className={`flex-1 rounded-full py-3 font-semibold shadow-md transition-all ${
                loading
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-[#2563eb] text-white hover:bg-blue-700"
              }`}
              onClick={handleNext}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {step === totalSteps ? "Submitting..." : "Processing..."}
                </div>
              ) : (
                step === totalSteps ? "Submit KYC →" : "Next →"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}