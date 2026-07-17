# Página web personal y protafolio.

Mi sitio web donde muestro los trabajos y proyectos que he hecho, y donde escribo un poquito sobre desarrollo web y el mundo freelance. Esta vez me dio por usar Astro con Headless WordPress para el blog.

Tiene tema claro/oscuro que dependerá del tema del sistema operativo (o navegador).



## Stack
- **Frontend:** Astro (SSR con `@astrojs/node`)
- **CMS:** WordPress Headless (REST API)
- **Estilos:** SCSS/Sass
- **Accesibilidad:** WCAG 2.2 nivel AA

### Contenido desde WordPress
- **Blog** — Posts obtenidos via `wp-json/wp/v2/posts` con `_embed` para imágenes destacadas

### Contenido local (Astro Content Collections)
- **Proyectos** — Permanecen en `src/content/projects/` con archivos Markdown


## Pendiente
- [ ]  Opción multilenguaje, empezando por inglés.
- [ ]  Posible migración a CSS puro para el estilo (ya que, excepto para mixins, CSS puede hacer todo lo que hace Sass).
- [ ]  Adición de comentario (a ver cómo hago para que no crashee algo 😅)
