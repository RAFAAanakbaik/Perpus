import { IsNotEmpty, IsNumber } from 'class-validator';

export class BalikDto {
  @IsNotEmpty()
  @IsNumber()
  id_peminjaman!: number;
}
