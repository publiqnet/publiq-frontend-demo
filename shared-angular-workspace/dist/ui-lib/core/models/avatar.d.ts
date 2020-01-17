export interface AvatarOptions {
    first_name?: string;
    last_name?: string;
    image?: string;
    slug?: string;
    bio?: string;
    public_key?: string;
    thumbnail?: string;
    subscribersCount?: number;
    subscribed?: boolean;
}
export declare class Avatar {
    fullName: string;
    first_name: string;
    last_name: string;
    image: string;
    slug: string;
    thumbnail: string;
    public_key: string;
    bio: string;
    subscribersCount: number;
    subscribed: boolean;
    constructor(options?: AvatarOptions);
}
