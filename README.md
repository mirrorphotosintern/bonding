# Bonding

Private implementation repository for **Try This**, a globally oriented family
activity app at **trythis.fun**. Bonding remains the internal repository codename.

## Status

The repository contains the Expo application plus product, content, research, design, and Cloudflare architecture specifications.

Start with the [documentation index](docs/README.md).

## Run the native app

```bash
npm install
npm run ios
```

The default iOS command opens the app in Expo Go on the iOS simulator. Use `npm run ios:native` only after adding a capability that requires a custom native build.

## Run the website

The production marketing site is a standalone Next.js application in `web/`.

```bash
cd web
npm install
npm run dev
```

`npm run check` performs the same type and production-build checks used by CI.
Production deploys target the `trythis-fun` Cloudflare Pages project.

### Website CI/CD

- Pull requests and pushes to `main` run the production build.
- Changes under `web/` deploy automatically from `main`.
- GitHub Actions requires the `CLOUDFLARE_API_TOKEN` repository secret with
  Cloudflare Pages write access.
- `CLOUDFLARE_ACCOUNT_ID` is stored as a non-secret repository variable.

## Product boundary

This is a standalone global product. It is not a Shaale extension and has no Kannada, Indian, diaspora, or language-learning positioning.

## Repository layout

```text
Bonding/
├── app/        Expo Router native application
├── src/        Native components, data, services, and theme
├── web/        Next.js marketing site for trythis.fun
├── docs/       Product, research, content, design, and technical specifications
└── .github/    Build verification and Cloudflare deployment workflows
```

## Implementation constraints

- Keep all product implementation inside this repository.
- Use the Cloudflare-first architecture described in `docs/TECHNICAL_SPEC.md`.
- Treat activities as reviewed editorial content, not raw social-media imports.
- Protect children's and family data by default.
- Use **Try This** as the consumer-facing name and **trythis.fun** as the public domain.
