import { Avatar } from './avatar';

export interface UserSingleTypeOptions {
  user: Avatar;
  isFollowing: boolean;
  slug: string;
  value: string;
  status: boolean;
  followMember: boolean;
  description?: string;
}
