import { randomUUID } from "node:crypto";
import path from "node:path";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} 환경변수가 필요합니다.`);
  }

  return value;
}

export function getS3Client() {
  return new S3Client({
    region: getRequiredEnv("AWS_REGION"),
  });
}

export function buildBlogObjectKey(filename: string) {
  const extension = path.extname(filename).toLowerCase() || ".bin";
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, "0");

  return `blog/${year}/${month}/${randomUUID()}${extension}`;
}

export function getPublicAssetUrl(key: string) {
  const baseUrl = process.env.S3_PUBLIC_BASE_URL?.replace(/\/$/, "");

  if (baseUrl) {
    const publicKey = key.startsWith("blog/") ? key.slice("blog/".length) : key;
    return `${baseUrl}/${publicKey}`;
  }

  const bucket = getRequiredEnv("S3_BUCKET_NAME");
  const region = getRequiredEnv("AWS_REGION");
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

export async function uploadBlogAsset(params: {
  file: Buffer;
  filename: string;
  contentType: string;
}) {
  const bucket = getRequiredEnv("S3_BUCKET_NAME");
  const key = buildBlogObjectKey(params.filename);
  const client = getS3Client();

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: params.file,
      ContentType: params.contentType,
    }),
  );

  return {
    key,
    url: getPublicAssetUrl(key),
  };
}
