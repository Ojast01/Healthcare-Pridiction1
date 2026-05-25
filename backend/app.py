from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

model = joblib.load("model.pkl")

# Store predictions (temporary memory)
records = []

@app.route("/")
def home():
    return "Healthcare AI Running"

# 🔹 Prediction API
@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        age = int(data["age"])
        bp = int(data["bloodPressure"])
        sugar = int(data["sugarLevel"])

        prediction = model.predict([[age, bp, sugar]])[0]
        probability = model.predict_proba([[age, bp, sugar]])[0][1]

        score = int(probability * 100)

        if prediction == 1:
            level = "High Risk"
            details = "AI model detected serious health risk."
        else:
            level = "Low Risk"
            details = "AI model detected stable condition."

        # ✅ Save record
        records.append({
            "age": age,
            "bp": bp,
            "sugar": sugar,
            "level": level,
            "score": score
        })

        return jsonify({
            "success": True,
            "level": level,
            "score": score,
            "details": details
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        })


# 🔹 Dashboard API
@app.route("/api/stats", methods=["GET"])
def stats():
    total = len(records)
    high = len([r for r in records if r["level"] == "High Risk"])
    low = len([r for r in records if r["level"] == "Low Risk"])

    return jsonify({
        "total": total,
        "high": high,
        "low": low
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)