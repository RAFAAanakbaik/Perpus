import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Roles } from 'src/auth/decorators/role.decorators';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Roles('ADMIN')
  @Post('create')
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Roles('PETUGAS')
  @Get('findall')
  findAll() {
    return this.studentService.findAll();
  }

  @Roles('PETUGAS')
  @Get('findone/:id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Roles('ADMIN')
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Roles('ADMIN')
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
