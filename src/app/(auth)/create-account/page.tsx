"use client";
import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Check, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Card from "@/components/UI/Card";
import Logo from "@/assets/logo";
import Input from "@/components/UI/Input";
import GoogleSignInButton from "@/components/UI/GoogleSignInButton";
import Button from "@/components/UI/Button";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { doctorSignup, resetAuthState } from "@/lib/store/slices/authSlice";

const CreateAccountPage = () => {
  const [currentStep, setCurrentStep] = useState<"role" | "form">("role");
  const [selectedRole, setSelectedRole] = useState<"patient" | "doctor" | null>(
    null
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    discipline: "",
    clinicName: "",
    officeLocation: [""],
    googleMapUrl: [""],
    popularReasonsToVisit: [""],
    qualifications: [{ degree: "", university: "" }],
  });

  const router = useRouter();

  /**
   * REDUX HOOKS
   *
   * useAppDispatch: Get the dispatch function to send actions to Redux
   * useAppSelector: Get data from Redux store
   */
  const dispatch = useAppDispatch();
  const { isLoading, error, success } = useAppSelector((state) => state.auth);

  /**
   * EFFECT: Handle successful signup
   *
   * When signup is successful, redirect to verify-code page
   */
  useEffect(() => {
    if (success) {
      // Navigate to verify-code page with flow parameter
      router.push(
        `/verify-code?flow=create-account&email=${encodeURIComponent(
          formData.email
        )}&role=${selectedRole}`
      );
      // Reset the auth state
      dispatch(resetAuthState());
    }
  }, [success, router, formData.email, selectedRole, dispatch]);

  const passwordRules = [
    { rule: "At least 8 characters", test: (pwd: string) => pwd.length >= 8 },
    { rule: "One lowercase letter", test: (pwd: string) => /[a-z]/.test(pwd) },
    { rule: "One number", test: (pwd: string) => /\d/.test(pwd) },
  ];

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
    discipline: "",
    clinicName: "",
  });

  const handleRoleSelect = (role: "patient" | "doctor") => {
    setSelectedRole(role);
  };

  const handleRoleNext = () => {
    if (selectedRole) {
      setCurrentStep("form");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear errors on input change
  };

  const handleArrayInputChange = (index: number, value: string, field: "officeLocation" | "googleMapUrl" | "popularReasonsToVisit") => {
    setFormData((prev) => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayField = (field: "officeLocation" | "googleMapUrl" | "popularReasonsToVisit") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayField = (index: number, field: "officeLocation" | "googleMapUrl" | "popularReasonsToVisit") => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleQualificationChange = (index: number, field: "degree" | "university", value: string) => {
    setFormData((prev) => {
      const newQualifications = [...prev.qualifications];
      newQualifications[index] = { ...newQualifications[index], [field]: value };
      return { ...prev, qualifications: newQualifications };
    });
  };

  const addQualification = () => {
    setFormData((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, { degree: "", university: "" }],
    }));
  };

  const removeQualification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {
      fullName: "",
      email: "",
      password: "",
      mobile: "",
      discipline: "",
      clinicName: "",
    };

    // Full Name Validation
    if (!formData.fullName) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    }

    // Email Validation: check if email is required and has a valid format
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password Validation: check if password is required
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    // Mobile Validation
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
      isValid = false;
    }

    // Discipline Validation
    if (!formData.discipline) {
      newErrors.discipline = "Discipline is required";
      isValid = false;
    }

    // Clinic Name Validation
    if (!formData.clinicName) {
      newErrors.clinicName = "Clinic name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /**
   * HANDLE SUBMIT
   *
   * This function is called when the user clicks the submit button.
   * It validates the form and dispatches the doctorSignup action to Redux.
   */
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (validateForm()) {
      /**
       * Prepare the data to send to the API
       * We exclude confirmPassword as it's only for client-side validation
       */
      const signupData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        mobile: formData.mobile,
        discipline: formData.discipline,
        clinicName: formData.clinicName,
        officeLocation: formData.officeLocation.filter((loc) => loc.trim() !== ""),
        googleMapUrl: formData.googleMapUrl.filter((url) => url.trim() !== ""),
        popularReasonsToVisit: formData.popularReasonsToVisit.filter((reason) => reason.trim() !== ""),
        qualifications: formData.qualifications.filter(
          (qual) => qual.degree.trim() !== "" && qual.university.trim() !== ""
        ),
      };

      /**
       * DISPATCH REDUX ACTION
       *
       * This sends the signup data to the Redux store.
       * The doctorSignup thunk will:
       * 1. Set isLoading to true (doctorSignup.pending)
       * 2. Make the API call
       * 3. Either set success to true (doctorSignup.fulfilled)
       *    or set error message (doctorSignup.rejected)
       */
      dispatch(doctorSignup(signupData));
    }
  };

  const isPasswordValid = passwordRules.every((rule) =>
    rule.test(formData.password)
  );
  const doPasswordsMatch =
    formData.password === formData.confirmPassword &&
    formData.confirmPassword.length > 0;
  const isFormValid = isPasswordValid && doPasswordsMatch && !isLoading;

  // Account Creation Form Step
  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-y-auto scrollbar-hide">
      <Card className="my-4">
        <div className="pb-10 md:pb-0">
          {/* Logo */}
          <Logo />

          {/* Back Button */}

          <h1 className="font-medium text-center text-[32px] text-gray-900 mb-2">
            Create an account
          </h1>

          <div className="space-y-4">
            {/* Full Name Input */}
            <div>
              <Input
                label="Full Name"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                errorMessage={errors.fullName}
              />
            </div>

            {/* Email Input */}
            <div>
              <Input
                label="Email"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="email address"
                required
                errorMessage={errors.email}
              />
            </div>

            {/* Mobile Input */}
            <div>
              <Input
                label="Mobile Number"
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="+1234567890"
                required
                errorMessage={errors.mobile}
              />
            </div>

            {/* Discipline Input */}
            <div>
              <Input
                label="Discipline"
                type="text"
                name="discipline"
                value={formData.discipline}
                onChange={handleInputChange}
                placeholder="e.g., Cardiology"
                required
                errorMessage={errors.discipline}
              />
            </div>

            {/* Clinic Name Input */}
            <div>
              <Input
                label="Clinic Name"
                type="text"
                name="clinicName"
                value={formData.clinicName}
                onChange={handleInputChange}
                placeholder="e.g., City General Hospital"
                required
                errorMessage={errors.clinicName}
              />
            </div>

            {/* Office Locations */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Office Location(s)
              </label>
              {formData.officeLocation.map((location, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => handleArrayInputChange(index, e.target.value, "officeLocation")}
                    placeholder="e.g., 123 Main St, Anytown, USA"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {formData.officeLocation.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField(index, "officeLocation")}
                      className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField("officeLocation")}
                className="text-sm text-primary-500 hover:underline"
              >
                + Add another location
              </button>
            </div>

            {/* Google Map URLs */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Map URL(s)
              </label>
              {formData.googleMapUrl.map((url, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleArrayInputChange(index, e.target.value, "googleMapUrl")}
                    placeholder="https://maps.app.goo.gl/..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {formData.googleMapUrl.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField(index, "googleMapUrl")}
                      className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField("googleMapUrl")}
                className="text-sm text-primary-500 hover:underline"
              >
                + Add another URL
              </button>
            </div>

            {/* Popular Reasons to Visit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Popular Reasons to Visit
              </label>
              {formData.popularReasonsToVisit.map((reason, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={reason}
                    onChange={(e) => handleArrayInputChange(index, e.target.value, "popularReasonsToVisit")}
                    placeholder="e.g., Heart Checkup"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {formData.popularReasonsToVisit.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField(index, "popularReasonsToVisit")}
                      className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField("popularReasonsToVisit")}
                className="text-sm text-primary-500 hover:underline"
              >
                + Add another reason
              </button>
            </div>

            {/* Qualifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qualifications
              </label>
              {formData.qualifications.map((qual, index) => (
                <div key={index} className="border border-gray-300 rounded-lg p-3 mb-2">
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={qual.degree}
                      onChange={(e) => handleQualificationChange(index, "degree", e.target.value)}
                      placeholder="Degree (e.g., MD, FAAP)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <input
                      type="text"
                      value={qual.university}
                      onChange={(e) => handleQualificationChange(index, "university", e.target.value)}
                      placeholder="University/Institution"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  {formData.qualifications.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQualification(index)}
                      className="mt-2 text-sm text-red-500 hover:underline"
                    >
                      Remove qualification
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addQualification}
                className="text-sm text-primary-500 hover:underline"
              >
                + Add another qualification
              </button>
            </div>

            {/* New Password Input */}
            <div className="relative">
              <Input
                label="New Password"
                placeholder="Type a strong password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                icon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                onclick={() => setShowPassword((prev) => !prev)}
                required
                errorMessage={errors.password} // Display password error
              />
            </div>

            {formData.password && (
              <div className="bg-gray-50 rounded-lg space-y-2">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Password must contain:
                </p>
                {passwordRules.map((rule, index) => {
                  const isValid = rule.test(formData.password);
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          isValid ? " bg-primary-500" : "bg-gray-300"
                        }`}
                      >
                        {isValid && <Check size={12} className="text-white" />}
                      </div>
                      <span
                        className={
                          isValid ? "text-primary-500" : "text-gray-600"
                        }
                      >
                        {rule.rule}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Confirm Password Input */}
            <div className="relative">
              <Input
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Re-type password"
                onclick={() => setShowConfirmPassword((prev) => !prev)}
                icon={showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                required
              />
            </div>

            {/* Password Match Validation */}
            {formData.confirmPassword && (
              <div className="flex items-center gap-2 text-sm">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    doPasswordsMatch ? "bg-primary-500" : "bg-red-500"
                  }`}
                >
                  {doPasswordsMatch && (
                    <Check size={12} className="text-white" />
                  )}
                  {!doPasswordsMatch && (
                    <span className="text-white text-xs">×</span>
                  )}
                </div>
                <span
                  className={
                    doPasswordsMatch ? "text-primary-500" : "text-red-600"
                  }
                >
                  {doPasswordsMatch
                    ? "Passwords match"
                    : "Passwords do not match"}
                </span>
              </div>
            )}

            {/* Error Message Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`px-6 py-3 rounded-lg w-full font-medium transition-colors mt-6 ${
                isFormValid
                  ? "bg-primary-500 text-white hover:bg-primary-600 cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isLoading ? "Processing..." : "Next"}
            </Button>
          </div>

          <div className="text-center mt-6">
            <span className="text-Text-secondary text-[18px] font-medium">
              Already have an account?
            </span>{" "}
            <a
              className="text-[18px] text-primary-500 font-medium hover:underline transition-colors"
              href="/login"
              style={{ color: "#4A90E2" }}
            >
              Sign In
            </a>
          </div>

          {/* Divider */}
          <div className="flex justify-center items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <div className="text-gray-500 text-lg font-medium">OR</div>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Sign-In Button */}
          <GoogleSignInButton />
        </div>
      </Card>
    </div>
  );
};

export default CreateAccountPage;
