import { useState } from "react";
import jsPDF from "jspdf";

export function Prediction() {
  const [formData, setFormData] = useState({
    age: "",
    bloodPressure: "",
    sugarLevel: ""
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Call backend API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          age: parseInt(formData.age),
          bloodPressure: parseInt(formData.bloodPressure),
          sugarLevel: parseInt(formData.sugarLevel)
        })
      });

      const data = await response.json();
      setResult(data);

    } catch (error) {
      alert("Backend not connected");
    }

    setLoading(false);
  };

  // Download PDF
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

    const date = new Date().toLocaleString();
    doc.text(`Generated On: ${date}`, 20, 120);

    doc.save("health_report.pdf");
  };

  // UI color based on risk
  const getColor = () => {
    if (!result) return "white";
    if (result.level === "High Risk") return "#ff4d4f";
    if (result.level === "Medium Risk") return "#faad14";
    return "#00d084";
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#07152d",
      color: "white",
      padding: "40px"
    }}>
      <h1 style={{
        textAlign: "center",
        fontSize: "36px",
        marginBottom: "20px"
      }}>
        AI Health Risk Prediction
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "500px",
          margin: "auto",
          background: "#102447",
          padding: "30px",
          borderRadius: "20px"
        }}
      >
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="number"
          name="bloodPressure"
          placeholder="Blood Pressure"
          value={formData.bloodPressure}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="number"
          name="sugarLevel"
          placeholder="Sugar Level"
          value={formData.sugarLevel}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          {loading ? "Analyzing..." : "Run Prediction"}
        </button>
      </form>

      {result && (
        <div style={{
          maxWidth: "500px",
          margin: "40px auto",
          background: "#102447",
          padding: "30px",
          borderRadius: "20px",
          textAlign: "center"
        }}>
          <h2 style={{
            color: getColor(),
            fontSize: "30px"
          }}>
            {result.level}
          </h2>

          <h3>Risk Score: {result.score}%</h3>

          <p style={{ color: "#bbb" }}>
            {result.details}
          </p>

          {/* PDF Button */}
          <button
            onClick={downloadPDF}
            style={{
              marginTop: "20px",
              padding: "12px 20px",
              background: "#1890ff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Download PDF Report
          </button>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "15px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "none",
  fontSize: "16px"
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  background: "#00d084",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontSize: "18px",
  cursor: "pointer"
};