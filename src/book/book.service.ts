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

      if (!add) {
        throw new HttpException('failed creating book', HttpStatus.BAD_REQUEST);
      }

      return add;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.log(error);
    }
  }

  async findAll() {
    try {
      const find = await this.prisma.book.findMany({});

      return find;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.log(error);
    }
  }

  async findOne(id: number) {
    try {
      const find = await this.prisma.book.findFirst({
        where: { id },
      });

      if (!find) {
        throw new HttpException('book not found', HttpStatus.NOT_FOUND);
      }

      return find;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.log(error);
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

      if (!updt) {
        throw new HttpException('failed updating book', HttpStatus.BAD_REQUEST);
      }

      return updt;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.log(error);
    }
  }

  async remove(id: number) {
    try {
      const delt = await this.prisma.book.delete({ where: { id } });

      if (!delt) {
        throw new HttpException('failed deleting book', HttpStatus.BAD_REQUEST);
      }

      return 'successfully deleting book';
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.log(error);
    }
  }
}
