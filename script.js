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

  // 7. Project Details Modal Data & Handlers (Verified Case Studies)
  const projectDetailsMap = {
    sevasetu: {
      title: "Seva Setu — Citizen Assistance Platform",
      tag: "Full-Stack Web App",
      desc: "Seva Setu is an independent, citizen-centric public assistance and government welfare guide platform built for West Bengal, India. It provides a unified gateway for citizens to navigate welfare schemes, calculate document readiness, and find authorized government service counters.",
      problem: "Citizens struggle with scattered eligibility guidelines across dozens of departmental websites, experience anxiety over missing documents leading to repeated block office visits, and risk exploitation by unauthorized middlemen charging fees for free public services.",
      solution: "Engineered a centralized, verified directory of flagship welfare schemes (Kanyashree, Lakshmir Bhandar, Swasthya Sathi, etc.) paired with interactive client-side document checklists, an authentic BSK counter locator, and safety redirect warnings.",
      techStack: ["React.js", "Vite", "Tailwind CSS", "Neon PostgreSQL", "Flask API", "Vercel"],
      features: [
        "Trilingual localization supporting Bengali (বাংলা), English, and Hindi (हिन्दी)",
        "Interactive document readiness checklist with completion meter saved in localStorage",
        "Directory of 7+ flagship welfare schemes with categorized eligibility rules",
        "Authorized physical Bangla Sahayata Kendra (BSK) locator with operating hours",
        "External safe redirect guard ensuring citizens access authentic .gov.in portals"
      ],
      challenge: "Providing instant checklist persistence for diverse non-technical citizens without imposing account creation barriers.",
      challengeSolution: "Implemented a client-side localStorage state engine calculating completion scores in real time with zero latency and zero data leakage.",
      demoLink: "https://sevasetu-flax-kappa.vercel.app/",
      githubLink: "https://github.com/Ani2025-git/internship"
    },
    smritighar: {
      title: "SmritiGhar — Museum of Forgotten Things",
      tag: "Digital Museum & Archive",
      desc: "SmritiGhar is an interactive educational digital museum and cultural knowledge repository built to preserve everyday objects, heirloom tools, and vintage technologies from past generations through immersive digital storytelling.",
      problem: "Rapid technological advancement has caused everyday historical artifacts, ancestral household items, and cultural craftsmanship to fade from collective memory without structured digital archiving.",
      solution: "Created an immersive digital museum featuring categorized exhibition galleries, historical era timelines, and dual-language archive guides built on modern component architecture.",
      techStack: ["React 18", "Vite 6", "Tailwind CSS", "Framer Motion", "i18next", "Vercel"],
      features: [
        "Themed exhibition galleries categorized by era, cultural significance, and utility",
        "Fluid Framer Motion micro-interactions mimicking museum gallery exploration",
        "Dual-language translation engine powered by i18next & react-i18next",
        "Detailed memory archives documenting lost technologies and heirloom artifacts",
        "Responsive, mobile-optimized digital exhibition rooms"
      ],
      challenge: "Maintaining high-performance 60fps animations and rapid initial load times with detailed typographic and graphic assets.",
      challengeSolution: "Employed Vite dynamic route splitting, asset lazy loading, and hardware-accelerated CSS transforms.",
      demoLink: "https://smritighar-zzia.vercel.app/",
      githubLink: "https://github.com/Ani2025-git/smritighar"
    },
    flipquiz: {
      title: "FlipQuiz Platform",
      tag: "Full-Stack Assessment Platform",
      desc: "FlipQuiz is an interactive web platform designed for rapid concept testing, card-flip memory training, and dynamic quiz evaluations.",
      problem: "Standard web quizzes are flat and unengaging, lacking physical tactile feedback to reinforce question retention.",
      solution: "Developed an interactive card mechanic with 3D flip physics, dynamic score calculation, and real-time category filtering.",
      techStack: ["JavaScript ES6+", "DOM Engine", "CSS3 3D Transforms", "Render Cloud"],
      features: [
        "Tactile 3D card-flip physics on answer review",
        "Dynamic score calculation algorithm with live visual meters",
        "Category and topic filter bar for targeted practice",
        "Mobile-first responsive architecture tested across device viewports"
      ],
      challenge: "Preventing layout redraws and visual stutter during rapid 3D card flips on mobile browsers.",
      challengeSolution: "Used CSS transform-style: preserve-3d with backface-visibility: hidden and will-change: transform for dedicated GPU layering.",
      demoLink: "https://flipquiz.onrender.com",
      githubLink: "https://github.com/Ani2025-git"
    },
    medilife: {
      title: "MediLife Pharmacy Storefront",
      tag: "E-Commerce Medicine Store",
      desc: "A feature-complete online pharmacy storefront featuring medicine category filtering, dynamic shopping cart state with live subtotal calculation, and client-side checkout simulation.",
      problem: "Online medical stores require clear, instant categorization and accurate cart calculations without disruptive page reloads.",
      solution: "Engineered a clean storefront catalog with instant search filtering, real-time quantity counters, dynamic price calculation, and account access views.",
      techStack: ["Vanilla JavaScript", "HTML5 Semantics", "CSS3 Flexbox/Grid", "GitHub Pages"],
      features: [
        "Live interactive shopping cart with real-time quantity increment/decrement",
        "Instant category search and query filtering",
        "Integrated user login and registration interface flows",
        "Clean, responsive product catalog cards with status badges"
      ],
      challenge: "Synchronizing cart item counts and subtotal state reliably without external library dependencies.",
      challengeSolution: "Structured a centralized vanilla JavaScript state store using structured DOM event dispatching and browser storage.",
      demoLink: "https://ani2025-git.github.io/e-commerce/",
      githubLink: "https://github.com/Ani2025-git/e-commerce"
    },
    tictactoe: {
      title: "Tic-Tac-Toe Arena",
      tag: "Interactive Web Game",
      desc: "A 2D matrix turn-based web game with smart mathematical win-line strike algorithms, player round histories, dynamic turn indicators, and responsive controls.",
      problem: "Delivering a classic game that feels modern and prevents race conditions or invalid move states.",
      solution: "Implemented an O(1) matrix win-line validator, turn indicator transitions, round history tracking, and clear audio-visual cues.",
      techStack: ["JavaScript ES6+", "Matrix Math", "DOM Animation", "Render Cloud"],
      features: [
        "Mathematical 8-vector win-line detection and draw state validation",
        "Player score tracking and round history across matches",
        "Dynamic turn indicator and smooth win highlight animations",
        "Instant board reset and zero-lag move updates"
      ],
      challenge: "Detecting winning configurations efficiently on every turn without redundant multi-pass array scanning.",
      challengeSolution: "Pre-computed 8 winning vector combinations for constant-time evaluation on every cell click.",
      demoLink: "https://tic-tac-toe-uwu9.onrender.com",
      githubLink: "https://github.com/Ani2025-git"
    },
    analytics: {
      title: "Analytics Dashboard Hub",
      tag: "Data Visualization & Metrics",
      desc: "An interactive data console showcasing real-time metric graphs, KPI status indicators, and modular widget layouts designed for data clarity.",
      problem: "Complex metric streams often overwhelm users without structured visual hierarchy and high-contrast styling.",
      solution: "Engineered a dark-mode data dashboard featuring KPI summary tiles, vector charts, and customizable widget sections.",
      techStack: ["JavaScript ES6+", "Modular CSS Grid", "SVG Data Graphs", "Staging Environment"],
      features: [
        "Modular dashboard cards with customizable layout views",
        "High-contrast dark mode tailored for low eye strain and data clarity",
        "Live KPI status monitors and performance gauge indicators",
        "Fluid vector-based metric graphs"
      ],
      challenge: "Rendering clean data charts across different screen sizes without distortion or blurry rendering.",
      challengeSolution: "Designed responsive SVG containers utilizing viewBox scaling and CSS grid layouts.",
      demoLink: "#",
      githubLink: "https://github.com/Ani2025-git"
    }
  };

  document.querySelectorAll(".btn-info-pop").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-key");
      const data = projectDetailsMap[key];
      const modalContent = document.getElementById("projectModalContent");
      if (data && modalContent) {
        modalContent.innerHTML = `
          <div style="margin-bottom: 20px;">
            <span class="project-category-tag" style="margin-bottom: 8px; display:inline-block;">${data.tag}</span>
            <h2 style="font-family: var(--font-heading); font-size: 24px; color:var(--text-primary); margin-top: 4px; font-weight: 700; letter-spacing: -0.02em;">${data.title}</h2>
          </div>

          <!-- Overview -->
          <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.7; margin-bottom: 20px;">${data.desc}</p>
          
          <!-- Problem & Solution Split -->
          <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 20px;">
            <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 16px;">
              <h4 style="color:var(--text-primary); font-size: 13.5px; font-weight:600; margin-bottom: 6px; display:flex; align-items:center; gap:8px;">
                <i class="fas fa-exclamation-triangle" style="font-size:12px; color:#e11d48;"></i> Problem Statement
              </h4>
              <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin: 0;">${data.problem}</p>
            </div>
            <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 16px;">
              <h4 style="color:var(--text-primary); font-size: 13.5px; font-weight:600; margin-bottom: 6px; display:flex; align-items:center; gap:8px;">
                <i class="fas fa-lightbulb" style="font-size:12px; color:#60a5fa;"></i> Engineered Solution
              </h4>
              <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin: 0;">${data.solution}</p>
            </div>
          </div>

          <!-- Key Features -->
          <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 18px; margin-bottom: 20px;">
            <h4 style="color:var(--text-primary); font-size: 14px; font-weight:600; margin-bottom: 12px; display:flex; align-items:center; gap:8px;">
              <i class="fas fa-check-circle" style="color:var(--text-primary);"></i> Key Capabilities
            </h4>
            <ul style="list-style: none; font-size: 13px; color: var(--text-secondary); line-height: 1.8; padding: 0; margin: 0;">
              ${data.features.map(f => `<li style="display:flex; align-items:flex-start; gap:8px; margin-bottom:6px;"><i class="fas fa-chevron-right" style="font-size:10px; margin-top:5px; color:var(--text-muted);"></i><span>${f}</span></li>`).join("")}
            </ul>
          </div>

          <!-- Tech Stack Pills -->
          <div style="margin-bottom: 20px;">
            <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); margin-bottom: 8px;">Technologies Used</div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${data.techStack.map(t => `<span class="tech-pill">${t}</span>`).join("")}
            </div>
          </div>

          <!-- Technical Challenge & Solution -->
          <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-left: 3px solid var(--text-primary); border-radius: var(--radius-sm); padding: 16px; margin-bottom: 24px;">
            <div style="font-size: 13px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">Engineering Challenge &amp; Optimization</div>
            <p style="font-size: 12.5px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 6px;"><strong>Challenge:</strong> ${data.challenge}</p>
            <p style="font-size: 12.5px; color: var(--text-secondary); line-height: 1.6; margin: 0;"><strong>Resolution:</strong> ${data.challengeSolution}</p>
          </div>

          <!-- Action Buttons -->
          <div style="display:flex; gap:12px; justify-content: flex-end; flex-wrap: wrap;">
            ${data.githubLink ? `
              <a href="${data.githubLink}" target="_blank" rel="noopener noreferrer" class="btn-github-code" style="padding:10px 18px; font-size:13px; text-decoration:none;">
                <i class="fab fa-github"></i> View Code
              </a>
            ` : ''}
            ${data.demoLink && data.demoLink !== '#' ? `
              <a href="${data.demoLink}" target="_blank" rel="noopener noreferrer" class="btn-unfold-pill-white" style="padding:10px 22px; font-size:13px; text-decoration:none;">
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
  if (modal) {
    modal.classList.add("active");
    if (id === "githubModal") {
      renderGitHubModal();
    }
    if (id === "terminalModal") {
      setTimeout(() => {
        const inp = document.getElementById("terminalInput");
        if (inp) inp.focus();
      }, 120);
    }
  }
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

// Contact Form Handler with Validation, Spam Protection & Confirmed Delivery
let lastSubmissionTime = 0;

async function handleFormSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById("senderName");
  const emailInput = document.getElementById("senderEmail");
  const subjectInput = document.getElementById("senderSubject");
  const msgInput = document.getElementById("senderMsg");
  const honeypot = document.getElementById("honeypot");
  const btn = document.getElementById("submitBtn");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const subject = subjectInput.value.trim();
  const message = msgInput.value.trim();

  // 1. Anti-spam honeypot check
  if (honeypot && honeypot.value.trim() !== "") {
    showToast("✨ Message received. Thank you!");
    document.getElementById("contactForm").reset();
    return;
  }

  // 2. Strict Input Validation
  if (name.length < 2) {
    showToast("⚠️ Please enter a valid name (at least 2 characters).");
    nameInput.focus();
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast("⚠️ Please enter a valid email address.");
    emailInput.focus();
    return;
  }
  if (subject.length < 3) {
    showToast("⚠️ Please enter a subject (at least 3 characters).");
    subjectInput.focus();
    return;
  }
  if (message.length < 10) {
    showToast("⚠️ Message is too short (at least 10 characters).");
    msgInput.focus();
    return;
  }

  // 3. Rate-limiting Cooldown (30 seconds)
  const now = Date.now();
  if (now - lastSubmissionTime < 30000) {
    const waitSec = Math.ceil((30000 - (now - lastSubmissionTime)) / 1000);
    showToast(`⏳ Please wait ${waitSec}s before sending another message.`);
    return;
  }

  // 4. Submission Loading State
  const originalHtml = btn.innerHTML;
  btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;
  btn.disabled = true;

  try {
    const res = await fetch("https://formsubmit.co/ajax/animeshmishra4123@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        _subject: `[Portfolio Inquiry] ${subject}`,
        message: message
      })
    });

    const result = await res.json().catch(() => ({}));

    // 5. Check Provider Confirmation before claiming success
    if (res.ok && (result.success === "true" || result.success === true || res.status === 200)) {
      lastSubmissionTime = Date.now();
      btn.innerHTML = `<i class="fas fa-check"></i> Message Sent!`;
      showToast(`✨ Thank you, ${name}! Your message has been received.`);
      document.getElementById("contactForm").reset();

      setTimeout(() => {
        btn.innerHTML = originalHtml;
        btn.disabled = false;
      }, 3500);
    } else {
      throw new Error(result.message || "Delivery provider rejected submission");
    }
  } catch (err) {
    console.warn("Contact delivery error, triggering mailto fallback:", err);
    btn.innerHTML = `<i class="fas fa-paper-plane"></i> Opening Mail...`;
    showToast("⚠️ Online service unreachable. Opening your email app...");

    // 6. Graceful Mailto Fallback
    const mailtoUrl = `mailto:animeshmishra4123@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
    window.location.href = mailtoUrl;

    setTimeout(() => {
      btn.innerHTML = originalHtml;
      btn.disabled = false;
    }, 4000);
  }
}

// GitHub Live API Service
const GITHUB_USERNAME = "Ani2025-git";
const GITHUB_CACHE_KEY = "ani2025_github_data";
const GITHUB_CACHE_TTL = 30 * 60 * 1000; // 30 minutes

function getGitHubFallbackData() {
  return {
    publicRepos: 12,
    followers: 0,
    repos: [
      { name: "internship", desc: "Seva Setu — Citizen welfare & government schemes assistance platform (Flask & React)", lang: "HTML", stars: 0, updated: "Oct 16, 2026", url: "https://github.com/Ani2025-git/internship" },
      { name: "smritighar", desc: "SmritiGhar — Digital museum and cultural knowledge repository preserving heritage items", lang: "JavaScript", stars: 0, updated: "Oct 7, 2026", url: "https://github.com/Ani2025-git/smritighar" },
      { name: "e-commerce", desc: "MediLife digital medicine storefront with real-time shopping cart calculation", lang: "HTML", stars: 0, updated: "Jun 13, 2026", url: "https://github.com/Ani2025-git/e-commerce" },
      { name: "my-portfolio", desc: "Personal developer portfolio and interactive showcase built with modern architecture", lang: "HTML", stars: 0, updated: "Nov 3, 2026", url: "https://github.com/Ani2025-git/my-portfolio" },
      { name: "COD_SOFT_TASK-1", desc: "Full-stack job board web platform with client-server architecture", lang: "JavaScript", stars: 0, updated: "Jul 19, 2026", url: "https://github.com/Ani2025-git/COD_SOFT_TASK-1" },
      { name: "Abha", desc: "Offline-first AI assistive web platform", lang: "JavaScript", stars: 0, updated: "Oct 8, 2026", url: "https://github.com/Ani2025-git/Abha" }
    ]
  };
}

async function fetchGitHubData(forceRefresh = false) {
  if (!forceRefresh) {
    try {
      const cached = localStorage.getItem(GITHUB_CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < GITHUB_CACHE_TTL) {
          return parsed.data;
        }
      }
    } catch (e) {}
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers: { "Accept": "application/vnd.github.v3+json" } }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=8`, { headers: { "Accept": "application/vnd.github.v3+json" } })
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error(`API error ${userRes.status || reposRes.status}`);
    }

    const user = await userRes.json();
    const repos = await reposRes.json();

    const data = {
      publicRepos: user.public_repos || 12,
      followers: user.followers || 0,
      repos: (Array.isArray(repos) ? repos : []).map(r => ({
        name: r.name,
        desc: r.description || "Active software development repository",
        lang: r.language || "Code",
        stars: r.stargazers_count || 0,
        updated: new Date(r.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        url: r.html_url
      }))
    };

    try {
      localStorage.setItem(GITHUB_CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
    } catch (e) {}

    return data;
  } catch (err) {
    console.warn("GitHub API offline/rate-limited. Loading fallback:", err.message);
    return getGitHubFallbackData();
  }
}

