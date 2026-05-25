import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Mail, Lock, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';

export function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.success) {
        alert("Login Successful");
        navigate("/dashboard");
      } else {
        alert("Invalid Email or Password");
      }

    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/10 dark:bg-brand-900/20 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md space-y-8 relative z-10">

        <div className="text-center">
          <div className="mx-auto bg-brand-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-brand-500/30">
            <Activity className="h-8 w-8 text-white" />
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Welcome back
          </h2>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Please sign in to access your dashboard
          </p>
        </div>

        <Card className="shadow-2xl border-slate-200/60 dark:border-slate-700/60 backdrop-blur-sm bg-white/90 dark:bg-slate-800/90">
          <CardContent className="p-8">

            <form className="space-y-6" onSubmit={handleSubmit}>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email address
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>

                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field pl-10 py-3"
                    placeholder="admin@gmail.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Password
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>

                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field pl-10 py-3"
                    placeholder="admin123"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-brand-600 border-slate-300 rounded"
                />

                <label className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                className="w-full btn-primary py-3 flex justify-center items-center gap-2"
              >
                Sign in
                <ArrowRight className="h-5 w-5" />
              </button>

            </form>

          </CardContent>
        </Card>

        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          Don't have an account?{" "}
          <Link to="/contact" className="font-medium text-brand-600">
            Contact sales
          </Link>
        </p>

      </div>
    </div>
  );
}