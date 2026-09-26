# Personal Portfolio Website - Vaka Abhiram

**Task-04: Personal Portfolio Website**  
Computer Science Student & Aspiring Software Developer

---

## 📌 Overview

This repository contains the complete, modern personal portfolio website for **Vaka Abhiram**, a 3rd-year Computer Science and Engineering student at Keshav Memorial College of Engineering (KMCE), Hyderabad, graduating in 2028.

The website is crafted with a high-performance Vanilla HTML5, modern CSS3, and JavaScript stack inspired by modern engineering tools (Vercel, Linear, SaaS interfaces). It features dark mode as primary, light mode toggle, responsive design across all viewports, interactive project filtering, development workflow inspection, and recruiter-friendly presentation.

---

## 🚀 Live Preview / How to Open

No complex Node.js build process is required! You can run or view this website instantly in any modern browser:

### Option 1: Direct File Open
Simply double-click `index.html` or right-click and choose **Open with > Chrome / Edge / Firefox**.

### Option 2: Local HTTP Server (Python)
```bash
# In this directory:
python -m http.server 3000
```
Then visit `http://localhost:3000` in your web browser.

### Option 3: VS Code Live Server
Right-click `index.html` in VS Code and select **"Open with Live Server"**.

---

## 📁 Project Structure

```
├── index.html                  # Main portfolio single-page application
├── css/
│   └── styles.css              # Custom design system, dark/light themes, typography & layout
├── js/
│   └── main.js                 # Theme switching, nav behavior, project filtering, photo upload, modals
├── assets/
│   ├── profile-placeholder.svg # Monogram avatar & photo upload placeholder
│   ├── mlcv-preview.svg        # MLCV Computer Vision & AI architecture diagram
│   ├── reservation-preview.svg # Java Online Reservation System UI mock
│   ├── atm-preview.svg         # ATM Web Interface UI mock
│   ├── exam-preview.svg        # Online Examination System UI mock
│   ├── library-preview.svg     # Digital Library Management System UI mock
│   └── cert-placeholder.svg   # Verified credential certificate template
└── README.md                   # Documentation and customization guide
```

---

## 🎯 Satisfied Requirements & Sections

1. **Homepage / Hero Section**:
   - Captivating headline: `"Hello, I'm Vaka Abhiram"`
   - Main professional heading: `"Computer Science Student & Aspiring Software Developer"`
   - Professional positioning message: `"Building Software. Solving Problems. Exploring AI."`
   - Supporting narrative on software development, AI/ML, and Computer Vision.
   - Interactive profile photo container with on-page instant photo upload & localStorage caching.
   - Badges: `CSE 2028`, `Software Development`, `AI/ML`, `Computer Vision`.
   - CTAs: "View My Projects", "Download Resume", "Let's Connect".

2. **Skills Summary & Detailed Inventory**:
   - Programming: Java, Python
   - Web Development: HTML, CSS, JavaScript, React, Express.js
   - AI / ML: Machine Learning, Computer Vision, CatBoost, Logistic Regression, LightGBM, SHAP, RDKit
   - Tools & Platforms: Git, GitHub, VS Code, Google Colab, MS Excel
   - Core Software Skills: Object-Oriented Programming, Problem Solving, Software Development, Debugging, Version Control, Project Development
   - *Strictly avoids fake percentage ratings.*

3. **About Me**:
   - Full foundational narrative detailing engineering background, career ambitions, technical interests, and personal development goals.

4. **Education**:
   - B.Tech – Computer Science and Engineering
   - Keshav Memorial College of Engineering (KMCE), Hyderabad
   - Expected Graduation: 2028 (3rd Year B.Tech CSE Student).

5. **Professional Experience**:
   - Oasis Infobyte / OIBSIP – Java Development Intern.
   - Core responsibilities, practical Java software projects, and GitHub version control.
   - *Strict adherence to verified professional internship records.*

