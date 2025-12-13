# Frayme — Prompt Testing Bench

Small Electron app to compare prompts and models side-by-side.

Requirements
- Node.js and npm
- An OpenAI API key available in the `OPENAI_API_KEY` environment variable

Install

```bash
npm install
```

Run

On Linux/macOS/Bash:

```bash
export OPENAI_API_KEY="sk-..."
npm start
```

What is included
- `main.js` — Electron main process, IPC handlers
- `preload.js` — exposes `window.api.complete` for safe renderer access
- `api/client.js` — small OpenAI client (uses `axios`) returning structured responses
- `index.html`, `renderer.js`, `styles.css` — UI and wiring

Notes
- Keep your API key private. This small app expects the key in an environment variable. For packaging, move secret handling to a secure store.
- The app uses the Chat Completions endpoint and normalizes responses to a structured format.
