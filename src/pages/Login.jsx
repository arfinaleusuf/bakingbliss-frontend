
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

export default function Login() {
    const [formData, setFormData] = useState({ username: '', password: '', rememberMe: false });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');
        setIsLoading(true);

        // Mock authentication delay
        setTimeout(() => {
            setIsLoading(false);
            // Example validation check
            if (!formData.email || !formData.password) {
                setErrorMessage('Please fill in both email and password.');
                return;
            }
            // Redirect to home/dashboard on success
            navigate('/');
        }, 1000);
    };

    return (
        <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-6 px-4">
            <div className="card w-full max-w-md bg-base-100 border border-base-300 shadow-xl">
                <div className="card-body p-8 sm:p-10">

                    {/* Header & Bakery Branding */}
                    <div className="text-center space-y-2 mb-4">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-1">
                            <img src="./image/Baking_Bliss.png" alt="" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-base-content">
                            Welcome Back
                        </h1>
                        <p className="text-sm text-base-content/65">
                            Sign in to manage your freshly baked orders & perks
                        </p>
                    </div>

                    {/* Error Alert */}
                    {errorMessage && (
                        <div role="alert" className="alert alert-error text-sm py-2 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Email Field */}
                        <div className="form-control w-full">
                            <label className="label pb-1.5">
                                <span className="label-text font-medium text-base-content">Email address</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="Username"
                                    required
                                    placeholder="Enter Your Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="input input-bordered w-full pl-10 focus:input-primary transition-all text-sm"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40"
                                >
                                    <rect width="20" height="16" x="2" y="4" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="form-control w-full">
                            <div className="flex justify-between items-center pb-1.5">
                                <label className="label-text font-medium text-base-content">Password</label>
                                <Link
                                    to="/forgot-password"
                                    className="text-xs link link-hover text-primary font-medium"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    required
                                    placeholder="Enter Your Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="input input-bordered w-full pl-10 pr-10 focus:input-primary transition-all text-sm"
                                />
                                {/* Lock icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40"
                                >
                                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                {/* Toggle visibility button */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="btn btn-ghost btn-xs btn-circle absolute right-2.5 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                                            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                            <line x1="2" x2="22" y1="2" y2="22" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary w-full mt-3 shadow-md"
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="divider text-xs text-base-content/40 my-5">OR CONTINUE WITH</div>

                    {/* Social Sign-In */}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            className="btn btn-outline btn-sm border-base-300 hover:bg-base-200 normal-case font-normal flex items-center justify-center gap-2"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path
                                    fill="#EA4335"
                                    d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.4 8.9 5 12 5z"
                                />
                                <path
                                    fill="#4285F4"
                                    d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.2-2 .4-2.7L1.6 6.4C.6 8.4 0 10.6 0 13s.6 4.6 1.6 6.6l3.7-2.9z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.4-6.7-5.3L1.6 16c1.9 3.8 5.8 7 10.4 7z"
                                />
                            </svg>
                            Google
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline btn-sm border-base-300 hover:bg-base-200 normal-case font-normal flex items-center justify-center gap-2"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                            </svg>
                            GitHub
                        </button>
                    </div>

                    {/* Footer Sign-up link */}
                    <p className="text-center text-sm text-base-content/70 mt-6">
                        Don&apos;t have an account yet?{' '}
                        <Link to="/signup" className="link link-primary font-semibold">
                            Create account
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}