6. **Featured Project: ML-Based Prediction of Cyclic Voltammetry for Supercapacitors (BiFeO₃)**:
   - Given the most prominent and largest presentation on the site.
   - Live Web Dashboard: [https://anirudhrao-24.github.io/cv-ml-supercapacitor-bfo/](https://anirudhrao-24.github.io/cv-ml-supercapacitor-bfo/)
   - Live ML API (Render): [https://cv-ml-supercapacitor-bfo-i0cu.onrender.com/](https://cv-ml-supercapacitor-bfo-i0cu.onrender.com/)
   - Key Results: Stacked Meta-Model (ANN + Random Forest + XGBoost with RidgeCV Regressor), R² 99.74%, RMSE 0.000401 on unseen 60 mV/s dataset, Specific Capacitance 114.84 F g⁻¹ vs 115.39 F g⁻¹ lab value (0.47% error margin).
   - Interactive In-Browser Voltammogram Simulator with real-time scan rate sweeps and experimental benchmark overlay.

7. **Other Projects**:
   - Online Reservation System (Java)
   - ATM Web Interface (HTML, CSS, JavaScript)
   - Online Examination System (Java, Web Technologies)
   - Digital Library Management System (Java)
   - Interactive project filtering by domain (`Software`, `Java`, `Web Development`, `AI/ML`, `Electrochemistry`).

8. **Software Development (Major Section)**:
   - Primary career commitment: `"I want to build my career in the software industry."`
   - Interactive Visual Development Workflow: `IDEA → DESIGN → CODE → TEST → DEBUG → GITHUB → DEPLOY`.
   - Full stack matrix and software engineering pillars.

9. **Career Interests**:
   - 1. Software Development (Largest primary card)
   - 2. Software Engineering
   - 3. AI / Machine Learning
   - 4. Full-Stack Web Development
   - 5. Scientific ML & Materials Informatics
   - 6. Product Engineering.

10. **Certifications & Accomplishments**:
    - Career Essentials in Generative AI (Microsoft / LinkedIn)
    - ML-CV Supercapacitor Research Recognition (Materials Science & AI Research)
    - Oasis Infobyte / OIBSIP Internship Certificate / Offer Letter.

11. **Resume Section**:
    - Strong CTA banner: `"Let's Build Something."` with View and Download handlers.

12. **Contact Section**:
    - Name: Vaka Abhiram
    - Location: Hyderabad, Telangana, India
    - Clearly formatted placeholders: `[ADD EMAIL]`, `[ADD GITHUB URL]`, `[ADD LINKEDIN URL]`, `[ADD PHONE]`.
    - Fully functional client-side interactive message form with validation and toast notifications.

---

## 🛠️ Personalization / Customization Guide

When you are ready to update the placeholders with your personal files and links:

1. **Add Your Profile Photo**:
   - Either click the camera button on the hero section avatar to select your photo directly in the browser, OR
   - Save your photograph as `assets/profile.jpg` (or `.png`) and update line 133 in `index.html` (`src="assets/profile.jpg"`).

2. **Add Your Resume PDF**:
   - Save your PDF resume as `assets/resume.pdf`.

3. **Update Contact & Social Links**:
   - Search for `[ADD EMAIL]`, `[ADD GITHUB URL]`, `[ADD LINKEDIN URL]`, and `[ADD PHONE]` in `index.html` and replace them with your actual credentials.

4. **Update Project GitHub Repositories**:
   - Replace the `href="#contact"` on the project action buttons with your live GitHub repository URLs.

---

## 🌟 Quality Standards Satisfied
- [x] Responsive on Mobile, Tablet, Laptop, and 4K Desktop
- [x] Dark Mode primary theme with smooth Light Mode toggle
- [x] No horizontal scrolling on mobile devices
- [x] No fake percentages, fictional companies, or invented awards
- [x] Task-04 Web Development submission ready
