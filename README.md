# Job & Knock Launcher

This is a tiny static PWA shell for the existing Apps Script web app.

Apps Script target:
https://script.google.com/macros/s/AKfycbwrrtB4EflChLQNzw1GNAOfDii_eBHTHEakz0NidD3eKgZaXXgZRx63RJ1azz8YucjtEQ/exec

Why it exists:
- iOS reads Home Screen icons / the web-app manifest from the top-level webpage.
- Apps Script controls its own outer wrapper, so the app's inner HTML cannot reliably provide the Home Screen icon.
- This launcher becomes the top-level installed PWA and embeds the Apps Script deployment full-screen using ?embed=1.
- Job & Knock itself still updates whenever the SAME Apps Script deployment is redeployed. The launcher normally does not need changing.

## GitHub Pages setup

1. In GitHub open Settings -> Pages.
2. Under Build and deployment choose Source: Deploy from a branch.
3. Choose Branch: main and Folder: / (root).
4. Save.
5. The expected Pages URL for this repository is:
   https://sxmmyle.github.io/job-and-knock-launcher/
6. Open that Pages URL in Safari on the iPhone and Add to Home Screen.

Do not add the script.google.com URL to Home Screen once using the launcher. The GitHub Pages URL is the installed Home Screen app.

If the embedded Google app ever fails to authenticate inside the PWA, the launcher shows an "Open directly" fallback after 12 seconds.
