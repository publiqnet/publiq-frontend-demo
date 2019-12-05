import { Directive, ElementRef, Output, EventEmitter, HostListener, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[uiClickOutside]'
})
export class ClickOutsideDirective implements OnInit, OnDestroy {
  public _onClick = null;
  constructor(private _elementRef: ElementRef,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  @Output()
  public uiClickOutside = new EventEmitter();

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this._onClick = this.onClick.bind(this);
        (document as any).addEventListener('click', this._onClick);
      });
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      (document as any).removeEventListener('click', this._onClick);
    }
  }

  onClick(event) {
    const clickedInside = this._elementRef.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.uiClickOutside.emit(event);
    }
  }
}
