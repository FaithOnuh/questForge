import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { StellarService } from '../stellar/stellar.service';
import { ClaimRewardDto } from './dto/claim-reward.dto';

@Injectable()
export class PayoutsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stellar: StellarService,
  ) {}

  async claim(dto: ClaimRewardDto) {
    const submission = await this.prisma.submission.findFirst({
      where: { questId: dto.questId, address: dto.address, status: 'APPROVED' },
    });

    if (!submission) {
      throw new BadRequestException('No approved submission found for this quest and address');
    }

    const txHash = await this.stellar.claimReward(dto.questId);

    return { success: true, txHash };
  }
}
