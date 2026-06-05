import { Module } from '@nestjs/common';
import { TranksaksiService } from './tranksaksi.service';
import { TranksaksiController } from './tranksaksi.controller';

@Module({
  controllers: [TranksaksiController],
  providers: [TranksaksiService],
})
export class TranksaksiModule {}
