import { join } from "node:path";
import type { FileSystemPort } from "../../infrastructure/filesystem/FileSystemPort.js";

/**
 * PRODUCT/ROADMAP.md item 23: an Installation has no way to ask its own
 * accumulated Product-layer context a question. `items 18-22` bound what a
 * session reads once it already knows which citation to open (the Decision
 * Index, targeted reads, archive splits) — they do not help a reader find
 * the right citation in the first place. This command is that missing half,
 * kept inside ENGINEERING/ARCHITECTURE.md's Hard Rules and DECISION-013:
 * filesystem-only, no network, no backend, no new dependency.
 *
 * v1 is deliberately minimal: plain keyword scoring, no embeddings, no
 * ranking configuration. It is meant to point a reader (human or AI) at the
 * right `path:startLine-endLine` to open with a real Read — the same
 * "targeted read" discipline `.kenovis/AI/SYSTEM.md` already requires of a
 * decision body or an archive entry — not to replace that read.
 */

const DEFAULT_LIMIT = 15;
const MAX_EXCERPT_LENGTH = 160;
const PRODUCT_LAYER_ROOT = "company-os";
const FRAMEWORK_LAYER_ROOT = ".kenovis/AI";

export interface ContextOptions {
  targetDir: string;
  query: string;
  /** Also search the read-only Framework-layer mirror, not just the Product layer. */
  includeFramework?: boolean;
  /** Maximum number of ranked matches to return. */
  limit?: number;
}

export interface ContextMatch {
  /** Posix-relative to targetDir, e.g. "company-os/PRODUCT/ROADMAP.md". */
  path: string;
  /** 1-indexed, inclusive. */
  startLine: number;
  /** 1-indexed, inclusive. */
  endLine: number;
  excerpt: string;
  score: number;
}

export interface ContextResult {
  matches: ContextMatch[];
  /** Which of the candidate roots actually existed under targetDir and were searched. */
  searchedRoots: string[];
}

interface Chunk {
  startLine: number;
  endLine: number;
  text: string;
}

const TABLE_ROW_PATTERN = /^\s*\|.*\|\s*$/;

/**
 * Splits a markdown document into citable ranges: one chunk per paragraph
 * (consecutive non-blank lines), except a findings-queue table row (this
 * repository's own `| OF-NN | ... |` shape), which is always its own
 * single-line chunk regardless of blank lines around it — otherwise a whole
 * table with no blank lines between rows would collapse into one giant,
 * useless match.
 */
function chunkMarkdown(contents: string): Chunk[] {
  const lines = contents.split("\n");
  const chunks: Chunk[] = [];
  let start = -1;
  let end = -1;

  const flushParagraph = () => {
    if (start === -1) return;
    chunks.push({
      startLine: start + 1,
      endLine: end + 1,
      text: lines.slice(start, end + 1).join("\n"),
    });
    start = -1;
    end = -1;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (TABLE_ROW_PATTERN.test(line)) {
      flushParagraph();
      chunks.push({ startLine: i + 1, endLine: i + 1, text: line });
      continue;
    }
    if (line.trim() === "") {
      flushParagraph();
      continue;
    }
    if (start === -1) start = i;
    end = i;
  }
  flushParagraph();

  return chunks;
}

function tokenize(text: string): string[] {
  return text.toLowerCase().match(/[a-z0-9]+/g) ?? [];
}

/** Plain term-frequency scoring: how many query-token occurrences the chunk contains. */
function scoreChunk(queryTokens: string[], chunkTokens: string[]): number {
  if (chunkTokens.length === 0) return 0;
  const counts = new Map<string, number>();
  for (const token of chunkTokens) {
    counts.set(token, (counts.get(token) ?? 0) + 1);
  }
  let score = 0;
  for (const queryToken of queryTokens) {
    score += counts.get(queryToken) ?? 0;
  }
  return score;
}

function excerptOf(text: string): string {
  const collapsed = text.replace(/\s+/g, " ").trim();
  return collapsed.length > MAX_EXCERPT_LENGTH
    ? `${collapsed.slice(0, MAX_EXCERPT_LENGTH - 1)}…`
    : collapsed;
}

/**
 * Filesystem-only keyword search over an Installation's own Product layer
 * (and, opt-in, its Framework-layer mirror). Returns ranked citable ranges;
 * never file contents beyond a short excerpt — the caller reads the range
 * itself, the same targeted-read discipline the rest of the framework uses.
 */
export async function runContext(
  fs: FileSystemPort,
  options: ContextOptions,
): Promise<ContextResult> {
  const queryTokens = tokenize(options.query);
  const limit = options.limit ?? DEFAULT_LIMIT;

  const candidateRoots = [PRODUCT_LAYER_ROOT];
  if (options.includeFramework) candidateRoots.push(FRAMEWORK_LAYER_ROOT);

  const searchedRoots: string[] = [];
  const matches: ContextMatch[] = [];

  for (const root of candidateRoots) {
    const rootPath = join(options.targetDir, ...root.split("/"));
    // No fs.exists check on the directory itself: a FileSystemPort only
    // models files, not directory presence (InMemoryFileSystem's exists()
    // is an exact-key file lookup), so an empty walkFiles result already
    // means "nothing to search here" whether the directory is absent or
    // genuinely empty — the two collapse to the same outcome either way.
    const relativeFiles = (await fs.walkFiles(rootPath)).filter((p) => p.endsWith(".md"));
    if (relativeFiles.length === 0) continue;
    searchedRoots.push(root);

    for (const relativeFile of relativeFiles) {
      const contents = await fs.readFile(join(rootPath, ...relativeFile.split("/")));
      const displayPath = `${root}/${relativeFile}`;

      for (const chunk of chunkMarkdown(contents)) {
        const score = scoreChunk(queryTokens, tokenize(chunk.text));
        if (score <= 0) continue;
        matches.push({
          path: displayPath,
          startLine: chunk.startLine,
          endLine: chunk.endLine,
          excerpt: excerptOf(chunk.text),
          score,
        });
      }
    }
  }

  matches.sort(
    (a, b) => b.score - a.score || a.path.localeCompare(b.path) || a.startLine - b.startLine,
  );

  return { matches: matches.slice(0, limit), searchedRoots };
}
