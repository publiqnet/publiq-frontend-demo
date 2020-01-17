import { Component, Input, OnInit } from '@angular/core';
import { UtilService } from '../../../core/services/util.service';
import { Avatar } from '../../../core/models/avatar';

@Component({
  selector: 'ui-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  @Input('avatarData') avatarData: Avatar = null;
  @Input('isSquaric') isSquaric: boolean = false;
  @Input('size') size: string = 'medium';
  @Input('loadOriginalImg') loadOriginalImg: boolean = true;
  @Input() multiLetters: boolean = true;
  @Input() className: string;
  public thumbnailLoaded: boolean = false;
  public originalImageLoaded: boolean = false;

  constructor (public utilService: UtilService) {}

  ngOnInit(): void {
    this.avatarData = (this.avatarData.constructor.name !== 'Avatar') ? new Avatar(this.avatarData) : this.avatarData;
  }

  getClassNames() {
    const classes = [];

    if (['xsmall', 'large', 'mediumPublication', 'xsmallPublication'].indexOf(this.size) !== -1) {
      classes.push(`avatar--${this.size}`);
    }

    if (this.showLetters()) {
      classes.push(`avatar--background`);
    }

    return classes;
  }

  onImageError(event, imgTye: string) {
    if (imgTye === 'thumbnail') {
      this.thumbnailLoaded = null;
    } else {
      this.originalImageLoaded = null;
    }
  }

  onImageLoaded(event: Event, imgTye: string) {
    if (imgTye === 'thumbnail') {
      this.thumbnailLoaded = true;
    } else {
      this.originalImageLoaded = true;
    }
  }

  showLetters() {
    return !this.avatarData.image && !this.avatarData.thumbnail;
  }

  showOriginal() {
    return this.avatarData.image && ((this.loadOriginalImg && (!this.avatarData.thumbnail || this.thumbnailLoaded || this.thumbnailLoaded === null)) ||
      (!this.loadOriginalImg && (!this.avatarData.thumbnail || this.thumbnailLoaded === null)));
  }

  showThumbnail() {
    return this.avatarData.thumbnail && (!this.loadOriginalImg || (this.loadOriginalImg && (!this.originalImageLoaded || this.originalImageLoaded === null || !this.avatarData.image)));
  }

  showSkeleton() {
    return (!this.loadOriginalImg && this.avatarData.thumbnail && !this.thumbnailLoaded) || ((this.loadOriginalImg || !this.avatarData.thumbnail) && this.avatarData.image  && !this.originalImageLoaded && !this.thumbnailLoaded);
  }
}
