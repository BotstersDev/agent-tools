# @botstersdev/agent-tools

CLI tools for making authenticated requests through the SEKS broker. Secrets never touch the shell — they're resolved at runtime from the broker.

## Install

```bash
npm install -g @botstersdev/agent-tools
```

## Configuration

Config is resolved in order:

1. **Env vars:** `SEKS_BROKER_URL` + `SEKS_BROKER_TOKEN`
2. **`~/.openclaw/openclaw.json`** → `agent.broker.primary` / `agent.broker.secondary`
3. **`~/.openclaw/openclaw.json`** → `agent.broker.url` / `agent.broker.token` (legacy)

## Tools

### `agent-http` — HTTP client with credential injection

```bash
# GET with bearer token from broker
agent-http get https://api.github.com/user --auth-bearer github/pat

# POST with data
agent-http post https://api.example.com/data \
  --auth-bearer myservice/api_key \
  --data '{"key": "value"}' \
  --header 'Content-Type: application/json'

# Basic auth
agent-http get https://api.example.com/secure \
  --auth-basic-user myservice/username \
  --auth-basic-pass myservice/password

# Header with secret value
agent-http get https://api.example.com/data \
  --header-secret 'X-API-Key:myservice/api_key'

# Capability-based (broker resolves credentials)
agent-http get https://api.github.com/repos \
  --capability github/read
```

Response body goes to stdout, status/headers to stderr.

### `agent-git` — git wrapper with credential injection

```bash
# Clone with token injection
agent-git clone https://github.com/org/repo.git --auth-token github/pat

# Push with token
agent-git push --auth-token github/pat

# Pull with passthrough args
agent-git pull origin main --auth-token github/pat
```

Tokens are injected as `x-access-token` in HTTPS URLs (GitHub PAT style).

### `listagent` — list available secrets/capabilities

```bash
# List everything
listagent

# List capabilities
listagent --capabilities

# Filter by provider
listagent --provider github

# JSON output
listagent --json
listagent --capabilities --json
```

## Development

```bash
pnpm install
pnpm build
pnpm test
```
