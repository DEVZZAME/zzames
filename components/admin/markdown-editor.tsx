"use client";

import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";

type MarkdownEditorProps = {
  name: string;
  label: string;
  placeholder?: string;
};

export function MarkdownEditor({ name, label, placeholder }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const insertAtCursor = (text: string, wrap?: { before: string; after: string }) => {
    const textarea = textareaRef.current;

    if (!textarea) {
      setValue((prev) => prev + text);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end);
    const inserted = wrap ? `${wrap.before}${selected || text}${wrap.after}` : text;
    const nextValue = `${value.slice(0, start)}${inserted}${value.slice(end)}`;

    setValue(nextValue);

    requestAnimationFrame(() => {
      textarea.focus();
      const nextCursor = start + inserted.length;
      textarea.setSelectionRange(nextCursor, nextCursor);
    });
  };

  const uploadInlineImage = async (file: File) => {
    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/uploads/blog-cover", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !result.url) {
        throw new Error(result.error || "본문 이미지 업로드에 실패했습니다.");
      }

      insertAtCursor(`\n\n![${file.name}](${result.url})\n\n`);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "본문 이미지 업로드에 실패했습니다.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <label className="text-sm font-medium" htmlFor={name}>
          {label}
        </label>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => insertAtCursor("제목", { before: "## ", after: "" })} size="sm" type="button" variant="outline">
            H2
          </Button>
          <Button onClick={() => insertAtCursor("강조", { before: "**", after: "**" })} size="sm" type="button" variant="outline">
            Bold
          </Button>
          <Button onClick={() => insertAtCursor("\n- 항목\n- 항목\n")} size="sm" type="button" variant="outline">
            List
          </Button>
          <Button onClick={() => fileInputRef.current?.click()} size="sm" type="button" variant="outline">
            Image
          </Button>
        </div>
      </div>

      <input
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];

          if (file) {
            void uploadInlineImage(file);
          }
        }}
        ref={fileInputRef}
        type="file"
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <textarea
          className="flex min-h-36 w-full rounded-[1.5rem] border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
          id={name}
          name={name}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          ref={textareaRef}
          value={value}
        />
        <div className="min-h-[320px] rounded-md border border-border bg-background p-4">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Preview</p>
          <div className="prose prose-neutral max-w-none">
            <ReactMarkdown
              components={{
                img: ({ alt, src }) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img alt={alt || ""} className="my-6 w-full rounded-lg border border-border" src={src || ""} />
                ),
              }}
              remarkPlugins={[remarkGfm]}
            >
              {value || "여기에 작성한 본문이 미리보기로 표시됩니다."}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {uploading ? <p className="text-sm text-muted-foreground">본문 이미지 업로드 중...</p> : null}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
