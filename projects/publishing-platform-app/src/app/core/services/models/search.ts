import { Publication } from './publication';
import { Author } from './author';
import { Content } from './content';

export interface SearchOptions {
  publication?: Publication[];
  publicationCount: number;
  publicationMore: boolean;
  article?: Content[];
  articleCount: number;
  articleMore: boolean;
  authors?: Author[];
  authorsCount: number;
  authorsMore: boolean;
}

export const keyArray = ['authorsMore', 'articleMore', 'publicationMore', 'publicationCount', 'articleCount', 'authorsCount'];

export class Search {
  publication: Publication[];
  publicationCount: number = 0;
  publicationMore: boolean;
  article: Content[];
  articleCount: number = 0;
  articleMore: boolean;
  authors: Author[];
  authorsCount: number = 0;
  authorsMore: boolean;

  totalCount: number = 0;

  constructor(options?: SearchOptions) {
    for (const i in options) {
      if (options.hasOwnProperty(i)) {
        if (i === 'publication' && options[i] && options[i].length) {
          this[i] = options[i].map(pub => new Publication(pub));
        } else if (i === 'article' && options[i] && options[i].length) {
          this[i] = options[i].map(content => new Content(content));
        } else if (i === 'authors' && options[i] && options[i].length) {
          this[i] = options[i].map(authorData => new Author(authorData));
        } else if (keyArray.includes(i)) {
          this[i] = options[i];
        } else {
          this[i] = options[i] ? options[i] : '';
        }
      }
    }
    this.totalCount = this.articleCount + this.publicationCount + this.authorsCount;
  }
}


