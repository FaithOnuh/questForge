import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClaimRewardDto {
  @ApiProperty({ description: 'Quest ID to claim reward for' })
  @IsString()
  questId: string;

  @ApiProperty({ description: 'Stellar address of the claimant' })
  @IsString()
  address: string;
}
