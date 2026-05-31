import fs from "fs/promises";
import path from "path";
import astroConfig from "../astro.config.mjs";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const rootDir = path.resolve(__dirname, "..", "");
const distDir = path.join(rootDir, "dist");
const pagesDir = path.join(rootDir, "src", "pages");
const blogDir = path.join(rootDir, "src", "content", "blog");

const siteBase =
  String(astroConfig.site || "").replace(/\/$/, "") || "http://localhost:4321";

function isDynamicRoute(filePath) {
  return /\[.*\]/.test(filePath);
}

function normalizeRoute(route) {
  if (!route.startsWith("/")) route = `/${route}`;
  if (route !== "/" && route.endsWith("/")) route = route.slice(0, -1);
  return route;
}

async function collectPageRoutes(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const routes = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name.startsWith("_")) continue;
      routes.push(...(await collectPageRoutes(fullPath)));
      continue;
    }

    if (!entry.isFile()) continue;

    const ext = path.extname(entry.name);
    if (![".astro", ".md", ".mdx"].includes(ext)) continue;
    if (entry.name.startsWith("_")) continue;
    if (entry.name === "404.astro") continue;

    if (isDynamicRoute(fullPath)) continue;

    let route = path.relative(pagesDir, fullPath).replace(/\\/g, "/");

    if (
      route.endsWith("index.astro") ||
      route.endsWith("index.md") ||
      route.endsWith("index.mdx")
    ) {
      route = route.replace(/index\.[^/.]+$/, "");
    } else {
      route = route.replace(/\.[^/.]+$/, "");
    }

    route = route === "" ? "/" : `/${route}`;
    route = normalizeRoute(route);
    routes.push(route);
  }

  return routes;
}

async function collectBlogRoutes() {
  let routes = [];
  try {
    const entries = await fs.readdir(blogDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      const ext = path.extname(entry.name).toLowerCase();
      if (![".md", ".mdx"].includes(ext)) continue;
      const slug = path.basename(entry.name, ext);
      routes.push(normalizeRoute(`/blog/${slug}`));
    }
  } catch {
    // no blog folder; skip
  }
  return routes;
}

async function run() {
  const pageRoutes = await collectPageRoutes(pagesDir);
  const blogRoutes = await collectBlogRoutes();

  const urlSet = new Set([...pageRoutes, ...blogRoutes]);

  const now = new Date().toISOString();

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n${[
    ...urlSet,
  ]
    .sort()
    .map((route) => {
      const loc = `${siteBase}${route}`;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${route === "/" ? "1.0" : "0.7"}</priority>\n  </url>`;
    })
    .join("\n")}\n</urlset>`;

  await fs.mkdir(distDir, { recursive: true });
  await fs.writeFile(path.join(distDir, "sitemap.xml"), sitemapXml, "utf8");
  await fs.writeFile(
    path.join(distDir, "robots.txt"),
    `User-agent: *\nAllow: /\nSitemap: ${siteBase}/sitemap.xml\n`,
    "utf8",
  );

  console.log(`✅ sitemap.xml + robots.txt generated in ${distDir}`);
}

run().catch((error) => {
  console.error("❌ Failed to generate sitemap/robots:", error);
  process.exit(1);
});
