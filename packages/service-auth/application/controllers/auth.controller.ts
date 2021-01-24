import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from '@my-project/service-auth/domain/services/auth.service';
import { RefreshTokensDto } from '@my-project/service-auth/application/dto/refresh-tokens.dto';
import { SessionDto } from '@my-project/service-auth/application/dto/session.dto';
import { RegisterUserDto } from '@my-project/service-auth/application/dto/register-user.dto';

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/refresh')
  async refresh(@Body() refreshTokensDto: RefreshTokensDto): Promise<SessionDto> {
    return this.authService.refresh(refreshTokensDto);
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() userDto: RegisterUserDto): Promise<SessionDto> {
    return this.authService.registerNewUser(userDto);
  }
}
