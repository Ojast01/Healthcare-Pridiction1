import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

export function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    high: 0,
    low: 0
  });

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/stats")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => alert("Backend not connected"));
  }, []);

  const barData = [
    { name: "High Risk", value: stats.high },
    { name: "Low Risk", value: stats.low }
  ];

  const pieData = [
    { name: "High Risk", value: stats.high },
    { name: "Low Risk", value: stats.low }
  ];

  const COLORS = ["#ff4d4f", "#00d084"];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#07152d",
      color: "white",
      padding: "40px"
    }}>
      <h1 style={{
        textAlign: "center",
        fontSize: "42px",
        marginBottom: "40px"
      }}>
        Healthcare Dashboard
      </h1>

      {/* Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
        gap: "20px",
        marginBottom: "40px"
      }}>
        <Card title="Total" value={stats.total} color="#00d084" />
        <Card title="High Risk" value={stats.high} color="#ff4d4f" />
        <Card title="Low Risk" value={stats.low} color="#1890ff" />
      </div>

      {/* Charts */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "30px"
      }}>

        {/* Bar Chart */}
        <div style={{ background: "#102447", padding: "20px", borderRadius: "20px" }}>
          <h3>Risk Bar Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="value" fill="#00d084" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div style={{ background: "#102447", padding: "20px", borderRadius: "20px" }}>
          <h3>Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div style={{
      background: "#102447",
      padding: "30px",
      borderRadius: "20px",
      textAlign: "center"
    }}>
      <h3 style={{ color: "#aaa" }}>{title}</h3>
      <h1 style={{ fontSize: "42px", color }}>{value}</h1>
    </div>
  );
}