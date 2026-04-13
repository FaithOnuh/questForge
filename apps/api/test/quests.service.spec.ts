import { Test, TestingModule } from '@nestjs/testing';
import { QuestsService } from '../../src/modules/quests/quests.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { StellarService } from '../../src/modules/stellar/stellar.service';

describe('QuestsService', () => {
  let service: QuestsService;

  const mockPrisma = {
    quest: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    submission: {
      create: jest.fn(),
      updateMany: jest.fn(),
    },
  };

  const mockStellar = {
    registerQuest: jest.fn().mockResolvedValue('tx-hash'),
    submitProof: jest.fn().mockResolvedValue('tx-hash'),
    approve: jest.fn().mockResolvedValue('tx-hash'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestsService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: StellarService, useValue: mockStellar },
      ],
    }).compile();

    service = module.get<QuestsService>(QuestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates a quest and registers it on-chain', async () => {
    const dto = {
      title: 'Test Quest',
      description: 'desc',
      rewardAsset: 'XLM',
      rewardAmount: 10,
    };
    mockPrisma.quest.create.mockResolvedValue({ id: 'q-1', ...dto });

    const result = await service.create(dto);

    expect(result.id).toBe('q-1');
    expect(mockStellar.registerQuest).toHaveBeenCalledWith('q-1', 'XLM', 10);
  });
});
