import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PayoutsService } from './payouts.service';
import { ClaimRewardDto } from './dto/claim-reward.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('payouts')
@Controller('payouts')
export class PayoutsController {
  constructor(private readonly payoutsService: PayoutsService) {}

  @Post('claim')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Claim reward for an approved quest submission' })
  claim(@Body() dto: ClaimRewardDto) {
    return this.payoutsService.claim(dto);
  }
}
