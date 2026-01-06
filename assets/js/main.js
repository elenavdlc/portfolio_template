// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;
const currentTheme = localStorage.getItem("theme") || "light";

// Aplicar tema guardado
if (currentTheme === "dark") {
  body.setAttribute("data-theme", "dark");
} else {
  body.removeAttribute("data-theme");
}

// Función para actualizar tema
function updateTheme(theme) {
  if (theme === "dark") {
    body.setAttribute("data-theme", "dark");
  } else {
    body.removeAttribute("data-theme");
  }
  localStorage.setItem("theme", theme);

  // Refrescar ScrollTrigger después de cambiar el tema
  setTimeout(() => {
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  }, 100);
}

// Aplicar tema inicial
updateTheme(currentTheme);

if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    updateTheme(newTheme);

    // Animación del toggle
    gsap.to(darkModeToggle, {
      scale: 0.9,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });
  });
}

// Mobile Menu
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");

function openMobileMenu() {
  mobileMenuBtn.classList.add("active");
  mobileMenu.classList.add("active");
  mobileMenuOverlay.classList.add("active");
  document.body.style.overflow = "hidden";

  // Animación del menú móvil
  gsap.fromTo(
    ".mobile-nav-link",
    {
      opacity: 0,
      x: 20,
    },
    {
      opacity: 1,
      x: 0,
      stagger: 0.1,
      duration: 0.3,
    }
  );
}

function closeMobileMenu() {
  mobileMenuBtn.classList.remove("active");
  mobileMenu.classList.remove("active");
  mobileMenuOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    if (mobileMenu.classList.contains("active")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Cerrar al hacer clic en el overlay
  mobileMenuOverlay.addEventListener("click", closeMobileMenu);

  // Cerrar menú móvil al hacer clic en un enlace
  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
}

// Navegación suave con animación
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");

    if (targetId === "#") return;

    const targetSection = document.querySelector(targetId);
    if (!targetSection) return;

    // Cerrar menú móvil si está abierto
    if (mobileMenu && mobileMenu.classList.contains("active")) {
      closeMobileMenu();
    }

    // Actualizar enlace activo en control segmentado
    document.querySelectorAll(".segment").forEach((link) => {
      link.classList.remove("active");
      link.setAttribute("aria-selected", "false");
    });
    this.classList.add("active");
    this.setAttribute("aria-selected", "true");

    // Animación suave de scroll con GSAP - más rápida y dinámica
    const offset = window.innerWidth >= 768 ? 0 : 80;
    gsap.to(window, {
      duration: 0.4,
      scrollTo: {
        y: targetSection,
        offsetY: offset,
      },
      ease: "power1.inOut",
    });
  });
});

// Animación de habilidades flotantes al pasar el ratón
const skillTags = document.querySelectorAll(".skill-tag");

skillTags.forEach((tag) => {
  // Redirigir PUBLISHING a la página 404
  if (tag.getAttribute("data-skill") === "PUBLISHING") {
    tag.style.cursor = "pointer";
    tag.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "404.html";
    });
  }

  tag.addEventListener("mouseenter", function () {
    // Obtener posición aleatoria más controlada
    const randomX = (Math.random() - 0.5) * 60;
    const randomY = (Math.random() - 0.5) * 60;
    const randomRotate = (Math.random() - 0.5) * 12;

    // Animar este tag
    gsap.to(this, {
      x: randomX,
      y: randomY,
      rotation: randomRotate,
      duration: 0.4,
      ease: "back.out(1.3)",
    });

    // Animar otros tags cercanos
    skillTags.forEach((otherTag) => {
      if (otherTag !== this) {
        const distance = Math.random() * 30 + 8;
        const angle = Math.random() * Math.PI * 2;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        gsap.to(otherTag, {
          x: x,
          y: y,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    });
  });

  tag.addEventListener("mouseleave", function () {
    // Resetear posición de todos los tags
    gsap.to(skillTags, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  });
});

// Actualizar enlace activo al hacer scroll
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  let current = "";
  const scrollOffset = window.innerWidth >= 768 ? 100 : 200;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - scrollOffset) {
      current = section.getAttribute("id");
    }
  });

  // Actualizar control segmentado
  document.querySelectorAll(".segment").forEach((link) => {
    link.classList.remove("active");
    link.setAttribute("aria-selected", "false");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
      link.setAttribute("aria-selected", "true");
    }
  });
});

// Inicializar ScrollTrigger
ScrollTrigger.refresh();

// Establecer segmento activo inicial basado en la sección visible
function setInitialActiveSegment() {
  const sections = document.querySelectorAll("section[id]");
  let current = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".segment").forEach((link) => {
    link.classList.remove("active");
    link.setAttribute("aria-selected", "false");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
      link.setAttribute("aria-selected", "true");
    }
  });
}

// Ejecutar al cargar
setInitialActiveSegment();
