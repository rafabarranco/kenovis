import { runInit, type InitOptions, type InitResult } from "./init.js";
import type { FileSystemPort } from "../../infrastructure/filesystem/FileSystemPort.js";

export type AddOptions = Omit<InitOptions, "invokedAs">;
export type AddResult = InitResult;

/**
 * `kenovis add`'s counterpart to `kenovis init` — same install engine
 * (`runInit`), wired to assume brownfield instead of greenfield. See
 * DECISION-018.
 */
export async function runAdd(fs: FileSystemPort, options: AddOptions): Promise<AddResult> {
  return runInit(fs, { ...options, invokedAs: "add" });
}
