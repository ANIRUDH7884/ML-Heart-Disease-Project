import { Link } from "react-router-dom";
import heart from "../assets/heart.png";

const steps = [
  {
    title: "Enter your measurements",
    text: "Age, blood pressure, cholesterol and a few more routine values.",
  },
  {
    title: "The model runs",
    text: "Your values go to our trained model, which returns a prediction.",
  },
  {
    title: "Read your result",
    text: "See the outcome in a simple summary and start over any time.",
  },
];

function HomePage() {
  return (
    <main>
      <section className="hero glass">
        <div>
          <h1>Understand your heart health in a minute</h1>
          <p>
            Fill in 13 routine health measurements and Heart Undo predicts
            whether heart disease is likely.
          </p>
          <Link className="button" to="/predict">Start a prediction</Link>
        </div>
        <img className="hero-art" src={heart} alt="Heart Undo logo" />
      </section>

      <ol className="steps">
        {steps.map((step) => (
          <li key={step.title} className="glass">
            <h2>{step.title}</h2>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>

      <p className="note">
        Heart Undo is an educational tool and does not replace medical advice.
      </p>
    </main>
  );
}

export default HomePage;