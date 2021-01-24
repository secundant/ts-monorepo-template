import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from '@my-project/service-auth/domain/services/auth.service';
import { EXPRESS_REQUEST_USER_SYMBOL } from '@my-project/service-auth/constants/symbols';
import { extractAccessTokenFromHeader } from '@my-project/service-auth/application/decorators/access-token.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = extractAccessTokenFromHeader(request);

    request[EXPRESS_REQUEST_USER_SYMBOL] = await this.authService.identify({
      accessToken
    });
    return true;
  }
}
