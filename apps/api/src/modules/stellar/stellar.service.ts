import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SorobanRpc,
  Contract,
  Networks,
  Keypair,
  TransactionBuilder,
  BASE_FEE,
  nativeToScVal,
  Address,
} from '@stellar/stellar-sdk';

@Injectable()
export class StellarService {
  private readonly logger = new Logger(StellarService.name);
  private readonly server: SorobanRpc.Server;
  private readonly contract: Contract;
  private readonly keypair: Keypair;
  private readonly networkPassphrase: string;

  constructor(private readonly config: ConfigService) {
    const rpcUrl = config.getOrThrow<string>('SOROBAN_RPC_URL');
    const contractId = config.getOrThrow<string>('CONTRACT_ID');
    const secretKey = config.getOrThrow<string>('SOROBAN_SECRET_KEY');
    const network = config.get<string>('STELLAR_NETWORK', 'testnet');

    this.server = new SorobanRpc.Server(rpcUrl);
    this.contract = new Contract(contractId);
    this.keypair = Keypair.fromSecret(secretKey);
    this.networkPassphrase = network === 'mainnet' ? Networks.PUBLIC : Networks.TESTNET;
  }

  private async sendTx(method: string, args: Parameters<typeof nativeToScVal>[0][]) {
    const account = await this.server.getAccount(this.keypair.publicKey());
    const tx = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: this.networkPassphrase,
    })
      .addOperation(this.contract.call(method, ...args.map((a) => nativeToScVal(a))))
      .setTimeout(30)
      .build();

    const prepared = await this.server.prepareTransaction(tx);
    prepared.sign(this.keypair);
    const result = await this.server.sendTransaction(prepared);
    this.logger.log(`${method} tx: ${result.hash}`);
    return result.hash;
  }

  async registerQuest(id: string, rewardAsset: string, amount: number) {
    return this.sendTx('register_quest', [id, rewardAsset, amount]);
  }

  async submitProof(questId: string, proofRef: string) {
    return this.sendTx('submit_proof', [questId, proofRef]);
  }

  async approve(questId: string, address: string) {
    return this.sendTx('approve', [questId, address]);
  }

  async claimReward(questId: string) {
    return this.sendTx('claim_reward', [questId]);
  }
}
