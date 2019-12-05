import { HeaderArticleDataOptions } from './headerArticleData';
import { HeaderUserDataOptions } from './headerUserData';
import { TagMenuItemOptions } from './tagMenu';
import { HeaderPublicationDataOptions } from './headerPublicationData';
import { NotificationOptions } from './notificationMenu';
import { HeaderLoggedDataOptions } from './headerLoggedData';
import { Observable } from 'rxjs';
import { HeaderDraftData } from './headerDraftData';
import { PublicationDataOptions } from './publicationData';

export interface HeaderDataOptions {
  logo: string;
  isLogged: boolean;
  navigationLinks?: TagMenuItemOptions[];
  notificationData: { notifications: NotificationOptions[], newNotificationsCount: number };
  articleData?: HeaderArticleDataOptions;
  userData?: HeaderUserDataOptions;
  authorData?: HeaderUserDataOptions;
  userLoggedData?: HeaderLoggedDataOptions;
  publicationData?: PublicationDataOptions;
  draftData?: HeaderDraftData;
}
