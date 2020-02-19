import { Author } from './author';

export interface DraftOptions {
  slug: any;
  id: any;
  author: Author;
  created: string;
  updated: string;
  title: string;
  tags: Array<string>;
  image: string;
  publication: any;
  hideCover: boolean;
  view_count: string;
  contentUris: any;
  content?: string;
  options?: any;
}

export class Draft {
  slug: any;
  id: any;
  author: Author;
  created: string;
  published: string;
  title: string;
  tags: Array<string>;
  image: string;
  publication: any;
  view_count: string;
  contentUris: any;
  content: string;
  hideCover: boolean;
  description: string;
  options?: any;
  constructor(options?: DraftOptions) {
    for (const i in options) {
      if (options.hasOwnProperty(i)) {
        if (i == 'id') {
          this['slug'] = options[i] ? options[i] : '';
          this[i] = options[i] ? options[i] : '';
        } else if (i == 'content') {
          this['description'] = options[i] ? options[i].replace(/<figcaption(?:.|\n)*?>.*?<\/figcaption>/gm, '')
            .replace(/<(?:.|\n)*?>/gm, '')
            .replace(/(\r\n|\n|\r)/gm, '')
            .replace(/<\/?[^>]+(>|$)/g, '')
            .replace(/&nbsp;/g, '')
            .replace(/&lt;/g, '').trim() : '';
          this[i] = options[i] ? options[i] : '';
        } else if (i == 'updated') {
          this['published'] = options[i] ? options[i] : '';
          this[i] = options[i] ? options[i] : '';
        } else if (i == 'options') {
          if (options[i] && options[i]['selectedCoverImageUrl']) {
            this['image'] = options[i]['selectedCoverImageUrl'];
          }
          this[i] = options[i];
        } else {
          this[i] = options[i] ? options[i] : '';
        }
      }
    }
  }
}

