from fastapi import FastAPI,UploadFile,File
from fastapi.middleware.cors import CORSMiddleware
import inference
import uvicorn
import librosa as lb

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:3000"],
    allow_methods = ["*"],
    allow_headers = ["*"]
)

if __name__ == "__main__":
    uvicorn.run("backend:app",host="127.0.0.1",port=8000,reload=True)

@app.post("/predict")
async def processAud(file:UploadFile = File(...)):
    content = await file.read()
    with open("recording.wav","wb") as f:
        f.write(content)
    aud,sr = lb.load("recording.wav",sr=22050)

    mood,conf = inference.infer(aud)

    return {"mood": str(mood) , "confidence":(conf)}