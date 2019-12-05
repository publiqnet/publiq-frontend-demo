import { EventEmitter } from '@angular/core';
import { FormControlHelper } from '../../../core/classes/formControlHelper';
export declare class ImageUploadComponent extends FormControlHelper {
    disabled: boolean;
    readonly: boolean;
    inputId: string;
    heading: string;
    subheading: string;
    imageUrl: string;
    _onChange: EventEmitter<any>;
    filename: string;
    onImageChange(event: any): void;
    removeImage(): void;
    updatePlaceholder(files: any): void;
}
