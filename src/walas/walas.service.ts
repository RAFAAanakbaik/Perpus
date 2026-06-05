import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWalaDto } from './dto/create-wala.dto';
import { UpdateWalaDto } from './dto/update-wala.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WalasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWalaDto: CreateWalaDto) {
    try {
      const add = await this.prisma.walas.create({
        data: { ...createWalaDto },
      });

      if (!add) {
        throw new HttpException(
          'failed creating walas',
          HttpStatus.BAD_REQUEST,
        );
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
      const find = await this.prisma.walas.findMany({});

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
      const find = await this.prisma.walas.findFirst({
        where: { id_walas: id },
      });

      if (!find) {
        throw new HttpException('walas not found', HttpStatus.NOT_FOUND);
      }

      return find;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.log(error);
    }
  }

  async update(id: number, updateWalaDto: UpdateWalaDto) {
    try {
      const updt = await this.prisma.walas.update({
        where: { id_walas: id },
        data: { ...updateWalaDto },
      });

      if (!updt) {
        throw new HttpException(
          'failed updating walas',
          HttpStatus.BAD_REQUEST,
        );
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
      const delt = await this.prisma.walas.delete({ where: { id_walas: id } });

      if (!delt) {
        throw new HttpException(
          'failed deleting walas',
          HttpStatus.BAD_REQUEST,
        );
      }

      return 'successfully deleting walas';
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.log(error);
    }
  }
}
