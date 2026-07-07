# rafacalvodev.com — Headless WordPress + Astro

Este repositorio contiene la versión del portafolio personal de Rafael Calvo impulsada por **WordPress Headless** como CMS de contenido.

**Diferencia clave con el repo `new-portfolio`:**  
- `new-portfolio` → Todo el contenido (blog, proyectos, servicios) está en `src/content/` usando Content Collections de Astro.  
- **Este repo** → El blog y los servicios se obtienen desde la REST API de WordPress (`rafacalvodev.com/wp-json/wp/v2/`). Los proyectos siguen siendo locales.

## Stack
- **Frontend:** Astro (SSR con `@astrojs/node`)
- **CMS:** WordPress Headless (REST API + ACF para servicios)
- **Estilos:** SCSS/Sass
- **Accesibilidad:** WCAG 2.2 nivel AA

## Contenido desde WordPress
- **Blog** — Posts obtenidos via `wp-json/wp/v2/posts` con `_embed` para imágenes destacadas
- **Servicios** — Custom Post Type "servicios" con campos ACF (`service_title`, `service_description`, `service_url`)

## Contenido local (Astro Content Collections)
- **Proyectos** — Permanecen en `src/content/projects/` con archivos Markdown

## Comandos
| Comando | Acción |
|---|---|
| `npm run dev` | Inicia servidor de desarrollo en `localhost:4321` |
| `npm run build` | Compila el sitio SSR |
| `npm run preview` | Previsualiza la compilación |
| `npm run astro check` | Revisa errores de tipo y linting |
