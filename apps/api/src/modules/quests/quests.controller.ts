import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { QuestsService } from './quests.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { SubmitProofDto } from './dto/submit-proof.dto';
import { ApproveSubmissionDto } from './dto/approve-submission.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('quests')
@Controller('quests')
export class QuestsController {
  constructor(private readonly questsService: QuestsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new quest' })
  create(@Body() dto: CreateQuestDto) {
    return this.questsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all quests' })
  findAll() {
    return this.questsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a quest by ID' })
  findOne(@Param('id') id: string) {
    return this.questsService.findOne(id);
  }

  @Post(':id/submit')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit proof for a quest' })
  submit(@Param('id') id: string, @Body() dto: SubmitProofDto) {
    return this.questsService.submitProof(id, dto);
  }

  @Post(':id/approve')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Approve a submission' })
  approve(@Param('id') id: string, @Body() dto: ApproveSubmissionDto) {
    return this.questsService.approve(id, dto);
  }
}
