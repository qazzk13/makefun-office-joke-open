process.umask(0o022);
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One office joke, a single line of at most 200 characters.
// Fixed string on purpose: same output every run, no network, no clock,
// no randomness, nothing to configure.
// First draft was the printer toner one, which was more of a sigh than a
// laugh. This version has an actual turn in it: the fish in the break room
// microwave ends up running the team.
const LINE =
  "Somebody microwaved fish in the break room again, and honestly it showed more initiative than anyone in this morning's standup, so we promoted the fish to team lead.";

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
