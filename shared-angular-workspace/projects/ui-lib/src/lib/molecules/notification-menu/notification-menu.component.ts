import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges, OnInit
} from '@angular/core';
import { NotificationOptions } from '../../../core/models/notificationMenu';
import { Avatar } from '../../../core/models/avatar';
import * as moment_ from 'moment';
import { TranslateService } from '@ngx-translate/core';

const moment = moment_;

export enum Actions  {
  User = 'performer',
  Publication = 'target',
  // New_Request = 'publication_request_new',
  // New_Invitation = 'publication_invitation_new',
  Redirect_User = 'redirect-user',
  Redirect_Publication = 'redirect-publication',
  // Redirect_PB_Request = 'redirect-pb-requests',
  // Redirect_Invitation = 'redirect-invitations',
}

@Component({
  selector: 'ui-notification-menu',
  templateUrl: './notification-menu.component.html',
  styleUrls: ['./notification-menu.component.scss'],
})
export class NotificationMenuComponent implements OnInit, OnChanges {
  @Input() items: NotificationOptions[] = null;
  @Input() blockInfiniteScroll: boolean = false;
  @Input() seeMoreLoading: boolean = false;
  @Output() onItemSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() seeMore: EventEmitter<any> = new EventEmitter<any>();

  constructor(public translateService: TranslateService) {}

  ngOnInit(): void {
    this.transform();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.items && this.items.length) {
      this.items.map((data: NotificationOptions) => {
        if (data.actionFrom) {
          data.actionFrom = new Avatar(data.actionFrom);
        }
      });
      this.transform();
    }
  }

  selectItem(event, item) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.onItemSelect.emit(item);
  }

  formatDate(date): string {
    return moment(date).format('DD MMM, HH:mm');
  }

  seeMoreNots(event) {
    this.seeMore.emit(event);
  }

  private transform() {
    if (!this.items || !this.items.length) { return; }
    this.items.forEach((item: NotificationOptions) => {// change {{inside}}
      item.langOptions.bodyEn = (!item.langOptions.bodyEn.includes('<a href')) ? this.changeKeys(item, 'en') : item.langOptions.bodyEn;
      item.langOptions.bodyJp = (!item.langOptions.bodyJp.includes('<a href')) ? this.changeKeys(item, 'jp') : item.langOptions.bodyJp;

      // if (item.type === Actions.New_Request) { // change types
      //   item.langOptions.bodyEn =  (!item.langOptions.bodyEn.includes(`<a href="#" [id]="${item.type}-${item.slug}"`)) ? this.changeTypes('has requested to join', item, 'en') : item.langOptions.bodyEn;
      //   item.langOptions.bodyJp =  (!item.langOptions.bodyJp.includes(`<a href="#" [id]="${item.type}-${item.slug}"`)) ? this.changeTypes('は参加を要求しました', item, 'jp') : item.langOptions.bodyJp;
      // } else if (item.type === Actions.New_Invitation) {
      //   item.langOptions.bodyEn = (!item.langOptions.bodyEn.includes(`<a href="#" [id]="${item.type}-${item.slug}"`)) ? this.changeTypes('has invited you to join', item, 'en') : item.langOptions.bodyEn;
      //   item.langOptions.bodyJp = (!item.langOptions.bodyJp.includes(`<a href="#" [id]="${item.type}-${item.slug}"`)) ? this.changeTypes('に参加するように招待されています', item, 'jp') : item.langOptions.bodyJp;
      // }
    });
  }

  private changeKeys(notification: NotificationOptions, lang: string) {
    const bodyLang = (lang === 'en') ? notification.langOptions.bodyEn : notification.langOptions.bodyJp;
    if (!notification.actionFrom) { return bodyLang; }
    const name = notification.actionFrom.fullName;
    if (!notification.publication) {
      return bodyLang.replace('{{performer}}', `<a href="#" [id]="performer-${notification.slug}">${name}</a>`);
    }
    const title = notification.publication.title;
    return bodyLang
      .replace('{{performer}}', `<a href="#" [id]="performer-${notification.slug}">${name}</a>`)
      .replace('{{target}}', `<a href="#" [id]="target-${notification.slug}">${title}</a>`);
  }

  // private changeTypes(type: string, notification: NotificationOptions, lang: string) {
  //   const bodyLang = (lang === 'en') ? notification.langOptions.bodyEn : notification.langOptions.bodyJp;
  //   return bodyLang
  //     .replace(type, `<a href="#" [id]="${notification.type}-${notification.slug}">${type}</a>`);
  // }

  public onBodyClick(event) {
    if (event.target instanceof HTMLAnchorElement) {
      if (event.target.attributes && event.target.attributes[1] && event.target.attributes[1].value) {
        const attrId: string = event.target.attributes[1].value;
        if (attrId.includes(Actions.User)) {
          this.makeAction(attrId, Actions.Redirect_User, event);
        }
        if (attrId.includes(Actions.Publication)) {
          this.makeAction(attrId, Actions.Redirect_Publication, event);
        }
        // if (attrId.includes(Actions.New_Invitation)) {
        //   this.makeAction(attrId, Actions.Redirect_Invitation, event);
        // }
        // if (attrId.includes(Actions.New_Request)) {
        //   this.makeAction(attrId, Actions.Redirect_PB_Request, event);
        // }
      }
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  private makeAction(attrId: string, action: string, event) {
    const slug = attrId.split('-')[1];
    const notification: NotificationOptions = this.items.find((notification: NotificationOptions) => notification.slug == slug);
    this.selectItem(event, {action: action, slug: notification});
  }
}
