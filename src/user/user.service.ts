import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcrypt: BcryptService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.bcrypt.hashPassword(
      createUserDto.password,
    );
    try {
      const add = await this.prisma.user.create({
        data: { ...createUserDto, password: hashedPassword },
      });

      if (!add) {
        throw new HttpException('failed creating user', HttpStatus.BAD_REQUEST);
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
      const find = await this.prisma.user.findMany({});

      if (!find) {
        throw new HttpException(
          'failed getting all data',
          HttpStatus.BAD_REQUEST,
        );
      }

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
      const find = await this.prisma.user.findFirst({ where: { id } });

      if (!find) {
        throw new HttpException('failed getting user', HttpStatus.BAD_REQUEST);
      }

      return find;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.log(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const hashedPassword = await this.bcrypt.hashPassword(
      updateUserDto.password,
    );
    try {
      const updt = await this.prisma.user.update({
        where: { id },
        data: { ...updateUserDto, password: hashedPassword },
      });

      if (!updt) {
        throw new HttpException('failed updating user', HttpStatus.BAD_REQUEST);
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
      const delt = await this.prisma.user.delete({ where: { id } });

      if (!delt) {
        throw new HttpException('failed deleting user', HttpStatus.BAD_REQUEST);
      }

      return 'successfully deleting user';
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.log(error);
    }
  }
}
