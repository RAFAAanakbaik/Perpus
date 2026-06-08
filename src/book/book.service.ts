import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    try {
      const add = await this.prisma.book.create({
        data: {
          ...createBookDto,
          updatedAt: new Date(),
        },
      });

      return add;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      console.log(error);
      throw new HttpException('Terjadi kesalahan saat membuat buku', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      return await this.prisma.book.findMany({});
    } catch (error) {
      console.log(error);
      throw new HttpException('Terjadi kesalahan', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      const find = await this.prisma.book.findFirst({ where: { id } });
      if (!find) throw new HttpException('book not found', HttpStatus.NOT_FOUND);
      return find;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Terjadi kesalahan', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      const updt = await this.prisma.book.update({
        where: { id },
        data: {
          ...updateBookDto,
          updatedAt: new Date(),
        },
      });
      return updt;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Terjadi kesalahan saat update', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.book.delete({ where: { id } });
      return 'successfully deleting book';
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Terjadi kesalahan', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}