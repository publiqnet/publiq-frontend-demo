import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { NotificationCardComponent } from 'ui-lib';
import { HttpHelperService, HttpMethodTypes } from 'helper-lib';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AccountService } from './account.service';
import { NotificationListener } from './notificationListener';
import { Content } from './models/content';

export enum NotificationTypeList {
  success = 'success',
  error = 'error',
  warning = 'warning',
  info = 'info'
}
export interface Notification {
  message: string;
  type: NotificationTypeList;
}

declare var EventSourcePolyfill: any;

@Injectable()
export class UiNotificationService {
  private defaultDuration: number = 3000;
  private removeFromDOMDuration: number = 1000;
  private readonly url = environment.backend + '/api/notification';

  notificationListenerInitialized: boolean = false;
  notificationsListenerDataChanged = new Subject<NotificationListener[]>();

  private readonly eventSourcePolyfillUrl = environment.mercure;
  private readonly eventSourcePolyfillMainTopic = 'http://publiq.site/notification';

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private accountService: AccountService,
    private httpHelperService: HttpHelperService
  ) {}

  warning(title: string, description: string = '') {
    this.message(NotificationTypeList.warning, title, description);
  }

  success(title: string, description: string = '') {
    this.message(NotificationTypeList.success, title, description);
  }

  info(title: string, description: string = '') {
    this.message(NotificationTypeList.info, title, description);
  }

  error(title: string, description: string = '') {
    this.message(NotificationTypeList.error, title, description);
  }

  private message(type, title: string, description: string) {
    let componentRef;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NotificationCardComponent);
    componentRef = componentFactory.create(this.injector);
    componentRef.instance.cardData = {
      'type': type,
      'title': title,
      'description': description,
      'duration': this.defaultDuration
    };

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);

    const dialogComponentRef: ComponentRef<NotificationCardComponent> = componentRef;

    componentRef.instance.visibility.subscribe(v => setTimeout(() => this.removeDialogComponentFromBody(dialogComponentRef), this.removeFromDOMDuration));
  }

  private removeDialogComponentFromBody(dialogComponentRef: ComponentRef<NotificationCardComponent>) {
    this.appRef.detachView(dialogComponentRef.hostView);
    dialogComponentRef.destroy();
  }

  initNotificationListener() {
    if (!this.notificationListenerInitialized) {
      const eventSource = new EventSourcePolyfill(this.eventSourcePolyfillUrl + '?topic=' + encodeURIComponent(this.eventSourcePolyfillMainTopic), {
        headers: {
          'Authorization': 'Bearer ' + this.accountService.accountInfo.jwtToken
        }
      });

      eventSource.onopen = event => {
        this.notificationListenerInitialized = true;
      };

      eventSource.onmessage = event => {
        if (event && event.data) {
          this.notificationsListenerDataChanged.next(JSON.parse(event.data).map(nextData => new NotificationListener(nextData)));
        }
      };

      eventSource.onerror = event => {
        console.log('Mercure Connection Error');
      };
    }
  }

  getNotifications(count, lastId) {
    return this.httpHelperService.call(HttpMethodTypes.get, this.url + `/${count}/${lastId}`);
  }

  readAllNotifications() {
    return this.httpHelperService.call(HttpMethodTypes.post, this.url + `/read-all`);
  }

  toggleStatus(id, readStatus: boolean) {
    return this.httpHelperService.call(HttpMethodTypes.post, this.url + `/${readStatus ? 'read' : 'unread'}/${id}`);
  }

  resetNewNotificationsCount() {
    return this.httpHelperService.call(HttpMethodTypes.post, this.url + `/seen-all`);
  }

  deleteNotification = (notificationId): Observable<any> => {
    return this.httpHelperService.call(HttpMethodTypes.delete, this.url + `/delete/${notificationId}`);
  }

  deleteAllNotifications = (): Observable<any> => {
    return this.httpHelperService.call(HttpMethodTypes.delete, this.url + `/delete-all`);
  }
}
