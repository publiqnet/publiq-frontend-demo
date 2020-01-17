import { Injectable } from '@angular/core';
import { BrowserNotificationOptions } from './models/browserNotification';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrowserNotificationService {
  public permission$: ReplaySubject<any> = new ReplaySubject(0);

  constructor() {
  }

  public requestPermission(): void {
    if ('Notification' in window) {
      Notification.requestPermission().then((status) => {});
    }
  }

  private create(title: string, options?: BrowserNotificationOptions): void {
    if (!('Notification' in window)) {
      this.permission$.next('Notification object doesnt exist');
      this.permission$.complete();
      return;
    }
    if (Notification.permission === 'denied') {
      this.permission$.next('denied');
      this.permission$.complete();
      return;

    } else if (Notification.permission === 'default') {
      Notification.requestPermission().then((status) => {
        if ( status === 'denied') {
          this.permission$.next('denied');
          this.permission$.complete();
          return;
        } else if (status === 'granted') {
          this.onGranted(title, options);
        }
      });
    } else {
      this.onGranted(title, options);
    }
  }

  private onGranted(title: string, options: BrowserNotificationOptions) {
    const notify = new Notification(title, options);
    notify.onshow = function (e) {
      // console.log('show');
    };
    notify.onclick = function (e) {
      // console.log('click');
    };
    notify.onerror = function (e) {
      // console.log('error');
    };
    notify.onclose = function () {
      // console.log('close');
    };
    this.permission$.next('granted');
    this.permission$.complete();
    return;
  }

  public generateNotification(title: string, options: BrowserNotificationOptions): void {
    this.create(title, options);
  }
}
