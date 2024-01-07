import { Injectable } from '@nestjs/common';
import { SES } from 'aws-sdk';
import ejs from 'ejs';
import path from 'path';

@Injectable()
export class EmailService {
  private readonly ses: SES;

  constructor() {
    this.ses = new SES();
  }

  async sendEmail(
    to: string,
    subject: string,
    templateName: string,
  ): Promise<void> {
    const uri = path.join(__dirname, './', `templates/${templateName}.ejs`);
    const template = await ejs.renderFile(uri, {});

    try {
      const params: SES.SendEmailRequest = {
        Source: process.env.EMAIL_SOURCE,
        Destination: {
          ToAddresses: [to],
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: template,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: subject,
          },
        },
      };

      await this.ses.sendEmail(params).promise();
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
