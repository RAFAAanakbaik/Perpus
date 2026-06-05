import { Module } from '@nestjs/common';
import { WalasService } from './walas.service';
import { WalasController } from './walas.controller';

@Module({
  controllers: [WalasController],
  providers: [WalasService],
})
export class WalasModule {}
