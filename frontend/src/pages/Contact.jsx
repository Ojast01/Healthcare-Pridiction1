import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Icon3D } from '../components/ui/Icon3D';
import { useReveal } from '../hooks/useReveal';

const contactItems = [
  { icon: <Mail  className="h-6 w-6 text-white" />, label: 'Email us at',  value: 'hello@healthpredict.ai', key: 'email' },
  { icon: <Phone className="h-6 w-6 text-white" />, label: 'Call us at',   value: '+91 7983633321',          key: 'phone' },
  { icon: <MapPin className="h-6 w-6 text-white" />, label: 'Visit us',    value: 'CGC Landran, Punjab, India', key: 'map' },
];

export function Contact() {
  useReveal();

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess,    setIsSuccess]    = useState(false);
  const [error,        setError]        = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Cannot connect to server. Make sure your backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-0 right-[5%] w-72 h-72 bg-sky-300/15 rounded-full blur-3xl float-orb -z-10 pointer-events-none" />
      <div className="absolute bottom-[10%] left-0 w-80 h-80 bg-cyan-300/10 rounded-full blur-3xl float-orb-delay -z-10 pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16 reveal">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 font-medium text-sm mb-4">
          <Mail className="h-4 w-4" />
          Contact Us
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Get in Touch</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Have questions about our predictive analytics platform? Our team of healthcare technology experts is ready to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ── Contact Info Panel ── */}
        <div className="lg:col-span-1 reveal">
          <Card className="tilt-card h-full border-none shadow-xl overflow-hidden relative">
            {/* Sky gradient background */}
            <div className="absolute inset-0 cta-sky" />
            {/* Inner glows */}
            <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-sky-300/15 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />

            <CardContent className="p-8 relative z-10 h-full flex flex-col">
              <h3 className="text-2xl font-bold mb-2 text-white">Contact Information</h3>
              <p className="text-sky-100 text-sm mb-10">We're here to help, 24/7</p>

              <div className="space-y-8 flex-grow">
                {contactItems.map(item => (
                  <div key={item.key} className="flex items-start gap-4">
                    <Icon3D
                      icon={item.icon}
                      from="rgba(255,255,255,0.35)"
                      to="rgba(255,255,255,0.1)"
                    />
                    <div>
                      <p className="text-xs text-sky-200 mb-1 font-medium uppercase tracking-wide">{item.label}</p>
                      <p className="text-base font-semibold text-white leading-snug">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative ECG bottom strip */}
              <div className="mt-10 pt-6 border-t border-white/20">
                <svg viewBox="0 0 200 28" className="w-full text-white/40" fill="none">
                  <path
                    d="M0,14 L25,14 L32,14 L35,6 L38,22 L41,2 L44,26 L47,14 L55,14
                       L80,14 L87,14 L90,6 L93,22 L96,2 L99,26 L102,14 L110,14
                       L135,14 L142,14 L145,6 L148,22 L151,2 L154,26 L157,14 L165,14 L200,14"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    strokeDasharray="600" strokeDashoffset="600"
                    style={{ animation: 'ecg-draw 2.5s ease forwards 0.5s, ecg-loop 5s ease 3s infinite' }}
                  />
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Contact Form ── */}
        <div className="lg:col-span-2 space-y-8 reveal" style={{ animationDelay: '0.15s' }}>
          <Card className="tilt-card shadow-lg border-sky-100/60 dark:border-slate-700">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send us a message</h3>

              {isSuccess ? (
                <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-2xl p-8 text-center">
                  <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-800/50 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">Message Sent Successfully!</h4>
                  <p className="text-sm">Thank you for reaching out. Our team will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                      <input type="text" id="contact-name" name="name" value={formData.name} onChange={handleChange} required className="input-field py-3" placeholder="Dr. Jane Doe" />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                      <input type="email" id="contact-email" name="email" value={formData.email} onChange={handleChange} required className="input-field py-3" placeholder="jane.doe@hospital.org" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Subject</label>
                    <input type="text" id="contact-subject" name="subject" value={formData.subject} onChange={handleChange} required className="input-field py-3" placeholder="How can we help you?" />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Message</label>
                    <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} required rows={5} className="input-field py-3 resize-none" placeholder="Tell us about your organisation's needs..." />
                  </div>

                  {error && (
                    <div className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="contact-submit"
                    className="btn-primary py-3.5 px-8 flex items-center justify-center gap-2 rounded-2xl"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Map placeholder */}
          <Card className="tilt-card overflow-hidden shadow-lg border-sky-100/60 dark:border-slate-700 h-56 relative">
            <div className="absolute inset-0 bg-sky-50 dark:bg-slate-800 flex items-center justify-center">
              <div className="text-center text-slate-400 dark:text-slate-500">
                <MapPin className="h-10 w-10 mx-auto mb-2 opacity-40" />
                <p className="font-semibold text-sm">CGC Landran, Punjab</p>
                <p className="text-xs opacity-70 mt-1">Interactive Map Integration</p>
              </div>
              <div className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'linear-gradient(rgba(14,165,233,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.12) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}