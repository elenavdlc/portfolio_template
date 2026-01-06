// Project Modal - Ventana emergente para proyectos

let currentScrollPosition = 0;
let currentProjectId = null;
let currentMainImageSrc = null; // Rastrear la imagen principal actual

function openProjectModal(projectId) {
  // Guardar posición de scroll
  currentScrollPosition =
    window.pageYOffset || document.documentElement.scrollTop;

  // Guardar el projectId actual para uso en changeModalImage
  currentProjectId = projectId;

  // Prevenir scroll del body
  document.body.style.position = "fixed";
  document.body.style.top = `-${currentScrollPosition}px`;
  document.body.style.width = "100%";

  // Cargar contenido del proyecto
  const project = projectData[projectId];
  if (!project) {
    console.error("Proyecto no encontrado:", projectId);
    return;
  }

  const modal = document.getElementById("projectModal");
  const modalBody = document.getElementById("projectModalBody");

  // Guardar la imagen principal inicial
  currentMainImageSrc = project.image;

  // Construir HTML del modal
  let html = `
        <div class="project-modal-header">
            <h2 class="project-modal-title">${project.title}</h2>
        </div>
        <div class="project-modal-main">
            <div class="project-modal-media">
    `;

  if (project.video) {
    html += `
            <video controls class="project-modal-video" preload="metadata">
                <source src="${project.video}" type="video/mp4">
                <source src="${project.video}" type="video/quicktime">
                <source src="${project.video}" type="video/webm">
                Tu navegador no soporta el elemento de video.
            </video>
        `;
  } else {
    html += `
            <img src="${project.image}" alt="${project.title}" class="project-modal-image" data-main-src="${project.image}">
        `;
  }

  if (project.images && project.images.length > 0) {
    html += `<div class="project-modal-thumbnails">`;
    project.images.forEach((imgSrc, index) => {
      html += `<img src="${imgSrc}" alt="${project.title}" class="project-modal-thumbnail" data-index="${index}" data-thumb-src="${imgSrc}" onclick="changeModalImage(${index})">`;
    });
    html += `</div>`;
  }

  html += `
            </div>
            <div class="project-modal-info">
                <div class="project-modal-section">
                    <h3 class="project-modal-section-title">Descripción</h3>
                    <p class="project-modal-text">${project.description}</p>
                </div>
                <div class="project-modal-section">
                    <h3 class="project-modal-section-title">¿Qué hice?</h3>
                    <ul class="project-modal-list">
    `;

  project.tasks.forEach((task) => {
    html += `<li>${task}</li>`;
  });

  html += `
                    </ul>
                    <div class="project-modal-year">Año ${project.year}</div>
                    <div class="project-modal-tags">
    `;

  project.tags.forEach((tag) => {
    html += `<span class="project-modal-tag">${tag}</span>`;
  });

  html += `
                    </div>
                </div>
            </div>
        </div>
    `;

  modalBody.innerHTML = html;
  modal.classList.add("active");

  // Animación de entrada
  gsap.fromTo(
    ".project-modal-content",
    { opacity: 0, scale: 0.9, y: 50 },
    { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" }
  );
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");

  // Animación de salida
  gsap.to(".project-modal-content", {
    opacity: 0,
    scale: 0.9,
    y: 50,
    duration: 0.2,
    ease: "power2.in",
    onComplete: () => {
      modal.classList.remove("active");

      // Restaurar scroll del body sin mover la página
      const scrollY = currentScrollPosition;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      // Restaurar posición de scroll sin animación
      window.scrollTo({
        top: scrollY,
        behavior: "auto",
      });
    },
  });
}

function changeModalImage(thumbnailIndex) {
  const modalImage = document.querySelector(".project-modal-image");
  const thumbnails = document.querySelectorAll(".project-modal-thumbnail");

  if (!modalImage || !currentProjectId || !projectData[currentProjectId])
    return;

  // Obtener el thumbnail seleccionado
  const selectedThumbnail = thumbnails[thumbnailIndex];
  if (!selectedThumbnail) return;

  // Obtener la URL ACTUAL de la imagen principal (siempre desde el DOM)
  const currentMainSrc =
    modalImage.getAttribute("data-main-src") || modalImage.src;

  // Obtener la URL ACTUAL del thumbnail seleccionado (siempre desde el DOM)
  const selectedThumbSrc =
    selectedThumbnail.getAttribute("data-thumb-src") || selectedThumbnail.src;

  // Verificar que las imágenes sean diferentes antes de intercambiar
  if (normalizePath(currentMainSrc) === normalizePath(selectedThumbSrc)) {
    return; // Ya están intercambiadas o son la misma
  }

  // Intercambiar: la imagen principal se convierte en thumbnail y viceversa
  gsap.to(modalImage, {
    opacity: 0,
    duration: 0.2,
    onComplete: () => {
      // Guardar la imagen principal actual antes de cambiarla
      const previousMainSrc = currentMainSrc;

      // Actualizar imagen principal con la del thumbnail seleccionado
      modalImage.src = selectedThumbSrc;
      modalImage.setAttribute("data-main-src", selectedThumbSrc);
      currentMainImageSrc = selectedThumbSrc;

      // Intercambiar: poner la imagen principal anterior en el thumbnail seleccionado
      selectedThumbnail.src = previousMainSrc;
      selectedThumbnail.setAttribute("data-thumb-src", previousMainSrc);

      gsap.to(modalImage, {
        opacity: 1,
        duration: 0.2,
      });
    },
  });
}

// Función auxiliar para normalizar rutas (comparar sin dominio completo)
function normalizePath(path) {
  // Remover protocolo y dominio si existe
  return path.replace(/^https?:\/\/[^\/]+/, "").split("?")[0];
}

// Cerrar modal con ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const modal = document.getElementById("projectModal");
    if (modal.classList.contains("active")) {
      closeProjectModal();
    }
  }
});
