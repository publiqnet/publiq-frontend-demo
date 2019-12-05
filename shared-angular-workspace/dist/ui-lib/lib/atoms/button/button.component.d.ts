import { EventEmitter } from '@angular/core';
export declare class ButtonComponent {
    text: string;
    type: string;
    size: string;
    iconClassName: string;
    fullRadius: boolean;
    iconButton: boolean;
    isFollowing: boolean;
    className: string;
    name: string;
    disabled: boolean;
    btnClicked: EventEmitter<any>;
    handleBtnClick(event: any): void;
    getClassNames(): string[];
}
