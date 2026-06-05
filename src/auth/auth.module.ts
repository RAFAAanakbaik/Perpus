import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guard/role.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    { provide: APP_GUARD, useClass: RolesGuard },
    AuthService,
    BcryptService,
  ],
})
export class AuthModule {}
