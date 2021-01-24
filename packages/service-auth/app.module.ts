import { Module } from '@nestjs/common';
import { AuthModule } from '@my-project/service-auth/application/modules/auth.module';
import { CommonModule } from '@my-project/service-auth/application/modules/common.module';

@Module({
  imports: [CommonModule, AuthModule]
})
export class AppModule {}
