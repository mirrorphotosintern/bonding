# Bonding

Private implementation repository for **Try This**, a globally oriented family
activity app at **trythis.fun**. Bonding remains the internal repository codename.

## Status

The repository contains the Expo application plus product, content, research, design, and Cloudflare architecture specifications.

Start with the [documentation index](docs/README.md).

## Run the app

```bash
npm install
npm run ios
```

The default iOS command opens the app in Expo Go on the iOS simulator. Use `npm run ios:native` only after adding a capability that requires a custom native build.

## Product boundary

This is a standalone global product. It is not a Shaale extension and has no Kannada, Indian, diaspora, or language-learning positioning.

## Repository layout

```text
Bonding/
├── docs/       Product, research, content, design, and technical specifications
├── README.md   Repository entry point
└── .gitignore  Local and generated-file exclusions
```

## Implementation constraints

- Keep all product implementation inside this repository.
- Use the Cloudflare-first architecture described in `docs/TECHNICAL_SPEC.md`.
- Treat activities as reviewed editorial content, not raw social-media imports.
- Protect children's and family data by default.
- Use **Try This** as the consumer-facing name and **trythis.fun** as the public domain.
