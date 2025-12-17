import os
import librosa as lb
import numpy as np

duration = 3
X = []
y = []
moodname = ["happy","sad","stressed","calm"]

for label,mood in enumerate(moodname):
    datafolder =  os.path.join("Dataset",mood)
    for file in os.listdir(datafolder):
        if file.endswith(".wav"):
            path = os.path.join(datafolder,file)

            aud,sr= lb.load(
                path=path,
                duration=duration,
                mono=True
            )
                
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

            X.append(resultant)
            y.append(label)
    
X = np.array(X)
y = np.array(y)

np.save("X.npy",X)
np.save("y.npy",y)