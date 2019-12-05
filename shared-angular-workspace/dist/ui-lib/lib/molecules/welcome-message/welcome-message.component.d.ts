import { EventEmitter } from '@angular/core';
declare enum MessageState {
    default = "default",
    invalid = "invalid",
    sent = "sent",
    alread_have = "already_have"
}
declare enum MessageType {
    welcome_to_media = "welcome_to_media",
    welcome_to_media_loading = "welcome_to_media_loading",
    start_earning = "start_earning"
}
export declare class WelcomeMessageComponent {
    type: MessageType;
    state: MessageState;
    onClosed: EventEmitter<any>;
    onSubmit: EventEmitter<any>;
    emailAddress: any;
    _onClosed(): void;
    _onSubmit(event: any): void;
}
export {};
