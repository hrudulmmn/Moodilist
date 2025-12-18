
import sounddevice as sd
from scipy.io.wavfile import write

def record_audio(
    filename="input.wav",
    duration=3,
    sample_rate=22050
):
    print("🎤 Recording...")
    audio = sd.rec(
        int(duration * sample_rate),
        samplerate=sample_rate,
        channels=1,
        dtype="float32"
    )
    sd.wait()
    write(filename, sample_rate, audio)
    print("✅ Saved:", filename)




import joblib as jb
import librosa as lb
import numpy as np

duration = 3
model = jb.load("files\model\modelnoDIS.pkl")
aud,sr= lb.load(
                path="input.wav",
                duration=duration,
                mono=True
            )
scalar =jb.load("files\model\scalar.pkl")  
if len(aud)<22050*3:
    aud = np.pad(aud,(0,22050*duration-len(aud)))
        
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
resultant = np.hstack([CEmean,CEstd,Mmean,Msd,Cmean,Csd,CRmean,CRsd])
resultant = resultant.reshape(1,-1)
resultant = scalar.transform(resultant)

print(model.predict(resultant))