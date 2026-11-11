from pathlib import Path
import pickle

#Import Model
MODEL_PATH = Path(__file__).resolve().parent.parent / "model" / "model.pkl"

with open(MODEL_PATH, "rb") as file:
    model = pickle.load(file)

#Function for prediction
def predict(features):
    prediction = int(model.predict([features])[0])

    if prediction == 0:
        message = "No Heart Disease Predicted"
    else:
        message = "Heart Disease Predicted"

    return {
        "prediction" : prediction,
        "message" : message
    }