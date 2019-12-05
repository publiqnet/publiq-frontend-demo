import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControlHelper } from '../../../core/classes/formControlHelper';

@Component({
  selector: 'ui-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  providers: [FormControlHelper.controlValueAccessor(ImageUploadComponent)]
})
export class ImageUploadComponent extends FormControlHelper {
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() inputId: string = '';
  @Input() heading: string = 'Upload avatar';
  @Input() subheading: string = '(Up to 1MB, 288px by 288px recommended)';
  @Input() imageUrl: string = null;
  @Output() _onChange = new EventEmitter<any>();

  public filename: string = '';

  onImageChange(event) {
    this._onChange.emit(event.target.files);
    this.updatePlaceholder(event.target.files);
    this.onChange(event.target.files);
  }

  removeImage() {
    this.filename = '';
    this.imageUrl = '';
    this._onChange.emit('');
    this.onChange('');
  }

  updatePlaceholder(files) {
    if (files && files[0]) {
      const d = new FileReader();
      d.onload = () => {
        this.imageUrl = d.result.toString();
        this.filename = files[0].name;
      };
      d.readAsDataURL(files[0]);
    }
  }
}
