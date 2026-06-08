import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BalikDto } from './dto/balik.dto';
import { PinjamDto } from './dto/pinjam.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TranksaksiService {
  constructor(private readonly prisma: PrismaService) {}

  async pinjam(pinjamDto: PinjamDto) {
    try {
      const [student, book] = await Promise.all([
        this.prisma.student.findUnique({ where: { id: pinjamDto.id_student } }),
        this.prisma.book.findUnique({ where: { id: pinjamDto.id_book } }),
      ]);

      if (!student)
        throw new HttpException(
          'Student tidak ditemukan',
          HttpStatus.NOT_FOUND,
        );
      if (!book)
        throw new HttpException('Buku tidak ditemukan', HttpStatus.NOT_FOUND);

      // Cek Stok
      if (book.stok <= 0) {
        throw new HttpException(
          `Maaf stok buku "${book.title}" sedang habis / sudah digunakan semua`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const result = await this.prisma.$transaction(async (tx) => {
        const peminjamanAktif = await tx.peminjaman.findFirst({
          where: {
            id_book: pinjamDto.id_book,
            tgl_kembali: null,
          },
        });

        if (peminjamanAktif) {
          throw new HttpException(
            `Buku "${book.title}" sedang dipinjam`,
            HttpStatus.BAD_REQUEST,
          );
        }

        // Kurangi stok secara atomik supaya buku yang sudah dipinjam tidak bisa dipinjam lagi.
        const updateBook = await tx.book.updateMany({
          where: {
            id: pinjamDto.id_book,
            stok: { gt: 0 },
          },
          data: { stok: { decrement: 1 } },
        });

        if (updateBook.count === 0) {
          throw new HttpException(
            `Maaf stok buku "${book.title}" sedang habis / sudah digunakan semua`,
            HttpStatus.BAD_REQUEST,
          );
        }

        const newPinjam = await tx.peminjaman.create({
          data: pinjamDto,
          include: { book: true, student: true },
        });

        return newPinjam;
      });

      return result;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      console.log(error);
      throw new HttpException(
        'Terjadi kesalahan saat meminjam',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async balik(balikDto: BalikDto) {
    try {
      const peminjaman = await this.prisma.peminjaman.findUnique({
        where: { id: balikDto.id_peminjaman },
        include: { book: true, pengembalian: true },
      });

      if (!peminjaman)
        throw new HttpException(
          'Peminjaman tidak ditemukan',
          HttpStatus.NOT_FOUND,
        );
      if (peminjaman.pengembalian)
        throw new HttpException(
          'Buku sudah dikembalikan',
          HttpStatus.BAD_REQUEST,
        );

      const result = await this.prisma.$transaction(async (tx) => {
        const pengembalian = await tx.pengembalian.create({
          data: { id_peminjaman: balikDto.id_peminjaman },
        });

        await tx.peminjaman.update({
          where: { id: balikDto.id_peminjaman },
          data: { tgl_kembali: pengembalian.tgl_kembali },
        });

        // Tambah stok kembali
        await tx.book.update({
          where: { id: peminjaman.id_book },
          data: { stok: { increment: 1 } },
        });

        return pengembalian;
      });

      return result;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      console.log(error);
      throw new HttpException(
        'Terjadi kesalahan saat pengembalian',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.peminjaman.findMany({
        include: {
          student: true,
          book: {
            select: {
              id: true,
              title: true,
              author: true,
              year: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          pengembalian: true,
        },
        orderBy: {
          tgl_pinjaman: 'desc',
        },
      });
    } catch (error) {
      if (error instanceof HttpException) throw error;
      console.log(error);
      throw new HttpException(
        'Terjadi kesalahan saat mengambil data transaksi',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const transaksi = await this.prisma.peminjaman.findUnique({
        where: { id },
        include: {
          student: true,
          book: {
            select: {
              id: true,
              title: true,
              author: true,
              year: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          pengembalian: true,
        },
      });

      if (!transaksi) {
        throw new HttpException(
          'Transaksi tidak ditemukan',
          HttpStatus.NOT_FOUND,
        );
      }

      return transaksi;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      console.log(error);
      throw new HttpException(
        'Terjadi kesalahan saat mengambil detail transaksi',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
