const yesNo = [["0", "No"], ["1", "Yes"]];

const sections = [
  {
    title: "Patient",
    hint: "Basic details.",
    fields: [
      { name: "age", label: "Age", min: 1, max: 120 },
      { name: "sex", label: "Sex", options: [["0", "0 – Female"], ["1", "1 – Male"]] },
    ],
  },
  {
    title: "Heart and blood",
    hint: "Resting measurements.",
    fields: [
      {
        name: "cp",
        label: "Chest pain type",
        options: [
          ["0", "0 – Typical angina"],
          ["1", "1 – Atypical angina"],
          ["2", "2 – Non-anginal pain"],
          ["3", "3 – No symptoms"],
        ],
      },
      { name: "trestbps", label: "Resting blood pressure", min: 1, max: 300 },
      { name: "chol", label: "Cholesterol", min: 0, max: 700 },
      { name: "fbs", label: "Fasting blood sugar over 120", options: yesNo },
      {
        name: "restecg",
        label: "Resting ECG",
        options: [
          ["0", "0 – Normal"],
          ["1", "1 – ST-T abnormality"],
          ["2", "2 – Left ventricular hypertrophy"],
        ],
      },
    ],
  },
  {
    title: "Exercise test",
    hint: "Results during exercise.",
    fields: [
      { name: "thalach", label: "Maximum heart rate", min: 1, max: 250 },
      { name: "exang", label: "Exercise angina", options: yesNo },
      { name: "oldpeak", label: "Oldpeak", min: 0, max: 10, step: 0.1 },
      {
        name: "slope",
        label: "ST slope",
        options: [["0", "0 – Upsloping"], ["1", "1 – Flat"], ["2", "2 – Downsloping"]],
      },
      {
        name: "ca",
        label: "Major vessels",
        options: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"]],
      },
      {
        name: "thal",
        label: "Thal code",
        options: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]],
      },
    ],
  },
];

function Field({ field, value, onChange }) {
  return (
    <label className="field">
      {field.label}
      {field.options ? (
        <select name={field.name} value={value} onChange={onChange} required>
          <option value="">Choose</option>
          {field.options.map(([optionValue, optionLabel]) => (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={field.name}
          type="number"
          min={field.min}
          max={field.max}
          step={field.step}
          value={value}
          onChange={onChange}
          required
        />
      )}
    </label>
  );
}

function PatientForm({ formData, onChange, onSubmit, loading }) {
  return (
    <form className="predict-form" onSubmit={onSubmit}>
      {sections.map((section) => (
        <fieldset key={section.title} className="form-section glass" style={{ border: "1px solid var(--glass-border)" }}>
          <legend className="sr-only" style={{ position: "absolute", left: -9999 }}>
            {section.title}
          </legend>
          <h2>{section.title}</h2>
          <p>{section.hint}</p>
          <div className="fields">
            {section.fields.map((field) => (
              <Field
                key={field.name}
                field={field}
                value={formData[field.name]}
                onChange={onChange}
              />
            ))}
          </div>
        </fieldset>
      ))}

      <div className="form-actions">
        <button className="button" type="submit" disabled={loading}>
          {loading ? "Checking…" : "Check prediction"}
        </button>
      </div>
    </form>
  );
}

export default PatientForm;