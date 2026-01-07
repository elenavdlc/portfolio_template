# BIENVENIDO A MI PORTFOLIO

> Aquí puedes encontrar mi página en vivo!!
> [https://elenavdlc.github.io/portfolio_template/](https://elenavdlc.github.io/portfolio_template/)

# Portfolio Elena Valencia

Portfolio personal de Elena Valencia desarrollado con HTML, CSS, JavaScript, Bootstrap y GSAP.

## Descripción y propósito del pryecto

Este proyecto consiste en el diseño y desarrollo de una plantilla para un portfolio web, siendo un espacio digital en el que se presenta de forma clara y visual proyectos realizados por el artista. El sitio web combina diseño gráfico y animación, cuidando tanto la estética como la experiencia del usuario. A través de una estructura limpia y unas secciones bien definidas, el portfolio permite visualizar los trabajos de manera clara.

La utilización de animaciones sutiles, tipografías y una paleta de colores coherente refuerza la identidad visual de portfolio, aportando dinamismo sin llegar a distraer del contenido principal.

El propósito principal del proyecto era realizar un portfolio web que fuese adaptable en distintos dispositivos, implementar distintas tendencias y además de la utilización de Bootstrap, GSAP, efectos como parallax, scrolltrigger o split text.

## Características

- **Diseño Responsive**: Adaptado para dispositivos móviles, tablets y desktop.
- **Navegación Suave**: Scroll animado entre secciones usando GSAP.
- **Modo Oscuro**: Toggle para cambiar entre modo claro y oscuro.
- **Animaciones Interactivas**:
  - Animaciones de entrada con ScrollTrigger.
  - Efectos hover en proyectos y elementos interactivos.
- **Página 404**: Diseño único con mosaico animado.

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica.
- **CSS3**: Estilos personalizados con variables CSS.
- **JavaScript**: Interactividad y animaciones.
- **Bootstrap**: Sistema de grid y componentes responsive.
- **GSAP**: Animaciones avanzadas y ScrollTrigger.

## Secciones

1. **Home**: Landing page con nombre principal y botones CTA.
2. **About Me**: Información personal, experiencias y habilidades técnicas.
3. **Projects**: Grid de proyectos con ventana emergente.
4. **Contact**: Contactar a partir del email y redes sociales como Instagram y enlace al repositorio de GitHub.

## Instrucciones de configuración para el desarrollo local.

1. Descargar o clonar el proyecto.
2. Abrir la carpeta raíz del proyecto.
3. Abrir el archivo `index.html` con Live Server o un servidor local.
4. Acceder desde el navegador al puerto indicado.

## Guía de personalización

### Colores

Los colores se pueden modificar en las variables CSS en `css/styles.css`:

```css
:root {
  --primary-color: #000000;
  --secondary-color: #ffffff;
  --accent-color: #ff0000;
  /* ... */
}
```

### Contenido

El contenido se puede editar directamente desde cada uno de los archivos, que se euncuentran divididos por su función.

## Navegación

- Los enlaces del menú nos dirigen hacia las distintas secciones del portfolio.
- El menú es sticky y permanece visible al hacer scroll.
- En dispositivos móviles, el menú se convierte en un menú hamburguesa.
