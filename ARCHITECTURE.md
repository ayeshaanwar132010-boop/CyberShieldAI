# Architecture
Pipeline: input -> validation (app.js) -> rules.js: rule engine + URL analyzer -> optional on-device model (assets/model.json) -> optional remote AI (CFG.aiEndpoint) -> fusion -> band/classification -> explanations + recommendations -> incident record -> localStorage history -> report.
Modules: index.html/css (UI), js/app.js (screens, history, reports, challenge, dashboard), js/rules.js (analysis), js/data.js (content), js/i18n.js (translations), js/config.js (settings), sw.js (offline cache).
## Risk scoring
Each rule has a weight. Link issues are capped at 35 total. Overlaps are reduced (credential+OTP -10, urgency+threat -8). 3+ signals add 10. Any high-severity signal sets a floor of 45. With the on-device model: 65% rules + 35% model, and a rules score of 76+ is never pulled below 76. With a remote AI: 50/50. Bands: 0-20 very low, 21-40 low, 41-60 moderate, 61-75 suspicious, 76-89 high, 90-100 critical indicators. Cap 100.
## Automation
Score >= 76: incident ID, save, category, recommendations, report, alert, then "Review and report". Nothing is submitted automatically.
