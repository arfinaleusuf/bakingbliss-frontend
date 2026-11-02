import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { baseurl } from '../services/BaseUrl';
const apiKey = import.meta.env.VITE_IMGBB_KEY;

export default function Signup() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone_number: '',
    });

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Clean up image preview URL when the component unmounts
    // or when the selected image changes.
    useEffect(() => {
        if (!image) {
            setImagePreview('');
            return;
        }

        const previewUrl = URL.createObjectURL(image);
        setImagePreview(previewUrl);

        return () => {
            URL.revokeObjectURL(previewUrl);
        };
    }, [image]);

    // Handle text inputs
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        setErrorMessage('');
        setSuccessMessage('');

        if (!file) return;

        // Validate image type
        if (!file.type.startsWith('image/')) {
            setErrorMessage('Please select a valid image.');
            e.target.value = '';
            return;
        }

        // Maximum file size: 5 MB
        if (file.size > 5 * 1024 * 1024) {
            setErrorMessage(
                'Image size must be less than 5 MB.'
            );
            e.target.value = '';
            return;
        }

        setImage(file);
    };

    // Upload image to ImgBB
    const uploadImageToImgBB = async (imageFile) => {

        const uploadData = new FormData();
        uploadData.append('image', imageFile);

        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${apiKey}`,
            {
                method: 'POST',
                body: uploadData,
            }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(
                result.error?.message || 'Failed to upload image to ImgBB.'
            );
        }

        return result.data.url;
    };

    // Handle signup
    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage('');
        setSuccessMessage('');

        // Password validation
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        if (formData.password.length < 8) {
            setErrorMessage(
                'Password must contain at least 8 characters.'
            );
            return;
        }

        try {
            setIsLoading(true);

            // Step 1: Upload the image to ImgBB
            let imageUrl = '';

            if (image) {
                imageUrl = await uploadImageToImgBB(image);
            }

            const signupData = {
                email: formData.email.trim(),
                username: formData.username.trim(),
                firstname: formData.firstname.trim(),
                lastname: formData.lastname.trim(),
                password: formData.password,
                phone_number: formData.phone_number.trim(),
                img_url: imageUrl,
            };

            const response = await fetch(
                `${baseurl.replace(/\/+$/, '')}/createuser`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(signupData),
                }
            );

            const result = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    result.message ||
                    result.error ||
                    'Failed to create your account.'
                );
            }

            setSuccessMessage(
                result.message ||
                'Account created successfully!'
            );

            // Reset form after successful signup
            setFormData({
                firstname: '',
                lastname: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                phone_number: '',
            });

            setImage(null);

            const imageInput =
                document.getElementById('profileImage');

            if (imageInput) {
                imageInput.value = '';
            }
        } catch (error) {
            setErrorMessage(
                error.message ||
                'Something went wrong. Please try again.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const inputClass =
        'input input-bordered w-full focus:input-primary text-sm';

    const iconClass =
        'w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40';

    const iconInputClass =
        `${inputClass} pl-10`;

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
                        <div
                            role="alert"
                            className="alert alert-error text-sm py-3 mb-2"
                        >
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
                        <div
                            role="status"
                            className="alert alert-success text-sm py-3 mb-2"
                        >
                            <span>{successMessage}</span>
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        {/* Profile Image Upload */}
                        <div className="form-control">
                            <label
                                htmlFor="profileImage"
                                className="label pb-1.5"
                            >
                                <span className="label-text font-medium">
                                    Profile Image
                                </span>
                            </label>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="avatar">
                                    <div className="w-24 h-24 rounded-full border border-base-300 bg-base-200">
                                        <img
                                            src={
                                                imagePreview ||
                                                '/image/default-avatar.png'
                                            }
                                            alt="Profile preview"
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src =
                                                    '/image/Baking_Bliss.png';
                                            }}
                                            className="object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 w-full">
                                    <input
                                        id="profileImage"
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                        onChange={handleImageChange}
                                        className="file-input file-input-bordered w-full"
                                    />

                                    <p className="text-xs text-base-content/60 mt-2">
                                        JPG, PNG or WebP. Maximum 5 MB.
                                    </p>

                                    {image && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImage(null);

                                                const input =
                                                    document.getElementById(
                                                        'profileImage'
                                                    );

                                                if (input) {
                                                    input.value = '';
                                                }
                                            }}
                                            className="btn btn-ghost btn-xs mt-1"
                                        >
                                            Remove image
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* First and Last Name */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label
                                    className="label pb-1.5"
                                    htmlFor="firstname"
                                >
                                    <span className="label-text font-medium">
                                        First Name
                                    </span>
                                </label>

                                <input
                                    id="firstname"
                                    type="text"
                                    name="firstname"
                                    placeholder="Enter first name"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    className={inputClass}
                                    autoComplete="given-name"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label
                                    className="label pb-1.5"
                                    htmlFor="lastname"
                                >
                                    <span className="label-text font-medium">
                                        Last Name
                                    </span>
                                </label>

                                <input
                                    id="lastname"
                                    type="text"
                                    name="lastname"
                                    placeholder="Enter last name"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    className={inputClass}
                                    autoComplete="family-name"
                                    required
                                />
                            </div>
                        </div>

                        {/* Username */}
                        <div className="form-control">
                            <label
                                className="label pb-1.5"
                                htmlFor="username"
                            >
                                <span className="label-text font-medium">
                                    Username
                                </span>
                            </label>

                            <div className="relative">
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    placeholder="Choose a username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={iconInputClass}
                                    autoComplete="username"
                                    minLength={3}
                                    required
                                />

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className={iconClass}
                                >
                                    <path d="M20 21a8 8 0 0 0-16 0" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="form-control">
                            <label
                                className="label pb-1.5"
                                htmlFor="email"
                            >
                                <span className="label-text font-medium">
                                    Email Address
                                </span>
                            </label>

                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={iconInputClass}
                                    autoComplete="email"
                                    required
                                />

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className={iconClass}
                                >
                                    <rect
                                        width="20"
                                        height="16"
                                        x="2"
                                        y="4"
                                        rx="2"
                                    />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div className="form-control">
                            <label
                                className="label pb-1.5"
                                htmlFor="phone_number"
                            >
                                <span className="label-text font-medium">
                                    Phone Number
                                </span>
                            </label>

                            <input
                                id="phone_number"
                                type="tel"
                                name="phone_number"
                                placeholder="Enter phone number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                className={inputClass}
                                autoComplete="tel"
                            />
                        </div>

                        {/* Password */}
                        <div className="form-control">
                            <label
                                className="label pb-1.5"
                                htmlFor="password"
                            >
                                <span className="label-text font-medium">
                                    Password
                                </span>
                            </label>

                            <div className="relative">
                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    name="password"
                                    placeholder="Create a strong password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`${iconInputClass} pr-12`}
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
                                    className={iconClass}
                                >
                                    <rect
                                        width="18"
                                        height="11"
                                        x="3"
                                        y="11"
                                        rx="2"
                                    />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                    className="btn btn-ghost btn-xs btn-circle absolute right-2 top-1/2 -translate-y-1/2"
                                    aria-label={
                                        showPassword
                                            ? 'Hide password'
                                            : 'Show password'
                                    }
                                >
                                    {showPassword ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className="w-4 h-4"
                                        >
                                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className="w-4 h-4"
                                        >
                                            <path d="M3 3l18 18" />
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
                            <label
                                className="label pb-1.5"
                                htmlFor="confirmPassword"
                            >
                                <span className="label-text font-medium">
                                    Confirm Password
                                </span>
                            </label>

                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    name="confirmPassword"
                                    placeholder="Enter password again"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`${iconInputClass} pr-12`}
                                    autoComplete="new-password"
                                    required
                                />

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className={iconClass}
                                >
                                    <rect
                                        width="18"
                                        height="11"
                                        x="3"
                                        y="11"
                                        rx="2"
                                    />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            (prev) => !prev
                                        )
                                    }
                                    className="btn btn-ghost btn-xs btn-circle absolute right-2 top-1/2 -translate-y-1/2"
                                    aria-label={
                                        showConfirmPassword
                                            ? 'Hide confirm password'
                                            : 'Show confirm password'
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className="w-4 h-4"
                                        >
                                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className="w-4 h-4"
                                        >
                                            <path d="M3 3l18 18" />
                                            <path d="M9.9 5.2A10 10 0 0 1 12 5c7 0 10 7 10 7s-3 7-10 7a10 10 0 0 1-4.2-.9" />
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
                                    {image
                                        ? 'Uploading Image & Creating Account...'
                                        : 'Creating Account...'}
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