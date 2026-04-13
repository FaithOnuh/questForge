#!/usr/bin/env bash
# scripts/deploy-contract.sh
# Deploy the QuestForge Soroban contract to testnet or mainnet.
#
# Usage:
#   STELLAR_NETWORK=testnet SOROBAN_SECRET_KEY=<key> ./scripts/deploy-contract.sh

set -euo pipefail

NETWORK="${STELLAR_NETWORK:-testnet}"
RPC_URL="${SOROBAN_RPC_URL:-https://soroban-testnet.stellar.org}"
WASM="contracts/quest-forge/target/wasm32-unknown-unknown/release/quest_forge.wasm"

if [[ -z "${SOROBAN_SECRET_KEY:-}" ]]; then
  echo "Error: SOROBAN_SECRET_KEY is not set." >&2
  exit 1
fi

echo "Building contract..."
(cd contracts/quest-forge && cargo build --release --target wasm32-unknown-unknown)

echo "Deploying to $NETWORK..."
CONTRACT_ID=$(soroban contract deploy \
  --wasm "$WASM" \
  --network "$NETWORK" \
  --secret-key "$SOROBAN_SECRET_KEY" \
  --rpc-url "$RPC_URL")

echo ""
echo "✅ Contract deployed!"
echo "CONTRACT_ID=$CONTRACT_ID"
echo ""
echo "Add this to your .env files:"
echo "  CONTRACT_ID=$CONTRACT_ID"
