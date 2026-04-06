"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db";

export type AdminActionState = {
  success?: string;
  error?: string;
};

const disabledState: AdminActionState = {
  error: "DATABASE_ENABLED=true 와 마이그레이션이 완료된 MariaDB가 준비되어야 저장할 수 있습니다.",
};

function isDatabaseWritable() {
  return process.env.DATABASE_ENABLED === "true" && Boolean(process.env.DATABASE_URL);
}

export async function createPostAction(
  _prevState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  if (!isDatabaseWritable()) {
    return disabledState;
  }

  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  if (!title || !slug || !content) {
    return { error: "title, slug, content는 필수입니다." };
  }

  try {
    await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        status: "PUBLISHED",
        publishedAt: new Date(),
        tags: {
          create: tags.map((tag) => ({
            tag: {
              connectOrCreate: {
                where: { slug: tag.toLowerCase().replace(/\s+/g, "-") },
                create: {
                  name: tag,
                  slug: tag.toLowerCase().replace(/\s+/g, "-"),
                },
              },
            },
          })),
        },
      },
    });

    revalidatePath("/admin/posts");
    revalidatePath("/blog");
    return { success: "블로그 글을 저장했습니다." };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "글 저장 중 오류가 발생했습니다." };
  }
}

export async function createProjectAction(
  _prevState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  if (!isDatabaseWritable()) {
    return disabledState;
  }

  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const period = String(formData.get("period") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const stack = String(formData.get("stack") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const problem = String(formData.get("problem") ?? "").trim();
  const implementation = String(formData.get("implementation") ?? "").trim();
  const outcome = String(formData.get("outcome") ?? "").trim();

  if (!title || !slug || !summary || !stack) {
    return { error: "title, slug, stack, summary는 필수입니다." };
  }

  try {
    await prisma.project.create({
      data: {
        title,
        slug,
        period,
        role,
        stack,
        summary,
        problem,
        implementation,
        outcome,
        status: "PUBLISHED",
      },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    return { success: "프로젝트를 저장했습니다." };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "프로젝트 저장 중 오류가 발생했습니다." };
  }
}

export async function createFeatureAction(
  _prevState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  if (!isDatabaseWritable()) {
    return disabledState;
  }

  const projectSlug = String(formData.get("projectSlug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const background = String(formData.get("background") ?? "").trim();
  const requirements = String(formData.get("requirements") ?? "").trim();
  const architecture = String(formData.get("architecture") ?? "").trim();
  const implementationDetails = String(formData.get("implementation") ?? "").trim();
  const edgeCases = String(formData.get("edgeCases") ?? "").trim();
  const result = String(formData.get("result") ?? "").trim();

  if (!projectSlug || !title || !slug) {
    return { error: "projectSlug, title, slug는 필수입니다." };
  }

  try {
    const project = await prisma.project.findUnique({
      where: { slug: projectSlug },
      select: { id: true },
    });

    if (!project) {
      return { error: "연결할 프로젝트 slug를 찾지 못했습니다." };
    }

    await prisma.feature.create({
      data: {
        projectId: project.id,
        featureName: title,
        slug,
        background,
        requirements,
        architecture,
        implementationDetails,
        edgeCases,
        result,
        status: "PUBLISHED",
      },
    });

    revalidatePath("/admin/features");
    revalidatePath("/features");
    revalidatePath(`/projects/${projectSlug}`);
    return { success: "기능 상세를 저장했습니다." };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "기능 저장 중 오류가 발생했습니다." };
  }
}
