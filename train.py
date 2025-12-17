import numpy as np
import joblib as jb
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split,StratifiedKFold,cross_val_score
from sklearn.metrics import accuracy_score,classification_report
from sklearn.utils.class_weight import compute_class_weight
from sklearn.preprocessing import StandardScaler

X = np.load(os.path.join("files\data\X.npy"))
y = np.load(os.path.join("files\data\y.npy"))

Xtrain,Xtest,ytrain,ytest = train_test_split(
    X,y,
    test_size=0.2,
    stratify=y
    )
scalar = StandardScaler()
Xtrain = scalar.fit_transform(Xtrain)
Xtest = scalar.transform(Xtest)

classes = np.unique(ytrain)
weight = compute_class_weight(
    class_weight="balanced",
    classes=classes,
    y=ytrain
)
classW = dict(zip(classes,weight))

model = RandomForestClassifier(
    class_weight=classW,
    n_estimators=200,
    random_state=42,
    n_jobs=-1
    )

model.fit(Xtrain,ytrain)
ypred = model.predict(Xtest)
print(accuracy_score(y_true=ytest,y_pred=ypred))
print(classification_report(y_true=ytest,y_pred=ypred,target_names=["happy","sad","stressed","calm"]))

jb.dump(model,"model88.pkl")