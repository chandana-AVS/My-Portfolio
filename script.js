/* ==========================================================================
   1. Loader Handling
   ========================================================================== */
(function () {
  function hideLoader() {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.classList.add("fade-out");
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }
  }

  window.addEventListener("load", hideLoader);
  setTimeout(hideLoader, 1000); // Failsafe fallback
})();

/* ==========================================================================
   2. DOM Ready Initialization
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initTypingEffect();
  initThemeToggle();
  initHeaderScroll();
  initMobileMenu();
  initScrollObserver();
  initStatCounters();
  initProjectModals();
  initContactForm();
  initBackToTop();
  initButtonRipples();

  // Interactive Additions & Avatar
  initHeroParticles();
  initTiltEffect();
  initScrollAvatar();
  initInteractiveCards();
});

/* ==========================================================================
   3. Hero Subtitle Typing Effect
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById("typingElement");
  if (!typingElement) return;

  const roles = [
    "CS Engineering Student",
    "AI & ML Enthusiast",
    "Full Stack Developer",
    "Mandala & Digital Artist"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ==========================================================================
   4. Theme Switcher
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById("themeToggle");
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    htmlElement.setAttribute("data-theme", savedTheme);
    updateToggleIcon(themeToggleBtn, savedTheme);
  } else if (systemPrefersDark) {
    htmlElement.setAttribute("data-theme", "dark");
    updateToggleIcon(themeToggleBtn, "dark");
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      htmlElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateToggleIcon(themeToggleBtn, newTheme);
    });
  }
}

function updateToggleIcon(btn, theme) {
  if (!btn) return;
  const icon = btn.querySelector("i");
  if (icon) {
    icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }
}

/* ==========================================================================
   5. Navbar & Progress Bar
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector(".navbar-header");
  const progressBar = document.getElementById("scrollProgress");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (header) {
      if (scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) progressBar.style.width = scrolled + "%";

    let currentSection = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });
}

/* ==========================================================================
   6. Mobile Menu
   ========================================================================== */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      mobileMenuBtn.classList.toggle("open");
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        mobileMenuBtn.classList.remove("open");
      });
    });
  }
}

/* ==========================================================================
   7. Scroll Animations
   ========================================================================== */
function initScrollObserver() {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal, .fade-in").forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll(".reveal, .fade-in").forEach((el) => el.classList.add("active"));
  }
}

/* ==========================================================================
   8. Animated Stat Counters
   ========================================================================== */
function initStatCounters() {
  const statNumbers = document.querySelectorAll(".stat-number");
  if (statNumbers.length === 0) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const endValue = parseInt(target.getAttribute("data-target"), 10);
          let startValue = 0;
          const duration = 1500;
          const stepTime = Math.abs(Math.floor(duration / endValue));

          const timer = setInterval(() => {
            startValue += 1;
            target.textContent = startValue + "+";
            if (startValue >= endValue) {
              target.textContent = endValue + (endValue === 100 ? "%" : "+");
              clearInterval(timer);
            }
          }, stepTime);

          obs.unobserve(target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((num) => observer.observe(num));
}

/* ==========================================================================
   9. Project Details Modal
   ========================================================================== */
function initProjectModals() {
  const modal = document.getElementById("projectModal");
  const modalBody = document.getElementById("modalBody");
  const modalClose = document.getElementById("modalClose");
  const modalOverlay = document.querySelector(".modal-overlay");

  const projectDetails = {
    "project-1": {
      title: "AI Invoice Analyzer",
      image: "invoice-pic.webp",
      description: "AI Invoice Analyzer is an AI-powered platform that automates invoice processing using OCR, Machine Learning, and RAG. It extracts key invoice details, detects duplicate and fraudulent invoices, and securely stores them in Supabase. The integrated RAG chatbot enables users to query invoices using natural language for faster and smarter document management.",
      highlights: [
        "Intelligent field extraction (Invoice No., Vendor, GSTIN, Date, Amount, etc.).",
        "RAG-based chatbot using FAISS and Gemini for natural language invoice search.",
       "Secure authentication, storage, and role-based access using Supabase.",
        "Duplicate invoice detection using SHA-256 hashing and fuzzy matching."
      ]
    },
    "project-2": {
      title: "Campus Placement Portal",
      image: "campus-pic.jpg",
      description: "The Smart Campus Placement Portal is a web application that centralizes campus recruitment and student placement preparation. It enables students to access placement drives, upload resumes, take mock tests, and track coding progress, while authorized coordinators securely manage all placement updates. The platform also includes a chatbot for instant placement-related assistance.",
      highlights: [
        "Placement Management: Secure admin portal to manage placement drives, notices, and eligibility.",
        "Student Dashboard: Resume upload, resume analysis, upcoming drives, and mock tests.",
        "Coding Integration: Coding score synchronization, leaderboard, and practice resources.",
        "Smart Access: QR code-based access, role-based login, and a built-in chatbot for quick support."
      ]
    }
  };

  document.querySelectorAll(".open-modal-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const projectId = btn.getAttribute("data-project");
      const data = projectDetails[projectId];

      if (data && modalBody) {
        modalBody.innerHTML = `
          <img src="${data.image}" alt="${data.title}">
          <h3>${data.title}</h3>
          <p>${data.description}</p>
          <h4 style="margin-top:1rem; font-size:1rem;">Key Highlights:</h4>
          <ul style="margin-top:0.5rem; display:flex; flex-direction:column; gap:0.5rem;">
            ${data.highlights.map((h) => `<li><i class="fa-solid fa-check" style="color: var(--accent); margin-right: 8px;"></i>${h}</li>`).join("")}
          </ul>
        `;
        modal.classList.add("active");
      }
    });
  });

  const closeModal = () => modal && modal.classList.remove("active");

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalOverlay) modalOverlay.addEventListener("click", closeModal);
}

