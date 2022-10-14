import fs from "node:fs/promises";

export async function isFileExisting(path: string) {
  try {
    const stat = await fs.stat(path);
    return stat.isFile();
  } catch {}

  return false;
}
