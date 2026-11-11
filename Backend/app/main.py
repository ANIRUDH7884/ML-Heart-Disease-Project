from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import Literal
from app import modelService
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:3000",
    "https://ml-heart-disease-project-2yxt.vercel.app",],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Feature data
class PatientData(BaseModel):
    age: int = Field(gt=0, le=120)
    sex: Literal[0, 1]
    cp: Literal[0, 1, 2, 3]
    trestbps: int = Field(gt=0, le=300)
    chol: int = Field(ge=0, le=700)
    fbs: Literal[0, 1]
    restecg: Literal[0, 1, 2]
    thalach: int = Field(gt=0, le=250)
    exang: Literal[0, 1]
    oldpeak: float = Field(ge=0, le=10)
    slope: Literal[0, 1, 2]
    ca: Literal[0, 1, 2, 3, 4]
    thal: Literal[0, 1, 2, 3]

@app.get("/")
def home():
    return {"message": "HeartUndo API is running"}


@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/predict")
def predict_heart_disease(patient : PatientData):
    features = [
        patient.age,
        patient.sex,
        patient.cp,
        patient.trestbps,
        patient.chol,
        patient.fbs,
        patient.restecg,
        patient.thalach,
        patient.exang,
        patient.oldpeak,
        patient.slope,
        patient.ca,
        patient.thal,
    ]

    result = modelService.predict(features)
    return result