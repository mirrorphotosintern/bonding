# Bonding

Private implementation repository for a globally oriented family activity app.

The consumer name is not final. **Bonding** is the internal codename, and **Handful** appears in early planning documents as a provisional working name.

## Status

The repository currently contains the implementation-ready product, content, research, design, and Cloudflare architecture specifications. Application scaffolding is the next step.

Start with the [documentation index](docs/README.md).

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
- Do not select or publish a consumer name until collision and trademark checks are complete.
