import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BalikDto } from './dto/balik.dto';
import { PinjamDto } from './dto/pinjam.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TranksaksiService {
  constructor(private readonly prisma: PrismaService) {}

  async pinjam(pinjamDto: PinjamDto) {
    try {
      const pinjam = await this.prisma.peminjaman.create({
        data: { ...pinjamDto },
      });

      if (!pinjam) {
        throw new HttpException(
          'failed borrowing book',
          HttpStatus.BAD_REQUEST,
        );
      }

      return pinjam;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.log(error);
    }
  }

  async balik(balikDto: BalikDto) {
    try {
      const balik = await this.prisma.pengembalian.create({
        data: { ...balikDto },
      });

      if (!balik) {
        throw new HttpException(
          'failed returning book',
          HttpStatus.BAD_REQUEST,
        );
      }

      const updtBalik = await this.prisma.peminjaman.update({
        where: { id: balik.id_peminjaman },
        data: { tgl_kembali: balik.tgl_kembali },
      });

      if (!updtBalik) {
        throw new HttpException(
          'failed returning book',
          HttpStatus.BAD_REQUEST,
        );
      }

      return updtBalik;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.log(error);
    }
  }
}
