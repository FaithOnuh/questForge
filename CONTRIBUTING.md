# Contributing to QuestForge

Thank you for your interest in contributing! This document outlines the process for contributing to QuestForge.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/<your-username>/questforge.git`
3. Follow the [Getting Started](./README.md#getting-started) guide to set up your environment
4. Create a feature branch: `git checkout -b feat/your-feature`

## Development Workflow

### JavaScript / TypeScript

```bash
pnpm install
pnpm dev          # start all apps
pnpm test         # run all tests
pnpm lint         # lint all packages
pnpm typecheck    # type-check all packages
```

### Rust / Soroban

```bash
cd contracts/quest-forge
cargo test
cargo build --release
```

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Use |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `refactor:` | Code change without feature/fix |
| `test:` | Adding or updating tests |
| `chore:` | Maintenance, deps, tooling |

## Pull Request Guidelines

- Keep PRs focused — one feature or fix per PR
- Write or update tests for your changes
- Ensure CI passes before requesting review
- Fill out the PR template completely

## Code Style

- TypeScript: Prettier + ESLint (enforced by CI)
- Rust: `rustfmt` (enforced by CI)

## Security

Please **do not** open public issues for security vulnerabilities. Report them privately via [GitHub Security Advisories](https://github.com/your-org/questforge/security/advisories/new).

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
