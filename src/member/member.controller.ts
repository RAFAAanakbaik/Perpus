import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Public } from 'src/auth/decorators/public.decorators';

@Public()
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('create')
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  @Get('findall')
  findAll() {
    return this.memberService.findAll();
  }

  @Get('findone/:id')
  findOne(@Param('id') id: string) {
    return this.memberService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.memberService.update(+id, updateMemberDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.memberService.remove(+id);
  }
}
