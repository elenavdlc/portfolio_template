// Project Detail Page - Cargar datos del proyecto

const projectData = {
  "zapatillas-nike": {
    title: "Zapatillas Nike",
    image: "assets/images/nike_campaña.jpg",
    video: null,
    images: [
      "assets/images/nike_clayrender.jpg",
      "assets/images/nike_modelado.jpg",
    ],
    description:
      "Desarrollo de una campaña publicitaria centrada en el diseño y presentación de unas zapatillas de tenis creadas para el Gran Slam de Wimbledon. La propuesta apuesta por una estética clásica y elegante, inspirada en la tradición y el prestigio del torneo.",
    tasks: [
      "Investigación visual y definición de la dirección creativa.",
      "Diseño y modelado de las zapatillas de tenis",
      "Creación de clayrenders y renders finales.",
      "Desarrollo de la escena compositiva e iluminación del entorno.",
    ],
    year: "2025",
    tags: ["Modelado 3D", "Cinema 4D"],
  },
  rhode: {
    title: "Rhode",
    image: "assets/images/rhode.png",
    video: "assets/images/rhode_video.mov",
    images: [],
    description:
      "Realización de un spot publicitario para redes sociales dirigido a la marca Rhode, centrado en destacar el diseño, la estética y el valor del packaging como parte de su identidad.",
    tasks: [
      "Desarrollo del enfoque creativo y narrativa visual del spot.",
      "Edición y audio con Premiere Pro.",
      "Creación de animaciones gráficas y textos en After Effects.",
      "Uso de cámara 3D e integración de música para reforzar el ritmo y la estética.",
    ],
    year: "2025",
    tags: ["Premiere Pro", "After Effects", "Spot publicitario"],
  },
  "new-yorker": {
    title: "The New Yorker",
    image: "assets/images/the_new_yorker_mockup.jpg",
    video: null,
    images: ["assets/images/the_new_yorker_ilustracion.jpg"],
    description:
      "Diseño de una portada ilustrada para The New Yorker, inspirada en el mundo del golf. La propuesta se basa en una narrativa visual sutil, utilizando figuras humanas a escala pequeña para enfatizar el entorno, la acción y el contexto, integrando el deporte dentro del lenguaje editorial característico de la revista..",
    tasks: [
      "Investigación visual y creación de un moodboard.",
      "Desarrollo de la ilustración y definición del entorno principal.",
      "Utilización de una paleta cromática de tonos verdes.",
      "Composición de la portada respetando la identidad editorial de la revista.",
    ],
    year: "2025",
    tags: ["Illustrator", "Photoshop", "Editorial"],
  },
  henryk: {
    title: "Henryk Tomaszewski",
    image: "assets/images/revista_portada.jpg",
    video: null,
    images: [
      "assets/images/revista_pliego_1.jpg",
      "assets/images/revista_pliego_2.jpg",
      "assets/images/revista_pliego_3.jpg",
    ],
    description:
      "Diseño de una revista editorial dedicada al artista polaco Henryk Tomaszweski, desarrollada a partir de una investigación visual y conceptual de su obra y trayectoria. El proyecto reinterpreta su lenguaje gráfico mediante una propuesta minimalista.",
    tasks: [
      "Investigación del artista y análisis de us lenguaje visual y obra.",
      "Creación de un moodboard con referencias y elementos clave.",
      "Diseño de la portada y estructura editorial de la revista.",
      "Desarrollo del diseño de las páginas interiores siguiendo su identidad gráfica.",
    ],
    year: "2024",
    tags: ["InDesign", "Photoshop", "Editorial"],
  },
  beatles: {
    title: "The Beatles - Chupa Chups",
    image: "assets/images/poster.jpeg",
    video: null,
    images: [
      "assets/images/paul-mccartney.jpg",
      "assets/images/marquesina.jpg",
      "assets/images/georger_harrison.jpg",
    ],
    description:
      "Cartel publicitario para Chupa Chups basado en el concepto “Together” que celebra la unión de identidades distintas a través del universo de The Beatles. La propuesta conecta la música, el color y el sabor en una pieza visual de estética vintage-pop, inspirada en los discos de los años sesenta, con el objetivo de transmitir diversión.",
    tasks: [
      "Desarrollo del concepto creativo de la campaña.",
      "Realización de bocetos para definir la composición y estructura.",
      "Diseño y maquetación del cartel.",
      "Tratamiento de imágenes y ajustes gráficos.",
    ],
    year: "2025",
    tags: ["Illustrator", "Photoshop", "Dirección de arte"],
  },
  "diseno-grafico": {
    title: "ESTO ES Diseño Gráfico",
    image: "assets/images/web_home.jpg",
    video: null,
    images: [
      "assets/images/web_menu.jpg",
      "assets/images/web_entrada.jpg",
      "assets/images/web_responsive.jpg",
    ],
    description:
      "Diseño de una página web para una exposición de diseño gráfico, con el objetivo de celebrar la creatividad y ofrecer una experiencia visual atractiva. La web destaca por ser responsive, incluyendo galerías interactivas de las obras y facilitar la información clave sobre la exposición, proporcionado al usuario una navegación clara y completa.",
    tasks: [
      "Creación del prototipo en Figma para definir la estructura, navegación e interacción.",
      "Diseño responsive adaptado a móviles, tablets y escritorio.",
      "Realización de galerías para mostrar las obras de la exposición.",
      "Desarrollo de secciones informativas y proceso de compra de entradas.",
    ],
    year: "2024",
    tags: ["Figma", "HTML y CSS", "Diseño web"],
  },
};

// Obtener parámetro de la URL
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Cargar datos del proyecto
function loadProjectData() {
  const projectId = getUrlParameter("project") || "rhode";
  const project = projectData[projectId];

  if (!project) {
    console.error("Proyecto no encontrado:", projectId);
    return;
  }

  // Actualizar título
  const titleElement = document.getElementById("projectTitle");
  if (titleElement) {
    titleElement.textContent = project.title;
  }

  // Actualizar imagen
  const imageElement = document.getElementById("projectMainImage");
  if (imageElement) {
    imageElement.src = project.image;
    imageElement.alt = project.title;
  }

  // Actualizar descripción
  const descriptionElement = document.getElementById("projectDescription");
  if (descriptionElement) {
    descriptionElement.textContent = project.description;
  }

  // Actualizar tareas
  const tasksElement = document.getElementById("projectTasks");
  if (tasksElement) {
    tasksElement.innerHTML = "";
    project.tasks.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = task;
      tasksElement.appendChild(li);
    });
  }

  // Actualizar año
  const yearElement = document.getElementById("projectYear");
  if (yearElement) {
    yearElement.textContent = `Año ${project.year}`;
  }

  // Actualizar tags
  const tagsElement = document.getElementById("projectTags");
  if (tagsElement) {
    tagsElement.innerHTML = "";
    project.tags.forEach((tag) => {
      const span = document.createElement("span");
      span.className = "detail-tag";
      span.textContent = tag;
      tagsElement.appendChild(span);
    });
  }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", loadProjectData);
