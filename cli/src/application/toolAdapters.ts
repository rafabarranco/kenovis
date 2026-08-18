import { join } from "node:path";
import {
  isKenovisManagedCommandWrapper,
  TOOL_ADAPTER_COMMANDS_DIRNAME,
  TOOL_ADAPTER_MANIFEST_FILENAME,
  TOOL_ADAPTERS_DIRNAME,
} from "../domain/installation.js";
import type { FileSystemPort } from "../infrastructure/filesystem/FileSystemPort.js";

interface ToolAdapterManifest {
  id: string;
  commandsDir?: string;
}

export interface InstallToolAdaptersOptions {
  /** The `--source` bundle currently being installed/synced from. */
  frameworkSourceDir: string;
  /** Repository the Installation lives in. */
  targetDir: string;
  /** Tool ids selected via `--tools` (or the persisted `.tools` marker). */
  tools: readonly string[];
}

export interface InstallToolAdaptersResult {
  /** Tool ids that were found in the bundle and applied. */
  installed: string[];
  /** Requested ids this Framework Release's bundle ships no adapter for. */
  unknown: string[];
  /**
   * Command-wrapper paths (relative to targetDir) left untouched because a
   * file already existed there and did not look Kenovis-managed — most
   * likely the customer's own same-named command, predating this Installation
   * or written by hand. Never silently overwritten (DECISION-046).
   */
  skipped: string[];
}

/**
 * Applies each selected tool's adapter — described entirely as data under
 * `${frameworkSourceDir}/tool-adapters/<id>/` (DECISION-046) — to `targetDir`.
 * Never branches on a tool's identity: the set of available adapters is
 * whatever `tool-adapters/` contains in the bundle currently being installed,
 * and each one's own `adapter.json` says where its command wrappers go.
 *
 * A `commandsDir` (e.g. `.claude/commands`) is not an exclusively
 * Kenovis-owned namespace the way `.kenovis/` is — a customer may already
 * have their own file at the same relative path. Each wrapper file is
 * therefore written individually, checked first against
 * `isKenovisManagedCommandWrapper`: a pre-existing file that doesn't carry
 * this CLI's own marker is left alone and reported in `skipped`, never
 * overwritten. A missing or Kenovis-managed file is written/refreshed.
 */
export async function installSelectedToolAdapters(
  fs: FileSystemPort,
  options: InstallToolAdaptersOptions,
): Promise<InstallToolAdaptersResult> {
  const adaptersRoot = join(options.frameworkSourceDir, TOOL_ADAPTERS_DIRNAME);
  const availableIds = new Set(await fs.listDir(adaptersRoot));

  const installed: string[] = [];
  const unknown: string[] = [];
  const skipped: string[] = [];

  for (const id of options.tools) {
    if (!availableIds.has(id)) {
      unknown.push(id);
      continue;
    }

    const adapterDir = join(adaptersRoot, id);
    const manifestPath = join(adapterDir, TOOL_ADAPTER_MANIFEST_FILENAME);
    const manifest = (await fs.exists(manifestPath))
      ? (JSON.parse(await fs.readFile(manifestPath)) as ToolAdapterManifest)
      : null;

    if (manifest?.commandsDir) {
      const sourceCommandsDir = join(adapterDir, TOOL_ADAPTER_COMMANDS_DIRNAME);
      const commandFiles = await fs.listDir(sourceCommandsDir);
      const destCommandsDir = join(options.targetDir, manifest.commandsDir);

      for (const fileName of commandFiles) {
        const sourcePath = join(sourceCommandsDir, fileName);
        const destPath = join(destCommandsDir, fileName);
        const rendered = await fs.readFile(sourcePath);

        if (await fs.exists(destPath)) {
          const existing = await fs.readFile(destPath);
          if (!isKenovisManagedCommandWrapper(existing)) {
            skipped.push(join(manifest.commandsDir, fileName));
            continue;
          }
        }

        await fs.writeFile(destPath, rendered);
      }
    }

    installed.push(id);
  }

  return { installed, unknown, skipped };
}
