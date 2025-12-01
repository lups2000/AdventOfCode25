import { readFile } from "fs/promises";
import path from "path";

export async function loadInput(day: number): Promise<string> {
  const name = `day${String(day).padStart(2, "0")}.txt`;
  const p = path.resolve(process.cwd(), "inputs", name);
  try {
    return (await readFile(p, "utf8")).trimEnd();
  } catch (err) {
    throw new Error(`Could not read input ${p}: ${(err as Error).message}`);
  }
}

export function timeIt<T>(fn: () => T): { result: T; ms: number } {
  const start = process.hrtime.bigint();
  const result = fn();
  const end = process.hrtime.bigint();
  const ms = Number((end - start) / BigInt(1_000_000));
  return { result, ms };
}
