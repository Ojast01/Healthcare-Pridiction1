import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  AreaChart, Area, ResponsiveContainer, Legend
} from "recharts";
import { Users, AlertTriangle, ShieldCheck, BarChart3, Heart, Activity } from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";
import { Icon3D } from "../components/ui/Icon3D";
import { useReveal } from "../hooks/useReveal";

/* ── Custom Tooltip ── */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel rounded-2xl p-3.5 border border-sky-100 dark:border-sky-900/50 shadow-xl text-left text-sm min-w-[120px]">
        <p className="font-bold text-slate-800 dark:text-slate-100 mb-1">{label || payload[0].name}</p>
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-2 font-medium">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-slate-500 dark:text-slate-400">{p.name}:</span>
            <span className="text-slate-900 dark:text-slate-200 font-bold">{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

/* ── Mini Activity Bar Chart ── */
function ActivityTracker({ high, low }) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const base = [4, 6, 5, 10, 7, 8, 3];
  const data = days.map((d, i) => ({
    day: d,
    patients: base[i] + Math.floor((high + low) / 10 * (0.5 + i * 0.1)),
    active: i === 3,
  }));
  const max = Math.max(...data.map(d => d.patients));

  return (
    <div className="mt-4">
      <div className="flex items-end gap-2 h-24">
        {data.map((d, i) => (
          <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
            {d.active && (
              <span className="text-[9px] font-bold text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-900/40 px-1.5 py-0.5 rounded-full">
                {d.patients}
              </span>
            )}
            <div
              className="w-full rounded-t-md transition-all duration-700"
              style={{
                height: `${(d.patients / max) * 72}px`,
                background: d.active
                  ? 'linear-gradient(180deg, #0ea5e9, #0369a1)'
                  : 'rgba(186,230,253,0.6)',
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        {days.map(d => (
          <p key={d} className="flex-1 text-center text-[9px] text-slate-400 dark:text-slate-500 font-medium">{d}</p>
        ))}
      </div>
    </div>
  );
}

/* ── Heart Rate Sparkline ── */
function HeartRateChart({ high, low }) {
  const total = high + low || 10;
  const data = [
    { h: 72 }, { h: 85 }, { h: 68 }, { h: 98 }, { h: 76 },
    { h: 88 }, { h: 62 }, { h: 91 }, { h: 74 }, { h: 83 },
    { h: Math.round(60 + (high / total) * 40) },
    { h: Math.round(65 + (low / total) * 35) },
  ].map((d, i) => ({ name: i, value: d.h }));

  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="hrGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#0ea5e9" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.4} />
        <XAxis dataKey="name" hide />
        <YAxis domain={[50, 110]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
        <Tooltip
          content={({ active, payload }) =>
            active && payload?.length ? (
              <div className="glass-panel rounded-xl px-3 py-2 text-xs font-bold text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900/50">
                {payload[0].value} bpm
              </div>
            ) : null
          }
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#0ea5e9"
          strokeWidth={2.5}
          fill="url(#hrGrad)"
          dot={false}
          activeDot={{ r: 5, fill: '#0284c7', stroke: '#fff', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function Dashboard() {
  useReveal();

  const [stats, setStats] = useState({ total: 0, high: 0, low: 0 });
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/stats")
      .then(r => r.json())
      .then(d => setStats(d))
      .catch(() => setError(true));
  }, []);

  const barData = [
    { name: "High Risk", value: stats.high },
    { name: "Low Risk",  value: stats.low  },
  ];

  const cards = [
    { title: "Total Patients", value: stats.total, icon: <Users className="h-6 w-6 text-white" />, from: '#38bdf8', to: '#0284c7', badge: 'All Records' },
    { title: "High Risk",      value: stats.high,  icon: <AlertTriangle className="h-6 w-6 text-white" />, from: '#fca5a5', to: '#dc2626', badge: 'Needs Attention' },
    { title: "Low Risk",       value: stats.low,   icon: <ShieldCheck className="h-6 w-6 text-white" />, from: '#6ee7b7', to: '#059669', badge: 'Healthy' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-0 left-[10%] w-72 h-72 bg-sky-300/15 rounded-full blur-3xl float-orb -z-10 pointer-events-none" />
      <div className="absolute bottom-[5%] right-[5%] w-80 h-80 bg-cyan-300/10 rounded-full blur-3xl float-orb-delay -z-10 pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-12 reveal">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 font-medium text-sm mb-6">
          <BarChart3 className="h-4 w-4" />
          Analytics Overview
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
          Healthcare Dashboard
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Real-time overview of patient risk levels analysed by the prediction engine.
        </p>
      </div>

      {error && (
        <div className="text-amber-700 dark:text-amber-300 text-sm bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 mb-8 text-center">
          Backend not connected — showing default values.
        </div>
      )}

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {cards.map((card, index) => (
          <Card
            key={card.title}
            className="tilt-card reveal shadow-lg border-sky-100/60 dark:border-slate-700"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Icon3D icon={card.icon} from={card.from} to={card.to} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">
                    {card.title}
                  </p>
                  <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {card.value}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-300 border border-sky-100 dark:border-sky-800/50">
                {card.badge}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

        {/* Activity Tracker */}
        <Card className="tilt-card reveal shadow-lg border-sky-100/60 dark:border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="h-5 w-5 text-sky-500" />
                Activity Tracker
              </h3>
              <span className="text-xs text-slate-400 dark:text-slate-500 bg-sky-50 dark:bg-sky-900/20 px-2.5 py-1 rounded-full border border-sky-100 dark:border-sky-800/50">
                Avg: {Math.round((stats.high + stats.low) / 7) || 7}
              </span>
            </div>
            <ActivityTracker high={stats.high} low={stats.low} />
          </CardContent>
        </Card>

        {/* Risk Comparison Bar */}
        <Card className="tilt-card reveal shadow-lg border-sky-100/60 dark:border-slate-700" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-sky-500" />
              Risk Comparison
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData}>
                <defs>
                  <linearGradient id="highGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#f87171" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#dc2626" stopOpacity={0.5} />
                  </linearGradient>
                  <linearGradient id="lowGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#38bdf8" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.4} />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="value"
                  radius={[8, 8, 0, 0]}
                  fill="url(#lowGrad)"
                  label={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Heart Rate Analysis */}
      <Card className="tilt-card reveal shadow-lg border-sky-100/60 dark:border-slate-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-400" />
              Heart Rate Analysis
            </h3>
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30 px-2.5 py-1 rounded-full border border-sky-100 dark:border-sky-800/50">
              98 bpm peak
            </span>
          </div>
          <HeartRateChart high={stats.high} low={stats.low} />
        </CardContent>
      </Card>
    </div>
  );
}