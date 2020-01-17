import { Notification } from './notification';

export interface BrowserNotificationOptions {
  body?: string;
  icon?: string;
  tag?: string;
  data?: any;
  renotify?: boolean;
  silent?: boolean;
  sound?: string;
  noscreen?: boolean;
  sticky?: boolean;
  dir?: 'auto' | 'ltr' | 'rtl';
  lang?: string;
  vibrate?: number[];
}

export class BrowserNotification implements BrowserNotificationOptions {
  body?: string;
  icon?: string;
  tag?: string;
  data?: any;
  renotify?: boolean;
  silent?: boolean;
  sound?: string;
  noscreen?: boolean;
  sticky?: boolean;
  dir?: 'auto' | 'ltr' | 'rtl';
  lang?: string;
  vibrate?: number[];

  constructor(lang: string, options?: Notification) {
    this.lang = lang;
    for (const i in options) {
      if (options.hasOwnProperty(i)) {
        if (i == 'actionFrom') {
          this.icon = options[i].image || '';
        } else if (i == 'langOptions') {
          const notificationBody = lang === 'en' ? options[i].bodyEn : options[i].bodyJp;
          this.body = notificationBody.replace('{{performer}}', options.actionFrom.fullName);
          if (options.publication) { this.body = this.body.replace('{{target}}', options.publication.title); }
        }
      }
    }
  }
}

