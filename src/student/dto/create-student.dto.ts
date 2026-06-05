import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  nis!: string;
  @IsNotEmpty()
  @IsString()
  name!: string;
  @IsOptional()
  @IsString()
  email?: string;
  @IsNotEmpty()
  @IsString()
  kelas!: string;
  @IsNotEmpty()
  @IsString()
  jurusan!: string;
}
