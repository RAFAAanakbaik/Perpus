import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { WalasModule } from './walas/walas.module';
import { BookModule } from './book/book.module';
import { MemberModule } from './member/member.module';
import { TranksaksiModule } from './tranksaksi/tranksaksi.module';

@Module({
  imports: [
    PrismaModule,
    BcryptModule,
    UserModule,
    AuthModule,
    StudentModule,
    WalasModule,
    BookModule,
    MemberModule,
    TranksaksiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
