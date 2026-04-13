import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitProofDto {
  @ApiProperty({ description: 'Stellar address of the submitter' })
  @IsString()
  address: string;

  @ApiProperty({ description: 'Reference to proof (URL, hash, or attestation)' })
  @IsString()
  proofRef: string;
}
