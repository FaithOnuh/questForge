import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':address/stats')
  @ApiOperation({ summary: 'Get user reputation and earnings' })
  getStats(@Param('address') address: string) {
    return this.usersService.getStats(address);
  }
}
