import { PartialType } from '@nestjs/swagger';
import { CreateMemberDto } from './create-member.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {
  @IsOptional()
  @IsString()
  name!: string;
  @IsOptional()
  @IsString()
  className!: string;
}
