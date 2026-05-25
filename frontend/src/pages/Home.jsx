import { Link } from 'react-router-dom';
import { Shield, Zap, BarChart3, Cloud, ArrowRight, Activity } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';

export function Home() {
  const features = [
    {
      icon: <Zap className="h-6 w-6 text-brand-500" />,
      title: 'Fast Predictions',
      description: 'Get instant health risk assessments powered by advanced machine learning algorithms.',
    },
    {
      icon: <Shield className="h-6 w-6 text-brand-500" />,
      title: 'Secure Records',
      description: 'Enterprise-grade security ensuring your patient data is encrypted and HIPAA compliant.',
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-brand-500" />,
      title: 'Smart Analytics',
      description: 'Comprehensive dashboards that visualize patient trends and population health metrics.',
    },
    {
      icon: <Cloud className="h-6 w-6 text-brand-500" />,
      title: 'Cloud Based',
      description: 'Access your predictive models and patient data securely from anywhere, on any device.',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-[0.03] dark:opacity-[0.05]" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/50 to-white dark:from-brand-900/20 dark:to-slate-900" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 font-medium text-sm mb-8 animate-fade-in-up">
              <Activity className="h-4 w-4" />
              <span>Next-Generation Health AI</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8">
              Healthcare Predictive Analytics <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-blue-600">
                Using Big Data
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Empower your clinical decision-making with AI-powered risk prediction. Analyze vital signs and demographics to identify high-risk patients instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/predict" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 text-lg px-8 py-3 rounded-xl">
                Predict Now
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/dashboard" className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2 text-lg px-8 py-3 rounded-xl">
                View Dashboard
                <BarChart3 className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Enterprise-Grade Platform
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Built specifically for modern healthcare providers requiring speed, accuracy, and absolute data security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-lg shadow-slate-200/50 dark:shadow-none hover:-translate-y-1 transition-transform duration-300 bg-white dark:bg-slate-800">
                <CardContent className="pt-6">
                  <div className="bg-brand-50 dark:bg-slate-700/50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-3xl p-10 md:p-16 text-center relative overflow-hidden bg-brand-600 dark:bg-brand-900 border-none">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551076805-e18690c5e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to transform your patient care?
              </h2>
              <p className="text-brand-100 text-lg mb-10 max-w-2xl mx-auto">
                Join leading healthcare organizations using our predictive analytics platform to identify risks before they become emergencies.
              </p>
              <Link to="/contact" className="bg-white text-brand-600 hover:bg-slate-50 font-bold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 active:scale-95 inline-flex items-center gap-2">
                Request a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
