import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats(address: string) {
    const user = await this.prisma.user.upsert({
      where: { address },
      update: {},
      create: { address },
    });

    const questsCompleted = await this.prisma.submission.count({
      where: { address, status: 'APPROVED' },
    });

    const approvedSubmissions = await this.prisma.submission.findMany({
      where: { address, status: 'APPROVED' },
      include: { quest: true },
    });

    const totalEarned = approvedSubmissions.reduce((sum, s) => sum + s.quest.rewardAmount, 0);

    return {
      address: user.address,
      xp: user.xp,
      badges: user.badges,
      questsCompleted,
      totalEarned,
    };
  }
}