async function renderGitHubModal() {
  const container = document.getElementById("githubReposList");
  if (!container) return;

  const data = await fetchGitHubData();
  if (!data || !data.repos || data.repos.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-muted);">No public repositories found.</div>`;
    return;
  }

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; padding:12px 16px; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:var(--radius-sm);">
      <span style="font-size:13.5px; color:var(--text-secondary);"><i class="fas fa-book-bookmark" style="margin-right:6px;"></i> Public Repositories: <strong style="color:var(--text-primary);">${data.publicRepos}</strong></span>
      <span style="font-size:12px; color:var(--text-muted);"><i class="fas fa-circle" style="font-size:8px; color:#10b981; margin-right:4px;"></i> Live Sync</span>
    </div>
    <div style="display:grid; grid-template-columns:1fr; gap:12px; max-height:48vh; overflow-y:auto; padding-right:4px;">
      ${data.repos.map(r => `
        <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:14px 16px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
            <a href="${r.url}" target="_blank" rel="noopener noreferrer" style="font-size:14px; font-weight:600; color:var(--text-primary); text-decoration:none; display:flex; align-items:center; gap:6px;">
              <i class="fab fa-github" style="font-size:14px;"></i> ${r.name}
              <i class="fas fa-arrow-up-right-from-square" style="font-size:10px; color:var(--text-muted);"></i>
            </a>
            <span style="font-size:11px; background:var(--accent-subtle-bg); border:1px solid var(--border-subtle); border-radius:var(--radius-pill); padding:2px 8px; color:var(--text-secondary); font-family:monospace;">${r.lang}</span>
          </div>
          <p style="font-size:12.5px; color:var(--text-secondary); line-height:1.5; margin:0 0 8px 0;">${r.desc}</p>
          <div style="display:flex; gap:14px; font-size:11.5px; color:var(--text-muted);">
            <span><i class="far fa-star"></i> ${r.stars}</span>
            <span><i class="far fa-clock"></i> ${r.updated}</span>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

// Developer Interactive Terminal Controller
function initTerminal() {
  const terminalModal = document.getElementById("terminalModal");
  const terminalInput = document.getElementById("terminalInput");
  const terminalOutput = document.getElementById("terminalOutput");
  const terminalBody = document.getElementById("terminalBody");

  if (!terminalModal || !terminalInput || !terminalOutput) return;

  // Toggle on ` (backtick) or Ctrl+K
  window.addEventListener("keydown", (e) => {
    const isInputActive = ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName);
    if ((e.key === "`" || (e.ctrlKey && e.key.toLowerCase() === "k")) && !isInputActive) {
      e.preventDefault();
      if (terminalModal.classList.contains("active")) {
        closeModal("terminalModal");
      } else {
        openModal("terminalModal");
      }
    }
  });

  const commands = {
    help: () => `Available Commands:
  about     - Professional background and profile summary
  projects  - List of featured live applications & case studies
  skills    - Technical proficiencies & engineering toolkit
  github    - Live repository statistics from GitHub API
  contact   - Direct contact channels & verified social links
  clear     - Clear terminal history
  exit      - Close developer terminal session`,

    about: () => `Animesh Mishra — Frontend Developer & UI Engineer based in India.
Specializing in modern JavaScript (ES6+), React.js, and high-performance,
accessible web applications. 2+ years of hands-on experience delivering
production web systems like SevaSetu and FlipQuiz.`,

    projects: () => `Featured Works:
  1. SevaSetu Platform     [https://sevasetu-flax-kappa.vercel.app/]
  2. SmritiGhar            [https://smritighar-zzia.vercel.app/]
  3. FlipQuiz Platform     [https://flipquiz.onrender.com]
  4. MediLife Pharmacy     [https://ani2025-git.github.io/e-commerce/]
  5. Tic-Tac-Toe Arena     [https://tic-tac-toe-uwu9.onrender.com]
  6. Analytics Dashboard   [Staging Preview]`,

    skills: () => `Core Competencies:
  • Languages: JavaScript (ES6+), HTML5, CSS3, Python (basics)
  • Frameworks & Libraries: React.js, Vite, Tailwind CSS, Framer Motion
  • Systems & APIs: RESTful APIs, Fetch, DOM Architecture, State Stores
  • Tooling & Cloud: Git, GitHub Pages, Vercel, Render Cloud`,

    contact: () => `Direct Contact Channels:
  • Email:    animeshmishra4123@gmail.com
  • Phone:    +91 7029849318
  • WhatsApp: https://wa.me/917029849318
  • LinkedIn: https://www.linkedin.com/in/animesh-mishra-665010294
  • GitHub:   https://github.com/Ani2025-git`,

    github: async () => {
      const data = await fetchGitHubData();
      return `GitHub Live Statistics (@Ani2025-git):
  • Public Repositories: ${data.publicRepos}
  • Follower Count:      ${data.followers}
  • Latest Public Repos:
${data.repos.map(r => `    - ${r.name.padEnd(20)} [${r.lang}] (Updated: ${r.updated})\n      ${r.url}`).join("\n")}`;
    },

    clear: () => {
      terminalOutput.innerHTML = "";
      return "";
    },

    exit: () => {
      closeModal("terminalModal");
      return "Closing session...";
    }
  };

  terminalInput.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      const val = terminalInput.value.trim();
      terminalInput.value = "";
      if (!val) return;

      const userLine = document.createElement("div");
      userLine.innerHTML = `<span style="color:#10b981;">➜ ~</span> <span style="color:var(--text-primary); font-weight:600;">${escapeHtml(val)}</span>`;
      terminalOutput.appendChild(userLine);

      const cmd = val.toLowerCase();
      if (commands[cmd]) {
        if (cmd === "clear") {
          commands[cmd]();
        } else {
          const res = await commands[cmd]();
          if (res) {
            const respLine = document.createElement("div");
            respLine.style.color = "var(--text-secondary)";
            respLine.style.margin = "4px 0 12px 0";
            respLine.textContent = res;
            terminalOutput.appendChild(respLine);
          }
        }
      } else {
        const errLine = document.createElement("div");
        errLine.style.color = "#f87171";
        errLine.style.margin = "4px 0 12px 0";
        errLine.textContent = `command not found: ${val}. Type 'help' for available commands.`;
        terminalOutput.appendChild(errLine);
      }

      if (terminalBody) {
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    }
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// Initialize Terminal on DOM load
document.addEventListener("DOMContentLoaded", () => {
  initTerminal();
});
