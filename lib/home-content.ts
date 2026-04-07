import { readFile } from "node:fs/promises";
import path from "node:path";

export type CareerBlock = {
  title: string;
  period: string;
  items: string[];
};

export type EducationBlock = {
  period: string;
  title: string;
};

export type AboutProfile = {
  name: string;
  role: string;
  items: Array<{
    label: string;
    value: string;
  }>;
};

export type StackGroup = {
  order: number;
  category: string;
  items: string[];
};

export type ProjectStory = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  why: string[];
  challenge: string[];
  toBe: string[];
};

async function readRootTextFile(filename: string) {
  const filePath = path.join(process.cwd(), filename);
  return readFile(filePath, "utf8");
}

function cleanMarkdownText(value: string) {
  return value.replace(/\*\*/g, "").replace(/`/g, "").trim();
}

function splitParagraphBlocks(raw: string) {
  return raw
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
}

export async function getCareerBlocks() {
  const raw = await readRootTextFile("career.txt");
  const lines = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const blocks: CareerBlock[] = [];
  let current: CareerBlock | null = null;

  for (const line of lines) {
    if (line === "개발 경력" || line === "외주 개발 경력") {
      continue;
    }

    if (line.includes("|")) {
      if (current) {
        blocks.push(current);
      }

      const [title, period] = line.split("|").map((part) => part.trim());
      current = {
        title,
        period,
        items: [],
      };
      continue;
    }

    current?.items.push(line);
  }

  if (current) {
    blocks.push(current);
  }

  return blocks;
}

export async function getEducationBlocks() {
  const raw = await readRootTextFile("education.txt");
  const blocks = splitParagraphBlocks(raw);

  return blocks
    .map((block) => block.split("\n").map((line) => line.trim()).filter(Boolean))
    .map(([period, title]) => ({
      period,
      title,
    })) satisfies EducationBlock[];
}

export async function getAboutProfile() {
  const raw = await readRootTextFile("about.txt");
  const lines = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const [name = "", role = "", ...rest] = lines;
  const items: AboutProfile["items"] = [];

  for (let index = 0; index < rest.length; index += 2) {
    const label = rest[index];
    const value = rest[index + 1];

    if (!label || !value) {
      continue;
    }

    items.push({ label, value });
  }

  return {
    name,
    role,
    items,
  } satisfies AboutProfile;
}

export async function getEtcCareerBlocks() {
  const raw = await readRootTextFile("etc career.txt");
  const blocks = splitParagraphBlocks(raw);

  return blocks
    .map((block) => block.split("\n").map((line) => line.trim()).filter(Boolean))
    .map(([period, title, ...items]) => ({
      period,
      title,
      items,
    }));
}

export async function getStackGroups() {
  const raw = await readRootTextFile("tech stack.txt");
  const lines = raw.split("\n").map((line) => line.trim());
  const groups: StackGroup[] = [];
  let current: StackGroup | null = null;

  for (const line of lines) {
    if (!line) {
      continue;
    }

    const match = line.match(/^(\d+)\.\s*(.+)$/);

    if (match) {
      if (current) {
        groups.push(current);
      }

      current = {
        order: Number(match[1]),
        category: match[2],
        items: [],
      };
      continue;
    }

    if (current) {
      current.items.push(line);
    }
  }

  if (current) {
    groups.push(current);
  }

  return groups.sort((left, right) => left.order - right.order);
}

const PROJECT_STACK = ["Java", "Spring Boot", "MariaDB", "AWS", "Docker"];

export async function getProjectStories() {
  const raw = await readRootTextFile("projects.txt");
  const segments = raw
    .split(/(?=^\d+\.\s+)/m)
    .map((segment) => segment.trim())
    .filter((segment) => /^\d+\.\s+/.test(segment));

  return segments.map((segment, index) => {
    const lines = segment
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const title = lines[0]?.replace(/^\d+\.\s+/, "").trim() ?? "Project";

    const buckets: Record<"why" | "challenge" | "toBe", string[]> = {
      why: [],
      challenge: [],
      toBe: [],
    };

    let current: keyof typeof buckets | null = null;

    for (const line of lines) {
      if (line.startsWith("**Why")) {
        current = "why";
        continue;
      }

      if (line.startsWith("**Challenge")) {
        current = "challenge";
        continue;
      }

      if (line.startsWith("**To Be")) {
        current = "toBe";
        continue;
      }

      if (line.startsWith("- ")) {
        if (current) {
          buckets[current].push(cleanMarkdownText(line.replace(/^- /, "").trim()));
        }
      }
    }

    const summary =
      buckets.why[0] ??
      buckets.challenge[0] ??
      buckets.toBe[0] ??
      "운영 환경에서 반복되는 문제를 자동화한 백엔드 프로젝트.";

    return {
      slug: `project-${index + 1}`,
      title,
      summary,
      stack: PROJECT_STACK,
      why: buckets.why,
      challenge: buckets.challenge,
      toBe: buckets.toBe,
    } satisfies ProjectStory;
  });
}
