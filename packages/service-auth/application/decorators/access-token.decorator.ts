import { createParamDecorator } from '@nestjs/common';
import type { Request } from 'express';

export const AccessToken = createParamDecorator((data, req) => extractAccessTokenFromHeader(req));

export const extractAccessTokenFromHeader = (req: Request) =>
  req.headers.authorization?.replace('Bearer ', '') ?? '';
