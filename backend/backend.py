from fastapi import FastAPI,UploadFile,File,Form,Depends
from fastapi.middleware.cors import CORSMiddleware
import inference
import uvicorn
import librosa as lb
import uuid
import os
import sqlalchemy as sql
from sqlalchemy.orm import Session
from db import getdb
from schema import Moodlogs

app = FastAPI()
if __name__ == "__main__":
    uvicorn.run("backend:app", host="127.0.0.1", port=8000, reload=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
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
async def processAud(file:UploadFile = File(...),userid:str = Form(...),username:str = Form(...),db:Session = Depends(getdb) ):
    content = await file.read()
    uuidid = uuid.uuid4()
    filename = f"{uuidid.hex}.wav"

    try:
        with open(filename,"wb") as f:
            f.write(content)
        aud,sr = lb.load(filename,sr=22050)

        mood,conf = inference.infer(aud)
        os.remove(filename)
        url = playlist[mood]

        log = Moodlogs(
            id=uuidid,
            mood=mood,
            confidence = conf,
            clerk_id = userid,
            clerk_username = username
        )

        db.add(log)
        db.commit()
        db.refresh(log)

        return {"mood": str(mood) , "confidence":(conf),"url":str(url)}
    
    finally:
        if os.path.exists(filename):
            os.remove(filename)