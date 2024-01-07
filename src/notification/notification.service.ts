import { Injectable } from '@nestjs/common';
import { messaging } from 'firebase-admin';
@Injectable()
export class NotificationService {
  async sendPushSingleNotification(
    token: string,
    title: string,
    body: string,
  ): Promise<void> {
    try {
      const message = {
        notification: {
          title,
          body,
        },
        token,
      };

      await messaging().send(message);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async sendPushMultiNotifications(
    tokens: string[],
    title: string,
    body: string,
  ): Promise<void> {
    try {
      const message = {
        notification: {
          title,
          body,
        },
        tokens,
      };

      await messaging().sendEachForMulticast(message);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
