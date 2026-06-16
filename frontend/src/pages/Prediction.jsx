import { useState } from "react";
import jsPDF from "jspdf";
import { Activity, HeartPulse, Droplet, User, Download, AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";
import { Icon3D } from "../components/ui/Icon3D";
import { useReveal } from "../hooks/useReveal";
import { PredictionVisualizer3D } from "../components/ui/PredictionVisualizer3D";

export function Prediction() {
  useReveal();

  const [formData, setFormData] = useState({ age: "", bloodPressure: "", sugarLevel: "" });
  const [loading,  setLoading]  = useState(false);
  const [result,   setResult]   = useState(null);
  const [error,    setError]    = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age:           parseInt(formData.age),
          bloodPressure: parseInt(formData.bloodPressure),
          sugarLevel:    parseInt(formData.sugarLevel),
        }),
      });
      setResult(await response.json());
    } catch {
      setError("Cannot connect to server. Make sure your backend is running.");
    }
    setLoading(false);
  };

  const downloadPDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Healthcare AI Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`Age: ${formData.age}`, 20, 40);
    doc.text(`Blood Pressure: ${formData.bloodPressure}`, 20, 50);
    doc.text(`Sugar Level: ${formData.sugarLevel}`, 20, 60);
    doc.text(`Risk Level: ${result.level}`, 20, 80);
    doc.text(`Risk Score: ${result.score}%`, 20, 90);
    doc.text(`Details: ${result.details}`, 20, 100);
    doc.text(`Generated On: ${new Date().toLocaleString()}`, 20, 120);
    doc.save("health_report.pdf");
  };

  const riskStyles = () => {
    if (!result) return {};
    if (result.level === "High Risk")   return { text: "text-red-600 dark:text-red-400",    bg: "bg-red-50 dark:bg-red-900/20",     border: "border-red-200 dark:border-red-800",     bar: "bg-red-500",     icon: <AlertCircle  className="h-8 w-8 text-red-500"   /> };
    if (result.level === "Medium Risk") return { text: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20", border: "border-amber-200 dark:border-amber-800", bar: "bg-amber-500", icon: <AlertTriangle className="h-8 w-8 text-amber-500" /> };
    return {                                    text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20", border: "border-emerald-200 dark:border-emerald-800", bar: "bg-emerald-500", icon: <CheckCircle2 className="h-8 w-8 text-emerald-500" /> };
  };

  const styles = riskStyles();

  let visualizerState = "idle";
  if (loading) visualizerState = "loading";
  else if (result) visualizerState = result.level === "High Risk" ? "high" : "low";

  /* ── Field config ── */
  const fields = [
    { name: "age",           label: "Age",                    placeholder: "e.g. 45",  icon: <User       className="h-5 w-5 text-slate-400" /> },
    { name: "bloodPressure", label: "Blood Pressure (mmHg)",  placeholder: "e.g. 120", icon: <HeartPulse className="h-5 w-5 text-slate-400" /> },
    { name: "sugarLevel",    label: "Sugar Level (mg/dL)",    placeholder: "e.g. 90",  icon: <Droplet    className="h-5 w-5 text-slate-400" /> },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-[5%]  left-[5%]  w-72 h-72 bg-sky-300/15   rounded-full blur-3xl float-orb       -z-10 pointer-events-none" />
      <div className="absolute bottom-[5%] right-[5%] w-80 h-80 bg-cyan-300/10  rounded-full blur-3xl float-orb-delay -z-10 pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-12 reveal">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 font-medium text-sm mb-6">
          <Activity className="h-4 w-4" />
          AI Risk Engine
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
          Health Risk Prediction
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Enter the patient's vitals below to generate an instant AI-powered risk assessment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* ── Form Card ── */}
        <Card className="tilt-card reveal shadow-lg border-sky-100/60 dark:border-slate-700">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <Icon3D
                icon={<HeartPulse className="h-6 w-6 text-white" />}
                from="#38bdf8"
                to="#0284c7"
              />
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Patient Vitals</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Enter accurate patient data</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {fields.map(f => (
                <div key={f.name}>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    {f.label}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {f.icon}
                    </div>
                    <input
                      type="number"
                      name={f.name}
                      placeholder={f.placeholder}
                      value={formData[f.name]}
                      onChange={handleChange}
                      required
                      className="input-field pl-10 py-3"
                    />
                  </div>
                </div>
              ))}

              {error && (
                <div className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                id="predict-submit"
                className="w-full btn-primary py-3.5 flex justify-center items-center gap-2 text-base rounded-2xl"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Analysing...
                  </>
                ) : (
                  <>
                    Run Prediction
                    <Activity className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </CardContent>
        </Card>

        {/* ── Result Card ── */}
        <Card className="tilt-card reveal shadow-lg border-sky-100/60 dark:border-slate-700 min-h-[300px]" style={{ animationDelay: '0.15s' }}>
          <CardContent className="p-8 h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Risk Assessment
            </h3>

            <PredictionVisualizer3D state={visualizerState} />

            {!result && !loading && (
              <div className="flex-grow flex flex-col items-center justify-center text-center text-slate-400 dark:text-slate-500 py-8">
                <div className="w-16 h-16 rounded-2xl bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center mb-4 mx-auto">
                  <Activity className="h-8 w-8 text-sky-300 dark:text-sky-700" />
                </div>
                <p className="text-sm">Submit patient vitals to view the AI-generated risk report here.</p>
              </div>
            )}

            {loading && (
              <div className="flex-grow flex flex-col items-center justify-center text-center text-slate-400 dark:text-slate-500 py-8">
                <p className="text-sm animate-pulse">Running prediction model...</p>
              </div>
            )}

            {result && (
              <div className="flex-grow flex flex-col">
                <div className={`rounded-2xl p-6 border ${styles.bg} ${styles.border} text-center mb-6`}>
                  <div className="flex justify-center mb-3">{styles.icon}</div>
                  <h2 className={`text-2xl font-extrabold ${styles.text}`}>{result.level}</h2>
                  <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">{result.details}</p>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
                    <span>Risk Score</span>
                    <span>{result.score}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${styles.bar} rounded-full transition-all duration-700`}
                      style={{ width: `${result.score}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={downloadPDF}
                  id="download-pdf"
                  className="btn-secondary w-full py-3 flex items-center justify-center gap-2 mt-auto rounded-2xl"
                >
                  Download PDF Report
                  <Download className="h-5 w-5" />
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
