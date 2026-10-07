# Model
STATUS: no trained model is bundled. The app runs on the REAL rule engine until you add assets/model.json.
Train free in Google Colab: upload train_model.py and a dataset (UCI SMS Spam Collection, or your own fictional labeled messages), run `python train_model.py SMSSpamCollection --sms`, download assets/model.json into the project's assets folder. The app loads it automatically and shows "On-device model + local rules used."
Report the printed precision/recall honestly. The SMS data is English spam, so it will not understand Urdu or Roman Urdu well.
Remote AI (optional): host your own endpoint (e.g. a Hugging Face Space) taking {"text"} and returning {"risk_score":0-100}; set aiEndpoint in js/config.js. Keep secrets on the server only.
