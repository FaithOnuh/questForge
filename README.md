# QuestForge

**A quest-based earning platform that turns work into verifiable achievements on the Stellar blockchain.**

[![CI](https://github.com/FaithOnuh/questForge/actions/workflows/ci.yml/badge.svg)](https://github.com/FaithOnuh/questForge/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Stellar](https://img.shields.io/badge/Stellar-Soroban-blue)](https://soroban.stellar.org)

---

## Overview

QuestForge is a quest-based earning platform where teams define tasks ("quests"), contributors complete them, and rewards are distributed on-chain via Stellar smart contracts (Soroban). Users level up by completing quests, building an on-chain reputation trail and unlocking higher-value opportunities.

## What It Does

- **Create & manage quests** with criteria, rewards, deadlines, and proof requirements
- **Complete & verify quests** with off-chain signals (API, GitHub webhooks, form attestations) and on-chain validation
- **Distribute rewards** programmatically to contributors via Stellar assets
- **Track reputation and progress** with XP and badges captured through contract state

## Why Stellar?

- **Payments-first chain** — fast, low-cost asset transfers ideal for frequent micro-reward payouts
- **Asset issuance & compliance-friendly** — built-in trustlines and anchors for real-world on/off-ramps
- **Soroban smart contracts** — Rust-based contracts enabling verifiable task completion, escrow, and conditional payouts

## Architecture

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│  Frontend       │      │   Backend        │      │  Stellar/       │
│  Next.js        │◄────►│   NestJS         │◄────►│  Soroban        │
│                 │      │                  │      │                 │
│ • User Dashboard│      │ • REST API       │      │ • Quest Contract│
│ • Quest Browser │      │ • Auth & RBAC    │      │ • Reputation    │
│ • Submissions   │      │ • Quest Service  │      │ • Asset/Reward  │
│ • Wallet Connect│      │ • Payout Logic   │      │                 │
└─────────────────┘      │ • Webhooks       │      └─────────────────┘
                         │ • DB (Postgres)  │
                         └──────────────────┘
```

## Repository Structure

```
questforge/
├── apps/
│   ├── web/                    # Next.js 14 frontend (App Router)
│   └── api/                    # NestJS backend
├── contracts/
│   └── quest-forge/            # Soroban/Rust smart contract
├── infra/
│   ├── docker-compose.yml
│   └── migrations/
├── scripts/
├── .github/
│   └── workflows/
├── .env.example
├── package.json                # Root workspace
└── README.md
```

## Getting Started

### Prerequisites

- Node.js ≥ 18.x and `pnpm` ≥ 8
- Rust & Cargo (stable)
- Soroban CLI
- Docker (for Postgres)

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Soroban CLI
cargo install --locked soroban-cli

# Install pnpm
npm install -g pnpm
```

### Installation

```bash
git clone https://github.com/your-org/questforge.git
cd questforge

# Install all JS dependencies
pnpm install

# Build Soroban contract
cd contracts/quest-forge && cargo build --release
```

### Environment Variables

Copy and fill in the example env files:

```bash
cp .env.example .env
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
```

### Running Locally

```bash
# 1. Start Postgres
docker compose -f infra/docker-compose.yml up -d

# 2. Run migrations
cd apps/api && pnpm prisma migrate dev

# 3. Start backend (port 3001)
pnpm --filter api dev

# 4. Start frontend (port 3000)
pnpm --filter web dev
```

## Smart Contract

### Key Functions

| Function | Description |
|---|---|
| `register_quest(id, reward_asset, amount, verifier)` | Create a new quest |
| `submit_proof(id, proof_ref)` | Submit completion proof |
| `approve(id, address)` | Approve a submission |
| `claim_reward(id)` | Claim approved reward |
| `get_user_stats(address)` | Fetch XP and badges |
| `get_quest(id)` | Fetch quest details |

### Build & Deploy

```bash
cd contracts/quest-forge

# Build
cargo build --release

# Test
cargo test

# Deploy to testnet
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/quest_forge.wasm \
  --network testnet \
  --secret-key $SOROBAN_SECRET_KEY
```

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/quests` | Create quest |
| `GET` | `/quests` | List quests |
| `GET` | `/quests/:id` | Get quest |
| `POST` | `/quests/:id/submit` | Submit proof |
| `POST` | `/quests/:id/approve` | Approve submission |
| `POST` | `/payouts/claim` | Claim reward |
| `GET` | `/users/:address/stats` | Get user reputation |

## Testing

```bash
# Frontend
pnpm --filter web test
pnpm --filter web lint

# Backend
pnpm --filter api test
pnpm --filter api test:e2e

# Contracts
cd contracts/quest-forge && cargo test
```

## Networks

| Network | Use |
|---|---|
| Local sandbox | Development iteration |
| Testnet | Integration testing (free faucet) |
| Mainnet | Production (requires audit) |

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Write tests and ensure they pass
4. Open a pull request with a clear description

### Commit Convention   

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — new features
- `fix:` — bug fixes
- `docs:` — documentation
- `chore:` — maintenance
- `refactor:` — code refactoring
- `test:` — test updates

## Security

- Do not include secrets in pull requests
- Report vulnerabilities privately via GitHub Security Advisories

## Resources

- [Stellar Developers](https://developers.stellar.org)
- [Soroban Documentation](https://soroban.stellar.org/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)

## License

[MIT](./LICENSE)

---

Questions or feedback? [Open an issue](https://github.com/your-org/questforge/issues) or reach out to the maintainers.
