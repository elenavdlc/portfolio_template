// ============================================

// ANIMACIONES GSAP AVANZADAS

// ============================================

// TIMELINES, SCROLLTRIGGER, PARALLAX Y SPLIT TEXT

// PLUGINS DE GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

// ============================================
// SPLIT TEXT
// ============================================
function splitText(element, type = "words") {
  if (!element) return null;

  const text = element.textContent;
  const words = text.split(" ");
  const chars = text.split("");

  element.innerHTML = "";

  if (type === "words") {
    words.forEach((word, i) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "split-word";
      wordSpan.textContent = word + (i < words.length - 1 ? " " : "");
      wordSpan.style.display = "inline-block";
      element.appendChild(wordSpan);
    });
    return element.querySelectorAll(".split-word");
  } else if (type === "chars") {
    chars.forEach((char, i) => {
      const charSpan = document.createElement("span");
      charSpan.className = "split-char";
      charSpan.textContent = char === " " ? "\u00A0" : char;
      charSpan.style.display = "inline-block";
      element.appendChild(charSpan);
    });
    return element.querySelectorAll(".split-char");
  } else if (type === "lines") {
    // Dividir por líneas aproximadas
    const lineBreaks = text.split("\n");
    lineBreaks.forEach((line, i) => {
      const lineSpan = document.createElement("span");
      lineSpan.className = "split-line";
      lineSpan.style.display = "block";
      lineSpan.textContent = line;
      element.appendChild(lineSpan);
    });
    return element.querySelectorAll(".split-line");
  }

  return null;
}

// ============================================
// TIMELINE COMPLEJA - Animación de entrada principal
// ============================================
function initMainTimeline() {
  const mainTitle = document.querySelector(".main-title");
  const skillsGrid = document.querySelector(".skills-grid");

  if (!mainTitle || !skillsGrid) return;

  // Crear timeline principal
  const mainTL = gsap.timeline({
    defaults: { ease: "power3.out" },
  });

  // Dividir el título en palabras para animación
  const titleWords = splitText(mainTitle, "words");

  // Animación del título palabra por palabra
  mainTL.fromTo(
    titleWords,
    {
      opacity: 0,
      y: 50,
      rotationX: -90,
    },
    {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "back.out(1.7)",
    }
  );

  // Animación de las habilidades con efecto cascada
  const skillTags = document.querySelectorAll(".skill-tag");
  mainTL.fromTo(
    skillTags,
    {
      opacity: 0,
      scale: 0,
      rotation: -180,
      y: 100,
    },
    {
      opacity: 1,
      scale: 1,
      rotation: 0,
      y: 0,
      duration: 0.6,
      stagger: {
        amount: 1.2,
        from: "random",
      },
      ease: "elastic.out(1, 0.5)",
    },
    "-=0.5"
  );

  return mainTL;
}

