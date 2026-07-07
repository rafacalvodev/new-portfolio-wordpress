const WP_URL = import.meta.env.WORDPRESS_URL || "https://rafacalvodev.com/wp-json/wp/v2";

export interface WordPressPost {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    author?: Array<{ name: string }>;
    "wp:featuredmedia"?: Array<{ source_url: string }>;
    "wp:term"?: Array<Array<{ name: string; slug: string }>>;
  };
}

export interface WordPressService {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  acf?: {
    service_title: string;
    service_description: string;
    service_url: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
}

export async function fetchPosts(
  limit = 10,
  page = 1,
): Promise<{ posts: WordPressPost[]; total: number }> {
  const res = await fetch(`${WP_URL}/posts?per_page=${limit}&page=${page}&_embed`);
  if (!res.ok) throw new Error(`WordPress API error: ${res.statusText}`);
  const total = parseInt(res.headers.get("X-WP-Total") || "0");
  const posts = await res.json();
  return { posts, total };
}

export async function fetchPostBySlug(slug: string): Promise<WordPressPost | null> {
  const res = await fetch(`${WP_URL}/posts?slug=${slug}&_embed`);
  if (!res.ok) return null;
  const posts = await res.json();
  return posts[0] || null;
}

export async function fetchServices(): Promise<WordPressService[]> {
  const res = await fetch(`${WP_URL}/servicios?per_page=100&_embed`);
  if (!res.ok) throw new Error(`WordPress API error: ${res.statusText}`);
  return res.json();
}
