// Runs last in `npm run build`. Writes a .br and a .gz next to every text file in dist, so Caddy
// serves them as-is (file_server precompressed) instead of compressing on every request, and
// gets Brotli, which Caddy can't produce on the fly.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { brotliCompressSync, gzipSync, constants } from 'node:zlib'

const DIST = new URL('../dist/', import.meta.url).pathname
const TEXT = /\.(html|js|css|svg|xml|txt|json|webmanifest)$/

let files = 0
for (const entry of readdirSync(DIST, { recursive: true, withFileTypes: true })) {
  if (!entry.isFile() || !TEXT.test(entry.name)) continue
  const path = join(entry.parentPath, entry.name)
  const body = readFileSync(path)
  writeFileSync(`${path}.br`, brotliCompressSync(body, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } }))
  writeFileSync(`${path}.gz`, gzipSync(body, { level: 9 }))
  files++
}
if (files === 0) throw new Error('compress: no text files found in dist')
console.log(`compress: ${files} files (.br + .gz)`)
