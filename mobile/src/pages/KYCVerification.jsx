import React, { useState } from "react";

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
                  : "bg-white border-gray-300 text-gray-400"
              } font-semibold`}
            >
              {idx + 1}
            </div>
            {idx + 1 < totalSteps && <div className="w-4 h-1 bg-gray-200 rounded"></div>}
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
function Step1({ formData, onChange }) {
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
          className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
          placeholder="First Name"
        />
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
          className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
          placeholder="Last Name"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm text-gray-700 mb-1 font-medium">
          Date of Birth <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={onChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] pr-10"
            placeholder="DD/MM/YYYY"
          />
          <span className="absolute right-3 top-2.5 text-gray-400">
            <svg width="20" height="20" fill="none">
              <rect x="3" y="6" width="14" height="11" rx="2" fill="#a3a3a3" />
              <path d="M7 3v2M13 3v2" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
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
            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] appearance-none"
          >
            <option value="" disabled>
              Select Country
            </option>
            <option value="Nepal">Nepal</option>
            <option value="India">India</option>
            <option value="China">China</option>
            <option value="USA">USA</option>
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
      </div>
    </div>
  );
}

// Step 2: Passport Details
function Step2({ formData, onChange }) {
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
          className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
          placeholder="Passport Number"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm text-gray-700 mb-1 font-medium">
          Place of issue <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="placeOfIssue"
          value={formData.placeOfIssue}
          onChange={onChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
          placeholder="Place of issue"
        />
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
            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] pr-10"
            placeholder="Issue Date"
          />
          <span className="absolute right-3 top-2.5 text-gray-400">
            <svg width="20" height="20" fill="none">
              <rect x="3" y="6" width="14" height="11" rx="2" fill="#a3a3a3" />
              <path d="M7 3v2M13 3v2" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
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
            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] pr-10"
            placeholder="Expiry Date"
          />
          <span className="absolute right-3 top-2.5 text-gray-400">
            <svg width="20" height="20" fill="none">
              <rect x="3" y="6" width="14" height="11" rx="2" fill="#a3a3a3" />
              <path d="M7 3v2M13 3v2" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

// Step 3: Visa & Travel Information
function Step3({ formData, onChange }) {
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
            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] appearance-none"
          >
            <option value="" disabled>
              Select Visa Type
            </option>
            <option value="Tourist">Tourist</option>
            <option value="Business">Business</option>
            <option value="Student">Student</option>
            <option value="Work">Work</option>
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
            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] pr-10"
            placeholder="Visa Issue Date"
          />
          <span className="absolute right-3 top-2.5 text-gray-400">
            <svg width="20" height="20" fill="none">
              <rect x="3" y="6" width="14" height="11" rx="2" fill="#a3a3a3" />
              <path d="M7 3v2M13 3v2" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
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
            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] pr-10"
            placeholder="Visa Expiry Date"
          />
          <span className="absolute right-3 top-2.5 text-gray-400">
            <svg width="20" height="20" fill="none">
              <rect x="3" y="6" width="14" height="11" rx="2" fill="#a3a3a3" />
              <path d="M7 3v2M13 3v2" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
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
            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] pr-10"
            placeholder="Expected Exit Date"
          />
          <span className="absolute right-3 top-2.5 text-gray-400">
            <svg width="20" height="20" fill="none">
              <rect x="3" y="6" width="14" height="11" rx="2" fill="#a3a3a3" />
              <path d="M7 3v2M13 3v2" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

// Step 4: Financial Information
function Step4({ formData, onChange }) {
  return (
    <div className="px-6 pt-2 pb-4">
      <div className="flex items-center space-x-2 mb-3 mt-2">
        <svg width="22" height="22" fill="none">
          <rect x="4" y="4" width="14" height="10" rx="2" fill="#333" />
          <rect x="8" y="2" width="6" height="4" rx="2" fill="#333" />
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
            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] appearance-none"
          >
            <option value="" disabled>
              Select Source
            </option>
            <option value="Salary">Salary</option>
            <option value="Business">Business</option>
            <option value="Savings">Savings</option>
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
      </div>
      <div className="mb-2">
        <label className="block text-sm text-gray-700 mb-1 font-medium">
          Estimated Amount to Convert <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="estimatedAmount"
          value={formData.estimatedAmount}
          onChange={onChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
          placeholder="Enter amount"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-1 font-medium">
          Monthly Income Range <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            name="incomeRange"
            value={formData.incomeRange}
            onChange={onChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] appearance-none"
          >
            <option value="" disabled>
              Select Range
            </option>
            <option value="Below $1000">Below $1000</option>
            <option value="$1000-$3000">$1000-$3000</option>
            <option value="$3000-$5000">$3000-$5000</option>
            <option value="Above $5000">Above $5000</option>
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
      </div>
    </div>
  );
}

// Step 5: Document Upload
function Step5({ formData, onChange }) {
  return (
    <div className="px-6 pt-2 pb-4">
      <div className="flex items-center space-x-2 mb-3 mt-2">
        <svg width="22" height="22" fill="none">
          <rect x="4" y="6" width="14" height="10" rx="2" stroke="#333" strokeWidth="2" fill="none" />
          <path d="M8 12l2 2 4-4" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-bold text-gray-800 text-base">Document Upload</span>
      </div>
      
      <div className="mb-3">
        <label className="block text-sm text-gray-700 mb-2 font-medium">
          Passport Photo Page <span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <p className="text-sm text-gray-600">Clear photo of passport information page</p>
          <input type="file" className="hidden" accept="image/*" />
          <button className="mt-2 text-blue-600 text-sm hover:underline">Choose File</button>
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-sm text-gray-700 mb-2 font-medium">
          Visa Page <span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <p className="text-sm text-gray-600">Clear photo of signed visa</p>
          <input type="file" className="hidden" accept="image/*" />
          <button className="mt-2 text-blue-600 text-sm hover:underline">Choose File</button>
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-sm text-gray-700 mb-2 font-medium">
          Current Selfie <span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <p className="text-sm text-gray-600">Recent clear selfie for verification</p>
          <input type="file" className="hidden" accept="image/*" />
          <button className="mt-2 text-blue-600 text-sm hover:underline">Choose File</button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-2 font-medium">
          Proof of Address <span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <p className="text-sm text-gray-600">Utility bill, bank statement or official document</p>
          <input type="file" className="hidden" accept="image/*,.pdf" />
          <button className="mt-2 text-blue-600 text-sm hover:underline">Choose File</button>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-3 mb-4">
        <h4 className="font-medium text-blue-900 mb-2">Document Requirements:</h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• All documents must be clear and readable</li>
          <li>• No screenshots or photocopies (scan or photo only)</li>
          <li>• Documents should be recent (within 3 months for financial documents)</li>
          <li>• File size should not exceed 5MB each</li>
          <li>• Supported formats: JPEG, PNG, PDF for proof of address</li>
        </ul>
      </div>
    </div>
  );
}

export default function KycMultiStep() {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [currentTime, setCurrentTime] = useState(() =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [form, setForm] = useState({
    // Step 1
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    nationality: "",
    // Step 2
    passportNumber: "",
    placeOfIssue: "",
    passportIssueDate: "",
    passportExpiryDate: "",
    // Step 3
    visaType: "",
    visaIssueDate: "",
    visaExpiryDate: "",
    expectedExitDate: "",
    // Step 4
    sourceOfFunds: "",
    estimatedAmount: "",
    incomeRange: "",
    // Step 5
    passportPhoto: null,
    visaPage: null,
    currentSelfie: null,
    proofOfAddress: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleNext = (e) => {
    e && e.preventDefault();
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Handle final submission
      alert("Form submitted!");
      // You can add your form submission logic here
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

          {/* Step Forms */}
          <div>
            {step === 1 && <Step1 formData={form} onChange={handleChange} />}
            {step === 2 && <Step2 formData={form} onChange={handleChange} />}
            {step === 3 && <Step3 formData={form} onChange={handleChange} />}
            {step === 4 && <Step4 formData={form} onChange={handleChange} />}
            {step === 5 && <Step5 formData={form} onChange={handleChange} />}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-2 px-6 pb-6">
            <button
              type="button"
              className={`flex-1 bg-gray-200 text-gray-600 rounded-full py-2 font-semibold shadow transition-all ${step === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={handlePrev}
              disabled={step === 1}
            >
              Previous
            </button>
            <button
              type="button"
              className="flex-1 bg-[#2563eb] text-white rounded-full py-2 font-semibold shadow-md hover:bg-blue-700 transition-all"
              onClick={handleNext}
            >
              {step === totalSteps ? "Submit Form" : "Next Step"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}