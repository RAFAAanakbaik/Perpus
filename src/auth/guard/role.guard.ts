/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PUBLIC_KEY } from '../decorators/public.decorators';
import { ROLES_KEY } from '../decorators/role.decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflevtor: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflevtor.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const requiredRoles = this.reflevtor.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token mising or invlaid!');
    }

    const token = authHeader.split(' ')[1];
    let payload: any;

    try {
      payload = await this.jwtService.verifyAsync(token);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid Token');
    }

    req.users = payload;

    if (!requiredRoles) {
      return true;
    }
    if (!requiredRoles.includes(payload.role)) {
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );
    }

    return true;
  }
}
