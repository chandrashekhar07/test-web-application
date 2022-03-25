import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('')
export class WelcomeController {
  @Get()
  @HttpCode(HttpStatus.OK)
  public login(): string {
    return 'Welcome Build Version : 0.1';
  }
}
