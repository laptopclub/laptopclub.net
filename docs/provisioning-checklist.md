# Laptop Club provisioning checklist

Generated: 2026-09-30T10:38:47.444Z

## Site

- Site name: Laptop Club
- Slug: laptopclub-net
- Repository: laptopclub/laptopclub.net
- Production URL: https://laptopclub.net
- Foundation package version: 0.1.30
- Sanity project/dataset: zbmgwp5w / production

## 1. Repository

- [ ] Create repository `laptopclub/laptopclub.net`.
- [x] Copy the Foundation consumer site template.
- [ ] Commit `README.md`, `AGENTS.md`, `.gitignore`, `.vercelignore`, `.npmrc`, CI and Dependabot config.
- [x] Confirm the site is not workspace-linked to Foundation.

## 2. Package access

- [ ] Configure GitHub Packages access for local development.
- [ ] Add package-read token to GitHub Actions secrets.
- [ ] Add package-read token to Vercel environment variables.
- [x] Run `pnpm install --frozen-lockfile` from a clean checkout.

## 3. Sanity

- [x] Create or select Sanity project and dataset.
- [x] Configure public Sanity env vars.
- [ ] Add CORS origins for local, preview and production.
- [ ] Create viewer token for Draft Mode and visual editing.
- [ ] Decide whether hosted Studio is required.

## 4. Vercel

- [ ] Create Vercel project.
- [ ] Set Node.js 24.x.
- [ ] Add public env vars and secrets.
- [ ] Configure install command if private package auth requires it.
- [ ] Confirm preview and production builds pass.

## 5. Revalidation

- [ ] Generate `SANITY_REVALIDATE_SECRET`.
- [ ] Store revalidation secret in Vercel and local ignored env files.
- [ ] Create Sanity webhook targeting `/api/revalidate`.
- [ ] Verify signed requests return `200` and unsigned requests return `401`.

## 6. Content, voice and branding

- [x] Capture content voice in `AGENTS.md`.
- [ ] Configure site settings, navigation and footer links.
- [x] Define semantic brand, surface and ink tokens.
- [ ] Keep client-specific styling and composition in the client repository.

## 7. Domains

- [ ] Add production and preview domains in Vercel.
- [ ] Configure DNS.
- [ ] Verify SSL and redirects.

## 8. Validation

- [x] Run `pnpm validate:site ../laptopclub.net` from Foundation.
- [ ] Run `pnpm validate:site ../laptopclub-net --run-checks` before launch.
- [ ] Smoke-test production routes.
- [ ] Add the site to `docs/consumer-sites.json`.
- [ ] Run `pnpm validate:fleet`.
- [ ] Run `pnpm check:drift`.
