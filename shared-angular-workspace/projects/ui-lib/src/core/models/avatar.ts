export interface AvatarOptions {
  first_name?: string;
  last_name?: string;
  image?: string;
  slug?: string;
  bio?: string;
  public_key?: string;
  thumbnail?: string;
  subscribersCount?: number | string;
  subscribed?: boolean;
}

export class Avatar {
  fullName: string;
  first_name: string;
  last_name: string;
  image: string;
  slug: string;
  thumbnail: string;
  public_key: string;
  bio: string;
  subscribersCount: number | string;
  subscribed: boolean;

  constructor(options?: AvatarOptions) {
    for (const i in options) {
      if (options.hasOwnProperty(i)) {
        this[i] = options[i];
      }
    }

    if (this.first_name && this.last_name) {
      this.fullName = `${this.first_name.trim()} ${this.last_name.trim()}`;
    } else if (this.first_name || this.last_name) {
      this.fullName = (this.first_name) ? this.first_name.trim() : this.last_name.trim();
    }
  }
}
