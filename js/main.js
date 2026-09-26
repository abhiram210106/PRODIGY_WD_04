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

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter') || 'all';

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

      <!-- Action & Upload Controls -->
      <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; padding-top: 14px; border-top: 1px solid var(--border-subtle);">
        <button class="btn btn-primary btn-sm" type="button" onclick="triggerCertUpload('${certId}')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          ${customCert ? 'Upload Replacement File' : 'Upload Real Certificate (Image/PDF)'}
        </button>
        ${customCert ? `
          <button class="btn btn-outline btn-sm" type="button" onclick="resetCertToDefault('${certId}', '${escapeHtml(certName)}', '${escapeHtml(certOrg)}', '${escapeHtml(certDesc)}')">
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
          <button class="btn btn-outline btn-sm" onclick="triggerResumeUpload()">Replace PDF</button>
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
        <div style="background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.3); border-radius: 8px; padding: 16px; margin-bottom: 20px;">
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

  window.openModal = function(title, htmlContent) {
    if (!modalBackdrop || !modalTitle || !modalBody) return;
    modalTitle.innerHTML = title;
    modalBody.innerHTML = htmlContent;
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function() {
    if (!modalBackdrop) return;
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

