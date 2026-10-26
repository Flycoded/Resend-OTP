# 4-Digit OTP Verification UI (HTML/CSS/JavaScript)

A mobile-friendly recreation inspired by the supplied screenshot. The interface includes a padlock illustration, blue-gradient digit boxes, auto-focus, backspace navigation, paste support, simple feedback, a demo verification button, and a resend cooldown.

## Files
- `index.html` — main page; loads `style.css` and `script.js`
- `style.css` — design and responsive styles
- `script.js` — OTP input behaviour and demo-only feedback
- `preview.html` — one-file version (HTML, CSS, JavaScript all inside), easiest for Acode on Android

## Open on Android with Acode
1. Download and extract the ZIP.
2. Open the extracted folder in Acode.
3. Open **preview.html**, then tap Preview. No installation of npm, Node, Vite, or React needed.
4. Alternatively open `index.html` with its CSS and JavaScript files in the same folder.

## Try it
- Enter **1524** and tap **Verify Code** to see demo success.
- Enter a wrong code to see an error.
- Tap **Resend OTP** to reset the form and start a 25-second cooldown.
- To prefill the first two digits like the screenshot, visit `index.html?demo=1` (or `preview.html?demo=1`) in a browser.

## Important
This is a **frontend demonstration**, not a working authentication system. It sends **no** SMS, email, or OTP, and it must **not** be used as real account security. Production OTP generation and verification need to happen server-side with secure expiry, throttling, account/session binding, and an SMS/email provider.

External Google Fonts are optional: if offline, your browser will use its fallback font. The remaining page works offline.
