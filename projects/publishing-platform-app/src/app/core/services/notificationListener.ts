export interface NotificationListenerOptions {
  type?: string;
  data?: any;
}

export class NotificationListener {
  type: string;
  data: any;

  constructor(options?: NotificationListenerOptions) {
    for (const i in options) {
      if (options.hasOwnProperty(i)) {
        this[i] = options[i] ? options[i] : '';
      }
    }
  }
}
