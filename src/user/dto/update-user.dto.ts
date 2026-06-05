import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { $Enums } from 'generated/prisma/browser';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  username!: string;
  @IsString()
  @IsOptional()
  password!: string;
  @IsEnum($Enums.UserRole)
  @IsOptional()
  role!: $Enums.UserRole;
  @IsNumber()
  @IsOptional()
  memberId?: number;
}
