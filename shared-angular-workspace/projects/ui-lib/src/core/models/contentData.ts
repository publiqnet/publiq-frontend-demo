import { Avatar } from './avatar';
import { PublicationOptions } from './contentPublication';
import { ContentDataHistoryOptions } from './contentDataHistory';
import { DropdownDataOptions } from './dropdownData';
import { CoverOptions } from './CoverOptions';

export interface ContentDataOptions {
  author: Avatar;
  created: number;
  published: number;
  updated?: number;
  history?: ContentDataHistoryOptions[];
  publicationList: DropdownDataOptions[];
  title: string;
  tags: Array<string>;
  boosts: Array<any>;
  cover: CoverOptions;
  publication: PublicationOptions;
  view_count: string | number;
  uri: string;
  status: string;
  boosted: boolean;
}
