import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ContentService } from '../services/content.service';
import { SeoService } from '../services/seo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, ReplaySubject } from 'rxjs';
import { filter, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { AccountService } from '../services/account.service';
import { UtilService } from '../services/util.service';
import { SharedDataService } from '../services/shared-data.service';
import { Account } from '../services/models/account';
import { Content } from '../services/models/content';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';
import * as Fingerprint2 from 'fingerprintjs2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, AfterViewInit, OnDestroy {
  public article;
  public loading = true;
  public enableLoading = false;
  public documentElement: any = null;
  public loadedContentsList = {};
  public loadedContentsKeys = [];
  public nextArticleToLoad = null;
  public firstArticleUri = null;
  public currentUri = null;
  public isBrowser = false;
  public isServer = false;
  public seoData;
  public fingerprint: string = '';
  public env = environment;
  public loadingArticle: boolean = true;
  private unsubscribe$ = new ReplaySubject<void>(1);
  author: any;

  @ViewChildren('relatedBlock') relatedBlocks: QueryList<ElementRef>;
  @ViewChild('content', {static: false}) content: ElementRef;

  constructor(
    private ngZone: NgZone,
    private contentService: ContentService,
    private activatedRoute: ActivatedRoute,
    public utilService: UtilService,
    public seoService: SeoService,
    private router: Router,
    public translateService: TranslateService,
    protected sanitizer: DomSanitizer,
    private accountService: AccountService,
    private sharedData: SharedDataService,
    private _elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isServer = isPlatformServer(this.platformId);
    if (this.isBrowser) {
      this.documentElement = (window.document.documentElement || window.document.body) as any;
    }
    this.activatedRoute.params
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((params: any) => {
        this.firstArticleUri = params.uri;
        this.currentUri = params.uri;
        if (isPlatformServer(this.platformId)) {
          this.contentService.getContentSeoByUri(params.uri)
            .subscribe((data: any) => {
              this.seoData = data;
              this.updateSeoTags(data);
            });
        } else {
          Fingerprint2.get({}, (components) => {
            const fingerprint = Fingerprint2.x64hash128(components.map(function (component) { return component.value; }).join(''), 31).trim();
            this.fingerprint = fingerprint;
            this.getArticleData(params.uri, true);
          });
        }
      });
  }

  ngAfterViewInit() {
    this.accountService.followAuthorChanged
      .pipe(
        filter((data) => data.from === 'header'),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(data => {
        this.toggleStatus(data);
        this.cdr.detectChanges();
    });

    interval(100).pipe(
      tap(() => {
        if (this.content) {
          this.content.nativeElement.addEventListener('load', (event) => {
            let uri;
            if (event.target && event.target.dataset && event.target.dataset.uri) {
              uri = event.target.dataset.uri;
            } else if (event.path && event.path[0]) {
              uri = event.path[0]['dataset']['uri'];
            } else {
              return false;
            }
            if (!uri) { return; }

            const containerDiv: HTMLDivElement = this.renderer.parentNode(this.document.getElementById(uri));
            this.renderer.setStyle(this.document.getElementById(uri), 'display', 'none');
            this.renderer.removeChild(containerDiv, this.document.getElementById(uri));
            this.renderer.setStyle(containerDiv && containerDiv.firstChild, 'display', 'block');
            this.cdr.detectChanges();
          }, true);

          this.content.nativeElement.addEventListener('error', (event) => {
            this.renderImgErrors(event);
            this.cdr.detectChanges();
          }, true);
        }
      }),
      takeWhile(() => !this.content)
    ).subscribe();

  }

  getArticleData(uri, init = false) {
    if (!uri) {
      return;
    }
    this.contentService.getContentByUri(uri, this.fingerprint).subscribe((data: any) => {
      if (data.status === 'pending') {
        this.router.navigate([`/page-not-found`]);
        return;
      }
      this.loadingArticle = false;
      if (data.files && data.files.length) {
        this.addSkeleton(data);
        let loadedFilesCount: number = 0;
        data.files.forEach((file) => {
          if (file.mimeType == 'text/html') {
            this.contentService.getFileContentFromUrl(file.url)
            .subscribe(
            fileText => {
              loadedFilesCount++;
              if (loadedFilesCount == data.files.length) {
                this.filesLoaded(data, init, uri);
              }
              const skeletonRegExp = RegExp(`<div id="${file.uri}".*?><\/div>`, 'g');
              data.text = data.text.split(skeletonRegExp).join(fileText);
            },
            error => {
              if (error.url === file.url) {
                data.text = data.text.split(RegExp(`<div id="${file.uri}".*?><\/div>`, `g`) ).join(this.textSkeletonError(file['uri']));
                loadedFilesCount++;
              }
              if (loadedFilesCount == data.files.length) {
                this.filesLoaded(data, init, uri);
              }
            });
          } else {
            loadedFilesCount++;
            if (loadedFilesCount == data.files.length) {
              this.filesLoaded(data, init, uri);
            }
          }
        });
      } else {
        this.addSkeleton(data);
        this.filesLoaded(data, init, uri);
      }
    });
  }

  filesLoaded(data, init, uri) {
    let article = null;
    data.text = `${data.text}`;
    article = data;
    article.related = article.related.map(relatedArticle => new Content(relatedArticle));
    article.isMyArticle = this.accountService.loggedIn() && article.author && this.accountService.accountInfo.publicKey == article.author.publicKey;
    if (init) {
      this.sharedData.currentArticle.next(article);
    }

    this.loadedContentsList[uri] = article;
    this.nextArticleToLoad = this.getNextRelatedArticle(article);
    this.loadedContentsKeys = Object.keys(this.loadedContentsList);
    this.enableLoading = false;
    this.cdr.detectChanges();
  }

  formatDate(date, format) {
    return moment(date * 1000).format(format);
  }

  updateSeoTags(article) {
    this.seoService.updateTags({
      title: article.title,
      description: article.description ? article.description : '',
      url: environment.main_site_url + `/s/` + article.uri,
      image: article.socialImage || null,
      type: 'article'
    });
  }

  follow(author, uri: string) {
    author.subscribed = true;
    this.ngZone.run(() => {
      this.toggleStatus({uri: uri, following: true});
      this.accountService.follow(author.publicKey)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe((_author: Account) => {
          this.contentService.updateSearchData = true;
          this.accountService.followAuthorChanged.next({from: 'article', uri: uri, following: true});
        });
    });
  }

  unfollow(author, uri: string) {
    author.subscribed = false;
    this.ngZone.run(() => {
      this.toggleStatus({uri: uri, following: false});
      this.accountService.unfollow(author.publicKey)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe((_author: Account) => {
          this.contentService.updateSearchData = true;
          this.accountService.followAuthorChanged.next({from: 'article', uri: uri, following: false});
        });
    });
  }

  getNextRelatedArticle(article) {
    for (let i = 0; i < article.related.length; ++i) {
      if (article.related[i].uri in this.loadedContentsList) {
        continue;
      }

      return article.related[i].uri;
    }
  }

  @HostListener('window:scroll', [])
  _scrollListener() {
    if (this.isBrowser) {
      const scrollTop = this.documentElement.scrollTop || document.body.scrollTop;

      const seperators = [].map.call(
        this._elementRef.nativeElement.querySelectorAll('.article__related__title'),
        a => a.offsetTop
      ).concat([scrollTop]).sort((a, b) => a - b);

      const _currCoordIndex = seperators.indexOf(scrollTop);
      const _prevCoord = seperators[_currCoordIndex - 1] || 0;
      const _nextCoord = seperators[_currCoordIndex + 1] || seperators[_currCoordIndex];

      this.sharedData.articleReadPercent = (scrollTop - _prevCoord) / (_nextCoord - _prevCoord) * 100;

      if (scrollTop > 100) {
        if (!this.sharedData.headerSecondActive) {
          this.sharedData.headerSecondActive = true;
        }
      } else {
        this.sharedData.headerSecondActive = false;
      }

      if (this.loadedContentsKeys[_currCoordIndex] && this.currentUri !== this.loadedContentsKeys[_currCoordIndex]) {
        this.currentUri = this.loadedContentsKeys[_currCoordIndex];
        this.sharedData.currentArticle.next(this.loadedContentsList[this.currentUri]);
        this.updateSeoTags(this.loadedContentsList[this.currentUri]);
        if (this.isBrowser) {
          window.history.pushState({url: this.loadedContentsList[this.currentUri]}, this.loadedContentsList[this.currentUri].title, `/s/` + this.loadedContentsList[this.currentUri].uri);
        }
      }

      if (this.isBrowser) {
        if (scrollTop >= this.documentElement.scrollHeight - window.innerHeight && this.nextArticleToLoad) {
          this.enableLoading = true;
          this.getArticleData(this.nextArticleToLoad);
        }
      }
    }
  }

  editArticle(uri) {
    this.ngZone.run(() => this.router.navigate([`/content/edit/`, uri])).then();
  }

  onTagClick(tagName) {
    this.ngZone.run(() => this.router.navigate([`/content/t/`, tagName])).then();
  }

  onPublicationClick(event, slug) {
    if (event) {
      event.preventDefault();
    }
    this.ngZone.run(() => this.utilService.routerChangeHelper('publication', slug));
  }

  onContentClick(event) {
    this.ngZone.run(() => this.utilService.routerChangeHelper('content', event));
  }

  onAccountClick(event) {
    this.ngZone.run(() => this.utilService.routerChangeHelper('account', event.slug));
  }

  private toggleStatus = function toggleArticleFollowStatus(data) {
    this.loadedContentsList[data.uri].author.subscribed = data.following;
    const authorPublicKey = this.loadedContentsList[data.uri].author.publicKey;
    for (const uri in this.loadedContentsList) {
      if (this.loadedContentsList.hasOwnProperty(uri) && uri != data.uri) {
        if (this.loadedContentsList[uri].author.publicKey === authorPublicKey) {
          this.loadedContentsList[uri].author.subscribed = data.following;
        }
      }
    }
  };

  private addSkeleton (data: Content) {
    const imgHtmlTexts: Array<string> = data.text.match(/<img.*?[\/]?>/g) || []; // replacing contents img parts
    if (imgHtmlTexts.length) {
      imgHtmlTexts.forEach((imgHtmlText, index) => {
        if (imgHtmlText && imgHtmlText.match(/data-uri="(.*?)"/) && data.text.includes(imgHtmlText)) {
          let uri = imgHtmlText.match(/data-uri="(.*?)"/)[1];
          uri = uri + `__index_${index}`;
          const width = imgHtmlText.match(/width="(.*?)"/);
          const height = imgHtmlText.match(/height="(.*?)"/);
          const size = imgHtmlText.match(/data-size="(.*?)"/);
          const imgHtmlText1 = imgHtmlText.replace(/data-uri="(.*?)"/, `data-uri="${uri}" style="display: none;"`);
          let skeletonDiv = '';
          if ((width && width[1]) && (height && height[1])) {
            // tslint:disable-next-line:max-line-length
             skeletonDiv = `<div class="image-wrapper ${(size && size[1]) ? size[1] + '-image' : 'defaultsize-image' }">${imgHtmlText1}<div id="${uri}" class="img-skeleton${+(width[1]) <= 560 ? ' img-skeleton--small' : ''}" style="width: ${width[1]}px;"><i class="icon-picture"></i><div style="padding-top: ${+(height[1]) / +(width[1]) * 100}%"></div></div></div>`;
          } else {
             skeletonDiv = `<div class="image-wrapper ${(size && size[1]) ? size[1] + '-image' : 'defaultsize-image' }">${imgHtmlText1}
            <div id="${uri}" class="img-skeleton" style="width: 100%; padding-top: 160px;"><i class="icon-picture"></i></div></div>`;
          }
          data.text = data.text.replace(imgHtmlText, skeletonDiv);
        }
      });
    }
    data.text = data.text.replace(`contenteditable="true"`, 'contenteditable="false"');
    if (!data.files) { return; }
    data.files.forEach((file) => { // replacing contents text part
      if (file['mimeType'] === 'text/html') {
        const skeletonDiv = `<div id="${file['uri']}" style="width: ${this.utilService.getRandomInt(70, 100) + '%'}" class="content-skeleton"></div>`;
        data.text = data.text.split(file['uri']).join(skeletonDiv);
      }
    });
  }

  private textSkeletonError(uri: string) {
    return `<div id="${uri}" style="width : ${this.utilService.getRandomInt(93, 100) + '%'}" class="content-skeleton content-warning">
              <span>The file is not available:</span>
              <span class="uri">${uri}</span>
            </div>`;
  }

  private renderImgErrors(event?, imgUri?: string) {
    const fullUri = imgUri ? imgUri : event.target['dataset']['uri'];
    const uri = fullUri.split(/__index_(\d)/)[0];

    const element: HTMLElement = this.renderer.parentNode(this.document.getElementById(fullUri));
    this.renderer.removeChild(element, element.firstChild);
    if (imgUri && imgUri.split('-cover').length > 1) {
      this.renderer.removeChild(element, element.firstChild);
    }

    const textSpan = this.renderer.createElement('span'); // creating span tag for error
    this.renderer.appendChild(textSpan, this.renderer.createText('The file is not available:'));

    const uriSpan = this.renderer.createElement('span'); // creating span tag for uri
    this.renderer.setAttribute(uriSpan, 'class', 'uri');
    this.renderer.appendChild(uriSpan, this.renderer.createText(uri.split('-cover')[0]));

    const skeletonDiv = this.document.getElementById(fullUri);
    this.renderer.addClass(skeletonDiv, 'img-skeleton');


    this.renderer.appendChild(skeletonDiv, textSpan);
    this.renderer.appendChild(skeletonDiv, uriSpan);
  }

  redirect($event, slug) {
    $event.preventDefault();
    this.ngZone.run(() => this.router.navigate([`/a/`, slug])).then();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.seoService.updateTags();
    this.sharedData.articleReadPercent = 0;
    this.loadedContentsKeys = [];
    this.loadedContentsList = {};
    this.nextArticleToLoad = null;
    this.firstArticleUri = null;
    this.currentUri = null;
    this.sharedData.currentArticle.next(null);
    this.sharedData.headerSecondActive = false;
  }
}
