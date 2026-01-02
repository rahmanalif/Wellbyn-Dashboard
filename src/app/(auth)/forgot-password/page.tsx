"use client";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/assets/logo";
import { ArrowLeft } from "lucide-react";
import Card from "@/components/UI/Card";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { doctorForgotPassword, resetAuthState } from "@/lib/store/slices/authSlice";

// export const metadata: Metadata = {
//   title: "Forgot Password | Wellbyn",
//   description: "Reset your password for Wellbyn account",
//   keywords: ["forgot password", "reset", "wellbyn"],
// };

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  /**
   * REDUX HOOKS
   *
   * dispatch: Function to send actions to Redux
   * isLoading: Shows if API call is in progress
   * error: Contains error message if request fails
   * success: True when email is sent successfully
   */
  const dispatch = useAppDispatch();
  const { isLoading, error, success } = useAppSelector((state) => state.auth);

  /**
   * EFFECT: Handle successful email sent
   *
   * When password reset email is sent successfully, redirect to verify code page
   */
  useEffect(() => {
    if (success) {
      // Reset auth state
      dispatch(resetAuthState());
      // Redirect to verify code page with email parameter
      router.push(`/verify-code?email=${encodeURIComponent(email)}&flow=forgot-password`);
    }
  }, [success, router, email, dispatch]);

  /**
   * HANDLE SUBMIT
   *
   * This function is called when user submits the form.
   * It dispatches the doctorForgotPassword action to Redux.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /**
     * DISPATCH FORGOT PASSWORD ACTION
     *
     * Send email to Redux.
     * The doctorForgotPassword thunk will:
     * 1. Set isLoading to true
     * 2. Make POST request to /api/auth/doctor/forgot-password
     * 3. On success: Set success to true, redirect to verify code
     * 4. On error: Show error message
     */
    dispatch(doctorForgotPassword({ email }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center md:p-4">
      <Card>
        <Logo />

        <h1 className="font-medium text-center text-[32px] text-gray-900">
          Forgot password?
        </h1>

        <p className="font-normal text-center text-[18px] text-brand-500">
          Enter your email to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Example@gmail.com"
              required
            />
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading || !email}
            loading={isLoading}
            className="bg-primary-500 text-white px-6 py-3 rounded-lg w-full font-medium hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </Button>
        </form>

        <Link
          href="/login"
          className="flex items-center font-medium justify-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Sign in
        </Link>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
