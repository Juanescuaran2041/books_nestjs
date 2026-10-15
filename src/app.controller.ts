import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly configService: ConfigService) {}

  @Get()
  getHello(): string {
    const myVar = this.configService.get<string>('MY_VAR', {infer: true});
    const openAiApi = this.configService.get<string>('OPEN_AI_API', {infer: true});
    return `Hello World! MY_VAR: ${myVar}, OPEN_AI_API: ${openAiApi}`;
  }
}
