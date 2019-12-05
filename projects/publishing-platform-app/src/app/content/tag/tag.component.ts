import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { ReplaySubject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { UtilService } from '../../core/services/util.service';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';
import { Content } from '../../core/services/models/content';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit, OnDestroy {
  @ViewChild(NgxMasonryComponent, {static: false}) masonry: NgxMasonryComponent;
  contents: Content[] = [];
  tagName: string = '';
  listType: string = 'grid';
  startFromUri = null;

  isMasonryLoaded: boolean = false;
  myOptions: NgxMasonryOptions = {
    transitionDuration: '0s',
    itemSelector: '.story--grid',
    gutter: 10,
    horizontalOrder: true
  };

  seeMoreLoading: boolean = false;
  blockInfiniteScroll: boolean = false;
  seeMoreChecker: boolean = false;

  unsubscribe$ = new ReplaySubject<void>(1);

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private contentService: ContentService,
              public translateService: TranslateService,
              private utilService: UtilService) { }

  ngOnInit() {
    this.router.events
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.seeMoreLoading = false;
        this.blockInfiniteScroll = false;
        this.seeMoreChecker = false;
        this.startFromUri = null;
      }
    });
    this.activeRoute.paramMap.pipe(
        switchMap(params => {
          this.tagName = params.get('id');
          return this.contentService.getTagArticles(this.tagName, this.startFromUri);
        }),
        takeUntil(this.unsubscribe$)
    )
    .subscribe(contentsList => {
      this.contents = contentsList.data;
      this.seeMoreChecker = contentsList.more;
      this.seeMoreLoading = false;
      this.calculateLastStoriUri();
    });
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

  onTagClick(tagName) {
    this.router.navigate([`/content/t/`, tagName]);
  }

  onPublicationClick(event) {
    this.utilService.routerChangeHelper('publication', event.slug);
  }

  onContentClick(event) {
    this.utilService.routerChangeHelper('content', event);
  }

  onAccountClick(event) {
    this.utilService.routerChangeHelper('account', event.slug);
  }

  seeMore() {
    this.seeMoreLoading = true;
    this.blockInfiniteScroll = true;
    this.contentService.getTagArticles(this.tagName, this.startFromUri)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        (data: any) => {
          this.seeMoreChecker = data.more;
          this.seeMoreLoading = false;
          this.contents = this.contents.concat(data.data);
          this.blockInfiniteScroll = false;
          this.calculateLastStoriUri();
        }
      );
  }

  calculateLastStoriUri() {
    const lastIndex = this.contents.length - 1;
    if (this.contents[lastIndex].uri !== this.startFromUri) {
      this.startFromUri = this.contents[lastIndex].uri;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
