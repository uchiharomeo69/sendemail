import { Controller, Get } from '@nestjs/common';

import { EventPattern } from '@nestjs/microservices';
import { MailerService } from '@nestjs-modules/mailer';

@Controller()
export class AppController {
  constructor(private readonly mailerService: MailerService) {}

  @EventPattern('register')
  async getHello(data) {
    const { email, name, url } = data;
    console.log(data);

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
