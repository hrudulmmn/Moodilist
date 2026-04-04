
# Moodilist – Voice-Based Mood Detector & Playlist Player

**Speak → Feel → Music. Real-time 4-class emotion detection from voice.**

Full-stack web app that listens to your voice, detects your mood, and plays matching music instantly.

## 🎯 Key Results
- **89% classification accuracy** on 4 emotions (Happy, Sad, Angry, Calm)
- Reduced overfitting by **25%**
- Sliding-window inference for stable predictions
- End-to-end latency **<100 ms**

## ✨ Features
- Real-time voice recording & mood analysis
- Instant mood-adaptive playlist
- Clean React frontend + FastAPI backend
- Trainable Scikit-learn model

## 🛠️ Tech Stack
- Frontend: React.js
- Backend: FastAPI + Python
- ML: Scikit-learn, Librosa (MFCC), Random Forest/SVM
- Deployment: Vercel

## 🌐 Live Demo
**[Try it live → https://moodilist.vercel.app/](https://moodilist.vercel.app/)**

## 📹 Demo Video
**Watch the full demo** → [Moodilist Demo Video (Release)](https://github.com/hrudulmmn/Moodilist/releases/download/YOUR-TAG-HERE/YOUR-FILENAME.mp4)

Or visit the release: [Moodilist Demo Release](https://github.com/hrudulmmn/Moodilist/releases/tag/YOUR-TAG-HERE)

**→ Replace the two YOUR-... placeholders with your actual tag and filename after creating the release (same way you did for Kara).**

## 🚀 Local Setup

**Backend**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
**Frontend**
```bash
cd frontend/moodilist
npm install
npm run dev
```

## 📹 Demo Video 
**Watch the full demo** → [Kara Demo Video (Release)](https://github.com/hrudulmmn/Kara/releases/tag/Demo_vid)

## 📂 Project Structure
```
Moodilist/
├── backend/
├── frontend/moodilist/
├── train.py
├── datapitch/
├── recording.wav
└── Moodilist-demo.mp4
```

