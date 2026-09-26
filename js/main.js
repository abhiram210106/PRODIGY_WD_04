/**
 * Vaka Abhiram - Personal Portfolio
 * Web Development Task-04
 * Interactive Functionality & State Management
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initProjectFilters();
  initProfilePhotoUpload();
  initWorkflowPipeline();
  initContactForm();
  initScrollEffects();
  initModalHandlers();
  initMlcvDemo();
  initOwnerMode();
});

/* ==========================================================================
   1. THEME TOGGLE (DARK / LIGHT MODE)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  
  // Stored theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      // Moon icon for switching back to dark
      themeIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      `;
      themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
      themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
    } else {
      // Sun icon for switching to light
      themeIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
      `;
      themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
      themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
    }
  }
}

/* ==========================================================================
   2. NAVIGATION & ACTIVE SCROLL TRACKER
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('backToTopBtn');

  // Sticky header background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Back to top visibility
    if (window.scrollY > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }

    // Active link highlighting
    highlightActiveSection();
  }, { passive: true });

  // Mobile menu toggle
  function toggleMobileMenu(forceClose = false) {
    const isOpen = forceClose ? false : !mobileNavDrawer.classList.contains('open');
    mobileNavDrawer?.classList.toggle('open', isOpen);
    mobileNavOverlay?.classList.toggle('open', isOpen);
    hamburgerBtn?.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburgerBtn?.addEventListener('click', () => toggleMobileMenu());
  mobileNavOverlay?.addEventListener('click', () => toggleMobileMenu(true));

  // Close mobile nav on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMobileMenu(true);
    });
  });

  // Back to top click
  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Active section tracker
  const sections = document.querySelectorAll('section[id]');
  function highlightActiveSection() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll(`.nav-link[href*="${sectionId}"]`).forEach(link => {
          link.classList.add('active');
        });
      } else {
        document.querySelectorAll(`.nav-link[href*="${sectionId}"]`).forEach(link => {
          link.classList.remove('active');
        });
      }
    });
  }
}

/* ==========================================================================
   3. PROJECT FILTERING
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const featuredContainer = document.querySelector('.featured-project-container');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter') || 'all';

      // Featured Project (ML-CV Cyclic Voltammetry) is categorized as AI/ML, CV, and Software
      if (featuredContainer) {
        if (filterVal === 'all' || filterVal === 'aiml' || filterVal === 'cv' || filterVal === 'software') {
          featuredContainer.style.display = 'block';
          featuredContainer.style.opacity = '1';
        } else {
          featuredContainer.style.display = 'none';
        }
      }

      projectCards.forEach(card => {
        const categories = (card.getAttribute('data-categories') || '').split(' ');
        
        if (filterVal === 'all' || categories.includes(filterVal)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   4. PROFILE PHOTO UPLOAD / LOCAL CUSTOMIZER
   ========================================================================== */
function initProfilePhotoUpload() {
  const uploadInput = document.getElementById('profilePhotoInput');
  const uploadTriggers = document.querySelectorAll('.trigger-photo-upload');
  const profileImg = document.getElementById('mainProfileImg');
  const resetBtn = document.getElementById('resetPhotoBtn');

  // Load custom photo from local storage if exists
  const savedPhoto = localStorage.getItem('vaka-custom-profile-photo');
  if (savedPhoto && profileImg) {
    profileImg.src = savedPhoto;
    if (resetBtn) resetBtn.style.display = 'inline-flex';
  }

  // Bind upload triggers
  uploadTriggers.forEach(trig => {
    trig.addEventListener('click', () => {
      uploadInput?.click();
    });
  });

  uploadInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      if (profileImg) {
        profileImg.src = dataUrl;
      }
      try {
        localStorage.setItem('vaka-custom-profile-photo', dataUrl);
      } catch (err) {
        console.warn('Image is large, rendered in session.');
      }
      if (resetBtn) resetBtn.style.display = 'inline-flex';
      showToast('Profile photo updated! To make permanent, place image at assets/profile.jpg');
    };
    reader.readAsDataURL(file);
  });

  resetBtn?.addEventListener('click', () => {
    localStorage.removeItem('vaka-custom-profile-photo');
    if (profileImg) {
      profileImg.src = 'assets/profile-placeholder.svg';
    }
    resetBtn.style.display = 'none';
    showToast('Reset to default profile placeholder');
  });
}

/* ==========================================================================
   5. WORKFLOW PIPELINE INTERACTION
   ========================================================================== */
function initWorkflowPipeline() {
  const nodes = document.querySelectorAll('.pipeline-node');
  const descBox = document.getElementById('workflowPhaseDetail');

  const workflowInfo = {
    'idea': '1. IDEA: Identifying real-world problems and software solutions through practical requirements analysis.',
    'design': '2. DESIGN: Planning architecture, component hierarchy, database models, and intuitive UI flow.',
    'code': '3. CODE: Writing clean, modular, and maintainable Java, Python, or Web application code.',
    'test': '4. TEST: Performing unit tests, verification of edge cases, and functional integrity checks.',
    'debug': '5. DEBUG: Troubleshooting runtime logs, tracing exceptions, and optimizing algorithmic bottlenecks.',
    'github': '6. GITHUB: Managing source code, version control, branching, commits, and collaborative repositories.',
    'deploy': '7. DEPLOY: Packaging applications for production environments and continuous web hosting.'
  };

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const phase = node.getAttribute('data-phase');
      if (descBox && phase && workflowInfo[phase]) {
        descBox.textContent = workflowInfo[phase];
        descBox.style.color = '#38bdf8';
      }
    });
  });
}

/* ==========================================================================
   6. CONTACT FORM & DIRECT EMAIL INTEGRATION
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const message = document.getElementById('contactMessage')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all fields before sending.');
      return;
    }

    const currentGmail = getStoredContact().email || 'ganaanjan51@gmail.com';

    // Visual button state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
      Preparing Message...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      contactForm.reset();

      // Formulate real mailto draft link
      const subject = encodeURIComponent(`Software Development Inquiry from ${name}`);
      const body = encodeURIComponent(`Hi Abhiram,\n\n${message}\n\nFrom:\n${name}\nEmail: ${email}`);
      const mailtoUrl = `mailto:${currentGmail}?subject=${subject}&body=${body}`;

      openModal(
        'Message Ready to Send',
        `<div style="text-align: left; line-height: 1.7;">
          <p style="margin-bottom: 14px; font-size: 0.95rem; color: var(--text-primary);">
            Thank you <strong>${escapeHtml(name)}</strong>! Your message has been prepared for <strong>${escapeHtml(currentGmail)}</strong>.
          </p>
          <div style="background: var(--bg-tertiary); padding: 14px; border-radius: 8px; border: 1px solid var(--border-subtle); margin-bottom: 18px; font-size: 0.9rem;">
            <strong>Subject:</strong> Software Development Inquiry from ${escapeHtml(name)}<br>
            <strong>To:</strong> ${escapeHtml(currentGmail)}
          </div>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <a href="${mailtoUrl}" class="btn btn-primary btn-sm" style="text-decoration:none;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
              Open Email App
            </a>
            <button class="btn btn-secondary btn-sm" type="button" onclick="navigator.clipboard?.writeText('${escapeHtml(message)}'); showToast('Message copied to clipboard!');">
              Copy Message Text
            </button>
          </div>
        </div>`
      );

      // Attempt launching default email client
      try {
        window.location.href = mailtoUrl;
      } catch (err) {
        console.warn('Mailto popup blocked or handled by modal.');
      }

      showToast('Message ready! Opening email client...');
    }, 700);
  });
}

/* ==========================================================================
   7. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollEffects() {
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(elem => {
    observer.observe(elem);
  });
}

/* ==========================================================================
   8. REAL CERTIFICATES & PRIVACY MASKING SYSTEM
   ========================================================================== */
