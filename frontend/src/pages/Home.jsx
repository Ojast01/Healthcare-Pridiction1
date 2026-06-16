import { Link } from 'react-router-dom';
import { Shield, Zap, BarChart3, Cloud, ArrowRight, Activity, Heart, Droplets } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Icon3D } from '../components/ui/Icon3D';
import { HealthcareScene3D } from '../components/ui/HealthcareScene3D';
import { useReveal } from '../hooks/useReveal';

function ECGLine({ className = '' }) {
  return (
    <svg
      viewBox="0 0 420 56"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0,28 L55,28 L72,28 L76,12 L80,44 L84,4 L88,52 L92,28 L110,28
           L165,28 L182,28 L186,12 L190,44 L194,4 L198,52 L202,28 L220,28
           L275,28 L292,28 L296,12 L300,44 L304,4 L308,52 L312,28 L330,28
           L385,28 L420,28"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="900"
        strokeDashoffset="900"
        style={{ animation: 'ecg-draw 2s ease forwards, ecg-loop 4s ease 2.1s infinite' }}
      />
    </svg>
  );
}

const features = [
  {
    icon: <Zap className="h-6 w-6 text-white" />,
    from: '#38bdf8', to: '#0284c7',
    title: 'Fast Predictions',
    description: 'Get instant health risk assessments powered by advanced machine learning algorithms.',
  },
  {
    icon: <Shield className="h-6 w-6 text-white" />,
    from: '#67e8f9', to: '#0891b2',
    title: 'Secure Records',
    description: 'Enterprise-grade security ensuring patient data is encrypted and HIPAA compliant.',
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-white" />,
    from: '#a5b4fc', to: '#4f46e5',
    title: 'Smart Analytics',
    description: 'Comprehensive dashboards that visualize patient trends and population health metrics.',
  },
  {
    icon: <Cloud className="h-6 w-6 text-white" />,
    from: '#6ee7b7', to: '#059669',
    title: 'Cloud Based',
    description: 'Access predictive models and patient data securely from anywhere, on any device.',
  },
];

export function Home() {
  useReveal();

  return (
    <div className="flex flex-col">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center">
        <div className="absolute inset-0 hero-sky-bg" />
        <div className="absolute inset-0 hero-grid-overlay opacity-60" />

        {/* Ambient blobs */}
        <div className="absolute top-[8%]  left-[3%]  w-80 h-80 rounded-full bg-sky-300/25  blur-3xl float-orb        pointer-events-none" />
        <div className="absolute bottom-[12%] right-[6%] w-96 h-96 rounded-full bg-cyan-300/20  blur-3xl float-orb-delay pointer-events-none" />
        <div className="absolute top-[45%]  right-[18%] w-52 h-52 rounded-full bg-blue-400/15  blur-3xl float-orb        pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left — content */}
            <div className="text-left">

              {/* Badge */}
              <div
                id="hero-badge"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-900/40 border border-sky-200 dark:border-sky-700/50 text-sky-700 dark:text-sky-300 font-medium text-sm mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                <Activity className="h-4 w-4" />
                Next-Generation Health AI
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
                Smart<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-500">
                  Health Care
                </span>
              </h1>

              {/* Animated ECG */}
              <div className="h-10 mb-6 text-sky-500 dark:text-sky-400">
                <ECGLine className="w-full max-w-xs h-full" />
              </div>

              <p className="text-lg text-slate-600 dark:text-slate-300 mb-10 max-w-lg leading-relaxed">
                Empower clinical decision-making with AI-powered risk prediction.
                Identify high-risk patients instantly with precision analytics.
              </p>

              {/* Vital chips */}
              <div className="flex flex-wrap gap-3 mb-10">
                <div id="vital-heart" className="vital-chip-hero">
                  <span className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center">
                    <Heart className="h-4 w-4 text-red-400" />
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400 font-medium">Heart Rate</p>
                    <p className="font-bold text-slate-800 dark:text-white text-sm leading-none mt-0.5">
                      80 <span className="text-xs font-normal text-slate-500">bpm</span>
                    </p>
                  </div>
                </div>
                <div id="vital-ecg" className="vital-chip-hero">
                  <span className="w-8 h-8 rounded-xl bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center">
                    <Activity className="h-4 w-4 text-sky-500" />
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400 font-medium">ECG</p>
                    <p className="font-bold text-slate-800 dark:text-white text-sm leading-none mt-0.5">
                      90 <span className="text-xs font-normal text-slate-500">bmp</span>
                    </p>
                  </div>
                </div>
                <div id="vital-sugar" className="vital-chip-hero">
                  <span className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                    <Droplets className="h-4 w-4 text-blue-500" />
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400 font-medium">Sugar</p>
                    <p className="font-bold text-slate-800 dark:text-white text-sm leading-none mt-0.5">
                      95 <span className="text-xs font-normal text-slate-500">mg/dL</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  id="cta-predict"
                  to="/predict"
                  className="btn-primary flex items-center justify-center gap-2 text-base px-8 py-3.5 rounded-2xl"
                >
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  id="cta-dashboard"
                  to="/dashboard"
                  className="btn-secondary flex items-center justify-center gap-2 text-base px-8 py-3.5 rounded-2xl"
                >
                  View Analytics
                  <BarChart3 className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Right — 3-D Canvas */}
            <div className="relative h-[380px] lg:h-[520px] rounded-3xl overflow-hidden">
              <HealthcareScene3D />
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 section-sky-surface pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 font-medium text-sm mb-4">
              <BarChart3 className="h-4 w-4" />
              Platform Features
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Enterprise-Grade Platform
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Built for modern healthcare providers requiring speed, accuracy, and absolute data security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group reveal tilt-card"
                style={{ animationDelay: `${index * 0.12}s` }}
              >
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <Icon3D icon={feature.icon} from={feature.from} to={feature.to} />
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

      {/* ── CTA ── */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
          <div className="cta-sky rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            {/* Decorative glows inside CTA */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.18) 0%, transparent 55%),' +
                  'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.12) 0%, transparent 55%)',
              }}
            />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to transform patient care?
              </h2>
              <p className="text-sky-100 text-lg mb-10 max-w-2xl mx-auto">
                Join leading healthcare organisations using our predictive analytics platform
                to identify risks before they become emergencies.
              </p>
              <Link
                id="cta-demo"
                to="/contact"
                className="bg-white text-sky-600 hover:bg-sky-50 font-bold py-3.5 px-10 rounded-2xl shadow-lg transition-all duration-300 active:scale-95 inline-flex items-center gap-2"
              >
                Request a Demo
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
