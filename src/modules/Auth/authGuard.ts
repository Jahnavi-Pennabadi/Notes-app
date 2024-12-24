import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No access token provided');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded: any = jwt.decode(token);

      if (!decoded || !decoded.oid) {
        throw new UnauthorizedException('Invalid access token');
      }

      request.user = { id: decoded.oid }; 
      return true;
    } catch (error) {
      throw new UnauthorizedException('Failed to authenticate');
    }
  }
}
