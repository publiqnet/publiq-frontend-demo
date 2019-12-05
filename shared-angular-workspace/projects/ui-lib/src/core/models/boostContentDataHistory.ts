import { AvatarOptions } from './avatar';

export interface BoostContentDataHistory {
  transaction?: {
    transactionHash?: string;
    transactionSize?: number;
    timeSigned?: number;
  };
  sponsor?: AvatarOptions;
  startTimePoint?: number;
  hours: number;
  status: string;
  whole: number;
  fraction: number;
  endTimePoint: number;
  balance?: number;
  summary?: {
    spentWhole?: number;
    spentFraction?: number;
    spentBalance?: number;
  };
}
