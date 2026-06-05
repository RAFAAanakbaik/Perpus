import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/decorators/public.decorators';
import { Roles } from 'src/auth/decorators/role.decorators';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Public()
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @ApiBearerAuth('access-token')
  @Roles('ADMIN')
  @Get('findall')
  findAll() {
    return this.userService.findAll();
  }
  @Public()
  @Get('findone/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @Public()
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @Public()
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
