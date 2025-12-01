import { loadInput, timeIt } from "./utils";

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("Usage: ts-node src/run.ts <day> [part]");
    process.exit(1);
  }
  const day = Number(args[0]);
  const part = args[1] ? Number(args[1]) : 0; // 0 -> run both

  if (!Number.isInteger(day) || day < 1 || day > 25) {
    console.error("Day must be an integer 1..25");
    process.exit(1);
  }

  const modulePath = `./days/day${String(day).padStart(2, "0")}`;
  let dayModule;
  try {
    dayModule = await import(modulePath);
  } catch (err) {
    console.error("Could not load module", modulePath, err);
    process.exit(1);
  }

  const input = await loadInput(day);

  const runPart = (p: 1 | 2) => {
    if (typeof dayModule[`part${p}`] !== "function") {
      console.log(`part${p} not implemented for day ${day}`);
      return;
    }
    const { result, ms } = timeIt(() => dayModule[`part${p}`](input));
    console.log(`Day ${day} — Part ${p}: ${result}  (${ms} ms)`);
  };

  if (part === 0) {
    runPart(1);
    runPart(2);
  } else if (part === 1 || part === 2) {
    runPart(part);
  } else {
    console.error("Part must be 1 or 2");
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
