"use client";

import { useActionState, useRef, useState } from "react";
import Image from "next/image";

import { createPostAction, type AdminActionState } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialState: AdminActionState = {};

export function PostForm() {
  const [state, formAction, pending] = useActionState(createPostAction, initialState);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/uploads/blog-cover", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !result.url) {
        throw new Error(result.error || "이미지 업로드 중 오류가 발생했습니다.");
      }

      setCoverImageUrl(result.url);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "이미지 업로드 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Post</CardTitle>
        <CardDescription>대표 이미지는 S3에 업로드되고, 글 본문과 메타데이터는 MariaDB에 저장됩니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="title">
              Title
            </label>
            <Input id="title" name="title" placeholder="글 제목" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="slug">
              Slug
            </label>
            <Input id="slug" name="slug" placeholder="my-first-post" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="excerpt">
              Excerpt
            </label>
            <Textarea id="excerpt" name="excerpt" placeholder="짧은 요약" />
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="cover-upload">
                Cover Image Upload
              </label>
              <input
                accept="image/*"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                id="cover-upload"
                onChange={(event) => {
                  const file = event.target.files?.[0];

                  if (file) {
                    void handleUpload(file);
                  }
                }}
                ref={fileInputRef}
                type="file"
              />
            </div>
            {uploading ? <p className="text-sm text-muted-foreground">이미지 업로드 중...</p> : null}
            {uploadError ? <p className="text-sm text-destructive">{uploadError}</p> : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="coverImageUrl">
              Cover Image URL
            </label>
            <Input
              id="coverImageUrl"
              name="coverImageUrl"
              onChange={(event) => setCoverImageUrl(event.target.value)}
              placeholder="https://... or uploaded S3 URL"
              value={coverImageUrl}
            />
          </div>

          {coverImageUrl ? (
            <div className="space-y-2">
              <p className="text-sm font-medium">Preview</p>
              <div className="relative aspect-[16/8] overflow-hidden rounded-md border border-border">
                <Image alt="업로드된 대표 이미지 미리보기" className="object-cover" fill src={coverImageUrl} unoptimized />
              </div>
            </div>
          ) : null}

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="coverImageAlt">
              Cover Image Alt
            </label>
            <Input id="coverImageAlt" name="coverImageAlt" placeholder="대표 이미지 설명" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="status">
              Visibility
            </label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              defaultValue="DRAFT"
              id="status"
              name="status"
            >
              <option value="DRAFT">비공개 초안</option>
              <option value="PUBLISHED">공개 게시</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="content">
              Content
            </label>
            <Textarea id="content" name="content" placeholder="문단은 빈 줄로 구분" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="tags">
              Tags
            </label>
            <Input id="tags" name="tags" placeholder="AI, Fullstack, Prisma" />
          </div>

          {state.error ? <p className="text-sm text-destructive">{state.error}</p> : null}
          {state.success ? <p className="text-sm text-emerald-600">{state.success}</p> : null}

          <Button disabled={pending || uploading} type="submit">
            {pending ? "Saving..." : "글 저장"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
