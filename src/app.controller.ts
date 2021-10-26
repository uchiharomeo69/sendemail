import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

import { MailerService } from '@nestjs-modules/mailer';

@Controller()
export class AppController {
  constructor(private readonly mailerService: MailerService) {}

  @Get()
  hello(): string {
    return 'lalas';
  }

  @Post()
  async getHello(@Body() data) {
    const { email, name, url } = data;

    await this.mailerService.sendMail({
      to: `${email}`,
      subject: 'Confirm email',
      template: './register',
      context: {
        name,
        url,
      },
    });
  }
}
