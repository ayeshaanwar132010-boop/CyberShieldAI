// node test.js  -> runs engine tests
global.window=global;global.CFG={};global.navigator={onLine:true};require('./js/rules.js');
const T=[["Safe message","Reminder: Science exam on Monday at 9:00 AM.","text",0,40],["Fake prize","Congratulations! You won a free iPhone lottery prize. Click here now http://bit.ly/x","text",76,100],
["Phishing","URGENT! Your account will be closed today. Verify your password and OTP using this link http://secure-bank-verify.xyz/login","text",90,100],["OTP request","Send me the OTP verification code you received","text",25,75],
["Password request","Please confirm your account password to keep access","text",25,75],["Suspicious URL","http://192.168.4.7/login","url",30,100],["Safe URL","https://www.wikipedia.org","url",0,40],
["Very long input","hello ".repeat(2000),"text",0,40]];
(async()=>{let bad=0;for(const[n,t,ty,lo,hi]of T){const r=await Engine.analyze(t,ty),ok=r.risk_score>=lo&&r.risk_score<=hi;if(!ok)bad++;console.log(`${ok?"PASS":"FAIL"} | ${n} | ${r.risk_score} | ${r.band}`)}
 window.ML_MODEL={b:-2,w:{won:[1,3],prize:[1,3]}};const m=await Engine.analyze("you won a prize","text");console.log(m.mode==="model"?"PASS":"FAIL","| model layer fusion |",m.risk_score);
 delete window.ML_MODEL;console.log(bad?"SOME FAILED":"ALL ENGINE TESTS PASSED")})();
