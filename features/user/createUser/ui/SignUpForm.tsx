'use client'

import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useSignUp } from "../models/useSignUp"

export default function SignUpForm() {
    const { errors, handleSignup, isLoading, onChange, values, remember, setRemember, setShowPassword, showPassword, handleOAuthSignIn } = useSignUp()

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleSignup}
                className="p-8 bg-white shadow-lg rounded-2xl w-full max-w-sm flex flex-col gap-5 border border-gray-100"
            >
                <h1 className="text-3xl font-semibold text-center text-gray-800">
                    Create Account
                </h1>

                {/* Full Name field */}
                <div className="flex flex-col gap-1">
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={values.fullName || ""}
                        onChange={onChange}
                        className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.fullName && (
                        <p className="text-red-500 text-sm">{errors.fullName}</p>
                    )}
                </div>

                {/* Email field */}
                <div className="flex flex-col gap-1">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={values.email}
                        onChange={onChange}
                        className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                </div>

                {/* Password field with toggle */}
                <div className="flex flex-col gap-1 relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={onChange}
                        className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password}</p>
                    )}
                </div>

                {/* Remember me + Forgot password */}
                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-gray-700">
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                            className="accent-blue-600"
                        />
                        Remember me
                    </label>
                    <Link
                        href="/forgot-password"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Forgot password?
                    </Link>
                </div>

                {/* Fallback error */}
                {errors.fallback && (
                    <p className="text-red-500 text-sm text-center">{errors.fallback}</p>
                )}

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`mt-2 ${isLoading
                        ? "bg-gray-400"
                        : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
                        } text-white font-semibold rounded-lg p-3 transition`}
                >
                    {isLoading ? "Creating account..." : "Create account"}
                </button>

                {/* Already have an account */}
                <p className="text-center text-gray-600 text-sm mt-2">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Log in
                    </Link>
                </p>
            </form>
        </div>
    )
}
