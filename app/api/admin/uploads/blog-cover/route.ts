import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth";
import { uploadBlogAsset } from "@/lib/s3";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "업로드할 파일이 필요합니다." }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "이미지 파일만 업로드할 수 있습니다." }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();

  const uploaded = await uploadBlogAsset({
    file: Buffer.from(arrayBuffer),
    filename: file.name,
    contentType: file.type,
  });

  return NextResponse.json(uploaded);
}
