import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ItemsModule, TypeOrmModule.forRoot(), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
