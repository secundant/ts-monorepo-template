import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import { EXPRESS_REQUEST_USER_SYMBOL } from '@my-project/service-auth/constants/symbols';

export const CurrentUser = createParamDecorator((data, req) => {
  if (!req[EXPRESS_REQUEST_USER_SYMBOL]) {
    throw new UnauthorizedException();
  }
  return req[EXPRESS_REQUEST_USER_SYMBOL];
});
