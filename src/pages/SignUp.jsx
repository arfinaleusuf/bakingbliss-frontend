import { useState } from 'react';
import { Link } from 'react-router';

export default function Signup() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        // Connect your signup API here.
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            setSuccessMessage(
                'Validation successful! Connect your signup API to create your account.'
            );
        }, 500);
    };

    const inputClass =
        'input input-bordered w-full pl-10 focus:input-primary transition-all text-sm';

    const inputIconClass =
        'w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40';

    return (
        <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-10 px-4 bg-base-200/40">
            <div className="card w-full max-w-2xl bg-base-100 border border-base-300 shadow-xl">
                <div className="card-body p-6 sm:p-10">

                    {/* Logo and Header */}
                    <div className="text-center space-y-2 mb-5">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 p-2 mb-2">
                            <img
                                src="/image/Baking_Bliss.png"
                                alt="Baking Bliss logo"
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <h1 className="text-3xl font-extrabold tracking-tight text-base-content">
                            Create Your Account
                        </h1>

                        <p className="text-sm text-base-content/65">
                            Join Baking Bliss and make every moment sweeter.
                        </p>
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                        <div role="alert" className="alert alert-error text-sm py-3 mb-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    {/* Success Message */}
                    {successMessage && (
                        <div role="status" className="alert alert-success text-sm py-3 mb-2">
                            <span>{successMessage}</span>
                        </div>
                    )}

                    {/* Signup Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* First and Last Name */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label pb-1.5" htmlFor="firstname">
                                    <span className="label-text font-medium">First Name</span>
                                </label>
                                <input
                                    id="firstname"
                                    type="text"
                                    name="firstname"
                                    placeholder="Enter first name"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    className="input input-bordered w-full focus:input-primary text-sm"
                                    autoComplete="given-name"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label pb-1.5" htmlFor="lastname">
                                    <span className="label-text font-medium">Last Name</span>
                                </label>
                                <input
                                    id="lastname"
                                    type="text"
                                    name="lastname"
                                    placeholder="Enter last name"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    className="input input-bordered w-full focus:input-primary text-sm"
                                    autoComplete="family-name"
                                    required
                                />
                            </div>
                        </div>

                        {/* Username */}
                        <div className="form-control">
                            <label className="label pb-1.5" htmlFor="username">
                                <span className="label-text font-medium">Username</span>
                            </label>
                            <div className="relative">
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    placeholder="Choose a username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={inputClass}
                                    autoComplete="username"
                                    required
                                    minLength={3}
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className={inputIconClass}
                                >
                                    <path d="M20 21a8 8 0 0 0-16 0" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="form-control">
                            <label className="label pb-1.5" htmlFor="email">
                                <span className="label-text font-medium">Email Address</span>
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={inputClass}
                                    autoComplete="email"
                                    required
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className={inputIconClass}
                                >
                                    <rect width="20" height="16" x="2" y="4" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                            </div>
                        </div>

                        {/* Password */}
                        <div className="form-control">
                            <label className="label pb-1.5" htmlFor="password">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Create a strong password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`${inputClass} pr-12`}
                                    autoComplete="new-password"
                                    minLength={8}
                                    required
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className={inputIconClass}
                                >
                                    <rect width="18" height="11" x="3" y="11" rx="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="btn btn-ghost btn-xs btn-circle absolute right-2 top-1/2 -translate-y-1/2"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                                            <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                                            <path d="M9.9 5.2A10 10 0 0 1 12 5c7 0 10 7 10 7a16 16 0 0 1-4 4.8M6.2 6.2A16 16 0 0 0 2 12s3 7 10 7a10 10 0 0 0 4.2-.9" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <label className="label">
                                <span className="label-text-alt text-base-content/55">
                                    Use at least 8 characters.
                                </span>
                            </label>
                        </div>

                        {/* Confirm Password */}
                        <div className="form-control">
                            <label className="label pb-1.5" htmlFor="confirmPassword">
                                <span className="label-text font-medium">Confirm Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    placeholder="Enter password again"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`${inputClass} pr-12`}
                                    autoComplete="new-password"
                                    required
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className={inputIconClass}
                                >
                                    <rect width="18" height="11" x="3" y="11" rx="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="btn btn-ghost btn-xs btn-circle absolute right-2 top-1/2 -translate-y-1/2"
                                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                                >
                                    {showConfirmPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                                            <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                                            <path d="M9.9 5.2A10 10 0 0 1 12 5c7 0 10 7 10 7a16 16 0 0 1-4 4.8M6.2 6.2A16 16 0 0 0 2 12s3 7 10 7a10 10 0 0 0 4.2-.9" />
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
                                    <span className="loading loading-spinner loading-sm" />
                                    Creating Account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="divider text-xs text-base-content/40 my-4">
                        ALREADY A MEMBER?
                    </div>

                    <p className="text-center text-sm text-base-content/70">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="link link-primary font-semibold"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}