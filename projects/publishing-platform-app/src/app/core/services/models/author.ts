import { environment } from 'projects/publishing-platform-app/src/environments/environment';

export interface AuthorOptions {
    address: string;
    firstName: string;
    lastName: string;
    image: any;
    memberStatus?: number;
    publicKey: string;
    fullName: string;
    subscribed: boolean;
    thumbnail?: string;
    thumbnailHeight?: number;
    thumbnailWidth?: number;
    subscribersCount?: number | string;
}

export class Author {
    address: string;
    slug: string;
    first_name: string;
    image: any;
    last_name: string;
    firstName: string;
    lastName: string;
    memberStatus?: number;
    publicKey: string;
    fullName: string;
    subscribed: boolean;
    thumbnail?: string;
    thumbnailHeight: number;
    thumbnailWidth: number;
    subscribersCount: number | string;
    constructor(options?: AuthorOptions) {
        for (const i in options) {
            if (options.hasOwnProperty(i)) {
                if (i == 'lastName') {
                    this['last_name'] = options[i] ? options[i] : '';
                } else if (i == 'firstName') {
                    this['first_name'] = options[i] ? options[i] : '';
                } else if (i == 'subscribersCount') {
                  this.subscribersCount = options[i] ? options[i] : '';
                } else if (i == 'publicKey') {
                    this['slug'] = options[i] ? options[i] : '';
                    this[i] = options[i] ? options[i] : '';
                } else if (['image'].includes(i)) {
                    this[i] = (options[i] && options[i].indexOf('https://') !== 0) ? environment.backend + '/' + options[i] : options[i];
                } else if (['thumbnail'].includes(i)) {
                    this[i] = (options[i] && options[i].indexOf('https://') !== 0) ? environment.backend + '/' + options[i] : options[i];
                } else {
                    this[i] = options[i] ? options[i] : '';
                }
                this.fullName = '';
                if (this.first_name && this.last_name) {
                    this.fullName = this.first_name + ' ' + this.last_name;
                } else if (!this.first_name && !this.last_name) {
                    this.fullName = '';
                } else {
                    this.fullName = (this.first_name ? this.first_name : '') + ' ' + (this.last_name ? this.last_name : '');
                    this.fullName.trim();
                }
            }
        }
    }
}
