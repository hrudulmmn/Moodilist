import  sounddevice as sd
import librosa as lb
import joblib as jb
import numpy as np

def extract(aud,sr):
    cent = lb.feature.spectral_centroid(y=aud,sr=sr)
    CEmean = np.mean(cent)
    CEstd = np.std(cent)

    mfcc = lb.feature.mfcc(y=aud,sr=sr,n_mfcc=13)
    Mmean = np.mean(mfcc,axis=1)
    Msd = np.std(mfcc,axis=1)

    chroma = lb.feature.chroma_stft(y=aud,sr=sr)
    Cmean = np.mean(chroma,axis=1)
    Csd = np.std(chroma,axis=1)

    cross = lb.feature.zero_crossing_rate(y=aud)
    CRmean = np.mean(cross)
    CRsd = np.std(cross)
    P = lb.yin(y=aud,fmin=50,fmax=300)
    pm = P.mean()
    ps = P.std()
    resultant = np.hstack([CEmean,CEstd,Mmean,Msd,Cmean,Csd,CRmean,CRsd,pm,ps])
    resultant = resultant.reshape(1,-1)
    return resultant

def infer(aud):
    Win = 3
    duration=5
    step =1
    sr = 22050
    preds = []

    model = jb.load("model\modelPitch.pkl")

    for start in range(0,len(aud),step*sr):
        end =  start + Win*sr
        part = aud[start:end]
        if len(part)<Win*sr:
            break
        
        X = extract(part,sr)
        preds.append(model.predict_proba(X)[0])

    avg = np.mean(preds,axis=0)
    index = int(np.argmax(avg))
    moodname = ["happy","sad","stressed","calm"]
    if np.max(avg)<0.35:
        return "calm",float(np.max(avg))
    else:
        return (moodname[index]),float(np.max(avg))