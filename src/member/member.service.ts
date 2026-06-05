import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MemberService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMemberDto: CreateMemberDto) {
    try {
      const add = await this.prisma.member.create({
        data: {
          ...createMemberDto,
          updatedAt: new Date(),
        },
      });

      if (!add) {
        throw new HttpException(
          'failed creating member',
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
      const find = await this.prisma.member.findMany({});

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
      const find = await this.prisma.member.findFirst({
        where: { id },
      });

      if (!find) {
        throw new HttpException('member not found', HttpStatus.NOT_FOUND);
      }

      return find;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.log(error);
    }
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    try {
      const updt = await this.prisma.member.update({
        where: { id },
        data: {
          ...updateMemberDto,
          updatedAt: new Date(),
        },
      });

      if (!updt) {
        throw new HttpException(
          'failed updating member',
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
      const delt = await this.prisma.member.delete({ where: { id } });

      if (!delt) {
        throw new HttpException(
          'failed deleting member',
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
