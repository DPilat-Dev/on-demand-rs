/**
 * One-time migration script: uploads all files from /public/content/ to Vercel Blob.
 *
 * Run: npx dotenv -e .env.local -- ts-node --transpile-only --skip-project \
 *        --compiler-options '{"module":"CommonJS","moduleResolution":"node","esModuleInterop":true}' \
 *        scripts/upload-to-blob.ts
 *
 * Prints a mapping of old /content/... paths → new Blob URLs when done.
 */

import fs from 'fs';
import path from 'path';
import { put } from '@vercel/blob';

const CONTENT_DIR = path.join(__dirname, '../public/content');

const MIME_MAP: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

function walkDir(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(full));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (MIME_MAP[ext]) files.push(full);
    }
  }
  return files;
}

async function main() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error('❌ BLOB_READ_WRITE_TOKEN not set in environment');
    process.exit(1);
  }

  const files = walkDir(CONTENT_DIR);
  console.log(`\n📦 Found ${files.length} images to upload\n`);

  const mapping: Record<string, string> = {};
  let success = 0;
  let failed = 0;

  for (const filePath of files) {
    const relative = path.relative(path.join(__dirname, '../public'), filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_MAP[ext] ?? 'application/octet-stream';

    // Blob pathname preserves the folder structure under media/content/
    const blobPathname = relative.replace(/\\/g, '/'); // normalise on Windows

    try {
      const fileBuffer = fs.readFileSync(filePath);
      const blob = await put(blobPathname, fileBuffer, {
        access: 'public',
        contentType,
        addRandomSuffix: false, // keep predictable URLs
      });

      const publicPath = '/' + relative.replace(/\\/g, '/');
      mapping[publicPath] = blob.url;
      console.log(`  ✓ ${publicPath}`);
      console.log(`    → ${blob.url}`);
      success++;
    } catch (err: any) {
      console.error(`  ✗ ${relative}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n✅ Uploaded ${success} files${failed > 0 ? `, ❌ ${failed} failed` : ''}`);
  console.log('\n📋 Path mapping (old → new):\n');
  console.log(JSON.stringify(mapping, null, 2));

  // Save mapping to file for reference
  const outPath = path.join(__dirname, '../blob-url-mapping.json');
  fs.writeFileSync(outPath, JSON.stringify(mapping, null, 2));
  console.log(`\n💾 Mapping saved to blob-url-mapping.json`);
}

main().catch((e) => {
  console.error('❌ Script failed:', e);
  process.exit(1);
});
