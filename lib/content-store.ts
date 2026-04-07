import { prisma } from "@/lib/db";
import { blogPosts, features, projects } from "@/lib/portfolio-data";

function canUseDatabase() {
  return process.env.DATABASE_ENABLED === "true" && Boolean(process.env.DATABASE_URL);
}

export function isDatabaseEnabled() {
  return canUseDatabase();
}

export async function getPublicProjects() {
  if (!canUseDatabase()) {
    return projects;
  }

  try {
    const dbProjects = await prisma.project.findMany({
      where: { status: "PUBLISHED" },
      include: { features: true },
      orderBy: { createdAt: "desc" },
    });

    if (dbProjects.length === 0) {
      return projects;
    }

    return dbProjects.map((project) => ({
      slug: project.slug,
      title: project.title,
      subtitle: project.summary,
      period: project.period ?? "",
      role: project.role ?? "",
      stack: project.stack.split(",").map((item) => item.trim()),
      summary: project.summary,
      problem: project.problem ?? "",
      implementation: project.implementation ? project.implementation.split("\n").filter(Boolean) : [],
      outcome: project.outcome ? project.outcome.split("\n").filter(Boolean) : [],
      featureSlugs: project.features.map((feature) => feature.slug),
    }));
  } catch {
    return projects;
  }
}

export async function getPublicFeatures() {
  if (!canUseDatabase()) {
    return features;
  }

  try {
    const dbFeatures = await prisma.feature.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
    });

    if (dbFeatures.length === 0) {
      return features;
    }

    return dbFeatures.map((feature) => ({
      slug: feature.slug,
      projectSlug: "",
      title: feature.featureName,
      summary: feature.background ?? "",
      background: feature.background ?? "",
      requirements: feature.requirements ? feature.requirements.split("\n").filter(Boolean) : [],
      architecture: feature.architecture ? feature.architecture.split("\n").filter(Boolean) : [],
      implementation: feature.implementationDetails
        ? feature.implementationDetails.split("\n").filter(Boolean)
        : [],
      edgeCases: feature.edgeCases ? feature.edgeCases.split("\n").filter(Boolean) : [],
      result: feature.result ? feature.result.split("\n").filter(Boolean) : [],
    }));
  } catch {
    return features;
  }
}

export async function getPublicPosts() {
  if (!canUseDatabase()) {
    return blogPosts;
  }

  try {
    const dbPosts = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      include: { tags: { include: { tag: true } } },
      orderBy: { publishedAt: "desc" },
    });

    if (dbPosts.length === 0) {
      return blogPosts;
    }

    return dbPosts.map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt ?? "",
      publishedAt: post.publishedAt?.toISOString().slice(0, 10) ?? post.createdAt.toISOString().slice(0, 10),
      tags: post.tags.map((tag) => tag.tag.name),
      content: post.content.split("\n\n").filter(Boolean),
      coverImageUrl: post.coverImageUrl ?? "",
      coverImageAlt: post.coverImageAlt ?? "",
    }));
  } catch {
    return blogPosts;
  }
}

export async function getAdminProjects() {
  if (!canUseDatabase()) {
    return projects;
  }

  try {
    const dbProjects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (dbProjects.length === 0) {
      return projects;
    }

    return dbProjects.map((project) => ({
      slug: project.slug,
      title: project.title,
      subtitle: project.summary,
      period: project.period ?? "",
      role: project.role ?? "",
      stack: project.stack.split(",").map((item) => item.trim()),
      summary: project.summary,
      problem: project.problem ?? "",
      implementation: project.implementation ? project.implementation.split("\n").filter(Boolean) : [],
      outcome: project.outcome ? project.outcome.split("\n").filter(Boolean) : [],
      featureSlugs: [],
      status: project.status,
    }));
  } catch {
    return projects.map((project) => ({ ...project, status: "PUBLISHED" as const }));
  }
}

export async function getAdminFeatures() {
  if (!canUseDatabase()) {
    return features.map((feature) => ({ ...feature, status: "PUBLISHED" as const }));
  }

  try {
    const dbFeatures = await prisma.feature.findMany({
      include: { project: true },
      orderBy: { createdAt: "desc" },
    });

    if (dbFeatures.length === 0) {
      return features.map((feature) => ({ ...feature, status: "PUBLISHED" as const }));
    }

    return dbFeatures.map((feature) => ({
      slug: feature.slug,
      projectSlug: feature.project.slug,
      title: feature.featureName,
      summary: feature.background ?? "",
      background: feature.background ?? "",
      requirements: feature.requirements ? feature.requirements.split("\n").filter(Boolean) : [],
      architecture: feature.architecture ? feature.architecture.split("\n").filter(Boolean) : [],
      implementation: feature.implementationDetails
        ? feature.implementationDetails.split("\n").filter(Boolean)
        : [],
      edgeCases: feature.edgeCases ? feature.edgeCases.split("\n").filter(Boolean) : [],
      result: feature.result ? feature.result.split("\n").filter(Boolean) : [],
      status: feature.status,
    }));
  } catch {
    return features.map((feature) => ({ ...feature, status: "PUBLISHED" as const }));
  }
}

export async function getAdminPosts() {
  if (!canUseDatabase()) {
    return blogPosts.map((post) => ({ ...post, status: "PUBLISHED" as const }));
  }

  try {
    const dbPosts = await prisma.blogPost.findMany({
      include: { tags: { include: { tag: true } } },
      orderBy: { createdAt: "desc" },
    });

    if (dbPosts.length === 0) {
      return blogPosts.map((post) => ({ ...post, status: "PUBLISHED" as const }));
    }

    return dbPosts.map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt ?? "",
      publishedAt: post.publishedAt?.toISOString().slice(0, 10) ?? post.createdAt.toISOString().slice(0, 10),
      tags: post.tags.map((tag) => tag.tag.name),
      content: post.content.split("\n\n").filter(Boolean),
      status: post.status,
      coverImageUrl: post.coverImageUrl ?? "",
      coverImageAlt: post.coverImageAlt ?? "",
    }));
  } catch {
    return blogPosts.map((post) => ({ ...post, status: "PUBLISHED" as const }));
  }
}
