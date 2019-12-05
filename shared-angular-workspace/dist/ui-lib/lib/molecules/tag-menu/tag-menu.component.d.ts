import { EventEmitter } from '@angular/core';
import { TagMenuItemOptions } from '../../../core/models/tagMenu';
import { SelectedDataOptions } from '../../../core/models/tagMenuSelectedData';
export declare class TagMenuComponent {
    tagItems: TagMenuItemOptions[];
    onTagItemSelect: EventEmitter<SelectedDataOptions>;
    isOpen: boolean;
    isOpenChange: EventEmitter<any>;
    onClickedOutside: EventEmitter<any>;
    selectItem(event: any, item: SelectedDataOptions): void;
    _onClickedOutside(event: any): void;
}
