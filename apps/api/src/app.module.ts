import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuestsModule } from './modules/quests/quests.module';
import { UsersModule } from './modules/users/users.module';
import { PayoutsModule } from './modules/payouts/payouts.module';
import { WebhooksModule } from './modules/webhooks/webhooks.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    QuestsModule,
    UsersModule,
    PayoutsModule,
    WebhooksModule,
  ],
})
export class AppModule {}
