# WonderLab AR — Print-to-WebAR Creative Studio Website

A complete, standalone responsive website for **WonderLab AR** (by **WonderLab Studio**), built with pure **HTML, CSS, and Vanilla JavaScript** — including **5 Real Working Marker-Based WebAR Samples** powered by **MindAR + Three.js**!

## Project Structure

- `index.html` — Full landing page featuring the **Live WebAR Marker + Dynamic QR Code Demo (`#live-demo`)**, Hero AR Scanner, Why Print-to-AR, 6 Industry Applications, Industries Grid, 3-Stage + 5-Step Workflow, Zero-App Delivery, Interactive Campaign Analytics & Project Brief Builder
- `ar-camera.html` — **Real Mobile WebAR Camera Scanner** (powered by MindAR v1.2.5 + Three.js). Opens directly in Safari/Chrome via QR scan and tracks all 5 WonderLab Image Markers in 3D with interactive controls & audio narration!
- `contact.html` — Dedicated Contact & AR Demo Request page
- `style.css` — Complete WonderLab Studio dark neon design system & responsive layouts
- `script.js` — UI interactions, dynamic SVG QR code generator for any hosted URL, marker switcher, analytics & WhatsApp/Email Project Brief composer
- `qrcode.min.js` — Lightweight offline-capable SVG QR Code encoder (automatically generates scannable QR codes matching whatever GitHub Pages or custom domain you host the site on!)
- `wonderlab-logo.png` — Official WonderLab Studio logo
- `assets/` — High-resolution custom AR showcase visuals + `assets/markers/`:
  - `wonderlab-targets.mind` — Compiled MindAR multi-target tracking file for all 5 markers
  - `marker-heart.jpg` — Marker 01: Tuition (A/L Biology Human Heart)
  - `marker-showroom.jpg` — Marker 02: Media Ads (Aero-X 360° Sneaker Print Ad)
  - `marker-science.jpg` — Marker 03: Publishing (Solar System AR Flash Card)
  - `marker-packaging.jpg` — Marker 04: Packaging (Ceylon Highland Tea Label)
  - `marker-bcard.jpg` — Marker 05: Corporate (WonderLab Executive AR Business Card)
- `.github/workflows/static.yml` — Ready-to-use GitHub Pages deployment workflow

## Important Note for Testing WebAR Camera

Mobile browsers (iOS Safari & Android Chrome) require **HTTPS** to access the phone camera (`getUserMedia`).
- When deployed on **GitHub Pages** (`https://<username>.github.io/<repo>/`), HTTPS is automatic — scanning the QR code on `#live-demo` will immediately open the live AR camera on any smartphone!

## Contact Details Configured

- **WhatsApp / Phone:** `+94 76 980 1157`
- **Email:** `wonderlabstudio.lk@gmail.com`