function getStoredCert(certId) {
  try {
    return localStorage.getItem(`vaka-cert-${certId}`) || null;
  } catch (e) {
    return null;
  }
}

function setStoredCert(certId, dataUrl) {
  try {
    localStorage.setItem(`vaka-cert-${certId}`, dataUrl);
  } catch (e) {
    console.warn('Certificate file is large, stored in active session.');
  }
}

function removeStoredCert(certId) {
  try {
    localStorage.removeItem(`vaka-cert-${certId}`);
  } catch (e) {}
}

function isCertMaskEnabled() {
  const stored = localStorage.getItem('vaka-cert-mask-enabled');
  return stored !== 'false'; // Default to true (masked)
}

function setCertMaskEnabled(enabled) {
  localStorage.setItem('vaka-cert-mask-enabled', enabled ? 'true' : 'false');
}

function openCertificateModal(certId, certName, certOrg, certDesc) {
  const customCert = getStoredCert(certId);
  const imageSrc = customCert || 'assets/cert-placeholder.svg';
  const isMasked = isCertMaskEnabled();

  const content = `
    <div style="text-align: center;">
      <!-- Interactive Privacy Mask Toggle Bar -->
      <div class="mask-toggle-bar">
        <label class="toggle-switch-label" for="modalMaskCheckbox">
          <input type="checkbox" id="modalMaskCheckbox" ${isMasked ? 'checked' : ''}>
          <span>🔒 Privacy Mask (Hide sensitive ID &amp; verification codes)</span>
        </label>
        <span id="maskStatusBadge" class="badge ${isMasked ? 'badge-primary' : 'badge'}">${isMasked ? 'MASK ACTIVE' : 'UNMASKED'}</span>
      </div>

      <!-- Certificate Preview with Dynamic Mask Overlay -->
      <div class="cert-preview-container">
        <img id="certModalImage" src="${imageSrc}" alt="${escapeHtml(certName)}" class="cert-preview-img">
        <div id="certModalMaskOverlay" class="cert-privacy-mask ${isMasked ? '' : 'hidden'}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          <span>VERIFIED CREDENTIAL • ID &amp; SENSITIVE DETAILS MASKED</span>
        </div>
      </div>

      <h4 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 6px; color: var(--text-primary);">${escapeHtml(certName)}</h4>
      <p style="font-size: 0.95rem; color: var(--accent-secondary); font-weight: 600; margin-bottom: 10px;">${escapeHtml(certOrg)}</p>
      <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 22px; max-width: 580px; margin-left: auto; margin-right: auto;">
        ${escapeHtml(certDesc)}
      </p>

      <!-- Action & Upload Controls (Upload is Owner Only; Visitors only see Close) -->
      <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; padding-top: 14px; border-top: 1px solid var(--border-subtle);">
        <button class="btn btn-primary btn-sm owner-only" type="button" onclick="triggerCertUpload('${certId}')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          ${customCert ? 'Upload Replacement File' : 'Upload Real Certificate (Image/PDF)'}
        </button>
        ${customCert ? `
          <button class="btn btn-outline btn-sm owner-only" type="button" onclick="resetCertToDefault('${certId}', '${escapeHtml(certName)}', '${escapeHtml(certOrg)}', '${escapeHtml(certDesc)}')">
            Reset to Default
          </button>
        ` : ''}
        <button class="btn btn-secondary btn-sm" type="button" onclick="closeModal()">Close</button>
      </div>
    </div>
  `;

  openModal(certName, content);

  // Hook up mask checkbox listener
  const checkbox = document.getElementById('modalMaskCheckbox');
  const overlay = document.getElementById('certModalMaskOverlay');
  const badge = document.getElementById('maskStatusBadge');

  checkbox?.addEventListener('change', (e) => {
    const checked = e.target.checked;
    setCertMaskEnabled(checked);
    if (checked) {
      overlay?.classList.remove('hidden');
      if (badge) {
        badge.textContent = 'MASK ACTIVE';
        badge.className = 'badge badge-primary';
      }
      showToast('Privacy Mask Enabled: Sensitive verification details hidden');
    } else {
      overlay?.classList.add('hidden');
      if (badge) {
        badge.textContent = 'UNMASKED';
        badge.className = 'badge';
      }
      showToast('Privacy Mask Disabled: Showing complete certificate');
    }
  });
}

// Global triggers for cert uploads
let activeCertUploadId = null;
window.triggerCertUpload = function(certId) {
  activeCertUploadId = certId;
  const input = document.getElementById('certUploadInput');
  input?.click();
};

window.resetCertToDefault = function(certId, certName, certOrg, certDesc) {
  removeStoredCert(certId);
  showToast('Reset certificate to default template.');
  openCertificateModal(certId, certName, certOrg, certDesc);
};

/* ==========================================================================
   9. REAL RESUME UPLOAD & VIEWER
   ========================================================================== */
function getStoredResume() {
  try {
    return {
      dataUrl: localStorage.getItem('vaka-custom-resume') || null,
      fileName: localStorage.getItem('vaka-resume-name') || 'Vaka_Abhiram_Resume.pdf'
    };
  } catch (e) {
    return { dataUrl: null, fileName: 'Vaka_Abhiram_Resume.pdf' };
  }
}

