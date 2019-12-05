import { Component, Input, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { getIconByType } from '../../../assets/icons/icons.animation';
import { AnimationProperties } from '../../../core/models/animation-options';

enum IconType {
  social = 'social',
}
@Component({
  selector: 'ui-icon',
  templateUrl: './icon.component.html',
  styles: ['ng-lottie > ::ng-deep div { display: inline-block; }']
})
export class IconComponent implements OnInit, OnChanges {
  @Input() size: number = 60;
  @Input() animationOptions: AnimationProperties;
  @Input() action: boolean = false;
  private animationItem: AnimationItem;

  constructor(private ngZone: NgZone) {
  }

  options: AnimationOptions;

  ngOnInit() {
    this.options = {
      animationData: getIconByType(this.animationOptions.name, this.animationOptions.type),
      loop: this.animationOptions.loop || true
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.options = {
      animationData: getIconByType(this.animationOptions.name, this.animationOptions.type),
      loop: this.animationOptions.loop || true
    };
    if (changes['action'] && !changes['action'].firstChange) {
      this.playAnimation();
      this.options = {
        animationData: getIconByType(this.animationOptions.name, this.animationOptions.type),
        loop: this.animationOptions.loop || true
      };
    }
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
    this.ngZone.run(() => this.animationItem.stop());
  }

  playAnimation() {
    if (this.action) {
      this.ngZone.run(() => this.animationItem.play());
    } else {
      this.ngZone.run(() => this.animationItem.stop());
    }
  }
}
