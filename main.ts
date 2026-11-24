process.umask(0o022);
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One office joke, a single line of at most 200 characters.
// Fixed string on purpose: same output every run, no network, no clock,
// no randomness, nothing to configure.
const LINE =
  "Our printer has been out of toner for three weeks because everyone assumed someone else ordered it, which is also exactly how every project here gets managed.";

const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`line is ${chars} characters, must be 1-200`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("line must be a single line");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const out = join(outputDir, "entry.txt");
writeFileSync(out, LINE + "\n", "utf8");
if (readFileSync(out, "utf8") !== LINE + "\n") {
  throw new Error("written file does not match the line");
}