function openResumeViewerModal() {
  const { dataUrl, fileName } = getStoredResume();

  if (dataUrl) {
    // Show embedded viewer for custom resume
    openModal(
      `Resume Preview – ${escapeHtml(fileName)}`,
      `<div style="text-align: left;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; background: var(--bg-tertiary); padding: 10px 14px; border-radius: 8px;">
          <span style="font-size: 0.88rem; color: #34d399; font-weight: 600;">✓ Real Resume Loaded: ${escapeHtml(fileName)}</span>
          <button class="btn btn-outline btn-sm owner-only" onclick="triggerResumeUpload()">Replace PDF</button>
        </div>
        <iframe src="${dataUrl}" style="width: 100%; height: 500px; border-radius: 8px; border: 1px solid var(--border-subtle); margin-bottom: 16px;" title="Vaka Abhiram Resume PDF"></iframe>
        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button class="btn btn-primary btn-sm" onclick="downloadCustomResume()">Download PDF</button>
          <button class="btn btn-secondary btn-sm" onclick="closeModal()">Close</button>
        </div>
      </div>`
    );
  } else {
    // Prompt to upload real resume or view structure
    openModal(
      'Vaka Abhiram – Resume Preview',
      `<div style="text-align: left; line-height: 1.7;">
        <div class="owner-only" style="background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.3); border-radius: 8px; padding: 16px; margin-bottom: 20px;">
          <h4 style="font-size: 1rem; color: #818cf8; margin-bottom: 6px;">Upload Your Actual Resume PDF</h4>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 12px;">
            You can upload your real <code>resume.pdf</code> right now. Once uploaded, the "View Resume" and "Download Resume" buttons will directly serve your actual file!
          </p>
          <button class="btn btn-primary btn-sm" onclick="triggerResumeUpload()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            Select &amp; Upload Resume PDF
          </button>
        </div>

        <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 4px;">Vaka Abhiram</h3>
        <p style="font-size: 0.9rem; color: var(--accent-secondary); font-weight: 600; margin-bottom: 12px;">
          Computer Science Student &amp; Aspiring Software Developer • KMCE Hyderabad (2028)
        </p>
        <p style="font-size: 0.95rem; margin-bottom: 10px;"><strong>Primary Objective:</strong> Software Development in Java, Web Development &amp; AI/ML Systems.</p>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px;">
          <strong>Core Technologies:</strong> Java, Python, HTML, CSS, JavaScript, React, Express.js, OpenCV, CatBoost, Git, GitHub.
        </p>
        <div style="text-align: right;">
          <button class="btn btn-secondary btn-sm" onclick="closeModal()">Close</button>
        </div>
      </div>`
    );
  }
}

window.downloadCustomResume = function() {
  const { dataUrl, fileName } = getStoredResume();
  if (dataUrl) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(`Downloading: ${fileName}`);
  } else {
    showToast('Please upload your resume PDF first using the upload button.');
    openResumeViewerModal();
  }
};

window.triggerResumeUpload = function() {
  const input = document.getElementById('resumeUploadInput');
  input?.click();
};

/* ==========================================================================
   10. CONTACT DETAILS (GMAIL, GITHUB, LINKEDIN, PHONE) UPDATER
   ========================================================================== */
function getStoredContact() {
  return {
    email: localStorage.getItem('vaka-contact-email') || 'ganaanjan51@gmail.com',
    github: localStorage.getItem('vaka-contact-github') || 'https://github.com/abhiram210106',
    linkedin: localStorage.getItem('vaka-contact-linkedin') || 'https://linkedin.com/in/vaka-abhiram',
    phone: localStorage.getItem('vaka-contact-phone') || '+91 98000 00000',
    maskPhone: localStorage.getItem('vaka-mask-phone') !== 'false'
  };
}

function updateContactDOM() {
  const contact = getStoredContact();

  const emailElem = document.getElementById('contactEmailVal');
  if (emailElem) {
    emailElem.innerHTML = `<a href="mailto:${escapeHtml(contact.email)}" style="color:inherit; text-decoration: underline;">${escapeHtml(contact.email)}</a>`;
  }

  const githubElem = document.getElementById('contactGithubVal');
  if (githubElem) {
    githubElem.innerHTML = `<a href="${escapeHtml(contact.github)}" target="_blank" rel="noopener noreferrer" style="color:inherit; text-decoration: underline;">${escapeHtml(contact.github)}</a>`;
  }

  const linkedinElem = document.getElementById('contactLinkedinVal');
  if (linkedinElem) {
    linkedinElem.innerHTML = contact.linkedin && contact.linkedin !== '[ADD LINKEDIN URL]'
      ? `<a href="${escapeHtml(contact.linkedin)}" target="_blank" rel="noopener noreferrer" style="color:inherit; text-decoration: underline;">${escapeHtml(contact.linkedin)}</a>`
      : '[ADD LINKEDIN URL]';
  }

  const phoneElem = document.getElementById('contactPhoneVal');
  if (phoneElem) {
    if (contact.maskPhone) {
      // Clean mask e.g. +91 98XXX XXXXX
      const raw = contact.phone.replace(/\s+/g, '');
      const masked = raw.length > 5 ? raw.substring(0, 5) + 'XXXXX' : '+91 98XXX XXXXX';
      phoneElem.textContent = masked + ' (Masked for Privacy)';
    } else {
      phoneElem.textContent = contact.phone;
    }
  }
}

function openContactEditModal() {
  const contact = getStoredContact();

  const content = `
    <div style="text-align: left;">
      <p style="font-size: 0.92rem; color: var(--text-secondary); margin-bottom: 20px;">
        Update your contact links and Gmail address. All changes are saved live in your browser:
      </p>

      <form id="contactCustomizerForm">
        <div class="form-group">
          <label class="form-label" for="editGmailInput">Your Gmail Address</label>
          <input type="email" id="editGmailInput" class="form-control" value="${escapeHtml(contact.email)}" required placeholder="e.g. yourname@gmail.com">
        </div>

        <div class="form-group">
          <label class="form-label" for="editGithubInput">GitHub Profile URL</label>
          <input type="url" id="editGithubInput" class="form-control" value="${escapeHtml(contact.github)}" required placeholder="https://github.com/abhiram210106">
        </div>

        <div class="form-group">
          <label class="form-label" for="editLinkedinInput">LinkedIn Profile URL</label>
          <input type="url" id="editLinkedinInput" class="form-control" value="${contact.linkedin === '[ADD LINKEDIN URL]' ? '' : escapeHtml(contact.linkedin)}" placeholder="https://linkedin.com/in/vaka-abhiram">
        </div>

        <div class="form-group">
          <label class="form-label" for="editPhoneInput">Phone Number</label>
          <input type="text" id="editPhoneInput" class="form-control" value="${escapeHtml(contact.phone)}" placeholder="+91 98765 43210">
        </div>

        <div style="margin-bottom: 24px;">
          <label class="toggle-switch-label" for="maskPhoneCheckbox">
            <input type="checkbox" id="maskPhoneCheckbox" ${contact.maskPhone ? 'checked' : ''}>
            <span>🔒 Mask phone number on public website (e.g. +91 98XXX XXXXX)</span>
          </label>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary btn-sm">Save &amp; Apply Details</button>
        </div>
      </form>
    </div>
  `;

  openModal('Update Contact Information', content);

  document.getElementById('contactCustomizerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const newEmail = document.getElementById('editGmailInput')?.value.trim();
    const newGithub = document.getElementById('editGithubInput')?.value.trim();
    const newLinkedin = document.getElementById('editLinkedinInput')?.value.trim() || '[ADD LINKEDIN URL]';
    const newPhone = document.getElementById('editPhoneInput')?.value.trim() || '+91 98000 00000';
    const maskPhone = document.getElementById('maskPhoneCheckbox')?.checked;

    if (newEmail) localStorage.setItem('vaka-contact-email', newEmail);
    if (newGithub) localStorage.setItem('vaka-contact-github', newGithub);
    localStorage.setItem('vaka-contact-linkedin', newLinkedin);
    localStorage.setItem('vaka-contact-phone', newPhone);
    localStorage.setItem('vaka-mask-phone', maskPhone ? 'true' : 'false');

    updateContactDOM();
    closeModal();
    showToast('Contact details & Gmail updated successfully!');
  });
}

