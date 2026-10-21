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
                toast.error(data.detail || "Username or password is incorrect");
                return;
            }

            const accessToken = data?.access_token;
            if (!accessToken) {
                toast.error("Login failed. Access token not found");
                return;
            }

            localStorage.setItem("access_token", accessToken);

            const userRes = await fetch(`${baseurl}/user`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const userData = await userRes.json();

            if (!userRes.ok || !userData.id) {
                logout();
                toast.error("Failed to load user information");
                return;
            }

            setAuthUser(userData);
            toast.success("Login successful!");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong. Please try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-6 px-4">
            <div className="card w-full max-w-md bg-base-100 border border-base-300 shadow-xl">
                <div className="card-body p-8 sm:p-10">
                    <div className="text-center space-y-2 mb-4">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-1">
                            <img src="./image/Baking_Bliss.png" alt="Logo" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-base-content">
                            Welcome Back
                        </h1>
                        <p className="text-sm text-base-content/65">
                            Sign in to manage your freshly baked orders & perks
                        </p>
                    </div>

                    {errorMessage && (
                        <div role="alert" className="alert alert-error text-sm py-2 mb-2">
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control w-full">
                            <label className="label pb-1.5">
                                <span className="label-text font-medium text-base-content">
                                    Username
                                </span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="username" // lowercase name
                                    required
                                    placeholder="Enter Your Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="input input-bordered w-full pl-10 focus:input-primary transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div className="form-control w-full">
                            <label className="label-text font-medium text-base-content pb-1.5 block">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    placeholder="Enter Your Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="input input-bordered w-full pl-10 pr-10 focus:input-primary transition-all text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="btn btn-ghost btn-xs btn-circle absolute right-2.5 top-1/2 -translate-y-1/2 text-base-content/50"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button (loading স্টেট ব্যবহার) */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full mt-3 shadow-md"
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