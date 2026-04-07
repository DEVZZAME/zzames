import type { MetadataRoute } from "next";

import { getPublicFeatures, getPublicPosts, getPublicProjects } from "@/lib/content-store";
import { siteConfig } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, features, posts] = await Promise.all([
    getPublicProjects(),
    getPublicFeatures(),
    getPublicPosts(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/projects",
    "/features",
    "/blog",
    "/login",
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const projectRoutes = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const featureRoutes = features.map((feature) => ({
    url: absoluteUrl(`/features/${feature.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const postRoutes = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...featureRoutes, ...postRoutes].map((entry) => ({
    ...entry,
    url: entry.url.replace(siteConfig.siteUrl, siteConfig.siteUrl),
  }));
}