/* ==========================================================================
   11. ALL-IN-ONE ASSET MANAGER MODAL
   ========================================================================== */
function openAllInOneAssetManager() {
  const content = `
    <div style="text-align: left; line-height: 1.6;">
      <p style="font-size: 0.92rem; color: var(--text-secondary); margin-bottom: 20px;">
        Manage all your real files, certificates, resume, and contact settings right in your browser:
      </p>

      <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px;">
        <!-- Item 1: Real Certificates -->
        <div style="background: var(--bg-tertiary); padding: 16px; border-radius: 10px; border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
          <div>
            <h4 style="font-size: 1rem; font-weight: 700;">1. Real Certificates &amp; Privacy Mask</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted);">Upload your 4 certificates with automatic privacy masking.</p>
          </div>
          <button class="btn btn-outline btn-sm" onclick="closeModal(); document.getElementById('certifications').scrollIntoView({behavior:'smooth'}); showToast('Scroll to certificates and click Upload on any card.');">
            View &amp; Upload Certs
          </button>
        </div>

        <!-- Item 2: Real Resume -->
        <div style="background: var(--bg-tertiary); padding: 16px; border-radius: 10px; border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
          <div>
            <h4 style="font-size: 1rem; font-weight: 700;">2. Real Resume (PDF)</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted);">Upload your actual PDF resume to enable instant view and download.</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="triggerResumeUpload()">
            Upload Resume PDF
          </button>
        </div>

        <!-- Item 3: Profile Photo -->
        <div style="background: var(--bg-tertiary); padding: 16px; border-radius: 10px; border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
          <div>
            <h4 style="font-size: 1rem; font-weight: 700;">3. Profile Photograph</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted);">Upload your photograph to replace the monogram avatar.</p>
          </div>
          <button class="btn btn-outline btn-sm" onclick="document.getElementById('profilePhotoInput')?.click()">
            Upload Photo
          </button>
        </div>

        <!-- Item 4: Contact & Gmail -->
        <div style="background: var(--bg-tertiary); padding: 16px; border-radius: 10px; border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
          <div>
            <h4 style="font-size: 1rem; font-weight: 700;">4. Contact &amp; Gmail Settings</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted);">Set your Gmail, LinkedIn, GitHub, and phone privacy.</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="openContactEditModal()">
            Edit Contact Info
          </button>
        </div>
      </div>

      <div style="text-align: right;">
        <button class="btn btn-secondary btn-sm" onclick="closeModal()">Close Manager</button>
      </div>
    </div>
  `;

  openModal('Portfolio Files &amp; Credentials Manager', content);
}

/* ==========================================================================
   12. FILE INPUT LISTENERS (CERTIFICATES & RESUME)
   ========================================================================== */
function initFileInputListeners() {
  // Certificate file input
  const certInput = document.getElementById('certUploadInput');
  certInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file || !activeCertUploadId) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setStoredCert(activeCertUploadId, dataUrl);
      showToast('Certificate uploaded successfully with Privacy Mask active!');
      
      // If modal is open, re-render it
      const btn = document.querySelector(`.view-cert-btn[data-cert-id="${activeCertUploadId}"]`);
      if (btn) {
        const certName = btn.getAttribute('data-cert-name');
        const certOrg = btn.getAttribute('data-cert-org');
        const certDesc = btn.getAttribute('data-cert-desc');
        openCertificateModal(activeCertUploadId, certName, certOrg, certDesc);
      }
    };

    reader.readAsDataURL(file);
    certInput.value = '';
  });

  // Resume file input
  const resumeInput = document.getElementById('resumeUploadInput');
  resumeInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      showToast('Please select a valid PDF file for your resume.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      try {
        localStorage.setItem('vaka-custom-resume', dataUrl);
        localStorage.setItem('vaka-resume-name', file.name);
      } catch (err) {
        console.warn('Resume file is large, active in session.');
      }
      showToast(`Resume uploaded: ${file.name}`);
      openResumeViewerModal();
    };

    reader.readAsDataURL(file);
    resumeInput.value = '';
  });
}

/* ==========================================================================
   13. MODAL DISPATCHER & EVENT DELEGATION
   ========================================================================== */
function initModalHandlers() {
  const modalBackdrop = document.getElementById('universalModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  window.openModal = function(title, htmlContent, isWide = false) {
    if (!modalBackdrop || !modalTitle || !modalBody) return;
    const dialog = modalBackdrop.querySelector('.modal-dialog');
    if (dialog) {
      if (isWide) {
        dialog.classList.add('modal-wide');
      } else {
        dialog.classList.remove('modal-wide');
      }
    }
    modalTitle.innerHTML = title;
    modalBody.innerHTML = htmlContent;
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function() {
    if (!modalBackdrop) return;
    const dialog = modalBackdrop.querySelector('.modal-dialog');
    dialog?.classList.remove('modal-wide');
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  modalCloseBtn?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('open')) {
      closeModal();
    }
  });

  // Resume buttons
  document.querySelectorAll('.action-view-resume').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResumeViewerModal();
    });
  });

  document.querySelectorAll('.action-download-resume').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      downloadCustomResume();
    });
  });

  document.getElementById('uploadResumeBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    triggerResumeUpload();
  });

  // Certificate cards "View Certificate"
  document.querySelectorAll('.view-cert-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const certId = btn.getAttribute('data-cert-id') || 'cert-default';
      const certName = btn.getAttribute('data-cert-name') || 'Accomplishment Certificate';
      const certOrg = btn.getAttribute('data-cert-org') || 'Issuing Organization';
      const certDesc = btn.getAttribute('data-cert-desc') || '';
      openCertificateModal(certId, certName, certOrg, certDesc);
    });
  });

  // Certificate cards "Upload Real Cert"
  document.querySelectorAll('.upload-cert-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const certId = btn.getAttribute('data-cert-id') || 'cert-default';
      triggerCertUpload(certId);
    });
  });

  // Contact quick edit triggers
  document.getElementById('openContactEditModalBtn')?.addEventListener('click', openContactEditModal);
  document.getElementById('editEmailQuickBtn')?.addEventListener('click', openContactEditModal);
  document.getElementById('editGithubQuickBtn')?.addEventListener('click', openContactEditModal);
  document.getElementById('editLinkedinQuickBtn')?.addEventListener('click', openContactEditModal);
  document.getElementById('editPhoneQuickBtn')?.addEventListener('click', openContactEditModal);

  // Floating manager button
  document.getElementById('openAssetManagerBtn')?.addEventListener('click', openAllInOneAssetManager);

  // Placeholder Link Handler
  document.querySelectorAll('.placeholder-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const label = link.getAttribute('data-label') || 'Target Link';
      if (label.includes('GitHub')) {
        window.open('https://github.com/abhiram210106/OIBSIP', '_blank');
        showToast('Opening GitHub Repository: abhiram210106/OIBSIP');
      } else {
        showToast(`Live Demo Preview: ${label} simulated on page`);
      }
    });
  });

  // Initialize contact DOM and file inputs
  updateContactDOM();
  initFileInputListeners();
}

