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
   6. CONTACT FORM HANDLING
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

    // Simulated submission with feedback
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
      Sending Message...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      contactForm.reset();
      
      openModal(
        'Message Prepared',
        `Thank you <strong>${escapeHtml(name)}</strong>!<br><br>
        Your message has been captured. Contact endpoints currently use placeholders (<code>[ADD EMAIL]</code>).<br>
        To directly reach out, you can update your email address in <code>index.html</code>.`
      );

      showToast('Message submitted successfully!');
    }, 900);
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
   8. MODALS & PLACEHOLDER CLICKS
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

  // Handle Resume CTA
  document.querySelectorAll('.action-view-resume').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(
        'Vaka Abhiram – Resume Preview',
        `<div style="text-align: left; line-height: 1.7;">
          <div style="background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.3); border-radius: 8px; padding: 14px; margin-bottom: 16px;">
            <p style="font-size: 0.9rem; color: #818cf8; margin-bottom: 4px;"><strong>Software Developer Resume Document</strong></p>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">Currently configured as resume placeholder. To attach your complete PDF resume file, save it as <code>assets/resume.pdf</code>.</p>
          </div>
          <h4 style="font-size: 1.1rem; margin-bottom: 8px;">Vaka Abhiram</h4>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 12px;">Hyderabad, Telangana, India | B.Tech CSE (KMCE) 2028</p>
          <p style="font-size: 0.95rem; margin-bottom: 14px;"><strong>Target Role:</strong> Software Developer / Java Development / AI &amp; ML</p>
          <p style="font-size: 0.9rem; color: var(--text-secondary);"><strong>Key Technical Stack:</strong> Java, Python, Web Development, OpenCV, Machine Learning, Git, GitHub</p>
        </div>`
      );
    });
  });

  document.querySelectorAll('.action-download-resume').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Downloading resume placeholder... (Add your resume.pdf to assets folder)');
      openModal(
        'Resume Download',
        `<p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 16px;">
          To connect your actual PDF resume:
        </p>
        <ol style="margin-left: 20px; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.8;">
          <li>Name your resume file: <code>resume.pdf</code></li>
          <li>Place it in the <code>assets/</code> folder</li>
          <li>The Download button will directly serve your file!</li>
        </ol>`
      );
    });
  });

  // Certificate Modal Handlers
  document.querySelectorAll('.view-cert-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const certName = btn.getAttribute('data-cert-name') || 'Accomplishment Certificate';
      const certOrg = btn.getAttribute('data-cert-org') || 'Issuing Organization';
      const certDesc = btn.getAttribute('data-cert-desc') || '';

      openModal(
        `${certName}`,
        `<div style="text-align: center; margin-bottom: 20px;">
          <img src="assets/cert-placeholder.svg" alt="Certificate Preview" style="width: 100%; max-height: 320px; border-radius: 8px; border: 1px solid var(--border-subtle); margin-bottom: 16px;">
          <h4 style="font-size: 1.15rem; margin-bottom: 6px;">${escapeHtml(certName)}</h4>
          <p style="font-size: 0.9rem; color: var(--accent-secondary); font-weight: 600; margin-bottom: 10px;">${escapeHtml(certOrg)}</p>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 16px;">${escapeHtml(certDesc)}</p>
          <div style="background: var(--bg-tertiary); padding: 10px; border-radius: 6px; font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">
            Credential Status: Verified Credential Record • [ADD LINK]
          </div>
        </div>`
      );
    });
  });

  // Placeholder Link Handler
  document.querySelectorAll('.placeholder-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const label = link.getAttribute('data-label') || 'Target Link';
      showToast(`Link Placeholder: [ADD LINK for ${label}]`);
    });
  });
}

/* ==========================================================================
   9. TOAST NOTIFICATION UTILITY
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
