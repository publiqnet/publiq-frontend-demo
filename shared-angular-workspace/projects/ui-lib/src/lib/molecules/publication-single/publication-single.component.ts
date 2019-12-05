import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Avatar } from '../../../core/models/avatar';
import { PublicationDataOptions } from '../../../core/models/publicationData';
import { ListItemOptions } from '../../../core/models/listItem';
import { TranslateService } from '@ngx-translate/core';
import { AnimationProperties } from '../../../core/models/animation-options';

enum PublicationSingleType {
  follow = 'follow',
  invitation = 'invitation',
  search = 'list',
  staff = 'staff'
}

@Component({
  selector: 'ui-publication-single',
  templateUrl: './publication-single.component.html',
  styleUrls: ['./publication-single.component.scss'],
})

export class PublicationSingleComponent implements OnInit, OnChanges {
  @Input('type') type: PublicationSingleType = PublicationSingleType.follow;
  @Input('publicationData') publicationData: PublicationDataOptions = null;
  @Input() userNotificationData: ListItemOptions = null;
  @Input() className: string = '';
  @Input() isOwner: boolean = false;
  @Output() follow = new EventEmitter<any>();
  @Output() invitationAnswer = new EventEmitter<any>();
  @Output() getPublicationSlug = new EventEmitter<any>();
  @Output() getSelectedMember = new EventEmitter<any>();
  @Output() onNotificationClick = new EventEmitter<any>();
  public avatarData: Avatar = null;
  public animationAction: boolean; // (un)follow icons animation action
  public animationOptions: AnimationProperties | any; // (un)follow icons animation options
  public statusList = {
    1: this.translateService.instant('ui.publication-single.owner'),
    2: this.translateService.instant('ui.publication-single.editor'),
    3: this.translateService.instant('ui.publication-single.contributor'),
  };

  constructor(public translateService: TranslateService) {}

  ngOnInit(): void {
    this.animationAction = false;
    this.animationOptions = {type: 'user', loop: 0.5};
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.buildAvatarData();
  }

  buildAvatarData() {
    this.avatarData = new Avatar({
      first_name: this.publicationData ? this.publicationData.title : null,
      image: this.publicationData ? (this.publicationData.logo ? this.publicationData.logo : this.publicationData.cover) : null
    });
  }

  onFollow(follow) {
    this.follow.emit({slug: this.publicationData.slug, follow: follow});
    this.publicationData.following = follow;
  }

  invAnswer(answer) {
    this.invitationAnswer.emit({answer: answer, publicationSlug: this.publicationData.slug});
  }

  getPublicationData(event) {
    event.preventDefault();
    this.getPublicationSlug.emit(this.publicationData.slug);
  }

  _getSelectedMember(member) {
    this.getSelectedMember.emit(member);
  }

  _onNotificationClick (data) {
    this.onNotificationClick.emit(data);
  }

  animate(animate: boolean) {
      this.animationAction = animate;
  }

  createOptions(name: string) {
    return  {...this.animationOptions, name: name};
  }
}
