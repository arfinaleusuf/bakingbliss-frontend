import { useEffect, useState } from 'react';
import { Link } from 'react-router';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            id="navbar"
            className={`sticky top-0 z-30 w-full transition-all duration-300 ${
                isScrolled
                    ? 'glass-nav shadow-lg bg-white/85 dark:bg-slate-950/90 border-b border-slate-200/80 dark:border-slate-800/80 py-3 backdrop-blur-md'
                    : 'bg-base-300/80 backdrop-blur-sm py-4'
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
                            to={'/'}
                            className={`font-bold text-2xl tracking-tight transition-colors duration-200 ${
                                isScrolled
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
                        to="/Login"
                        className={`btn btn-sm sm:btn-md btn-primary transition-colors duration-200 ${
                            isScrolled ? '' : 'btn-outline'
                        }`}
                    >
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;