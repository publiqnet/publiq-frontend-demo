import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.scss']
})
export class CropImageComponent implements OnInit {
  @Input('imageFile') imageFile: any = '';
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();
  public croppedImage: ImageCroppedEvent;
  public hideModal: boolean = true;
  public showLoader: boolean = true;

  constructor() { }
  ngOnInit() {
  }
  imageLoaded() {
    this.hideModal = false;
    this.showLoader = false;
  }
  cropperReady() {
  }
  loadImageFailed() {
  }
  _cancel() {
    this.hideModal = true;
    this.cancel.emit(true);
  }
  _save() {
    this.hideModal = true;
    this.save.emit(this.croppedImage);
  }

}
