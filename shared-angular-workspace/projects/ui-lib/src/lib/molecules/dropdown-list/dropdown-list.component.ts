import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { FormControlHelper } from '../../../core/classes/formControlHelper';
import { ListItemOptions } from '../../../core/models/listItem';
import { DropdownDataOptions } from '../../../core/models/dropdownData';
import { PublicationOptions } from '../../../core/models/contentPublication';

enum Positions {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left'
}

@Component({
  selector: 'ui-dropdown-list',
  templateUrl: './dropdown-list.component.html',
  styleUrls: ['./dropdown-list.component.scss'],
  providers: [FormControlHelper.controlValueAccessor(DropdownListComponent)]
})

export class DropdownListComponent extends FormControlHelper {
  @Input() delta: number = 0;
  @Input() userPublicKey: string;
  @Input() position: string = Positions.TOP;
  @Input() icon: string = null;
  @Input() isDark: boolean = false;
  @Input() items: ListItemOptions[] = null;
  @Input() publicationList: PublicationOptions[];
  @Input() type: string = 'default';
  @Input() isChannelPrivate: boolean = null;
  @Input() listClassName: string = null;
  @Input() shadowed: boolean = false;
  @Input() openerClassName: string = null;
  @Input() optionsData: DropdownDataOptions[];
  @Input() selectedPublication: any;
  @Output() onItemSelect: EventEmitter<any> = new EventEmitter();
  @Input() isOpen: boolean = false;
  @Output() isOpenChange: EventEmitter<any> = new EventEmitter();
  @Output() seeMore: EventEmitter<any> = new EventEmitter<any>();
  @Output() articleShared = new EventEmitter<string>();
  public hoverFacebook: boolean = false;
  public hoverTwitter: boolean = false;
  public hoverLinkedin: boolean = false;
  public hoverReddit: boolean = false;
  @Input() blockInfiniteScroll: boolean = false;
  @Input() seeMoreLoading: boolean = false;

  public directions = {
    [Positions.TOP]: 'top',
    [Positions.LEFT]: 'left',
    [Positions.RIGHT]: 'right',
    [Positions.BOTTOM]: 'bottom',
  };

  toggleOpen() {
    this.isOpen = !this.isOpen;
    this.isOpenChange.emit(this.isOpen);
  }

  listStyle() {
    if (['top', 'bottom'].indexOf(this.directions[this.position]) !== -1) {
      return {
        [this.delta < 0 ? 'left' : 'right']: this.wrapPx(-(Math.abs(this.delta) + 5))
      };
    } else if (['left', 'right'].indexOf(this.directions[this.position]) !== -1) {
      return {
        [this.delta < 0 ? 'bottom' : 'top']: this.wrapPx(-(Math.abs(this.delta) + 5))
      };
    }
  }

  cursorStyle() {
    if (['top', 'bottom'].indexOf(this.directions[this.position]) !== -1) {
      return {
        [this.delta < 0 ? 'left' : 'right']: this.wrapPx(10 + Math.abs(this.delta))
      };
    } else if (['left', 'right'].indexOf(this.directions[this.position]) !== -1) {
      return {
        [this.delta < 0 ? 'bottom' : 'top']: this.wrapPx(10 + Math.abs(this.delta))
      };
    }
  }

  selectValue(value, event?) {
    if (event) {
      event.preventDefault();
    }
    this.onItemSelect.emit(value);
    this.selectedPublication = value;
    if (!value.stayOpen) {
      this.isOpen = false;
      this.isOpenChange.emit(false);
    }
  }

  closeDropdown(event) {
    if (event == 'close') {
      this.isOpen = !this.isOpen;
    }
  }

  wrapPx(a): string {
    return `${a}px`;
  }

  onSeeMoreEvent(event) {
    this.seeMore.emit(event);
  }

  _articleShared(platform: string) {
    this.articleShared.emit(platform);
  }

  animateFacebook(animate: boolean) {
    this.hoverFacebook = animate;
  }

  animateTwitter(animate: boolean) {
    this.hoverTwitter = animate;
  }

  animateLinkedin(animate: boolean) {
    this.hoverLinkedin = animate;
  }

  animateReddit(animate: boolean) {
    this.hoverReddit = animate;
  }

  setPath(type: string) {
    switch (type) {
      case 'new-story' :
        return '/content/newcontent';
      case 'publications' :
        return 'p/my-publications';
      case 'profile' :
        return `a/${this.userPublicKey}`;
      case 'wallet' :
        return 'https://wallet.publiq.network/user/login';
    }
  }

  useAsLink(type: string) {
    return ['new-story', 'publications', 'profile', 'wallet'].includes(type);
  }
}

