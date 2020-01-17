import { InviterDataOptions } from './publicationSingleInviterData';
import { Avatar } from './avatar';
export interface PublicationDataOptions {
    title: string;
    description: string;
    logo: string;
    cover: string;
    slug: string;
    subscribersCount: number;
    inviter: InviterDataOptions;
    following: boolean;
    status: number;
    membersList?: Avatar[];
    membersCount?: number;
    storiesCount: number;
    hideCover: boolean;
    views?: number;
    memberStatus: number;
}
