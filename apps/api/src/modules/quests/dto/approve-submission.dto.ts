import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApproveSubmissionDto {
  @ApiProperty({ description: 'Stellar address to approve' })
  @IsString()
  address: string;
}
