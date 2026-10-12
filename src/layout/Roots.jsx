import { useEffect, useState } from 'react';
import { Link, Outlet } from "react-router";
import Footer from '../components/Footer';
import Feature from '../components/Feature';

export default function LayoutWithDrawer() {
    const [isScrolled, setIsScrolled] = useState(false);
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
                        ? 'glass-nav shadow-lg bg-white/85 dark:bg-slate-950/90 border-b border-slate-200/80 dark:border-slate-800/80 py-3 backdrop-blur-md'
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

                        <div className="flex items-center gap-2">
                            <Link
                                to="/login"
                                className={`btn btn-sm sm:btn-md btn-primary transition-colors duration-200 ${isScrolled ? '' : 'btn-outline'
                                    }`}
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </nav>
                {/* Page Content */}
                <main className="">
                    <Outlet/>
                </main>
            </div>

            {/* Drawer Sidebar */}

            <div className="drawer-side z-40 is-drawer-close:overflow-visible">

                <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-16 is-drawer-open:w-64 transition-[width] duration-300">
                    <ul className="menu w-full grow gap-1 p-3">
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
                                    className="size-5"
                                >
                                    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                                    <path d="M9 4v16" />
                                    <path d="M14 10l2 2l-2 2" />
                                </svg>
                            </label>
                        </li>

                        <li>
                            <button
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3"
                                data-tip="Homepage"
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
                                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                </svg>
                                <span className="is-drawer-close:hidden font-medium">Homepage</span>
                            </button>
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

