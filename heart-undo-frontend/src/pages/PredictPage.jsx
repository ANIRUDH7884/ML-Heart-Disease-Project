import { useState } from "react";
import PatientForm from "../components/PatientForm";
import ResultModal from "../components/ResultCard";

const initialFormData = {
  age: "", sex: "", cp: "", trestbps: "", chol: "", fbs: "", restecg: "",
  thalach: "", exang: "", oldpeak: "", slope: "", ca: "", thal: "",
};

function PredictPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  }

  function handleReset() {
    setFormData(initialFormData);
    setResult(null);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setResult(null);
    setError("");
    setLoading(true);

    const requestData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, Number(value)])
    );

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail?.[0]?.msg ?? "The request was rejected.");
      }

      setResult(data);
    } catch (requestError) {
      setError(requestError.message || "Could not reach the API.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <div className="page-head">
        <h1>Predict heart disease</h1>
        <p>Fill in every field, then check the prediction.</p>
      </div>

      <PatientForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
      />

      {error && <p className="error" role="alert">{error}</p>}
      <ResultModal
        result={result}
        onClose={() => setResult(null)}
        onReset={handleReset}
      />
    </main>
  );
}

export default PredictPage;