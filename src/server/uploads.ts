import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";

const root = resolve(process.env.UPLOAD_PATH || "data/uploads");

export function initUploads(_bucket?: unknown): void {
  // Course Edition uploads use the same Railway volume as SQLite.
}

function safePath(filename: string): string {
  const safe = filename.replace(/[^a-zA-Z0-9._\/-]/g, "").replace(/^\/+/, "");
  const path = resolve(root, safe);
  if (!path.startsWith(root + "/")) throw new Error("Invalid upload path");
  return path;
}

function contentType(filename: string): string {
  const types: Record<string, string> = {
    ".csv": "text/csv", ".gif": "image/gif", ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg", ".pdf": "application/pdf", ".png": "image/png",
    ".svg": "image/svg+xml", ".webp": "image/webp",
  };
  return types[extname(filename).toLowerCase()] || "application/octet-stream";
}

export async function putUpload(
  filename: string,
  data: ArrayBuffer | Uint8Array,
  _contentType: string,
): Promise<string> {
  const path = safePath(filename);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, Buffer.from(data instanceof ArrayBuffer ? new Uint8Array(data) : data));
  return `/api/uploads/${filename}`;
}

export async function getUpload(
  filename: string,
): Promise<{ data: ArrayBuffer; contentType: string } | null> {
  try {
    const buffer = await readFile(safePath(filename));
    return {
      data: buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength),
      contentType: contentType(filename),
    };
  } catch {
    return null;
  }
}

export async function deleteUpload(filename: string): Promise<void> {
  await rm(safePath(filename), { force: true });
}

export async function readUploadAsBase64DataUrl(filename: string): Promise<string | null> {
  const result = await getUpload(filename);
  if (!result) return null;
  return `data:${result.contentType};base64,${Buffer.from(result.data).toString("base64")}`;
}

export function rid(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}
