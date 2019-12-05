import { AuthorOptions } from './author';
import { AccountOptions } from './account';
import { UtilsService } from '../../../../../../shared-lib/src/lib/service/utils.service';

export interface BoostOptions {
  transaction?: [{
    transactionHash?: string;
    transactionSize?: number;
    timeSigned?: number;
  }];
  sponsor: AccountOptions;
  startTimePoint?: number;
  hours?: number;
  status?: string;
  whole?: number;
  fraction?: number;
  endTimePoint?: number;
  summary?: {
    spentWhole: number;
    spentFraction: number;
    spentBalance?: number;
  };
}

export class Boost {
  sponsor;
  transaction;
  startTimePoint;
  hours;
  status;
  balance;
  whole: number;
  fraction: number;
  endTimePoint: number;
  summary: any;

  constructor(options?: BoostOptions) {
    for (const i in options) {
      if (options.hasOwnProperty(i)) {
        this[i] = options[i] ? options[i] : '';
      }
    }
    if (this.summary.hasOwnProperty('spentWhole') && this.summary.hasOwnProperty('spentFraction')) {
      this.summary.spentBalance = UtilsService.calculateBalance(this.summary.spentWhole, this.summary.spentFraction);
    }
    if (this.hasOwnProperty('whole') && this.hasOwnProperty('fraction')) {
      this.balance = UtilsService.calculateBalance(this.whole, this.fraction);
    }
  }
}



