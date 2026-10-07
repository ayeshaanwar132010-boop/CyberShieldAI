# CyberShield AI — Your Digital Safety Guardian
Offline-first PWA (HTML/CSS/JS). No paid services, no API keys, no server.

## Files
index.html · css/style.css · js/config.js (reporting URL, optional AI endpoint) · js/i18n.js (translations) · js/data.js (samples, challenge, tutor, safety text) · js/rules.js (rule engine + AI layer + scoring) · js/app.js (screens, history, reports, challenge) · manifest.json · sw.js (offline cache) · assets/ (icons)

## Run on your computer
1. Unzip. 2. Double-click index.html (works in Chrome). Offline install features need hosting (below).

## Test checklist
Home > Demo mode: expect 91%-range HIGH RISK, alert, history entry. Scan empty box: error message. URL tab with "abc": "Please enter a valid URL." Try each sample. Dashboard numbers change. Challenge: 10 questions, +10 per correct. History: view, delete, clear. Report: copy, download, official channel asks for confirmation. Turn on airplane mode: everything still works.

## Free hosting (needed for APK)
1. Make a free GitHub account, create a repository "cybershield", upload all files (keep folders).
2. Settings > Pages > Deploy from branch "main" / root. Your URL: https://YOURNAME.github.io/cybershield/

## Build APK (free, no Android Studio)
1. Open https://www.pwabuilder.com and paste your GitHub Pages URL.
2. Click Package for stores > Android > Generate. Download the zip, install the .apk on your phone (allow "install unknown apps").
Quick alternative: open the URL in Chrome on Android > menu > Add to Home screen.

## Kodular
A .aia file was NOT generated (it cannot be produced reliably here). Kodular option: a WebViewer pointing to your hosted URL.

## Real AI later
Host a free model on a Hugging Face Space (e.g. a text-classification phishing/spam model) that accepts POST {"text":"..."} and returns {"risk_score":0-100}. Put its URL in js/config.js as aiEndpoint. The app falls back to local rules if it fails. Keep any secret key on the server, never in this code.

## Official reporting
Change reportName/reportUrl in js/config.js. Verify the current official Pakistan portal first. The app never submits anything; users confirm before leaving.

## Docs
See ARCHITECTURE.md, MODEL.md, PRIVACY.md, TESTING.md, DEMO_GUIDE.md. Run engine tests with: node test.js

## Honest limits
Local rules are heuristics, not a trained model. No bundled ML model. Results are educational risk assessments. QR scanning is not included; use Paste URL.

## Add the AI API (optional, free, ~10 minutes)
The app is already complete and works with NO API. To add the AI layer:
1. Make a free Hugging Face account > Settings > Access Tokens > create a "read" token.
2. Pick a text-classification model for spam/phishing on huggingface.co (check its page says it can run with the Inference API; availability and the URL can change, see HF docs).
3. Make a free Cloudflare account > Workers > Create > paste server/worker.js > Deploy.
4. Worker Settings > Variables: add HF_TOKEN (as a Secret) and MODEL (the model id). Optionally HF_URL.
5. Copy the Worker URL into js/config.js: aiEndpoint:"https://yourworker.workers.dev". Re-upload config.js.
6. Test: scan something with internet on. The result should say "AI model + local rules used". Turn the internet off: it falls back to local rules.
Privacy: once aiEndpoint is set, scanned text is sent to your Worker and Hugging Face. Tell users, and update PRIVACY.md.
