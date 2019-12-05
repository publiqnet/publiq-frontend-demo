import { EventEmitter } from '@angular/core';
import { FormControlHelper } from '../../../core/classes/formControlHelper';
import { ListItemOptions } from '../../../core/models/listItem';
import { DropdownDataOptions } from '../../../core/models/dropdownData';
import { PublicationOptions } from '../../../core/models/contentPublication';
declare enum Positions {
    TOP = "top",
    RIGHT = "right",
    BOTTOM = "bottom",
    LEFT = "left"
}
export declare class DropdownListComponent extends FormControlHelper {
    delta: number;
    userPublicKey: string;
    position: string;
    icon: string;
    isDark: boolean;
    items: ListItemOptions[];
    publicationList: PublicationOptions[];
    type: string;
    isChannelPrivate: boolean;
    listClassName: string;
    shadowed: boolean;
    openerClassName: string;
    optionsData: DropdownDataOptions[];
    selectedPublication: any;
    onItemSelect: EventEmitter<any>;
    isOpen: boolean;
    isOpenChange: EventEmitter<any>;
    seeMore: EventEmitter<any>;
    articleShared: EventEmitter<string>;
    hoverFacebook: boolean;
    hoverTwitter: boolean;
    hoverLinkedin: boolean;
    hoverReddit: boolean;
    blockInfiniteScroll: boolean;
    seeMoreLoading: boolean;
    directions: {
        [Positions.TOP]: string;
        [Positions.LEFT]: string;
        [Positions.RIGHT]: string;
        [Positions.BOTTOM]: string;
    };
    toggleOpen(): void;
    listStyle(): {
        [x: string]: string;
    };
    cursorStyle(): {
        [x: string]: string;
    };
    selectValue(value: any, event?: any): void;
    closeDropdown(event: any): void;
    wrapPx(a: any): string;
    onSeeMoreEvent(event: any): void;
    _articleShared(platform: string): void;
    animateFacebook(animate: boolean): void;
    animateTwitter(animate: boolean): void;
    animateLinkedin(animate: boolean): void;
    animateReddit(animate: boolean): void;
    setPath(type: string): string;
    useAsLink(type: string): boolean;
}
export {};