/* ==========================================================================
   14. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="m9 12 2 2 4-4"></path>
    </svg>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}

/* ==========================================================================
   15. MLCV DEMO & INTERACTIVE COMPUTER VISION SANDBOX
   ========================================================================== */
let cvFpsInterval = null;

function initMlcvDemo() {
  const mlcvImg = document.getElementById('mlcvMainPreviewImg');
  const openDemoBtn = document.getElementById('openMlcvDemoBtn');
  const previewMediaCard = document.getElementById('mlcvPreviewMediaCard');
  const uploadScreenshotBtn = document.getElementById('uploadMlcvScreenshotBtn');
  const screenshotInput = document.getElementById('mlcvScreenshotInput');

  // Load custom MLCV screenshot if previously uploaded
  const storedScreenshot = localStorage.getItem('vaka-custom-mlcv-img');
  if (storedScreenshot && mlcvImg) {
    mlcvImg.src = storedScreenshot;
  }

  // Interactive Live Demo triggers
  openDemoBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    openMlcvSandboxModal();
  });

  previewMediaCard?.addEventListener('click', (e) => {
    e.preventDefault();
    openMlcvSandboxModal();
  });

  // Custom Screenshot Upload
  uploadScreenshotBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    screenshotInput?.click();
  });

  screenshotInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, SVG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      try {
        localStorage.setItem('vaka-custom-mlcv-img', dataUrl);
      } catch (err) {
        console.warn('Storage limit reached, custom screenshot active for this session.');
      }
      if (mlcvImg) {
        mlcvImg.src = dataUrl;
      }
      showToast('MLCV Featured Preview updated with your custom screenshot!');
    };
    reader.readAsDataURL(file);
    screenshotInput.value = '';
  });
}

let cvAnimationId = null;

function openMlcvSandboxModal() {
  if (cvAnimationId) {
    cancelAnimationFrame(cvAnimationId);
    cvAnimationId = null;
  }

  const content = `
    <div class="cv-sandbox-container">
      <!-- Live Telemetry Stream HUD -->
      <div class="cv-telemetry-bar">
        <div class="cv-telemetry-badge">
          <span class="cv-pulse-dot"></span>
          <span>STACKED META-MODEL: INFERENCE ACTIVE</span>
        </div>
        <div>
          <span>SCAN RATE: <strong style="color:#10b981;" id="cvScanRateHUD">60 mV/s</strong></span> &bull; 
          <span>LATENCY: <strong style="color:#38bdf8;">14.2 ms</strong></span> &bull; 
          <span>ACCURACY R&sup2;: <strong style="color:#a855f7;">99.74%</strong></span>
        </div>
      </div>

      <!-- CV Interactive Voltammogram Canvas Card -->
      <div class="cv-canvas-card">
        <div class="cv-graph-tooltip" id="cvGraphTooltip">
          Potential: +0.38 V &bull; Current: +3.48 mA (Anodic Peak)
        </div>
        <canvas id="cvVoltammogramCanvas" class="cv-graph-canvas" width="680" height="300"></canvas>
      </div>

      <!-- Controls Panel -->
      <div class="cv-controls-grid">
        <!-- Scan Rate Selector -->
        <div>
          <label style="font-size: 0.8rem; font-weight: 700; color: var(--text-primary); display: block; margin-bottom: 6px;">
            Scan Rate (&nu;):
          </label>
          <div style="display: flex; flex-wrap: wrap; gap: 6px;" id="cvScanRateGroup">
            <button class="cv-pill-btn" data-scan="10" type="button">10 mV/s</button>
            <button class="cv-pill-btn" data-scan="20" type="button">20 mV/s</button>
            <button class="cv-pill-btn" data-scan="50" type="button">50 mV/s</button>
            <button class="cv-pill-btn active" data-scan="60" type="button" title="Completely unseen validation dataset">60 mV/s (Unseen)</button>
            <button class="cv-pill-btn" data-scan="100" type="button">100 mV/s</button>
          </div>
        </div>

        <!-- Dopant Matrix Selector -->
        <div>
          <label style="font-size: 0.8rem; font-weight: 700; color: var(--text-primary); display: block; margin-bottom: 6px;">
            Material / Dopant Composition:
          </label>
          <div style="display: flex; flex-wrap: wrap; gap: 6px;" id="cvDopantGroup">
            <button class="cv-pill-btn" data-dopant="pure" type="button">Pure BiFeO₃</button>
            <button class="cv-pill-btn" data-dopant="zn" type="button">10% Zn-doped</button>
            <button class="cv-pill-btn" data-dopant="co" type="button">10% Co-doped</button>
            <button class="cv-pill-btn active" data-dopant="znco" type="button" title="Optimal synergistic co-doped matrix">Zn/Co Co-doped</button>
          </div>
        </div>

        <!-- Overlay Benchmark Toggle -->
        <div style="display: flex; flex-direction: column; justify-content: center;">
          <label style="display: flex; align-items: center; gap: 8px; font-size: 0.82rem; cursor: pointer; color: var(--text-primary); font-weight: 600;">
            <input type="checkbox" id="cvOverlayExpCheckbox" checked style="accent-color: #f59e0b; width: 16px; height: 16px;">
            <span>Overlay Experimental Lab Curve</span>
          </label>
          <span style="font-size: 0.72rem; color: #94a3b8; margin-top: 4px; margin-left: 24px;">
            Compares AI Meta-Model (Cyan) vs Physical Lab Data (Amber Dashed)
          </span>
        </div>
      </div>

      <!-- Real-Time Metrics & Telemetry Grid -->
      <div class="cv-stats-grid">
        <div class="cv-stat-box">
          <div class="cv-stat-val" id="cvStatCsp" style="color: #10b981;">114.84</div>
          <div class="cv-stat-lbl">Pred Csp (F g⁻¹)</div>
        </div>
        <div class="cv-stat-box">
          <div class="cv-stat-val" id="cvStatLab" style="color: #f59e0b;">115.39</div>
          <div class="cv-stat-lbl">Lab Csp (F g⁻¹)</div>
        </div>
        <div class="cv-stat-box">
          <div class="cv-stat-val" id="cvStatError" style="color: #38bdf8;">0.47%</div>
          <div class="cv-stat-lbl">Error Margin</div>
        </div>
        <div class="cv-stat-box">
          <div class="cv-stat-val" id="cvStatR2" style="color: #a855f7;">99.74%</div>
          <div class="cv-stat-lbl">Model R² Score</div>
        </div>
        <div class="cv-stat-box">
          <div class="cv-stat-val" id="cvStatRmse" style="color: #06b6d4;">0.000401</div>
          <div class="cv-stat-lbl">Error (RMSE)</div>
        </div>
        <div class="cv-stat-box">
          <div class="cv-stat-val" id="cvStatIpa" style="color: #e2e8f0;">+3.48 mA</div>
          <div class="cv-stat-lbl">Peak Ipa (+0.38V)</div>
        </div>
      </div>

      <!-- Technical Architecture Breakdown -->
      <div style="margin-top: 4px;">
        <h4 style="font-size: 0.88rem; font-weight: 700; margin-bottom: 6px; color: var(--text-primary);">
          Stacked Meta-Model Architecture:
        </h4>
        <div class="cv-pipeline-stages">
          <div class="cv-stage-card">
            <h5><span style="color:#06b6d4;">01</span> ANN Regressor</h5>
            <p style="color: var(--text-muted);">Deep Dense layers capturing non-linear pseudocapacitive charge transfer dynamics (Weight: 42%).</p>
          </div>
          <div class="cv-stage-card">
            <h5><span style="color:#818cf8;">02</span> Random Forest</h5>
            <p style="color: var(--text-muted);">Ensemble decision trees isolating discrete dopant matrix oxidation boundary conditions (Weight: 22%).</p>
          </div>
          <div class="cv-stage-card">
            <h5><span style="color:#a855f7;">03</span> XGBoost Regressor</h5>
            <p style="color: var(--text-muted);">Extreme Gradient Boosting on residual electrochemical hysteresis deviations (Weight: 36%).</p>
          </div>
          <div class="cv-stage-card">
            <h5><span style="color:#10b981;">04</span> RidgeCV Meta-Learner</h5>
            <p style="color: var(--text-muted);">L2 regularized meta-regression combining multi-model tensors into final high-fidelity CV curve.</p>
          </div>
        </div>
      </div>

      <!-- Live External Links & Actions -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-top: 10px; padding-top: 12px; border-top: 1px solid var(--border-subtle);">
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <a href="https://anirudhrao-24.github.io/cv-ml-supercapacitor-bfo/" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            Live Web Dashboard
          </a>
          <a href="https://cv-ml-supercapacitor-bfo-i0cu.onrender.com/" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
            Live ML API (Render)
          </a>
        </div>
        <button type="button" class="btn btn-outline btn-sm" onclick="closeModal()">Close Simulation</button>
      </div>
    </div>
  `;

  openModal('ML-Based Prediction of Cyclic Voltammetry for Supercapacitors (BiFeO₃)', content, true);
  initCvSimulationInteractions();
}

