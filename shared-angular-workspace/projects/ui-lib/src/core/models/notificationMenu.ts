import { ActionMakerOptions } from './notificationMenuActionMaker';
import { PublicationOptions } from './contentPublication';
import { NotificationLangOptions } from './NotificationLangOptions';

export interface NotificationOptions {
  langOptions: NotificationLangOptions;
  type: string;
  slug: string;
  date: Date;
  isRead: boolean;
  actionFrom: ActionMakerOptions;
  actionTo?: ActionMakerOptions;
  publication?: PublicationOptions;
}
