import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SignIn } from './entities/sign-in.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signIn: SignIn) {
    return this.authService.signIn(signIn.email, signIn.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
