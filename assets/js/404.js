// GRID DE 18 COLUMNAS X 8 FILAS FORMANDO 404

// NÚMERO 4
const pattern4 = [
  [0, 1, 1, 1, 0],
  [1, 0, 0, 1, 0],
  [1, 0, 0, 1, 0],
  [1, 1, 1, 1, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 1, 0],
];

// NÚMERO 0
const pattern0 = [
  [0, 1, 1, 1, 0],
  [1, 0, 0, 1, 0],
  [1, 0, 0, 1, 0],
  [1, 0, 0, 1, 0],
  [1, 0, 0, 1, 0],
  [1, 0, 0, 1, 0],
  [0, 1, 1, 1, 0],
];

// ESPACIADO
const gridPattern = [];
const numRows = 7;
const numCols = 18;

for (let row = 0; row < numRows; row++) {
  const gridRow = [];

  //   PRIMER 4
  for (let col = 0; col < 5; col++) {
    gridRow.push(pattern4[row][col]);
  }

  //   ESPACIO
  gridRow.push(0);

  //   NÚMERO 0
  for (let col = 0; col < 5; col++) {
    gridRow.push(pattern0[row][col]);
  }

  //   ESPACIO
  gridRow.push(0);

  //   SEGUNDO 4
  for (let col = 0; col < 5; col++) {
    gridRow.push(pattern4[row][col]);
  }

  //   ESPACIO
  gridRow.push(0);

  gridPattern.push(gridRow);
}

/* ============================================
MOSAICO
============================================ */
const mosaicGrid = document.getElementById("mosaicGrid");
const gridCols = numCols;
const gridRows = numRows;

function createMosaic() {
  mosaicGrid.innerHTML = "";

  // CRUADADOS
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      const tile = document.createElement("div");
      const patternValue = gridPattern[row][col];

      if (patternValue === 1) {
        tile.className = "mosaic-tile number-part";
      } else {
        // FONDO BLANCO
        tile.className = "mosaic-tile";
      }

      // EFECTO HOVER: GIRAR LOS CUADRADOS
      tile.addEventListener("mouseenter", function () {
        this.style.transform = "rotateY(180deg)";
        if (patternValue === 1) {
          this.style.backgroundColor = "#000000";
        } else {
          this.style.backgroundColor = "#ffffff";
        }
      });

      tile.addEventListener("mouseleave", function () {
        this.style.transform = "rotateY(0deg)";
        if (patternValue === 1) {
          this.style.backgroundColor = "#000000";
        } else {
          this.style.backgroundColor = "#ffffff";
        }
      });

      mosaicGrid.appendChild(tile);
    }
  }
}

/* ============================================
CARGAR EL MOSAICO
============================================ */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", createMosaic);
} else {
  createMosaic();
}

// ANIMACIÓN AL ENTRAR
gsap.fromTo(
  ".mosaic-tile",
  {
    opacity: 0,
    scale: 0.8,
  },
  {
    opacity: 1,
    scale: 1,
    duration: 0.3,
    stagger: {
      amount: 0.6,
      from: "random",
    },
    ease: "power2.out",
  }
);

// ANIMACIÓN DEL TEXTO
gsap.fromTo(
  ".error-text-line",
  {
    opacity: 0,
    x: 30,
  },
  {
    opacity: 1,
    x: 0,
    duration: 0.5,
    stagger: 0.15,
    delay: 0.4,
    ease: "power2.out",
  }
);

gsap.fromTo(
  ".go-home-link",
  {
    opacity: 0,
    y: 20,
  },
  {
    opacity: 0.9,
    y: 0,
    duration: 0.4,
    delay: 0.8,
    ease: "power2.out",
  }
);
