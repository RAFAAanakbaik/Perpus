import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { $Enums } from 'generated/prisma/browser';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username!: string;
  @IsString()
  @IsNotEmpty()
  password!: string;
  @IsEnum($Enums.UserRole)
  @IsNotEmpty()
  role!: $Enums.UserRole;
  @IsNumber()
  @IsOptional()
  memberId?: number;
}
