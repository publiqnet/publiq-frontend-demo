import { Avatar } from './avatar';

export interface HeaderArticleDataOptions {
  user: Avatar;
  title: string;
  isLiked: boolean;
  slug: string;
  followingAuthor: boolean;
  isCurrentUser: boolean;
}
