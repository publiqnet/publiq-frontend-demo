import { FormControlHelper } from '../../../core/classes/formControlHelper';
export declare class TextareaComponent extends FormControlHelper {
    placeholder: string;
    rows: number;
    cols: number;
    maxlength: number;
    resize: boolean;
    className: string;
    getClassNames(): any[];
}
