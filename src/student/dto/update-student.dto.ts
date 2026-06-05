import { PartialType } from '@nestjs/swagger';
import { CreateStudentDto } from './create-student.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @IsOptional()
  @IsString()
  nis!: string;
  @IsOptional()
  @IsString()
  name!: string;
  @IsOptional()
  @IsString()
  email?: string;
  @IsOptional()
  @IsString()
  kelas!: string;
  @IsOptional()
  @IsString()
  jurusan!: string;
}
