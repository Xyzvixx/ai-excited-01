import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// ai-excited-01: deterministic entry writer.
// Copies the pre-rendered entry.png next to this file into the output dir.
// Validates the source before copying: it must exist and be a real PNG.
// No network, no randomness, no dependencies beyond the Node standard library.

// PNG files always start with this 8-byte signature (RFC 2083).
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const destPath = join(outDir, "entry.png");

// Fail loudly instead of producing a silent empty/missing output.
if (!existsSync(sourcePath)) {
  throw new Error(`entry image not found: ${sourcePath}`);
}
if (!statSync(sourcePath).isFile()) {
  throw new Error(`entry image is not a file: ${sourcePath}`);
}

// Read the header and confirm it is really a PNG before copying anything.
const header = readFileSync(sourcePath).subarray(0, PNG_SIGNATURE.length);
if (!header.equals(PNG_SIGNATURE)) {
  throw new Error(`entry image is not a valid PNG (bad signature): ${sourcePath}`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(sourcePath, destPath);

// Verify the copy itself: it must still be a PNG and byte-for-byte complete.
const destStat = statSync(destPath);
const destHeader = readFileSync(destPath).subarray(0, PNG_SIGNATURE.length);
if (!destHeader.equals(PNG_SIGNATURE)) {
  throw new Error(`copied entry image has a bad PNG signature: ${destPath}`);
}
const sourceSize = statSync(sourcePath).size;
if (destStat.size !== sourceSize) {
  throw new Error(
    `copied entry image is incomplete: ${destPath} is ${destStat.size} bytes, expected ${sourceSize} bytes`,
  );
}

const bytesWritten = destStat.size;
console.log(`Wrote ${destPath} (${bytesWritten} bytes)`);
