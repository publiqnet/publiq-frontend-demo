import { PublicationOptions } from './contentPublication';
import { BoostContentDataHistory } from './boostContentDataHistory';
import { AvatarOptions } from './avatar';
import { TagMenuItemOptions } from './tagMenu';
import { BoostContentDataSummary } from './boostContentDataSummary';
import { CoverOptions } from './CoverOptions';
export interface BoostContentDataOptions {
    uri?: string;
    title?: string;
    views?: string | number;
    cover?: CoverOptions;
    author?: AvatarOptions;
    published?: number;
    boosted?: boolean;
    status?: string;
    publication?: PublicationOptions;
    totalView: string | number;
    channelsCount: string | number;
    boostsList: Array<any>;
    totalBoostData: number;
    boosts: BoostContentDataHistory[];
    tags?: TagMenuItemOptions;
    boostSummary?: BoostContentDataSummary;
    summary?: BoostContentDataSummary;
}
