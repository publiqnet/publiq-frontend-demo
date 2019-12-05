import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { getLoaderByColor } from '../../../assets/loaders/loader.animations';

enum LoaderType {
  blue = 'blue',
  grey = 'grey',
  multi = 'multi',
  white = 'white'
}

@Component({
  selector: 'ui-loader',
  templateUrl: './loader.component.html',
  styles: ['ng-lottie > ::ng-deep div { display: inline-block; }']
})
export class LoaderComponent implements OnInit, OnChanges {
  constructor() { }
  @Input() type: LoaderType = null;
  @Input() size: number = 60;
  @Input() color: string = 'multi';

  options: AnimationOptions = {
    animationData: getLoaderByColor(this.color)
  };

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.options  = {
        animationData: getLoaderByColor(this.color)
      };
  }

  animationCreated(animationItem: AnimationItem): void {
    // console.log(animationItem);
  }
}
