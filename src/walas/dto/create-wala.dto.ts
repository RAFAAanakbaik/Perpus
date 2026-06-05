import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWalaDto {
  @IsNotEmpty()
  @IsString()
  nama_walas!: string;
  @IsNotEmpty()
  @IsString()
  no_tlpn!: string;
  @IsNotEmpty()
  @IsString()
  alamat!: string;
}
