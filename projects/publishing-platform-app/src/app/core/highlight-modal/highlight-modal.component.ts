import { Component, ElementRef, EventEmitter, Inject, PLATFORM_ID, ViewChild, OnInit, OnDestroy, OnChanges, HostListener, Input, Output, SimpleChanges } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UtilService } from '../services/util.service';
import { Content } from '../services/models/content';

@Component({
  selector: 'app-highlight-modal',
  templateUrl: './highlight-modal.component.html',
  styleUrls: ['./highlight-modal.component.scss']
})
export class HighlightModalComponent implements OnInit, OnChanges, OnDestroy {
  @Output('timeFinished') timeFinished = new EventEmitter();
  @Input('highlight') highlight: Content = null;
  public highlightImage: string = null;
  public highlightImageLoaded: boolean = false;

  constructor(
    public utilService: UtilService,
    private elRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  ngOnChanges(change: SimpleChanges) {
    if (change.highlight) {
      const timer = this.elRef.nativeElement.querySelector('.highlight__timer');
      timer.style.animationName = 'highlight-timer-reset';
      setTimeout(() => {
        timer.style.animationName = 'highlight-timer';
      });

      if (this.highlight.highlightBackground) {
        this.highlightImage = null;
        this.highlightImageLoaded = true;
        return;
      }

      this.highlightImage = this.highlight.cover.thumbnail;
      this.highlightImageLoaded = false;

      const d = new Image();
      d.onload = (e) => {
        this.highlightImage = this.highlight.cover.url;
        this.highlightImageLoaded = true;
      };
      d.src = this.highlight.cover.url;
    }
  }

  @HostListener('click', ['$event']) highlightClick(event) {
    if (event.target === this.elRef.nativeElement) {
      this.timeFinished.emit(null);
    }
  }

  onFinished() {
    this.timeFinished.emit(this.highlight);
  }

  ngOnDestroy () {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = null;
    }
  }
}
