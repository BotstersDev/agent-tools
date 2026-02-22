import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..');

describe('CLI entry points', () => {
  it('agent-http shows usage with --help', () => {
    try {
      execFileSync('node', [join(distDir, 'src/cli/agent-http.js'), '--help'], {
        encoding: 'utf-8',
        env: { ...process.env, SEKS_BROKER_URL: 'http://fake:1', SEKS_BROKER_TOKEN: 'x' },
      });
      assert.fail('should have exited');
    } catch (err: unknown) {
      const e = err as { stderr?: string; status?: number };
      assert.ok(e.stderr?.includes('Usage: agent-http'));
    }
  });

  it('agent-git shows usage with --help', () => {
    try {
      execFileSync('node', [join(distDir, 'src/cli/agent-git.js'), '--help'], {
        encoding: 'utf-8',
        env: { ...process.env, SEKS_BROKER_URL: 'http://fake:1', SEKS_BROKER_TOKEN: 'x' },
      });
      assert.fail('should have exited');
    } catch (err: unknown) {
      const e = err as { stderr?: string };
      assert.ok(e.stderr?.includes('Usage: agent-git'));
    }
  });

  it('listagent shows usage with --help', () => {
    try {
      execFileSync('node', [join(distDir, 'src/cli/listagent.js'), '--help'], {
        encoding: 'utf-8',
        env: { ...process.env, SEKS_BROKER_URL: 'http://fake:1', SEKS_BROKER_TOKEN: 'x' },
      });
      assert.fail('should have exited');
    } catch (err: unknown) {
      const e = err as { stderr?: string };
      assert.ok(e.stderr?.includes('Usage: listagent'));
    }
  });
});