/* ==========================================================================
   10. Contact Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const successOverlay = document.getElementById("formSuccess");
  const resetBtn = document.getElementById("resetFormBtn");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    [nameInput, emailInput, messageInput].forEach((input) => {
      if (input && !input.value.trim()) {
        input.parentElement.classList.add("error");
        isValid = false;
      } else if (input) {
        input.parentElement.classList.remove("error");
      }
    });

    if (isValid && successOverlay) {
      successOverlay.classList.add("active");
      form.reset();
    }
  });

  if (resetBtn && successOverlay) {
    resetBtn.addEventListener("click", () => {
      successOverlay.classList.remove("active");
    });
  }
}

/* ==========================================================================
   11. Back To Top
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ==========================================================================
   12. Ripple Effect
   ========================================================================== */
function initButtonRipples() {
  document.querySelectorAll(".ripple").forEach((button) => {
    button.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement("span");
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add("ripple-effect");

      const existingRipple = this.querySelector(".ripple-effect");
      if (existingRipple) existingRipple.remove();

      this.appendChild(circle);
    });
  });
}

/* ==========================================================================
   13. Hero Interactive Particle Background
   ========================================================================== */
function initHeroParticles() {
  const hero = document.getElementById("hero");
  if (!hero) return;

  const canvas = document.createElement("canvas");
  canvas.id = "particleCanvas";
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "0";
  hero.style.position = "relative";
  hero.prepend(canvas);

  const ctx = canvas.getContext("2d");
  let particles = [];

  function resize() {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2 + 1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(15, 118, 110, 0.25)";
      ctx.fill();
    }
  }

  for (let i = 0; i < 45; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, index) => {
      p.update();
      p.draw();
      for (let j = index + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(15, 118, 110, ${0.15 - dist / 1100})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    });
    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   14. 3D Perspective Tilt on Hover
   ========================================================================== */
function initTiltEffect() {
  const cards = document.querySelectorAll(".project-card, .artistic-card, .stat-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });
}

// /* ==========================================================================
//    15. Animated Mini Avatar on Scroll
//    ========================================================================== */
// function initScrollAvatar() {
//   const avatar = document.getElementById("miniAvatar");
//   if (!avatar) return;

//   let isScrolling;
//   let lastScrollY = window.scrollY;

//   window.addEventListener("scroll", () => {
//     const currentScrollY = window.scrollY;

//     // Trigger run animation
//     avatar.classList.add("is-scrolling");

//     // Direction check: Flip character left/right depending on scroll direction
//     if (currentScrollY < lastScrollY) {
//       avatar.classList.add("flip-left");
//     } else {
//       avatar.classList.remove("flip-left");
//     }

//     lastScrollY = currentScrollY;

//     // Reset back to idle stance when scrolling stops
//     clearTimeout(isScrolling);
//     isScrolling = setTimeout(() => {
//       avatar.classList.remove("is-scrolling");
//     }, 180);
//   });
// }

/* ==========================================================================
   16. Mouse Spotlight Tracking on Hoverable Cards
   ========================================================================== */
function initInteractiveCards() {
  const cards = document.querySelectorAll(".project-card, .artistic-card, .skill-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}