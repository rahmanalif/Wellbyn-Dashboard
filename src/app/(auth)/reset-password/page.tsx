"use client";
import Link from "next/link";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "@/assets/logo";
import { Eye, EyeOff, Check, ArrowLeft } from "lucide-react";
import Card from "@/components/UI/Card";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { doctorResetPassword, resetAuthState } from "@/lib/store/slices/authSlice";

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Separate component that uses useSearchParams
const ResetPasswordContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /**
   * REDUX HOOKS
   *
   * dispatch: Function to send actions to Redux
   * isLoading: Shows if password reset API call is in progress
   * error: Contains error message if reset fails
   * success: True when password is reset successfully
   * resetToken: Token from OTP verification used to reset password
   */
  const dispatch = useAppDispatch();
  const { isLoading, error, success, resetToken } = useAppSelector(
    (state) => state.auth
  );

  /**
   * EFFECT: Handle successful password reset
   *
   * When password is reset successfully, redirect to password changed page
   */
  useEffect(() => {
    if (success) {
      // Reset auth state
      dispatch(resetAuthState());
      // Redirect to password changed page
      router.push("/password-changed");
    }
  }, [success, router, dispatch]);

  // Password validation rules
  const passwordRules = [
    { rule: "At least 8 characters", test: (pwd: string) => pwd.length >= 8 },
    { rule: "One lowercase letter", test: (pwd: string) => /[a-z]/.test(pwd) },
    { rule: "One number", test: (pwd: string) => /\d/.test(pwd) },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * HANDLE SUBMIT
   *
   * This function is called when user submits the reset password form.
   * It dispatches the doctorResetPassword action to Redux.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    /**
     * DISPATCH RESET PASSWORD ACTION
     *
     * Send resetToken and new password to Redux.
     * The doctorResetPassword thunk will:
     * 1. Set isLoading to true
     * 2. Make POST request to /api/auth/doctor/reset-password
     * 3. On success: Clear resetToken, redirect to password changed page
     * 4. On error: Show error message
     */
    if (resetToken) {
      dispatch(
        doctorResetPassword({
          token: resetToken,
          password: formData.password,
        })
      );
    }
  };

  const isPasswordValid = passwordRules.every((rule) =>
    rule.test(formData.password)
  );
  const doPasswordsMatch =
    formData.password === formData.confirmPassword &&
    formData.confirmPassword.length > 0;
  const isFormValid = isPasswordValid && doPasswordsMatch && !isLoading;

  // Redirect if no resetToken (invalid access)
  if (!resetToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 md:p-4">
        <Card>
          <div className="text-center">
            <h1 className="font-medium text-center text-[32px] text-gray-900 mb-2">
              Invalid Reset Link
            </h1>
            <p className="font-normal text-center text-[18px] text-gray-600 mb-6">
              This password reset link is invalid or has expired.
            </p>
            <Link
              href="/forgot-password"
              className="bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors inline-block"
            >
              Request New Link
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center md:p-4">
      <Card>
        <Logo />

        <h1 className="font-medium text-center text-[32px] text-gray-900">
          Set new password
        </h1>

        <p className="font-normal text-center text-[18px] text-gray-600">
          Set a new password and continue your journey.{" "}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password Input */}
          <div className="relative">
            <Input
              label="New Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="type a strong password"
              required
              icon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              onclick={() => setShowPassword((prev) => !prev)}
            />
          </div>

          {/* Password Requirements */}
          {formData.password && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Password must contain:
              </p>
              {passwordRules.map((rule, index) => {
                const isValid = rule.test(formData.password);
                return (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        isValid ? " bg-primary-500" : "bg-gray-300"
                      }`}
                    >
                      {isValid && <Check size={12} className="text-white" />}
                    </div>
                    <span
                      className={isValid ? "text-primary-500" : "text-gray-600"}
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
              placeholder="re-type password"
              required
              onclick={() => setShowConfirmPassword((prev) => !prev)}
              icon={
                showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />
              }
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
                {doPasswordsMatch && <Check size={12} className="text-white" />}
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
            type="submit"
            disabled={!isFormValid}
            loading={isLoading}
            className="bg-primary-500 text-white px-6 py-3 rounded-lg w-full font-medium hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Save
          </Button>
        </form>

        {/* Back to Login */}
        <Link
          href="/login"
          className="flex items-center font-medium justify-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to login
        </Link>
      </Card>
    </div>
  );
};

// Main component with Suspense wrapper
const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPasswordPage;