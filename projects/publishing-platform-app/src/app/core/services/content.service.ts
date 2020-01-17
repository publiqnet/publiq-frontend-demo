import { EventEmitter, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders, HttpUrlEncodingCodec } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AccountService } from './account.service';
import { environment } from '../../../environments/environment';
import { Feedback } from './models/feedback';
import { ErrorService } from './error.service';
import { Account } from './models/account';
import { CryptService } from './crypt.service';
import { HttpHelperService, HttpMethodTypes, HttpObserverService } from 'helper-lib';
import { Content } from './models/content';
import { Search } from './models/search';
import { TranslateService } from '@ngx-translate/core';
import { Author } from './models/author';
import { Publication } from './models/publication';
import { Tag } from './models/tag';
import { UtilsService } from '../../../../../shared-lib/src/lib/service/utils.service';
import { Image, ImageOptions } from './models/gallery-image';

export enum OrderOptions {
  author_desc = <any>'+author',
  rating_desc = <any>'+rating',
  view_desc = <any>'+view',
  numrating_desc = <any>'+numrating',
  created_desc = <any>'+created',
  published_desc = <any>'+published',
  author_asc = <any>'-author',
  rating_asc = <any>'-rating',
  view_asc = <any>'-view',
  numrating_asc = <any>'-numrating',
  created_asc = <any>'-created',
  published_asc = <any>'-published',
  default = <any>''
}

export const CoinName = 'PBQ';
export const CoinPrecision = 8;
export const asset_id = '1.3.0';
export interface SearchData {article?: Content[]; publication?: Publication[]; authors?: Author[]; more: boolean; }

@Injectable()
export class ContentService {

  contentUrl = environment.backend + '/api/content';
  feedbackUrl = environment.backend + '/api/feedback';
  fileUrl = environment.backend + '/api/file';
  url = environment.backend + '/api';

  private observers: object = {
    'getDefaultSearchData': { name: '_getDefaultSearchData', refresh: false }
  };

  public translationsReady: boolean = false;

  private feedback: Feedback;
  feedbackChanged = new Subject<Feedback>();

  private feedbackReportData: String = '';
  feedbackReportDataChanged = new Subject<String>();

  private feedbackLikeData: String = '';
  feedbackLikeDataChanged = new Subject<String>();

  private uploadCroppedMainPhotoData;
  uploadCroppedMainPhotoDataChanged = new Subject<any>();

  private uploadListPhotoData;
  uploadListPhotoDataChanged = new Subject<any>();

  private submittedContentData;
  submittedContentChanged = new Subject<any>();

  private destroyContentData;
  destroyContentDataChanged = new Subject<any>();

  public updateSearchData = false;

  private articleUpLoading = false;
  articleUpLoadingChanged = new Subject<boolean>();

  private api;

  account = new Subject<Account>();

  public hideFooter$: EventEmitter<any> = new EventEmitter();

  public publishArticleChanged$ = new Subject<any>();

  public pendingProcess = new Subject();

  public updateDraft$: EventEmitter<any> = new EventEmitter();

  private urlEncodingCodec: HttpUrlEncodingCodec = new HttpUrlEncodingCodec();

  static generateTags(metaTags) {
    let result;
    if (typeof metaTags === 'string') {
      result = [{ display: metaTags, value: metaTags }];
    } else if (Array.isArray(metaTags)) {
      result = metaTags.map(tag => {
        return { display: tag, value: tag };
      });
    } else if (typeof metaTags === 'undefined') {
      result = [];
    }
    return result;
  }

  constructor(
    private httpHelperService: HttpHelperService,
    private cryptService: CryptService,
    private accountService: AccountService,
    private errorService: ErrorService,
    private http: HttpClient,
    public t: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private httpObserverService: HttpObserverService
  ) {
  }

  cancelStoryBoosting(uri: string, transactionHash: string, feeWhole: number, feeFraction: number, currentTime: number, password: string): Observable<any> {
    const url = this.url + `/content-boost-cancel`;
    const brainKey = this.cryptService.getDecryptedBrainKey(this.accountService.brainKeyEncrypted, password);
    const signBoostData = this.cryptService.getSignCancelBoost(brainKey, uri, transactionHash, feeWhole, feeFraction, currentTime);
    let now = new Date();
    if (currentTime) {
      now = new Date(currentTime * 1000);
    }
    const now_1h = new Date(now.getTime() + (60 * 60 * 1000));
    const requestData = {
      'signature': signBoostData.signature,
      'uri': uri,
      'transactionHash': transactionHash,
      'currentTransactionHash': signBoostData.transactionHash,
      'creationTime': Math.floor(now.getTime() / 1000),
      'expiryTime': Math.floor(now_1h.getTime() / 1000),
      'feeWhole': feeWhole,
      'feeFraction': feeFraction
    };
    return this.httpHelperService.call(HttpMethodTypes.post, url, requestData);
  }

  is_valid(content): boolean {
    if (typeof content.meta != 'object') {
      return false;
    }

    if (
      typeof content.meta.title != 'string' ||
      content.meta.title.length == 0
    ) {
      return false;
    }

    if (
      typeof content.meta.headline != 'string' ||
      content.meta.title.length == 0
    ) {
      return false;
    }

    return true;
  }

  public uploadCroppedMainPhoto(file, contentId, coverImageUrl): void {
    if (isPlatformBrowser(this.platformId)) {
      const authToken = localStorage.getItem('auth');
      if (!authToken) {
        this.errorService.handleError('uploadCroppedMainPhoto', {
          status: 409,
          error: { message: 'invalid_session_id' }
        });
      }
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('content_id', JSON.stringify(contentId));
      formData.append('action', '4');
      formData.append('cover_image_url', coverImageUrl);
      const url = this.contentUrl + '/image';

      this.http
        .post(url, formData, {
          headers: new HttpHeaders({ 'X-API-TOKEN': authToken })
        })
        .subscribe(
          data => {
            this.uploadCroppedMainPhotoData = data;
            this.uploadCroppedMainPhotoDataChanged.next(this.uploadCroppedMainPhotoData);
          },
          error => this.errorService.handleError('uploadCroppedMainPhoto', error, url)
        );
    }
  }

  public uploadListPhoto(file, contentId, action): void {
    if (isPlatformBrowser(this.platformId)) {
      const authToken = localStorage.getItem('auth');
      if (!authToken) {
        this.errorService.handleError('uploadListPhoto', {
          status: 409,
          error: { message: 'invalid_session_id' }
        });
      }
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('content_id', JSON.stringify(contentId));
      formData.append('action', action);
      const url = this.contentUrl + '/image';

      this.http
        .post(url, formData, {
          headers: new HttpHeaders({ 'X-API-TOKEN': authToken })
        })
        .subscribe(
          data => {
            this.uploadListPhotoData = data;
            this.uploadListPhotoDataChanged.next(this.uploadListPhotoData);
          },
          error => this.errorService.handleError('uploadListPhoto', error, url)
        );
    }
  }

  public destroyContent(contentId): void {
    if (isPlatformBrowser(this.platformId)) {
      const authToken = localStorage.getItem('auth');
      if (!authToken) {
        this.errorService.handleError('destroyContent', {
          status: 409,
          error: { message: 'invalid_session_id' }
        });
      }
      const url = this.contentUrl + '/destroy-content/' + contentId;

      this.http
        .delete(url, { headers: new HttpHeaders({ 'X-API-TOKEN': authToken }) })
        .subscribe(
          data => {
            this.destroyContentData = data;
            this.destroyContentDataChanged.next(this.destroyContentData);
          },
          error => this.errorService.handleError('destroyContent', error, url)
        );
    }
  }

  public addFeedbackReport(dsId, reasonId, authorPubliqId): void {
    if (isPlatformBrowser(this.platformId)) {
      const authToken = this.getAccountToken();
      if (!authToken) {
        this.errorService.handleError('submit', {
          status: 409,
          error: { message: 'invalid_session_id' }
        });
      }

      const url = this.feedbackUrl;

      this.http
        .put(
          url,
          {
            ds_id: dsId,
            reason: reasonId,
            author_publiq_id: authorPubliqId
          },
          { headers: new HttpHeaders({ 'X-API-TOKEN': authToken }) }
        )
        .subscribe(
          res => {
            if (res) {
              this.feedbackReportData = 'OK';
              this.feedbackReportDataChanged.next(this.feedbackReportData);
            } else {
              this.errorService.handleError(
                'addFeedbackLike',
                {
                  status: 409,
                  error: { message: 'add_feedback_report_error' }
                },
                url
              );
            }
          },
          error =>
            this.errorService.handleError('addFeedbackReport', error, url)
        );
    }
  }

  public addFeedbackLike(dsId, action, authorPubliqId): void {
    const authToken = this.getAccountToken();
    if (!authToken) {
      this.errorService.handleError('submit', {
        status: 409,
        error: { message: 'invalid_session_id' }
      });
    }

    const url = this.feedbackUrl + '/like';
    if (isPlatformBrowser(this.platformId)) {
      this.http
        .put(
          url,
          {
            ds_id: dsId,
            action: action,
            author_publiq_id: authorPubliqId
          },
          { headers: new HttpHeaders({ 'X-API-TOKEN': authToken }) }
        )
        .subscribe(
          res => {
            if (res) {
              this.feedbackLikeData = 'OK';
              this.feedbackLikeDataChanged.next(this.feedbackLikeData);
            } else {
              this.errorService.handleError(
                'addFeedbackLike',
                {
                  status: 409,
                  error: { message: 'add_feedback_like_error' }
                },
                url
              );
            }
          },
          error => this.errorService.handleError('addFeedbackLike', error, url)
        );
    }
  }

  loadFeedback(dsId): void {
    if (isPlatformBrowser(this.platformId)) {
      const authToken = this.getAccountToken();
      if (!authToken) {
        this.errorService.handleError('submit', {
          status: 409,
          error: { message: 'invalid_session_id' }
        });
      }

      const url = this.feedbackUrl + '/get-impression-status/' + dsId;

      this.http
        .get(url, { headers: new HttpHeaders({ 'X-API-TOKEN': authToken }) })
        .pipe(map(feedback => new Feedback(feedback)))
        .subscribe(
          res => {
            this.feedback = res;
            this.feedbackChanged.next(this.feedback);
          },
          error => this.errorService.handleError('loadFeedback', error, url)
        );
    }
  }

  getFeedback() {
    return this.feedback;
  }

  public getAccountToken() {
    return this.accountService.accountInfo &&
      this.accountService.accountInfo.token
      ? this.accountService.accountInfo.token
      : null;
  }

  getImage(imageUrl): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

  getFee(): Observable<any> {
    const url = `${environment.backend}/api/fee`;
    return this.httpHelperService.call(HttpMethodTypes.get, url);
  }

  detectLanguage(text): Observable<any> {
    const url = this.contentUrl + '/detect-language';
    return this.httpHelperService.call(HttpMethodTypes.post, url, { text: text });
  }

  // new
  signFile(file, brainKey, feeWhole, feeFraction, currentTime) {
    const signData = this.cryptService.getSignedFile(brainKey, file, feeWhole, feeFraction, currentTime);
    return {
      uri: file,
      signedFile: signData.signedString,
      signedFileString: signData.signedJson,
      creationTime: signData.creation,
      expiryTime: signData.expiry,
      currentTransactionHash: signData.transactionHash
    };
  }

  signFiles(files: Array<string>, feeWhole, feeFraction, currentTime, draftId, password): Observable<any> {
    const brainKey = this.cryptService.getDecryptedBrainKey(this.accountService.brainKeyEncrypted, password);
    const data = (files.length) ? files.map(f => this.signFile(f, brainKey, feeWhole, feeFraction, currentTime)) : [];
    const url = this.fileUrl + `/sign`;
    return this.httpHelperService.call(HttpMethodTypes.post, url, { files: data, feeWhole: feeWhole, feeFraction: feeFraction, draftId: draftId });
  }

  uploadImageFiles(file: object | FormData): Observable<any> {
    const url = environment.backend + '/api/file/upload';
    return this.httpHelperService.call(HttpMethodTypes.post, url, file);
  }

  uploadTextFiles(content): Observable<any> {
    const url = environment.backend + '/api/file/upload-content';
    return this.httpHelperService.call(HttpMethodTypes.post, url, {
      content
    });
  }

  unitUpload(content): Observable<any> {
    const url = environment.backend + '/api/content/unit/upload';
    return this.httpHelperService.call(HttpMethodTypes.post, url, {
      content
    });
  }

  unitSign(channelAddress, contentId, contentUri, files, publicationSlug, tags, feeWhole, feeFraction, currentTime, password): Observable<any> {
    const brainKey = this.cryptService.getDecryptedBrainKey(this.accountService.brainKeyEncrypted, password);
    const url = environment.backend + '/api/content/unit/sign';
    const signData = this.cryptService.getSignUnit(
      brainKey,
      contentUri,
      contentId,
      channelAddress,
      files,
      feeWhole,
      feeFraction,
      currentTime
    );
    const requestData = {
      uri: contentUri,
      signedContentUnit: signData.signedString,
      contentId: contentId,
      creationTime: signData.creation,
      expiryTime: signData.expiry,
      currentTransactionHash: signData.transactionHash,
      fileUris: files,
      publicationSlug: publicationSlug ? publicationSlug : null,
      tags: tags,
      feeWhole: feeWhole,
      feeFraction: feeFraction
    };
    return this.httpHelperService.call(HttpMethodTypes.post, url, requestData);
  }

  publish(uri: string, contentId, draftId): Observable<any> {
    const url = environment.backend + '/api/content/publish';
    return this.httpHelperService.call(HttpMethodTypes.post, url, { uri, contentId, draftId });
  }

  getBoostsData(): Observable<{active: Content[], passive: Content[], summary: any}> {
    const url = environment.backend + `/api/content-boost`;
    return this.httpHelperService.call(HttpMethodTypes.get, url)
      .pipe(map(boostData => {
        if (boostData.passive && boostData.passive.length) {
          boostData.passive = boostData.passive.map(nextContent => {
            return new Content(nextContent);
          });
        }
        if (boostData.active && boostData.active.length) {
          boostData.active = boostData.active.map(nextContent => {
            return new Content(nextContent);
          });
        }
        if (boostData.summary.hasOwnProperty('whole') && boostData.summary.hasOwnProperty('fraction')) {
          boostData.summary.balance = UtilsService.calculateBalance(boostData.summary.whole, boostData.summary.fraction);
          boostData.summary.spentbalance = UtilsService.calculateBalance(boostData.summary.spentWhole, boostData.summary.spentFraction);
        }
        return boostData;
      }));
  }

  getContents(publickey, fromUri = null, count: number = 10, boostedCount: number = 0): Observable<any> {
    const url = `${environment.backend}/api/contents/${publickey}/${count}/${boostedCount}/${fromUri}`;
    return this.httpHelperService.call(HttpMethodTypes.get, url).pipe(map(contentData => {
      contentData.data = contentData.data.map(nextContent => new Content(nextContent));
      return contentData;
    }));
  }

  getHomePageContents(fromUri = null, count: number = 10, boostedCount: number = 3): Observable<any> {
    const url = `${environment.backend}/api/contents/${count}/${boostedCount}/${fromUri}`;
    return this.httpHelperService.call(HttpMethodTypes.get, url)
      .pipe(map(contentData => {
        contentData.data = contentData.data.map(nextContent => new Content(nextContent));
        return contentData;
      }));
  }

  getHomePageData(): Observable<any> {
    const url = `${environment.backend}/api/user/homepage-data`;
    return this.httpHelperService.call(HttpMethodTypes.get, url)
      .pipe(map(homepageData => {
        if (homepageData.trending.authors && homepageData.trending.authors.length) {
          homepageData.trending.authors = homepageData.trending.authors.map(nextAuthor => (nextAuthor instanceof Author) ? nextAuthor : new Author(nextAuthor));
        }
        if (homepageData.trending.publications && homepageData.trending.publications.length) {
          homepageData.trending.publications = homepageData.trending.publications.map(nextPublication => (nextPublication instanceof Publication) ? nextPublication : new Publication(nextPublication));
        }
        if (homepageData.recommended.authors && homepageData.recommended.authors.length) {
          homepageData.recommended.authors = homepageData.recommended.authors.map(nextAuthor => (nextAuthor instanceof Author) ? nextAuthor : new Author(nextAuthor));
        }
        if (homepageData.recommended.publications && homepageData.recommended.publications.length) {
          homepageData.recommended.publications = homepageData.recommended.publications.map(nextPublication => (nextPublication instanceof Publication) ? nextPublication : new Publication(nextPublication));
        }
        if (homepageData.preferences.author && homepageData.preferences.author.length) {
          homepageData.preferences.author = homepageData.preferences.author.map(nextContent => (nextContent instanceof Content) ? nextContent : new Content(nextContent));
        }
        if (homepageData.preferences.tag && homepageData.preferences.tag.length) {
          homepageData.preferences.tag = homepageData.preferences.tag.map(nextContent => (nextContent instanceof Content) ? nextContent : new Content(nextContent));
        }
        if (homepageData.articleToBoost) {
          homepageData.articleToBoost = (homepageData.articleToBoost instanceof Content) ? homepageData.articleToBoost : new Content(homepageData.articleToBoost);
        }
        if (homepageData.highlights && homepageData.highlights.length) {
          homepageData.highlights = homepageData.highlights.map(nextContent => (nextContent instanceof Content) ? nextContent : new Content(nextContent));
        }
        return homepageData;
      }));
  }

  getContentByUri(uri: string, fingerprint = ''): Observable<any> {
    const url = `${environment.backend}/api/content/${uri}`;
    let headersData = [];
    if (fingerprint) {
      headersData = [{key: 'Fingerprint', value: fingerprint}];
    }
    return this.httpHelperService.call(HttpMethodTypes.get, url, null, headersData)
      .pipe(map(contentData => new Content(contentData)));
  }

  getContentSeoByUri(uri: string): Observable<any> {
    const url = `${environment.backend}/api/content-seo/${uri}?${Date.now()}`;
    return this.httpHelperService.call(HttpMethodTypes.get, url)
      .pipe(map(contentData => new Content(contentData)));
  }

  getFileContentFromUrl(url: string): Observable<any> {
    return this.http.get(url, { responseType: 'text' });
  }

  contentBoost(uri: string, price: number, days: number, feeWhole: number, feeFraction: number, currentTime: number, password: string) {
    const url = this.url + `/content-boost`;
    const brainKey = this.cryptService.getDecryptedBrainKey(this.accountService.brainKeyEncrypted, password);
    const signBoostData = this.cryptService.getSignBoost(brainKey, uri, price, feeWhole, feeFraction, currentTime, days * 24);
    let now = new Date();
    if (currentTime) {
      now = new Date(currentTime * 1000);
    }
    const now_1h = new Date(now.getTime() + (60 * 60 * 1000));
    const amountData = this.cryptService.amountStringToWholeFraction(price);
    const requestData = {
      'signature': signBoostData.signature,
      'uri': uri,
      'whole': amountData.whole,
      'fraction': amountData.fraction,
      'hours': days * 24,
      'currentTransactionHash': signBoostData.transactionHash,
      'startTimePoint': Math.floor(now.getTime() / 1000),
      'creationTime': Math.floor(now.getTime() / 1000),
      'expiryTime': Math.floor(now_1h.getTime() / 1000),
      'feeWhole': feeWhole,
      'feeFraction': feeFraction
    };
    return this.httpHelperService.call(HttpMethodTypes.post, url, requestData);
  }

  contentHighlight(uri: string, background: string, font: string, tagClass: string): Observable<any> {
    const url = this.url + `/content-highlight`;
    return this.httpHelperService.call(HttpMethodTypes.post, url, {uri, background, font, tagClass});
  }

  getDefaultSearchData(): Observable<any> {
    const searchData: any = this.observers['getDefaultSearchData'];
      return this.httpObserverService.observerCall(
        searchData.name,
        this.httpHelperService.call(HttpMethodTypes.get, this.url + '/search')
          .pipe(map(defaultSearchData => {
            defaultSearchData.authors = (defaultSearchData.authors && defaultSearchData.authors.length) ? defaultSearchData.authors.map(nextAuthor => new Author(nextAuthor)) : [];
            defaultSearchData.publication = (defaultSearchData.publication && defaultSearchData.publication.length) ? defaultSearchData.publication.map(nextPublication => new Publication(nextPublication)) : [];
            return defaultSearchData;
          })
          )
        , searchData.refresh = this.updateSearchData);
  }

  searchByWord(word: string): Observable<any> {
    const encodedWord = this.urlEncodingCodec.encodeValue(word);
    const url = this.url + `/search/${encodedWord}`;
    return this.httpHelperService.call(HttpMethodTypes.post, url)
      .pipe(map(searchData => new Search(searchData)));
  }

  updateContentPublication(publicationSlug: string, uri: string): Observable<any> {
    const url = this.contentUrl + `/publication`;
    return this.httpHelperService.call(HttpMethodTypes.post, url, { uri, publicationSlug });
  }

  getAllTags(): Observable<any> {
    return this.httpHelperService.customCall(HttpMethodTypes.get, this.url + '/tags')
      .pipe(map(tagsData => {
        tagsData = tagsData && tagsData.length ? tagsData.map(nextOption => new Tag(nextOption)) : [];
        return tagsData;
      }));
  }

  getTagArticles(tag: string, fromUri = null, count: number = 10, boostedCount: number = 0): Observable<any> {
    const encodedTag = this.urlEncodingCodec.encodeValue(tag);
    const url = `${environment.backend}/api/tag/${encodedTag}/articles/${count}/${boostedCount}/${fromUri}`;
    return this.httpHelperService.call(HttpMethodTypes.get, url)
        .pipe(map(contentData => {
          contentData.data = contentData.data.map(nextContent => new Content(nextContent));
          return contentData;
        }));
  }
  // todo think about to replace search methods into one
  searchPublicationsByWord(word: string, count: number = 10, fromSlug: string = null):
    Observable<SearchData> {
    const encodedWord = this.urlEncodingCodec.encodeValue(word);
    const url = this.url + `/search/publication/${encodedWord}/${count}/${fromSlug}`;
    return this.httpHelperService.call(HttpMethodTypes.post, url)
      .pipe(map((data: {publication: Publication[], more: false}) => ({publication: data.publication.length ?
          data.publication.map(publication => new Publication(publication)) : [], more: data.more})));
  }

  searchArticlesByWord(word: string, count: number = 10, fromUri: string = null):
    Observable<SearchData> {
    const encodedWord = this.urlEncodingCodec.encodeValue(word);
    const url = this.url + `/search/article/${encodedWord}/${count}/${fromUri}`;
    return this.httpHelperService.call(HttpMethodTypes.post, url)
      .pipe(map((data: {article: Content[], more: boolean}) => ({article : data.article.length ?
          data.article.map(content => new Content(content)) : [], more: data.more}) ));
  }

  searchAuthorsByWord(word: string, count: number = 10, fromPublicKey: string = null):
    Observable<SearchData> {
    const encodedWord = this.urlEncodingCodec.encodeValue(word);
    const url = this.url + `/search/authors/${encodedWord}/${count}/${fromPublicKey}`;
    return this.httpHelperService.call(HttpMethodTypes.post, url)
      .pipe(map((data: {authors: Author[], more: boolean}) => ({authors: data.authors.length ?
          data.authors.map(author => new Author(author)) : [], more: data.more })));
  }

  getGalleryImages(fromUri: string, count: number): Observable<{images: Image[], more: boolean}> {
    const url = environment.backend + '/api/files/' + `${count}/${fromUri}`;
    return this.httpHelperService.call(HttpMethodTypes.get, url)
      .pipe(map((items) => {
        items.data.map((item) => new Image(item));
        return {images: items.data, more: items.more};
  }));
  }

  getGalleryImagesByTag(tag: string, fromUri: string, count: number) {// /api/files-by-tag/{tag}/{count}/{fromUri}
    const encodedTag = this.urlEncodingCodec.encodeValue(tag);
    const url = environment.backend + '/api/files-by-tag/' + `${encodedTag}/${count}/${fromUri}`;
    return this.httpHelperService.call(HttpMethodTypes.get, url)
      .pipe(map((items) => {
        items.data.map((item) => new Image(item));
        return {images: items.data, more: items.more};
      }));
  }
  /*
* Ignore myself(owner) when showing follow button
*/
  isOwner(data) {
    if (typeof data === 'string') {
      const info = this.accountService.accountInfo;
      return info ? info.publicKey !== data : true;
    }

    if (data instanceof Publication) { return data.memberStatus == 1; }

    return false;
  }
}