// ============================================
// SCROLLTRIGGER REVEALS
// ============================================
function initScrollReveals() {
  // Reveal de secciones con efecto de máscara
  gsap.utils.toArray("section").forEach((section, index) => {
    const sectionContent = section.querySelector(
      ".container, .container-fluid"
    );

    if (sectionContent) {
      gsap.fromTo(
        sectionContent,
        {
          opacity: 0,
          clipPath: "inset(0 100% 0 0)",
        },
        {
          opacity: 1,
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
            markers: false,
          },
        }
      );
    }
  });

  // Reveal de tarjetas About Me con efecto de rotación 3D
  gsap.utils.toArray(".about-card").forEach((card, index) => {
    const cardContent = card.querySelector("h2, h3, p, ul");

    // Dividir texto de títulos
    const title = card.querySelector("h2, h3");
    if (title) {
      const titleChars = splitText(title, "chars");

      gsap.fromTo(
        titleChars,
        {
          opacity: 0,
          y: 30,
          rotationX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.6,
          stagger: 0.03,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Animación de la tarjeta completa
    gsap.fromTo(
      card,
      {
        opacity: 0,
        scale: 0.8,
        rotationY: 15,
        transformPerspective: 1000,
      },
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        delay: index * 0.1,
      }
    );
  });

  // Reveal de proyectos con efecto de deslizamiento lateral
  gsap.utils.toArray(".project-card").forEach((card, index) => {
    const category = card.querySelector(".project-category");
    const title = card.querySelector(".project-title");

    // Dividir texto del título
    if (title) {
      const titleWords = splitText(title, "words");

      gsap.fromTo(
        titleWords,
        {
          opacity: 0,
          x: -50,
          rotationY: 90,
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "left 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // QUITAR LOS ESPACIOS ENTRE LAS PALABRAS DE LOS TÍTULOS DE LOS PROYECTOS
    document.querySelectorAll(".project-title").forEach((title) => {
      const text = title.textContent;
      title.textContent = "";

      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        title.appendChild(span);
      });

      gsap.from(title.querySelectorAll("span"), {
        opacity: 0,
        y: 20,
        stagger: 0.03,
        duration: 0.6,
        ease: "power2.out",
      });
    });

    // Animación de la categoría
    if (category) {
      gsap.fromTo(
        category,
        {
          opacity: 0,
          y: -20,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "left 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  });
}

// ============================================
// EFECTOS DE PARALLAX
// ============================================
function initParallaxEffects() {
  // Parallax en el título principal
  const mainTitle = document.querySelector(".main-title");
  if (mainTitle) {
    gsap.to(mainTitle, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: ".home-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  // Parallax en el texto "LET'S WORK"
  const letsWorkText = document.querySelector(".lets-work-text");
  if (letsWorkText) {
    gsap.to(letsWorkText, {
      yPercent: 100,
      ease: "none",
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }
}

// ============================================
// TIMELINE COMPLEJA PARA SECCIÓN ABOUT ME
// ============================================
function initAboutTimeline() {
  const aboutSection = document.querySelector(".about-section");
  if (!aboutSection) return;

  // Timeline para la sección completa
  const aboutTL = gsap.timeline({
    scrollTrigger: {
      trigger: aboutSection,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
  return aboutTL;
}

// ============================================
// TIMELINE PARA SECCIÓN DE CONTACTO
// ============================================
function initContactTimeline() {
  const contactSection = document.querySelector(".contact-section");
  if (!contactSection) return;

  const letsWorkText = document.querySelector(".lets-work-text");
  const contactBtn = document.querySelector(".contact-btn");
  const contactForm = document.querySelector(".contact-form-wrapper");

  const contactTL = gsap.timeline({
    scrollTrigger: {
      trigger: contactSection,
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  });

  // Dividir texto "LET'S WORK" en caracteres
  if (letsWorkText) {
    const textChars = splitText(letsWorkText, "chars");

    contactTL.fromTo(
      textChars,
      {
        opacity: 0,
        y: 100,
        rotationX: 90,
        scale: 0,
      },
      {
        opacity: 0.1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.02,
        ease: "back.out(1.7)",
      }
    );
  }

  // Animación del botón
  if (contactBtn) {
    contactTL.fromTo(
      contactBtn,
      {
        opacity: 0,
        scale: 0,
        rotation: -180,
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
      },
      "-=0.3"
    );
  }
}

// ============================================
// ANIMACIÓN DEL HEADER AL HACER SCROLL
// ============================================
function initHeaderAnimation() {
  const header = document.querySelector(".navbar-custom");
  if (!header) return;

  gsap.set(header, {
    y: 0,
    opacity: 1,
  });

  ScrollTrigger.create({
    start: "top -100",
    end: 99999,
    toggleClass: { className: "scrolled", targets: header },
  });
}

// ============================================
// INICIALIZACIÓN DE TODAS LAS ANIMACIONES
// ============================================
function initAdvancedAnimations() {
  // Esperar a que el DOM esté completamente cargado
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => {
        initMainTimeline();
        initScrollReveals();
        initParallaxEffects();
        initAboutTimeline();
        initContactTimeline();
        initHeaderAnimation();
        initMagneticEffect();

        // Refrescar ScrollTrigger después de todas las animaciones
        ScrollTrigger.refresh();
      }, 100);
    });
  } else {
    setTimeout(() => {
      initMainTimeline();
      initScrollReveals();
      initParallaxEffects();
      initAboutTimeline();
      initContactTimeline();
      initHeaderAnimation();
      initMagneticEffect();
      initCounterAnimation();

      ScrollTrigger.refresh();
    }, 100);
  }
}

// Exportar funciones para uso externo si es necesario
window.initAdvancedAnimations = initAdvancedAnimations;

// Auto-inicializar
initAdvancedAnimations();
