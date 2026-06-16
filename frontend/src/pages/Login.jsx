import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Mail, Lock, ArrowRight, Heart } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const data = await response.json();
      if (data.success) { alert("Login Successful"); navigate("/dashboard"); }
      else alert("Invalid Email or Password");
    } catch {
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* Ambient blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-400/10 dark:bg-sky-900/20 rounded-full blur-3xl -z-10" />
      <div className="absolute top-[15%] right-[12%] w-72 h-72 bg-cyan-300/12 rounded-full blur-3xl float-orb -z-10 pointer-events-none" />
      <div className="absolute bottom-[10%] left-[8%]  w-64 h-64 bg-blue-400/10 rounded-full blur-3xl float-orb-delay -z-10 pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">

        {/* Logo + heading */}
        <div className="text-center">
          <div className="mx-auto mb-5 w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shadow-lg shadow-sky-500/30">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Sign in to access your healthcare dashboard</p>
        </div>

        {/* Card */}
        <Card className="tilt-card shadow-2xl border-sky-100/60 dark:border-slate-700/60">
          <CardContent className="p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    id="login-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field pl-10 py-3"
                    placeholder="admin@gmail.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    id="login-password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field pl-10 py-3"
                    placeholder="admin123"
                  />
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400"
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Remember me</span>
                </label>
                <span className="text-sm font-medium text-sky-600 dark:text-sky-400 cursor-pointer hover:underline">
                  Forgot password?
                </span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                id="login-submit"
                className="w-full btn-primary py-3.5 flex justify-center items-center gap-2 rounded-2xl"
              >
                Sign in
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700/50 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Don't have an account?{' '}
                <Link to="/contact" className="font-semibold text-sky-600 dark:text-sky-400 hover:underline">
                  Contact sales
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Trust badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Heart className="h-3.5 w-3.5 text-red-400" />
          <span>HIPAA-compliant · End-to-end encrypted · Trusted by 500+ hospitals</span>
        </div>

      </div>
    </div>
  );
}