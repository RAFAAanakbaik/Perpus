import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStudentDto: CreateStudentDto) {
    try {
      const add = await this.prisma.student.create({
        data: {
          ...createStudentDto,
          updatedAt: new Date(),
        },
      });

      if (!add) {
        throw new HttpException(
          'failed creating student',
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
      const find = await this.prisma.student.findMany({});

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
      const find = await this.prisma.student.findFirst({
        where: { id },
      });

      if (!find) {
        throw new HttpException('student not found', HttpStatus.NOT_FOUND);
      }

      return find;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.log(error);
    }
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    try {
      const updt = await this.prisma.student.update({
        where: { id },
        data: {
          ...updateStudentDto,
          updatedAt: new Date(),
        },
      });

      if (!updt) {
        throw new HttpException(
          'failed updating student',
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
      const delt = await this.prisma.student.delete({
        where: { id },
      });

      if (!delt) {
        throw new HttpException(
          'failed deleting student',
          HttpStatus.BAD_REQUEST,
        );
      }

      return 'successfully deleting student';
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.log(error);
    }
  }
}
