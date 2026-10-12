// PostToolUse hook: run markdownlint on a Markdown file right after Claude edits it.
// Exit code 2 feeds the lint output back to Claude so it can fix the violations.
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const input = JSON.parse(readFileSync(0, 'utf8'));
const file = input.tool_input?.file_path;

if (!file || !file.toLowerCase().endsWith('.md') || /[\\/](node_modules|_site|vendor)[\\/]/.test(file)) {
  process.exit(0);
}

const result = spawnSync('npx', ['--no-install', 'markdownlint', file], {
  cwd: input.cwd,
  encoding: 'utf8',
  shell: true,
});

if (result.status !== 0) {
  const output = (result.stderr || result.stdout)
    .split('\n')
    .filter((line) => !line.startsWith('npm notice'))
    .join('\n');
  process.stderr.write(`markdownlint violations in ${file}:\n${output}`);
  process.exit(2);
}
