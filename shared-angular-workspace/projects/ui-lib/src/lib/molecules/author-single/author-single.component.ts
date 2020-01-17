import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AnimationProperties } from '../../../core/models/animation-options';
import { Avatar, AvatarOptions } from '../../../core/models/avatar';

@Component({
  selector: 'ui-author-single',
  templateUrl: './author-single.component.html',
  styleUrls: ['./author-single.component.scss'],
})

export class AuthorSingleComponent implements OnInit {
  @Input('authorData') authorData: Avatar = null;
  @Input() className: string = '';
  @Input('currUserPbKey') currUserPbKey: string;
  @Output() follow = new EventEmitter<any>();
  @Output() getAuthorKey = new EventEmitter<any>(); // animation action
  public animationAction: boolean; // (un)follow icons an
  public animationOptions: AnimationProperties | any; // (un)follow icons animation options
  public changeIcon: boolean = false;

  constructor(public translateService: TranslateService) {}

  ngOnInit(): void {
    this.animationAction = false;
    this.animationOptions = {type: 'user', loop: 0.5};
  }

  animate(animate: boolean) {
    this.animationAction = animate;
  }

  createOptions(name: string) {
    return  {...this.animationOptions, name: name};
  }

  onFollow(follow) {
    this.follow.emit({slug: this.authorData.slug, follow: follow});
    this.authorData.subscribed = follow;
  }

  getAuthorData(event) {
    event.preventDefault();
    this.getAuthorKey.emit(this.authorData.slug);
  }

}
