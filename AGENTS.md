# Laptop Club agent guide

This file captures site-specific rules for AI agents working in this repository.

## Project summary

- Site: Laptop Club
- Foundation package version: 0.1.30
- Production URL: https://laptopclub.net
- Sanity project/dataset: zbmgwp5w / production

## Content voice

- Write in clear, practical, plain English.
- Prefer direct copy that explains what Laptop Club does and why it helps.
- Capture more specific brand voice decisions here during provisioning.

## Boundaries

- Keep site-specific content, styling and composition in this repository.
- Put reusable schemas, blocks, components and framework fixes in `laptopclub/foundation`.
- Do not edit code inside installed Foundation packages.
- Add site-specific schemas in `sanity/schema-types.ts`.
- Add site-specific renderers in `lib/blocks.ts` or client components.
- Upgrade all `@laptopclub/foundation-*` packages together.
- Do not mutate production Sanity content unless explicitly requested.
- Never commit `.env` files, package tokens, Sanity tokens or webhook secrets.
- Do not hand-edit generated Sanity type files.
- Do not add dependencies without explicit approval.

## Required checks

```bash
pnpm check
pnpm build
```

For schema or GROQ query changes:

```bash
pnpm sanity:schema
pnpm sanity:typegen
```

## Definition of done

- Site-specific changes stay in this repository.
- Reusable framework changes are made upstream in Foundation.
- Package installation, checks and production build pass.
- Relevant routes are smoke-tested after deploy.
- No secrets or temporary generated files are committed.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
