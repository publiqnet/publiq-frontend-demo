import { Avatar } from './avatar';

export interface HeaderPublicationDataOptions {
  publication: Avatar;
  isFollowed: boolean;
  slug: string;
  info?: [{
    count: string;
    property: string;
    icon?: string;
  }];
}
