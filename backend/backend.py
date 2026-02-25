from fastapi import FastAPI,UploadFile,File
from fastapi.middleware.cors import CORSMiddleware
import inference
import uvicorn
import librosa as lb
import uuid
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["https://moodilist.vercel.app"],
    allow_methods = ["*"],
    allow_headers = ["*"]
)

playlist = {
    "happy":"https://open.spotify.com/embed/playlist/37ch0Eeaap27uTuCGJOu3K",
    "sad":"https://open.spotify.com/embed/playlist/4x7ovBtgZXT3Hteb637G4J",
    "calm":"https://open.spotify.com/embed/playlist/4s3MW6LvgrTD5iZfXhZiv2",
    "stressed":"https://open.spotify.com/embed/playlist/7qjMYTwBrkBxd3CcNSWJGT"
}

@app.get("/")
def home():
    return {"status": "running"}

@app.post("/predict")
async def processAud(file:UploadFile = File(...)):
    content = await file.read()
    filename = f"{uuid.uuid4()}.wav"
    with open(filename,"wb") as f:
        f.write(content)
    aud,sr = lb.load(filename,sr=22050)

    mood,conf = inference.infer(aud)
    os.remove(filename)
    url = playlist[mood]

    return {"mood": str(mood) , "confidence":(conf),"url":str(url)}