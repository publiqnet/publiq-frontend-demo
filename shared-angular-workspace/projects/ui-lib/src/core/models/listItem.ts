import { PublicationOptions } from './contentPublication';

export interface ListItemOptions {
  icon?: string;
  text: string;
  seperator: boolean;
  value: any;
  className?: string;
  inner?: {
    text: string;
    icon?: string;
  };
}
