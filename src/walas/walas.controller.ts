import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WalasService } from './walas.service';
import { CreateWalaDto } from './dto/create-wala.dto';
import { UpdateWalaDto } from './dto/update-wala.dto';
import { Public } from 'src/auth/decorators/public.decorators';
import { Roles } from 'src/auth/decorators/role.decorators';

@Controller('walas')
export class WalasController {
  constructor(private readonly walasService: WalasService) {}

  @Roles('ADMIN')
  @Post()
  create(@Body() createWalaDto: CreateWalaDto) {
    return this.walasService.create(createWalaDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.walasService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walasService.findOne(+id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalaDto: UpdateWalaDto) {
    return this.walasService.update(+id, updateWalaDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walasService.remove(+id);
  }
}
