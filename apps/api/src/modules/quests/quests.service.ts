import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { StellarService } from '../stellar/stellar.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { SubmitProofDto } from './dto/submit-proof.dto';
import { ApproveSubmissionDto } from './dto/approve-submission.dto';

@Injectable()
export class QuestsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stellar: StellarService,
  ) {}

  async create(dto: CreateQuestDto) {
    const quest = await this.prisma.quest.create({ data: dto });
    await this.stellar.registerQuest(quest.id, quest.rewardAsset, quest.rewardAmount);
    return quest;
  }

  findAll() {
    return this.prisma.quest.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const quest = await this.prisma.quest.findUnique({ where: { id }, include: { submissions: true } });
    if (!quest) throw new NotFoundException(`Quest ${id} not found`);
    return quest;
  }

  async submitProof(id: string, dto: SubmitProofDto) {
    await this.findOne(id);
    const submission = await this.prisma.submission.create({
      data: { questId: id, address: dto.address, proofRef: dto.proofRef },
    });
    await this.stellar.submitProof(id, dto.proofRef);
    return submission;
  }

  async approve(id: string, dto: ApproveSubmissionDto) {
    await this.findOne(id);
    const submission = await this.prisma.submission.updateMany({
      where: { questId: id, address: dto.address, status: 'PENDING' },
      data: { status: 'APPROVED' },
    });
    await this.stellar.approve(id, dto.address);
    return submission;
  }
}
