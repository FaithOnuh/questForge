# Changelog

All notable changes to QuestForge are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project scaffold: Next.js frontend, NestJS backend, Soroban smart contract
- Quest CRUD API with Prisma + PostgreSQL
- On-chain quest registration, proof submission, approval, and reward claiming
- JWT authentication with Passport
- Swagger API documentation at `/docs`
- GitHub Actions CI (lint, typecheck, test, contract build)
- Deploy workflow for testnet/mainnet
- Docker Compose for local Postgres
