import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/authenticate';
import { Public } from './decorators/public.decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async authenticate(@Body() authDto: AuthDto) {
    return await this.authService.authenticate(authDto);
  }
}
