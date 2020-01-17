import { Author } from './author';
import { environment } from '../../../../environments/environment';
import { Boost, BoostOptions } from './boost';
import { UtilsService } from '../../../../../../shared-lib/src/lib/service/utils.service';

export enum PageOptions {
    homepageTagStories = <any>'homepageTagStories',
    homepageAuthorStories = <any>'homepageAuthorStories',
    default = <any>''
}

export interface ContentOptions {
    uri: string;
    title: string;
    description?: string;
    text: string;
    cover: any;
    contentId?: any;
    files: [];
    published: string;
    author: any;
    status: string;
    boosted: boolean;
    publication: string;
    socialImage?: string;
    boosts?: BoostOptions[];
    tags?: any;
    canEditContent?: boolean;
    boostSummary: any;
    views: number;
    highlightBackground?: string;
    highlightFont?: string;
    highlightTagClass?: string;
}

export class Content {
    uri: string;
    title: string;
    description: string;
    text: string;
    cover: any;
    contentId: any;
    files: [];
    published: string;
    views: number = 0;
    author: Author;
    status: string;
    tags = [];
    view_count: number | string = 0;
    publication = null;
    boosted: boolean;
    boosts: Boost[];
    previousVersions: [];
    socialImage: string;
    canEditContent: boolean = false;
    boostSummary: any;
    highlightBackground: string;
    highlightFont: string;
    highlightTagClass: string;

    constructor(options?: ContentOptions) {
        for (const i in options) {
            if (options.hasOwnProperty(i)) {
                if (i == 'author' && options[i]) {
                    this[i] = new Author(options[i]);
                } else if (i == 'cover' && options[i] && options[i].url) {
                    options[i].thumbnail = (options[i].thumbnail && options[i].thumbnail.indexOf('https://') !== 0) ? environment.backend + '/' + options[i].thumbnail : options[i].thumbnail;
                    this[i] = options[i] ? options[i] : '';
                } else if (i == 'views') {
                    this.views = options[i] ? options[i] : 0;
                    this.view_count = this.views;
                } else if (i == 'boosts' && options[i]) {
                    this.boosts = options[i].map((boost) => new Boost(boost));
                } else if (i == 'previousVersions') {
                  this[i] = (options[i] && options[i].length) ? options[i] : [];
                } else if (i == 'tags') {
                    this[i] = (options[i] && options[i].length) ? options[i].map(tag => tag['name'] ? tag['name'] : tag) : [];
                } else if (['socialImage'].includes(i)) {
                    this[i] = (options[i] && options[i].indexOf('https://') !== 0) ? environment.backend + '/' + options[i] : options[i];
                } else {
                    this[i] = options[i] ? options[i] : '';
                }
            }
        }

        if (this.boostSummary && this.boostSummary.hasOwnProperty('whole') && this.boostSummary.hasOwnProperty('fraction')) {
            this.boostSummary.balance = UtilsService.calculateBalance(this.boostSummary.whole, this.boostSummary.fraction);
        }
        if (this.boostSummary && this.boostSummary.hasOwnProperty('spentWhole') && this.boostSummary.hasOwnProperty('spentFraction')) {
            this.boostSummary.spentBalance = UtilsService.calculateBalance(this.boostSummary.spentWhole, this.boostSummary.spentFraction);
        }
    }
}
