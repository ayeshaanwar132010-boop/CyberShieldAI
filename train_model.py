"""Train the on-device model. Usage: python train_model.py data.csv   (columns: label,text ; label 1=scam/spam, 0=safe)
Or the UCI SMS file: python train_model.py SMSSpamCollection --sms. Writes assets/model.json."""
import sys, json, pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
f = sys.argv[1]
if "--sms" in sys.argv:
    df = pd.read_csv(f, sep="\t", names=["label", "text"]); df["label"] = (df.label == "spam").astype(int)
else:
    df = pd.read_csv(f)
Xtr, Xte, ytr, yte = train_test_split(df.text, df.label, test_size=.2, stratify=df.label, random_state=1)
v = TfidfVectorizer(max_features=3000); c = LogisticRegression(max_iter=1000, class_weight="balanced")
c.fit(v.fit_transform(Xtr), ytr)
print(classification_report(yte, c.predict(v.transform(Xte))))  # report these real numbers, nothing higher
json.dump({"b": float(c.intercept_[0]), "w": {w: [float(v.idf_[i]), float(c.coef_[0][i])] for w, i in v.vocabulary_.items()}}, open("assets/model.json", "w"))
print("saved assets/model.json")
