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
import { UtilService } from '../../../core/services/util.service';

const moment = moment_;

export enum Actions {
  User = 'performer',
  Publication = 'target',
  Article = 'article',
  Redirect_User = 'redirect-user',
  Redirect_Publication = 'redirect-publication',
  Redirect_Article = 'redirect-article',
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

  constructor(public translateService: TranslateService, private utils: UtilService) {
  }

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
    if (!this.items || !this.items.length) {
      return;
    }
    this.items.forEach((item: NotificationOptions) => {// change {{inside}}
      item.langOptions.bodyEn = (!item.langOptions.bodyEn.includes('<a href')) ? this.changeKeys(item, 'en') : item.langOptions.bodyEn;
      item.langOptions.bodyJp = (!item.langOptions.bodyJp.includes('<a href')) ? this.changeKeys(item, 'jp') : item.langOptions.bodyJp;
    });
  }

  private changeKeys(notification: NotificationOptions, lang: string) {
    let bodyLang = (lang === 'en') ? notification.langOptions.bodyEn : notification.langOptions.bodyJp;
    if (notification.actionFrom) {
      const name = notification.actionFrom.fullName;
      bodyLang = bodyLang.replace('{{performer}}', `<a href="#" [id]="performer-${notification.slug}">${name}</a>`);
    }
    if (notification.publication) {
      const title = notification.publication.title;
      bodyLang = bodyLang.replace('{{target}}', `<a href="#" [id]="target-${notification.slug}">${title}</a>`);
    }
    if (notification.contentUnit) {
      const articleName = notification.contentUnit.title.length <= 16 ? notification.contentUnit.title :
        this.utils.charactersLimit(notification.contentUnit.title, 16);
      bodyLang = bodyLang.replace('{{article}}', `<a href="#" [id]="article-${notification.slug}">${articleName}</a>`);
    }

    return bodyLang;
  }

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
        if (attrId.includes(Actions.Article)) {
          this.makeAction(attrId, Actions.Redirect_Article, event);
        }
      }
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  private makeAction(attrId: string, action: string, event) {
    const notificationSlug = attrId.split('-')[1];
    const notification: NotificationOptions = this.items.find((notification: NotificationOptions) => notification.slug == notificationSlug);
    const slug = action === Actions.Redirect_Article ? notification.contentUnit.uri : notification;
    this.selectItem(event, {action: action, slug: slug});
  }
}
