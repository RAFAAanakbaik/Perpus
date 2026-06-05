import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class BcryptService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return await hash(password, saltRounds);
  }
  async comparePassword(
    password: string,
    comparedPassword: string,
  ): Promise<boolean> {
    return await compare(password, comparedPassword);
  }
}
