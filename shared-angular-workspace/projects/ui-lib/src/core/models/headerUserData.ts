import { Avatar } from './avatar';

export interface HeaderUserDataOptions {
  user: Avatar;
  info?: [{
    count: string;
    property: string;
    icon?: string;
  }];
}
