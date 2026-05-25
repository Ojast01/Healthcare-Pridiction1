import { Link } from 'react-router-dom';
import { Activity, MessageSquare, Share2, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group inline-flex">
              <div className="bg-brand-500 p-1.5 rounded-md group-hover:bg-brand-600 transition-colors">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                Health<span className="text-brand-600 dark:text-brand-400">Predict</span>
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm">
              Advanced AI-powered healthcare analytics predicting patient risk factors using big data. Empowering professionals with smart insights.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-slate-400 hover:text-brand-500 transition-colors">
                <span className="sr-only">Contact</span>
                <MessageSquare className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-brand-500 transition-colors">
                <span className="sr-only">Social</span>
                <Share2 className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-brand-500 transition-colors">
                <span className="sr-only">Website</span>
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/predict" className="text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 transition-colors">
                  Risk Prediction
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 transition-colors">
                  Analytics Dashboard
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 transition-colors">
                  HIPAA Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} HealthPredict Analytics. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 md:mt-0 text-center md:text-right">
            Designed for healthcare professionals.
          </p>
        </div>
      </div>
    </footer>
  );
}
