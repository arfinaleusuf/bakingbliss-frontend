import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { baseurl } from "../services/BaseUrl";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";

export default function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const { loading, setLoading, setAuthUser, logout } =
        useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);

        try {
            const loginData = new URLSearchParams();
            loginData.append("username", formData.username);
            loginData.append("password", formData.password);

            const res = await fetch(`${baseurl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: loginData,
            });
            const data = await res.json();

            if (!res.ok) {
                const message = data.detail || "Username or password is incorrect";
                setErrorMessage(message);
                toast.error(message);
                return;
            }

            const accessToken = data?.access_token;
            if (!accessToken) {
                const message = "Login failed. Access token not found";
                setErrorMessage(message);
                toast.error(message);
                return;
            }

            // Persist based on rememberMe preference
            if (formData.rememberMe) {
                localStorage.setItem("access_token", accessToken);
            } else {
                sessionStorage.setItem("access_token", accessToken);
            }

            const userRes = await fetch(`${baseurl}/user`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const userData = await userRes.json();

            if (!userRes.ok || !userData.id) {
                logout();
                const message = "Failed to load user information";
                setErrorMessage(message);
                toast.error(message);
                return;
            }

            setAuthUser(userData);
            toast.success("Login successful!");
            navigate("/");
        } catch (error) {
            console.error(error);
            const message = "Something went wrong. Please try again";
            setErrorMessage(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "input input-bordered w-full pl-10 focus:input-primary transition-all text-sm";
    const inputIconClass =
        "w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40";

    return (
        <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-6 px-4">
            <div className="card w-full max-w-md bg-base-100 border border-base-300 shadow-xl">
                <div className="card-body p-8 sm:p-10">
                    <div className="text-center space-y-2 mb-4">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-1">
                            <img
                                src="/image/Baking_Bliss.png"
                                alt="Baking Bliss logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-base-content">
                            Welcome Back
                        </h1>
                        <p className="text-sm text-base-content/65">
                            Sign in to manage your freshly baked orders &amp; perks
                        </p>
                    </div>

                    {errorMessage && (
                        <div role="alert" className="alert alert-error text-sm py-2 mb-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 shrink-0 stroke-current"
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

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Username */}
                        <div className="form-control w-full">
                            <label className="label pb-1.5" htmlFor="username">
                                <span className="label-text font-medium text-base-content">
                                    Username
                                </span>
                            </label>
                            <div className="relative">
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    required
                                    placeholder="Enter your username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    autoComplete="username"
                                    className={inputClass}
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

                        {/* Password */}
                        <div className="form-control w-full">
                            <div className="flex justify-between items-center pb-1.5">
                                <label className="label-text font-medium text-base-content" htmlFor="password">
                                    Password
                                </label>
                                <Link
                                    to="/forgot-password"
                                    className="text-xs link link-primary link-hover"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    className={`${inputClass} pr-10`}
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
                                    className="btn btn-ghost btn-xs btn-circle absolute right-2.5 top-1/2 -translate-y-1/2 text-base-content/50"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
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
                        </div>

                        {/* Remember Me */}
                        <div className="form-control">
                            <label className="label cursor-pointer justify-start gap-2.5 py-1">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="checkbox checkbox-primary checkbox-xs rounded"
                                />
                                <span className="label-text text-sm">Remember me</span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full mt-2 shadow-md"
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-base-content/70 mt-6">
                        Don&apos;t have an account yet?{" "}
                        <Link to="/signup" className="link link-primary font-semibold">
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}