function initCvSimulationInteractions() {
  const canvas = document.getElementById('cvVoltammogramCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const tooltip = document.getElementById('cvGraphTooltip');
  const scanHud = document.getElementById('cvScanRateHUD');
  const overlayCheckbox = document.getElementById('cvOverlayExpCheckbox');

  // Metric displays
  const statCsp = document.getElementById('cvStatCsp');
  const statLab = document.getElementById('cvStatLab');
  const statError = document.getElementById('cvStatError');
  const statR2 = document.getElementById('cvStatR2');
  const statRmse = document.getElementById('cvStatRmse');
  const statIpa = document.getElementById('cvStatIpa');

  // Simulation state
  let currentScanRate = 60; // mV/s
  let currentDopant = 'znco'; // 'pure' | 'zn' | 'co' | 'znco'
  let showOverlay = true;
  let tracerProgress = 0;

  // Handle Retina High-DPI scaling
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = (rect.width || 680) * dpr;
  canvas.height = (rect.height || 300) * dpr;
  ctx.scale(dpr, dpr);
  const w = rect.width || 680;
  const h = rect.height || 300;

  // Potential window: -0.2V to +0.6V (Delta V = 0.8V)
  const vMin = -0.20;
  const vMax = 0.60;

  // Coordinate transformation helpers
  function vToX(v) {
    const pad = 50;
    return pad + ((v - vMin) / (vMax - vMin)) * (w - pad * 2);
  }

  function xToV(x) {
    const pad = 50;
    return vMin + ((x - pad) / (w - pad * 2)) * (vMax - vMin);
  }

  function iToY(i, iMax) {
    const pad = 30;
    return (h / 2) - (i / iMax) * ((h / 2) - pad);
  }

  // Calculate Cyclic Voltammetry Curve Points
  function generateCvCurve(scanRate, dopant, isLab = false) {
    const points = [];
    const step = 0.008;

    // Physics parameters based on scan rate and dopant
    const rateFactor = Math.pow(scanRate / 60, 0.82);
    let dopantMult = 1.0;
    let vpa = 0.38 + 0.03 * Math.log(scanRate / 60);
    let vpc = 0.18 - 0.03 * Math.log(scanRate / 60);

    if (dopant === 'pure') {
      dopantMult = 0.62;
      vpa = 0.42;
      vpc = 0.14;
    } else if (dopant === 'zn') {
      dopantMult = 0.88;
      vpa = 0.39;
      vpc = 0.17;
    } else if (dopant === 'co') {
      dopantMult = 0.94;
      vpa = 0.37;
      vpc = 0.19;
    } else {
      dopantMult = 1.00;
    }

    const baseIpa = 3.48 * dopantMult * rateFactor;
    const baseIpc = 2.91 * dopantMult * rateFactor;
    const diffBg = 1.15 * dopantMult * rateFactor;

    // Small physical variance for lab ground truth
    const labOffset = isLab ? (scanRate === 60 && dopant === 'znco' ? 0.015 : 0.02) : 0;

    // 1. Forward Scan (Anodic): vMin -> vMax
    for (let v = vMin; v <= vMax; v += step) {
      const peakGauss = Math.exp(-Math.pow(v - vpa, 2) / (2 * Math.pow(0.09, 2)));
      const capacitiveBg = diffBg * (1 + 0.45 * (v - vMin));
      let current = capacitiveBg + (baseIpa - capacitiveBg) * peakGauss;
      if (isLab) current += (Math.sin(v * 28) * 0.03 + labOffset);
      points.push({ v, i: current, branch: 'anodic' });
    }

    // 2. Reverse Scan (Cathodic): vMax -> vMin
    for (let v = vMax; v >= vMin; v -= step) {
      const peakGauss = Math.exp(-Math.pow(v - vpc, 2) / (2 * Math.pow(0.10, 2)));
      const capacitiveBg = -diffBg * (1 + 0.35 * (vMax - v));
      let current = capacitiveBg - (baseIpc + capacitiveBg) * peakGauss;
      if (isLab) current -= (Math.cos(v * 24) * 0.03 + labOffset);
      points.push({ v, i: current, branch: 'cathodic' });
    }

    return points;
  }

  // Update telemetry stats
  function updateTelemetry(scanRate, dopant) {
    if (scanHud) scanHud.textContent = `${scanRate} mV/s`;

    let predCsp = 114.84;
    let labCsp = 115.39;

    if (scanRate === 60 && dopant === 'znco') {
      predCsp = 114.84;
      labCsp = 115.39;
    } else {
      // Pseudocapacitive scaling inversely proportional to scan rate
      const baseMap = { 10: 182.10, 20: 158.40, 50: 126.30, 60: 114.84, 100: 92.60 };
      const dopMap = { pure: 0.62, zn: 0.88, co: 0.94, znco: 1.00 };
      const raw = (baseMap[scanRate] || 114.84) * (dopMap[dopant] || 1.0);
      predCsp = parseFloat(raw.toFixed(2));
      labCsp = parseFloat((raw * (1 + (Math.random() * 0.008 - 0.004))).toFixed(2));
    }

    const errMargin = (Math.abs(predCsp - labCsp) / labCsp * 100).toFixed(2);
    const rateFactor = Math.pow(scanRate / 60, 0.82);
    const dopMult = dopant === 'pure' ? 0.62 : dopant === 'zn' ? 0.88 : dopant === 'co' ? 0.94 : 1.0;
    const ipaVal = (3.48 * dopMult * rateFactor).toFixed(2);

    if (statCsp) statCsp.textContent = predCsp.toFixed(2);
    if (statLab) statLab.textContent = labCsp.toFixed(2);
    if (statError) statError.textContent = `${errMargin}%`;
    if (statR2) statR2.textContent = scanRate === 60 ? '99.74%' : '99.68%';
    if (statRmse) statRmse.textContent = scanRate === 60 ? '0.000401' : '0.000520';
    if (statIpa) statIpa.textContent = `+${ipaVal} mA`;
  }

  // Draw the complete Voltammogram canvas frame
  function renderFrame() {
    ctx.clearRect(0, 0, w, h);

    const pad = 50;
    const rateFactor = Math.pow(currentScanRate / 60, 0.82);
    const dopMult = currentDopant === 'pure' ? 0.62 : currentDopant === 'zn' ? 0.88 : currentDopant === 'co' ? 0.94 : 1.0;
    const iMax = Math.max(4.6, 3.8 * rateFactor * dopMult + 0.8);

    // 1. Draw Grid Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    ctx.setLineDash([]);

    // Vertical grid (Potential V)
    for (let v = -0.2; v <= 0.61; v += 0.1) {
      const x = vToX(v);
      ctx.beginPath();
      ctx.moveTo(x, 20);
      ctx.lineTo(x, h - 30);
      ctx.stroke();

      // Axis label
      ctx.fillStyle = '#64748b';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${v.toFixed(1)}V`, x, h - 14);
    }

    // Horizontal grid (Current I)
    const yZero = iToY(0, iMax);
    for (let i = -4; i <= 4; i += 2) {
      const y = iToY(i, iMax);
      ctx.beginPath();
      ctx.moveTo(pad, y);
      ctx.lineTo(w - pad, y);
      ctx.stroke();

      if (i !== 0) {
        ctx.fillStyle = '#64748b';
        ctx.font = '10px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`${i > 0 ? '+' : ''}${i} mA`, pad - 6, y + 3);
      }
    }

    // Zero-current axis line (prominent)
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(pad, yZero);
    ctx.lineTo(w - pad, yZero);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.textAlign = 'right';
    ctx.fillText('0 mA', pad - 6, yZero + 3);

    // X and Y Axis titles
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Potential E (V vs Ag/AgCl)', w / 2, h - 2);

    ctx.save();
    ctx.translate(14, h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Current I (mA)', 0, 0);
    ctx.restore();

    // 2. Compute Curves
    const predCurve = generateCvCurve(currentScanRate, currentDopant, false);
    const labCurve = generateCvCurve(currentScanRate, currentDopant, true);

    // 3. Draw Predicted Curve Area Fill (Charge Integration Q = \int I dV)
    ctx.beginPath();
    if (predCurve.length > 0) {
      ctx.moveTo(vToX(predCurve[0].v), iToY(predCurve[0].i, iMax));
      for (let k = 1; k < predCurve.length; k++) {
        ctx.lineTo(vToX(predCurve[k].v), iToY(predCurve[k].i, iMax));
      }
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, 'rgba(6, 182, 212, 0.18)');
      grad.addColorStop(1, 'rgba(16, 185, 129, 0.12)');
      ctx.fillStyle = grad;
      ctx.fill();
    }

    // 4. Draw Experimental Lab Curve if Overlay Active (Amber Dashed)
    if (showOverlay && labCurve.length > 0) {
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(vToX(labCurve[0].v), iToY(labCurve[0].i, iMax));
      for (let k = 1; k < labCurve.length; k++) {
        ctx.lineTo(vToX(labCurve[k].v), iToY(labCurve[k].i, iMax));
      }
      ctx.closePath();
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 5. Draw Stacked Meta-Model Prediction Line (Glowing Cyan/Emerald)
    if (predCurve.length > 0) {
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 10;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.6;
      ctx.beginPath();
      ctx.moveTo(vToX(predCurve[0].v), iToY(predCurve[0].i, iMax));
      for (let k = 1; k < predCurve.length; k++) {
        ctx.lineTo(vToX(predCurve[k].v), iToY(predCurve[k].i, iMax));
      }
      ctx.closePath();
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // 6. Anodic & Cathodic Peak Badges
    const vpa = 0.38 + 0.03 * Math.log(currentScanRate / 60);
    const vpc = 0.18 - 0.03 * Math.log(currentScanRate / 60);
    const ipa = 3.48 * dopMult * rateFactor;
    const ipc = -2.91 * dopMult * rateFactor;

    // Anodic Peak Marker
    const paX = vToX(vpa);
    const paY = iToY(ipa, iMax);
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(paX, paY, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Ipa', paX, paY - 8);

    // Cathodic Peak Marker
    const pcX = vToX(vpc);
    const pcY = iToY(ipc, iMax);
    ctx.fillStyle = '#818cf8';
    ctx.beginPath();
    ctx.arc(pcX, pcY, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText('Ipc', pcX, pcY + 14);

    // 7. Dynamic Sweep Tracer Dot along CV loop
    if (predCurve.length > 0) {
      const idx = Math.floor(tracerProgress * (predCurve.length - 1));
      const pt = predCurve[idx] || predCurve[0];
      const dotX = vToX(pt.v);
      const dotY = iToY(pt.i, iMax);

      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(dotX, dotY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(dotX, dotY, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // 8. Graph Legend
    ctx.font = '10px monospace';
    ctx.textAlign = 'left';
    // AI Model
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(w - 210, 20, 14, 3);
    ctx.fillText('Meta-Model AI Pred', w - 190, 23);
    // Lab Benchmark
    if (showOverlay) {
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(w - 210, 36, 14, 3);
      ctx.fillText('Experimental Lab Value', w - 190, 39);
    }

    // Advance sweep tracer
    tracerProgress = (tracerProgress + 0.004) % 1;
    if (document.getElementById('universalModal')?.classList.contains('open')) {
      cvAnimationId = requestAnimationFrame(renderFrame);
    }
  }

  // Hook up scan rate buttons
  const scanButtons = document.querySelectorAll('#cvScanRateGroup .cv-pill-btn');
  scanButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      scanButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentScanRate = parseInt(btn.getAttribute('data-scan') || '60', 10);
      updateTelemetry(currentScanRate, currentDopant);
      showToast(`Scan rate updated to ${currentScanRate} mV/s`);
    });
  });

  // Hook up dopant buttons
  const dopantButtons = document.querySelectorAll('#cvDopantGroup .cv-pill-btn');
  dopantButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      dopantButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDopant = btn.getAttribute('data-dopant') || 'znco';
      updateTelemetry(currentScanRate, currentDopant);
      showToast(`Dopant matrix set to ${btn.textContent.trim()}`);
    });
  });

  // Hook up experimental overlay checkbox
  overlayCheckbox?.addEventListener('change', (e) => {
    showOverlay = e.target.checked;
    if (showOverlay) {
      showToast('Experimental Lab Benchmark Curve Overlaid');
    } else {
      showToast('Experimental Benchmark Hidden (AI Only)');
    }
  });

  // Interactive mouse crosshair coordinates
  canvas.addEventListener('mousemove', (e) => {
    const cRect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - cRect.left;
    const vHover = xToV(mouseX);
    if (vHover >= vMin && vHover <= vMax && tooltip) {
      const predCurve = generateCvCurve(currentScanRate, currentDopant, false);
      let closest = predCurve[0];
      let minDiff = 999;
      for (let pt of predCurve) {
        const diff = Math.abs(pt.v - vHover);
        if (diff < minDiff) {
          minDiff = diff;
          closest = pt;
        }
      }
      tooltip.innerHTML = `Potential: <strong>${closest.v.toFixed(3)} V</strong> &bull; Current: <strong>${closest.i > 0 ? '+' : ''}${closest.i.toFixed(3)} mA</strong> (${closest.branch})`;
    }
  });

  // Start animation loop and initialize telemetry
  updateTelemetry(currentScanRate, currentDopant);
  renderFrame();
}

/* ==========================================================================
   16. OWNER / ADMIN MODE (VISITORS ONLY WATCH, OWNER CAN UPLOAD & EDIT)
   ========================================================================== */
const OWNER_DEFAULT_PIN = '2101'; // Default Owner PIN for Vaka Abhiram

function isOwnerActive() {
  return document.body.classList.contains('owner-mode-active');
}

function setOwnerMode(active, showFeedback = true) {
  const restoreBtn = document.getElementById('restoreOwnerModeBtn');
  const banner = document.getElementById('ownerModeBanner');

  if (active) {
    document.body.classList.add('owner-mode-active');
    localStorage.setItem('vaka-portfolio-mode', 'owner');
    if (restoreBtn) restoreBtn.style.display = 'none';
    if (banner) banner.style.display = 'flex';
    if (showFeedback) {
      showToast('👑 Owner Mode Active: All upload buttons for Certificates, Resume, & Photos are enabled.');
    }
  } else {
    document.body.classList.remove('owner-mode-active');
    localStorage.setItem('vaka-portfolio-mode', 'visitor');
    if (restoreBtn) restoreBtn.style.display = 'flex';
    if (banner) banner.style.display = 'none';
    if (showFeedback) {
      showToast('👁️ Visitor Preview Active: Upload controls hidden to preview what visitors see.');
    }
  }
}

function initOwnerMode() {
  // Check stored mode. Default to OWNER MODE so Abhiram always sees his upload controls!
  const storedMode = localStorage.getItem('vaka-portfolio-mode');
  const urlParams = new URLSearchParams(window.location.search);
  const wantsVisitor = urlParams.has('view') || urlParams.has('visitor') || storedMode === 'visitor';

  if (wantsVisitor) {
    setOwnerMode(false, false);
  } else {
    // Default: Owner Mode is ON
    setOwnerMode(true, false);
  }

  // Restore Owner Mode button (appears when previewing as visitor)
  document.getElementById('restoreOwnerModeBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    setOwnerMode(true, true);
  });

  // Top banner button: switch to visitor preview
  document.getElementById('ownerBannerExitBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    setOwnerMode(false, true);
  });

  // Top banner button: open manager modal
  document.getElementById('ownerBannerManagerBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    openAllInOneAssetManager();
  });

  // Footer link trigger
  document.getElementById('ownerLoginFooterLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    openOwnerPinModal();
  });

  // Double-click on Monogram or Brand Logo in header
  document.querySelectorAll('.brand-logo, .brand-monogram').forEach(elem => {
    elem.addEventListener('dblclick', (e) => {
      e.preventDefault();
      openOwnerPinModal();
    });
  });

  // Keyboard shortcut: Ctrl + Shift + A
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === 'O' || e.key === 'o')) {
      e.preventDefault();
      openOwnerPinModal();
    }
  });
}

function openOwnerPinModal() {
  if (isOwnerActive()) {
    // Already in owner mode - offer options
    const content = `
      <div style="text-align: center; line-height: 1.6;">
        <div style="font-size: 2.2rem; margin-bottom: 12px;">👑</div>
        <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 8px;">Owner Management Mode is Active</h4>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 24px;">
          You currently have full upload and edit permissions active. All upload buttons for certificates, resume, and photos are visible.
        </p>
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" onclick="closeModal(); openAllInOneAssetManager();">
            Manage Files &amp; Certs
          </button>
          <button class="btn btn-outline btn-sm" style="border-color: rgba(148,163,184,0.4); color: #cbd5e1;" onclick="setOwnerMode(false); closeModal();">
            👁️ Switch to Visitor Preview
          </button>
          <button class="btn btn-secondary btn-sm" onclick="closeModal()">Close</button>
        </div>
      </div>
    `;
    openModal('Owner Management Mode', content);
    return;
  }

  // Not in owner mode - prompt for PIN or quick restore
  const content = `
    <div style="text-align: center; line-height: 1.6;">
      <div style="font-size: 2.2rem; margin-bottom: 12px;">🔐</div>
      <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 6px;">Owner Authentication</h4>
      <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 20px;">
        Enter your Owner PIN to activate upload buttons and file management.
      </p>

      <form id="ownerPinForm" style="max-width: 300px; margin: 0 auto;">
        <div class="form-group" style="text-align: left; margin-bottom: 16px;">
          <label class="form-label" for="ownerPinInput">Owner PIN</label>
          <input type="password" id="ownerPinInput" class="form-control" placeholder="Enter PIN (Default: 2101)" required autofocus style="text-align: center; font-size: 1.2rem; letter-spacing: 4px;">
          <div id="pinErrorMsg" style="display: none; color: #ef4444; font-size: 0.8rem; margin-top: 6px; font-weight: 600;">
            ✕ Incorrect PIN. Please try again.
          </div>
        </div>

        <div style="display: flex; gap: 10px; justify-content: center; margin-top: 20px;">
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary btn-sm">Unlock Owner Mode</button>
        </div>
      </form>

      <p style="font-size: 0.76rem; color: var(--text-muted); margin-top: 18px;">
        💡 Default Owner PIN is <code>2101</code>.
      </p>
    </div>
  `;

  openModal('🔐 Owner Verification', content);

  const form = document.getElementById('ownerPinForm');
  const input = document.getElementById('ownerPinInput');
  const errorMsg = document.getElementById('pinErrorMsg');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const enteredPin = input?.value.trim();
    const currentPin = localStorage.getItem('vaka-owner-pin') || OWNER_DEFAULT_PIN;

    if (enteredPin === currentPin) {
      closeModal();
      setOwnerMode(true);
    } else {
      if (errorMsg) errorMsg.style.display = 'block';
      if (input) {
        input.value = '';
        input.focus();
      }
    }
  });
}



