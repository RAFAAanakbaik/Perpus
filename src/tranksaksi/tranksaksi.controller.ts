import { Controller, Get, Post, Body } from '@nestjs/common';
import { TranksaksiService } from './tranksaksi.service';
import { BalikDto } from './dto/balik.dto';
import { PinjamDto } from './dto/pinjam.dto';
import { Roles } from 'src/auth/decorators/role.decorators';

@Controller('tranksaksi')
export class TranksaksiController {
  constructor(private readonly tranksaksiService: TranksaksiService) {}

  @Roles('MEMBER')
  @Post('pinjam')
  pinjam(@Body() pinjamDto: PinjamDto) {
    return this.tranksaksiService.pinjam(pinjamDto);
  }

  @Roles('MEMBER')
  @Post('balik')
  balik(@Body() balikDto: BalikDto) {
    return this.tranksaksiService.balik(balikDto);
  }

  @Roles('PETUGAS')
  @Get('findall')
  findAll() {
    return this.tranksaksiService.findAll();
  }
}
