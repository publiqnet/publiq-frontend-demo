import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';
import { ContentService } from '../../core/services/content.service';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { fromEvent, ReplaySubject } from 'rxjs';
import { Image } from '../../core/services/models/gallery-image';
import { DOCUMENT } from '@angular/common';
declare const $: any;

@Component({
  selector: 'app-gallery-modal',
  templateUrl: './gallery-modal.component.html',
  styleUrls: ['./gallery-modal.component.scss']
})
export class GalleryModalComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() public closeEvent = new EventEmitter();
  @Output() public insertImage = new EventEmitter();
  @ViewChild('masonry', {static: false}) masonry: NgxMasonryComponent;
  @ViewChild('searchBar', {static: false}) searchBar: ElementRef;
  public blockInfiniteScroll: boolean = false;
  public seeMoreLoading: boolean = false;
  public currentRequestedUri = null;
  public images: Image[];
  public noImages: boolean = false;
  public seeMoreChecker = true;
  public isMasonryLoaded = false;
  public showItems: boolean = false;
  public myOptions: NgxMasonryOptions = {
    transitionDuration: '0s',
    itemSelector: '.gallery-items__item',
    horizontalOrder: true,
  };
  private imageDefaultCount: number = 10;
  private startFromUri: string = null;
  private unsubscribe$ = new ReplaySubject<void>(1);
  private tag: string;
  constructor(private contentService: ContentService,
              @Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.seeMoreLoading = true;
    this.contentService.getGalleryImages(this.startFromUri, this.imageDefaultCount)
      .pipe(
        tap((items) => {
          this.images = items.images;
          this.noImages = this.images.length ? false : true;
          this.seeMoreChecker = items.more;
          this.seeMoreLoading = false;
          this.calculateLastImageiUri();
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
    fromEvent(this.document, 'keydown')
      .pipe(
        tap((event) => {
          if (event['key'] === 'Escape') {
            this.close();
          }
        }),
        takeUntil(this.unsubscribe$))
      .subscribe();
  }

  ngAfterViewInit() {
    this.showItems = true;
    this.searchBar.nativeElement.focus();
    fromEvent(this.searchBar.nativeElement, 'input').pipe(
      debounceTime(600),
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (event: KeyboardEvent) => {
        this.tag = event['srcElement']['value'];
        this.onInputChange();
      }
    );
  }

  seeMore() {
    if (this.currentRequestedUri != this.startFromUri) {
      this.seeMoreLoading = true;
      this.blockInfiniteScroll = true;
      const observable = this.tag ?
        this.contentService.getGalleryImagesByTag(this.tag, this.startFromUri, this.imageDefaultCount) :
        this.contentService.getGalleryImages(this.startFromUri, this.imageDefaultCount);

      observable
        .pipe(
          tap((items) => {
            if (items.images.length) {
              this.images.push(...items.images);
            }
            this.seeMoreChecker = items.more;
            this.seeMoreLoading = false;
            this.blockInfiniteScroll = false;
            if (items.images.length) {
              this.calculateLastImageiUri();
            }
          }),
          takeUntil(this.unsubscribe$)
        ).subscribe();
    }
  }

  onLayoutComplete(event) {
    if (event && event.length > 1) {
      this.isMasonryLoaded = true;
    }
    if (this.masonry) { // todo @Sam think to move this into AftherViewInit
      this.masonry.reloadItems();
      this.masonry.layout();
    }
  }

  close() {
    this.searchBar.nativeElement.blur();
    this.closeEvent.emit(true);
  }

  insertInFroala(img: Image) {
    this.searchBar.nativeElement.blur();
    this.insertImage.emit({url: img.url, sanitize: true, data: {uri: img.uri, link: img.url}, existingImage: '', response: `{"uri": "${img.uri}", "link": "${img.url}"}`});
  }

  calculateLastImageiUri() {
    const lastIndex = this.images.length - 1;
    if (this.images[lastIndex].uri !== this.startFromUri) {
      this.startFromUri = this.images[lastIndex].uri;
    }
  }

  onInputChange() {
    this.noImages = false;
    this.seeMoreLoading = true;
    this.blockInfiniteScroll = true;
    const observable = this.tag ?
      this.contentService.getGalleryImagesByTag(this.tag, null, this.imageDefaultCount) :
      this.contentService.getGalleryImages(null, this.imageDefaultCount);
    observable
      .pipe(
        tap((items) => {
          this.images = [];
          if (items.images.length) {
            this.images.push(...items.images);
          } else {
            this.noImages = true;
          }
          this.seeMoreChecker = items.more;
          this.seeMoreLoading = false;
          this.blockInfiniteScroll = false;
          if (items.images.length) { this.calculateLastImageiUri(); }
          this.masonry.reloadItems();
          this.masonry.layout();
        }),
        takeUntil(this.unsubscribe$)
      ).subscribe();

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
