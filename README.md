# Laptop Club

Foundation-based website for Laptop Club at https://laptopclub.net.

- Framework: https://github.com/laptopclub/foundation
- Foundation package version: 0.1.30
- Production site: https://laptopclub.net
- Hosted Studio: TODO

## Setup

A GitHub token with `read:packages` access is required. Authenticate once through npm without committing the token:

```bash
npm login --scope=@laptopclub --auth-type=legacy --registry=https://npm.pkg.github.com
pnpm install
cp .env.example .env.local
pnpm dev
```

Open:

- Site: http://localhost:3334
- Embedded Studio: http://localhost:3334/studio

Sanity Presentation requires `SANITY_API_READ_TOKEN` in `.env.local`.

## Validation

```bash
pnpm check
pnpm build
```

## Foundation upgrades

Foundation packages are installed from GitHub Packages under the `@laptopclub` scope. Upgrade `@laptopclub/foundation-*` packages together, then validate with a Vercel preview before merging.

Site-specific schemas live in `sanity/schema-types.ts`. Site-specific renderers live in `lib/blocks.ts`. Reusable changes belong in `laptopclub/foundation`.
