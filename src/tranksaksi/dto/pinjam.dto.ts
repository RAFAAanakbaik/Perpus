import { IsNotEmpty, IsNumber } from 'class-validator';

export class PinjamDto {
  @IsNotEmpty()
  @IsNumber()
  id_student!: number;
  @IsNotEmpty()
  @IsNumber()
  id_book!: number;
}
