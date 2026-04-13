import { SorobanRpc, Contract, Networks, TransactionBuilder, BASE_FEE } from '@stellar/stellar-sdk';

const RPC_URL = process.env.NEXT_PUBLIC_SOROBAN_RPC_URL ?? 'https://soroban-testnet.stellar.org';
const CONTRACT_ID = process.env.NEXT_PUBLIC_CONTRACT_ID ?? '';
const NETWORK = process.env.NEXT_PUBLIC_STELLAR_NETWORK ?? 'testnet';

export function getSorobanServer() {
  return new SorobanRpc.Server(RPC_URL);
}

export function getNetworkPassphrase() {
  return NETWORK === 'mainnet' ? Networks.PUBLIC : Networks.TESTNET;
}

export function getContract() {
  return new Contract(CONTRACT_ID);
}
