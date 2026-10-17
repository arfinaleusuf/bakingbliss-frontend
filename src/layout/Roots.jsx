import { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from "react-router";
import { IoHome } from "react-icons/io5";
import { AuthContext } from '../context/AuthProvider';

export default function LayoutWithDrawer() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { authUser, logout } = useContext(AuthContext)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="drawer lg:drawer-open min-h-screen bg-base-100">
            {/* Drawer Toggle Checkbox */}
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            {/* Main Page Area */}
            <div className="drawer-content flex flex-col">
                {/* Dynamic / Glass Navbar */}
                <nav
                    id="navbar"
                    className={`sticky top-0 z-30 w-full transition-all duration-300 ${isScrolled
                        ? 'glass-nav shadow-lg bg-white/85 dark:bg-slate-950/90 py-3 backdrop-blur-md'
                        : 'bg-base-100 backdrop-blur-sm py-4'
                        }`}
                >
                    <div className="flex justify-between items-center w-full px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-3">
                            {/* Brand Logo & Name */}
                            <div className="flex items-center gap-2">

                                <img
                                    src="./image/Baking_Bliss.png"
                                    alt="Baking Bliss Logo"
                                    className="h-9 w-auto object-contain"
                                />

                                <Link
                                    to={"/"}
                                    className={`font-bold text-2xl tracking-tight transition-colors duration-200 ${isScrolled
                                        ? 'text-slate-900 dark:text-white'
                                        : 'text-slate-800 dark:text-slate-100'
                                        }`}
                                >
                                    Baking Bliss
                                </Link>
                            </div>
                        </div>

                        {/* Navigation Actions */}
                        <div className="flex items-center gap-3">
                            {authUser ? (
                                <div className="dropdown dropdown-end">
                                    {/* Dropdown Trigger Button */}
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="btn btn-ghost flex items-center gap-2 px-2 hover:bg-base-200 rounded-full sm:rounded-lg"
                                    >
                                        {/* Avatar with fallback letter */}
                                        <div className="avatar placeholder">
                                            <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1 overflow-hidden bg-primary text-primary-content flex items-center justify-center font-semibold uppercase text-xs">
                                                {authUser.img_url ? (
                                                    <img
                                                        src={authUser.img_url}
                                                        alt={authUser.username.charAt(0) || "User avatar"}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span>
                                                        {authUser.username ? authUser.username.charAt(0).toUpperCase() : 'U'}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Username */}
                                        <span className="font-medium text-sm hidden sm:inline-block">
                                            {authUser.username}
                                        </span>

                                        {/* Dropdown Arrow Icon */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="size-4 opacity-70 hidden sm:inline-block"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>

                                    {/* Dropdown Menu Items */}
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content menu z-[1] mt-2 p-2 shadow-lg bg-base-100 rounded-box w-48 border border-base-200"
                                    >
                                        {/* User Info Header (Mobile/Extra context) */}
                                        <li className="menu-title px-4 py-1 text-xs text-slate-500">
                                            Signed in as <span className="font-semibold text-slate-800 dark:text-slate-200">{authUser.username}</span>
                                        </li>

                                        <li>
                                            <Link to="/profile" className="flex items-center gap-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="size-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    />
                                                </svg>
                                                View Profile
                                            </Link>
                                        </li>

                                        <div className="divider my-1"></div>

                                        <li>
                                            <button
                                                onClick={logout}
                                                className="flex items-center gap-2 text-error hover:bg-error/10"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="size-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                    />
                                                </svg>
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className={`btn btn-sm sm:btn-md btn-primary transition-colors duration-200 ${isScrolled ? '' : 'btn-outline'
                                        }`}
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </nav>
                {/* Page Content */}
                <main className="">
                    <Outlet />
                </main>
            </div>

            {/* Drawer Sidebar */}

            <div className="drawer-side z-40 is-drawer-close:overflow-visible">

                <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <div className="flex min-h-full flex-col items-start bg-white shadow-2xl is-drawer-close:w-16 is-drawer-open:w-48 transition-[width] duration-300">
                    <ul className="menu w-full grow gap-2 p-3">
                        {/* Home Item */}
                        <li>
                            {/* Drawer Toggle Button */}
                            <label
                                htmlFor="my-drawer-4"
                                aria-label="open sidebar"
                                className="btn btn-square btn-ghost drawer-button"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                    fill="none"
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                                    <path d="M9 4v16" />
                                    <path d="M14 10l2 2l-2 2" />
                                </svg>
                            </label>
                        </li>

                        <li>
                            <Link
                                to="/"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3"
                                data-tip="Homepage"
                            >
                                <IoHome className="text-xl shrink-0" />
                                <span className="is-drawer-close:hidden font-medium">Homepage</span>
                            </Link>
                        </li>

                        <li>
                            <button
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3"
                                data-tip="Settings"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                    fill="none"
                                    stroke="currentColor"
                                    className="size-5 shrink-0"
                                >

                                    <path d="M20 7h-9" />
                                    <path d="M14 17H5" />
                                    <circle cx="17" cy="17" r="3" />
                                    <circle cx="7" cy="7" r="3" />
                                </svg>
                                <span className="is-drawer-close:hidden font-medium">Settings</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    );
}

