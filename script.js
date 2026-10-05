/* ==========================================================================
   UNFOLD THEME — JAVASCRIPT LOGIC & INTERACTIONS (ANIMESH MISHRA)
   Smooth scroll, sticky header, mobile menu, modals, and clipboard triggers
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  // 1. Sticky Header Background Transition on Scroll
  const header = document.getElementById("unfoldHeader");
  window.addEventListener("scroll", () => {
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  });

  // 2. Pure Pitch-Black Dark Theme Enforced (Only Dark Mode)
  document.documentElement.setAttribute("data-theme", "dark");
  try {
    localStorage.removeItem("animesh-unfold-theme");
  } catch (e) {}

  // 3. Mobile Navigation Menu Toggle with Outside Click & Escape Close
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const mobileNavMenu = document.getElementById("mobileNavMenu");

  function closeMobileMenu() {
    if (mobileNavMenu && mobileNavMenu.classList.contains("open")) {
      mobileNavMenu.classList.remove("open");
      if (mobileBtn) {
        const icon = mobileBtn.querySelector("i");
        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-times");
        }
      }
    }
  }

  if (mobileBtn && mobileNavMenu) {
    mobileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = mobileNavMenu.classList.toggle("open");
      const icon = mobileBtn.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars", !isOpen);
        icon.classList.toggle("fa-times", isOpen);
      }
    });

    mobileNavMenu.querySelectorAll(".unfold-link").forEach(link => {
      link.addEventListener("click", () => {
        closeMobileMenu();
      });
    });

    // Close when tapping outside the menu
    document.addEventListener("click", (e) => {
      if (!mobileNavMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    });
  }

  // 4. Navigation Active State on Scroll (Scroll Spy)
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".unfold-link");

  window.addEventListener("scroll", () => {
    let currentId = "hero";
    const scrollPos = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;

    // Check if scrolled to bottom of document
    if (scrollPos + winHeight >= docHeight - 60) {
      currentId = "contact";
    } else {
      sections.forEach(sec => {
        const top = sec.offsetTop - 130;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentId = sec.getAttribute("id");
        }
      });
    }

    navItems.forEach(item => {
      item.classList.remove("active");
      const href = item.getAttribute("href");
      if (href === `#${currentId}`) {
        item.classList.add("active");
      }
    });
  }, { passive: true });

  // 5. Skill Progress Meters Animation on Scroll
  const skillBars = document.querySelectorAll(".skill-bar-fill");
  const skillsSection = document.getElementById("skills") || document.getElementById("skillsSection");

  if (skillsSection && skillBars.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillBars.forEach(bar => {
            const level = bar.getAttribute("data-level");
            if (level) {
              bar.style.width = level;
            }
          });
        }
      });
    }, { threshold: 0.25 });

    skillObserver.observe(skillsSection);
  }

  // 6. Project Category Filtering
  const filterBtns = document.querySelectorAll(".filter-tab-btn");
  const projectCards = document.querySelectorAll(".project-card-elem");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");

      projectCards.forEach(card => {
        const cat = card.getAttribute("data-category");
        if (filter === "all" || cat === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 7. Project Details Modal Data & Handlers
  const projectDetailsMap = {
    flipquiz: {
      title: "FlipQuiz Platform",
      tag: "Full-Stack Assessment Platform",
      desc: "FlipQuiz is an interactive web platform designed for rapid concept testing. Built with clean modular components, smooth card-flip animations, real-time scoring algorithms, and category filters.",
      features: [
        "Card-flip animation physics on answer review",
        "Dynamic score computation algorithm with live meters",
        "Deployed live on Render cloud with responsive layouts",
        "Semantic, mobile-first responsive architecture"
      ],
      link: "https://flipquiz.onrender.com"
    },
    medilife: {
      title: "MediLife Pharmacy Store",
      tag: "E-Commerce Medicine Store",
      desc: "A feature-complete online healthcare store featuring medicine category filtering, dynamic shopping cart state with live subtotal calculation, and client-side checkout simulation.",
      features: [
        "Live interactive shopping cart with quantity increment/decrement",
        "Instant category search and query filtering",
        "Client-side user flow and order feedback simulation",
        "Deployed live directly on GitHub Pages"
      ],
      link: "https://ani2025-git.github.io/e-commerce/"
    },
    tictactoe: {
      title: "Tic-Tac-Toe Arena",
      tag: "Interactive Web Game",
      desc: "A 2D matrix turn-based web game with smart mathematical win-line strike algorithms, player round histories, dynamic turn indicators, and responsive controls.",
      features: [
        "Mathematical win-line detection and draw state validation",
        "Round history and player score tracking",
        "Clean sound effects and smooth win highlight animations",
        "Hosted live on Render cloud"
      ],
      link: "https://tic-tac-toe-uwu9.onrender.com"
    },
    analytics: {
      title: "Analytics Dashboard Hub",
      tag: "Data Visualization & Metrics",
      desc: "Interactive data console showcasing real-time metric graphs, KPI status indicators, and modular widget layouts designed for data clarity.",
      features: [
        "Modular dashboard cards with customizable layout views",
        "High-contrast dark mode tailored for data readability",
        "Optimized for real-time metric tracking"
      ],
      link: "#"
    }
  };

  document.querySelectorAll(".btn-info-pop").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-key");
      const data = projectDetailsMap[key];
      const modalContent = document.getElementById("projectModalContent");
      if (data && modalContent) {
        modalContent.innerHTML = `
          <div style="margin-bottom: 16px;">
            <span class="project-category-tag" style="margin-bottom: 6px; display:inline-block;">${data.tag}</span>
            <h2 style="font-family: var(--font-heading); font-size: 24px; color:var(--text-primary); margin-top: 4px;">${data.title}</h2>
          </div>
          <p style="color: var(--text-secondary); font-size: 14.5px; line-height: 1.7; margin-bottom: 22px;">${data.desc}</p>
          
          <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 20px; margin-bottom: 24px;">
            <h4 style="color:var(--text-primary); font-size: 14.5px; margin-bottom: 10px;"><i class="fas fa-check-circle" style="margin-right:8px;"></i> Technical Highlights</h4>
            <ul style="list-style: none; font-size: 13.5px; color: var(--text-secondary); line-height: 1.85;">
              ${data.features.map(f => `<li>• ${f}</li>`).join("")}
            </ul>
          </div>

          <div style="display:flex; gap:12px; justify-content: flex-end;">
            ${data.link !== '#' ? `
              <a href="${data.link}" target="_blank" rel="noopener noreferrer" class="btn-unfold-pill-white" style="padding:10px 22px; font-size:13px;">
                <i class="fas fa-arrow-up-right-from-square"></i> Open Live App
              </a>
            ` : `
              <button class="btn-unfold-pill-trans" onclick="closeModal('projectModal')" style="padding:10px 22px; font-size:13px;">
                Close
              </button>
            `}
          </div>
        `;
        openModal("projectModal");
      }
    });
  });

  // 8. Close Modals on Backdrop Click or Escape Key
  document.querySelectorAll(".modal-overlay-backdrop").forEach(backdrop => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove("active");
      }
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-overlay-backdrop.active").forEach(m => m.classList.remove("active"));
    }
  });

  // 9. Hero Dynamic Role Rotator
  const roleRotator = document.getElementById("roleRotator");
  if (roleRotator) {
    const roles = [
      "Frontend Developer",
      "React.js Engineer",
      "UI/UX Architect",
      "JavaScript Specialist"
    ];
    let roleIdx = 0;
    setInterval(() => {
      roleRotator.style.opacity = "0";
      roleRotator.style.transform = "translateY(5px)";
      setTimeout(() => {
        roleIdx = (roleIdx + 1) % roles.length;
        roleRotator.textContent = roles[roleIdx];
        roleRotator.style.opacity = "1";
        roleRotator.style.transform = "translateY(0)";
      }, 300);
    }, 3200);
  }

  // 10. Ambient Cursor Spotlight Tracking
  const spotlight = document.getElementById("cursorSpotlight");
  if (spotlight && window.matchMedia("(pointer: fine)").matches) {
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let posX = targetX;
    let posY = targetY;
    let active = false;

    window.addEventListener("mousemove", (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!active) {
        spotlight.style.opacity = "1";
        active = true;
      }
    }, { passive: true });

    window.addEventListener("mouseleave", () => {
      spotlight.style.opacity = "0";
      active = false;
    });

    function renderSpotlight() {
      posX += (targetX - posX) * 0.12;
      posY += (targetY - posY) * 0.12;
      spotlight.style.left = `${posX}px`;
      spotlight.style.top = `${posY}px`;
      requestAnimationFrame(renderSpotlight);
    }
    requestAnimationFrame(renderSpotlight);
  }

  // 11. Subtle 3D Card Tilt on Hover
  if (window.matchMedia("(pointer: fine)").matches) {
    const tiltCards = document.querySelectorAll(".project-card-elem, .timeline-content-box");
    tiltCards.forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotX = ((y - centerY) / centerY) * -4.5;
        const rotY = ((x - centerX) / centerX) * 4.5;
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }
});

// Modal Helpers
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add("active");
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove("active");
}

// Minimalist Toast
function showToast(message) {
  const toast = document.getElementById("toastAlert");
  const msg = document.getElementById("toastMsg");
  if (!toast || !msg) return;
  msg.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

// 1-Click Clipboard Copy
function copyContact(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast("📋 Copied " + text + " to clipboard!");
  }).catch(() => {
    showToast("Copied: " + text);
  });
}

// Contact Form Handler
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("senderName").value.trim();
  const btn = document.getElementById("submitBtn");
  const originalHtml = btn.innerHTML;

  btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = `<i class="fas fa-check"></i> Message Sent!`;
    showToast(`✨ Thank you, ${name}! Your message has been received.`);
    document.getElementById("contactForm").reset();

    setTimeout(() => {
      btn.innerHTML = originalHtml;
      btn.disabled = false;
    }, 2800);
  }, 900);
}
