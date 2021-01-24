import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@Controller('/auth/external/google')
export class GoogleExternalAuthController {
  @Get()
  @UseGuards(AuthGuard('google'))
  async redirectToOAuth(): Promise<void> {
    // ...
  }

  @Get('/callback')
  @UseGuards(AuthGuard('google'))
  async callback(@Req() req: Request): Promise<any> {
    return {
      ...req.user
    };
  }
}
