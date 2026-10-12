import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-base-300 bg-base-200/50 text-base-content transition-colors duration-200">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Brand Info & Newsletter */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-2">
              <img
                src="./image/Baking_Bliss.png"
                alt="Baking Bliss Logo"
                className="h-9 w-auto object-contain"
              />
              <span className="text-2xl font-bold tracking-tight text-base-content">
                Baking Bliss
              </span>
            </div>
            
            <p className="max-w-sm text-sm text-base-content/70 leading-relaxed">
              Crafting artisan breads, delicate pastries, and wholesome morning bakes 
              from locally sourced, 100% organic ingredients every single dawn.
            </p>

            {/* Micro Opening Hours */}
            <div className="flex items-center gap-2 text-xs text-base-content/60 font-medium">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Open Daily: 7:00 AM – 8:00 PM</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/50">
              Menu & Bakes
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/menu" className="link link-hover text-base-content/80 hover:text-primary">
                  Artisan Sourdough
                </Link>
              </li>
              <li>
                <Link to="/menu" className="link link-hover text-base-content/80 hover:text-primary">
                  Viennoiserie & Croissants
                </Link>
              </li>
              <li>
                <Link to="/menu" className="link link-hover text-base-content/80 hover:text-primary">
                  Cakes & Special Tarts
                </Link>
              </li>
              <li>
                <Link to="/menu" className="link link-hover text-base-content/80 hover:text-primary">
                  Seasonal Specials
                </Link>
              </li>
            </ul>
          </div>

          {/* Bakery / Company */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/50">
              Our Bakery
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="link link-hover text-base-content/80 hover:text-primary">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/ingredients" className="link link-hover text-base-content/80 hover:text-primary">
                  Organic Ingredients
                </Link>
              </li>
              <li>
                <Link to="/locations" className="link link-hover text-base-content/80 hover:text-primary">
                  Store Locator
                </Link>
              </li>
              <li>
                <Link to="/contact" className="link link-hover text-base-content/80 hover:text-primary">
                  Catering & Custom Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials & Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/50">
              Connect
            </h3>
            <div className="flex gap-3 text-base-content/70">
              {/* Instagram */}
              <a
                href="#instagram"
                aria-label="Instagram"
                className="btn btn-circle btn-sm btn-ghost border border-base-300 hover:text-primary"
              >
                <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#facebook"
                aria-label="Facebook"
                className="btn btn-circle btn-sm btn-ghost border border-base-300 hover:text-primary"
              >
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.688 5H18V0h-3.808C10.592 0 9 1.582 9 4.615V8z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="#twitter"
                aria-label="Twitter"
                className="btn btn-circle btn-sm btn-ghost border border-base-300 hover:text-primary"
              >
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>

            <p className="text-xs text-base-content/60 pt-2">
              Have questions? Email us at <br />
              <span className="font-semibold text-base-content/80">hello@bakingbliss.com</span>
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-base-300/80 pt-6 text-xs text-base-content/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Baking Bliss Bakery Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="link link-hover hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/terms" className="link link-hover hover:text-primary">
              Terms of Service
            </Link>
            <Link to="/cookies" className="link link-hover hover:text-primary">
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}