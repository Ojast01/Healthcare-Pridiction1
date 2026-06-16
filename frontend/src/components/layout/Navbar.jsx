import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/useTheme';

export function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home',      path: '/' },
    { name: 'Predict',   path: '/predict' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Contact',   path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-sky-100/60 dark:border-slate-700/60 rounded-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                Health<span className="text-sky-500 dark:text-sky-400">Predict</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-sky-50/60 dark:hover:bg-sky-900/20 hover:text-sky-600 dark:hover:text-sky-400'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex items-center space-x-3 pl-4 ml-2 border-l border-slate-200 dark:border-slate-700">
              {/* Theme Toggle */}
              <button
                id="theme-toggle"
                onClick={toggleTheme}
                className="p-2 rounded-xl text-slate-500 hover:bg-sky-50 dark:text-slate-400 dark:hover:bg-sky-900/20 hover:text-sky-500 dark:hover:text-sky-400 transition-all"
                aria-label="Toggle theme"
              >
                {isDarkMode
                  ? <Sun  className="h-5 w-5" />
                  : <Moon className="h-5 w-5" />
                }
              </button>

              <Link
                id="nav-login"
                to="/login"
                className="btn-primary text-sm py-2 px-5 rounded-xl"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center md:hidden space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 hover:bg-sky-50 dark:text-slate-400 dark:hover:bg-sky-900/20 transition-all"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-500 hover:bg-sky-50 dark:text-slate-400 dark:hover:bg-sky-900/20 transition-all"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-sky-100/60 dark:border-slate-700/60">
          <div className="px-3 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  isActive(link.path)
                    ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-sky-50/60 dark:hover:bg-sky-900/20 hover:text-sky-600 dark:hover:text-sky-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center btn-primary py-2.5 rounded-xl"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
