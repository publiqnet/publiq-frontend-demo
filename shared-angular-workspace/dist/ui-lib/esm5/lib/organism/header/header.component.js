/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostListener, ElementRef, EventEmitter, Input, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { Avatar } from '../../../core/models/avatar';
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(cdr) {
        this.cdr = cdr;
        this.showSearchBar = false;
        this.articleReadPercent = 0;
        this.isSecondActive = false;
        this.articlePage = false;
        this.navigationLink = new EventEmitter();
        this.searchEvent = new EventEmitter();
        this.publicationFollow = new EventEmitter();
        this.articleAuthorFollow = new EventEmitter();
        this.articleLiked = new EventEmitter();
        this.articleShared = new EventEmitter();
        this.publishArticleClick = new EventEmitter();
        this.articleTitleClick = new EventEmitter();
        this.publicationTitleClick = new EventEmitter();
        this.notificationMenuOpened = new EventEmitter();
        this.userFollow = new EventEmitter();
        this.onInputChange = new EventEmitter();
        this.userSignIn = new EventEmitter();
        this.userSignUp = new EventEmitter();
        this.continueArticle = new EventEmitter();
        this.tagItems = null;
        this.onTagItemSelect = new EventEmitter();
        this.isOpen = false;
        this.customTagMenu = false;
        this.blockInfiniteScroll = false;
        this.seeMoreLoading = false;
        this.isOpenChange = new EventEmitter();
        this.seeMore = new EventEmitter();
        this.avatarData = null;
        this.tagCountToSlice = 0;
        this.showLoading = false;
        this.draftUpdate = 0;
        this.leftVal = {
            menu: 0,
            notification: 0,
            profile: 0,
            social: 0
        };
        this.menuOpen = {
            menu: false,
            notification: false,
            profile: false,
            tag: false,
            social: false
        };
    }
    /**
     * @return {?}
     */
    HeaderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} value
     * @return {?}
     */
    HeaderComponent.prototype.selectTagValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.onTagItemSelect.emit(value);
        this.menuOpen.tag = false;
        this.showSearchBar = true;
        this.searchBar.nativeElement.value = value;
        this.onInputChange.emit(value);
    };
    /**
     * @return {?}
     */
    HeaderComponent.prototype.buildAvatarData = /**
     * @return {?}
     */
    function () {
        this.avatarData = new Avatar({
            first_name: this.headerData.publicationData ? this.headerData.publicationData.title : null,
            image: this.headerData.publicationData ? (this.headerData.publicationData.logo ? this.headerData.publicationData.logo : this.headerData.publicationData.cover) : null
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    HeaderComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        this.buildAvatarData();
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.calculateLeftValues();
        }), 75);
        if (this.headerData.draftData && this.headerData.draftData.updated) {
            /** @type {?} */
            var currentDraftDate = this.headerData.draftData.updated;
            if (this.draftUpdate != currentDraftDate) {
                this.enableLoading(currentDraftDate);
            }
        }
        else {
            this.draftUpdate = 0;
        }
    };
    /**
     * @return {?}
     */
    HeaderComponent.prototype.imageLoaded = /**
     * @return {?}
     */
    function () {
        this.calculateLeftValues();
    };
    /**
     * @param {?} currentDraftDate
     * @return {?}
     */
    HeaderComponent.prototype.enableLoading = /**
     * @param {?} currentDraftDate
     * @return {?}
     */
    function (currentDraftDate) {
        var _this = this;
        this.showLoading = true;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.draftUpdate = currentDraftDate;
            _this.showLoading = false;
        }), 1000);
    };
    /**
     * @return {?}
     */
    HeaderComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.calculateLeftValues();
        }), 75);
        fromEvent(this.searchBar.nativeElement, 'input').pipe(debounceTime(600)).subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.onInputChange.emit(event['srcElement']['value']);
        }));
    };
    /**
     * @return {?}
     */
    HeaderComponent.prototype.calculateLeftValues = /**
     * @return {?}
     */
    function () {
        if (window.innerWidth >= 1024) {
            this.tagCountToSlice = 4;
        }
        else if (window.innerWidth >= 768) {
            this.tagCountToSlice = 3;
        }
        else {
            this.tagCountToSlice = 0;
        }
        if (this.overlayMenuList) {
            this.leftVal.menu = this.overlayMenuList.nativeElement.getBoundingClientRect().left + 4;
        }
        if (this.notificationMenuList) {
            this.leftVal.notification = this.notificationMenuList.nativeElement.getBoundingClientRect().left + 4;
        }
        if (this.profileMenuList) {
            this.leftVal.profile = this.profileMenuList.nativeElement.getBoundingClientRect().left + 4;
        }
        if (this.socialMenuList) {
            this.leftVal.social = this.socialMenuList.nativeElement.getBoundingClientRect().left + 4;
        }
        this.cdr.detectChanges();
    };
    /**
     * @return {?}
     */
    HeaderComponent.prototype._leftValsListener = /**
     * @return {?}
     */
    function () {
        this.calculateLeftValues();
    };
    /**
     * @return {?}
     */
    HeaderComponent.prototype._closeMenus = /**
     * @return {?}
     */
    function () {
        this.menuOpen = {
            menu: false,
            notification: false,
            profile: false,
            tag: false,
            social: false
        };
    };
    /**
     * @param {?} type
     * @param {?} $event
     * @return {?}
     */
    HeaderComponent.prototype.passClick = /**
     * @param {?} type
     * @param {?} $event
     * @return {?}
     */
    function (type, $event) {
        this.menuOpen[type] = !this.menuOpen[type];
        if (type === 'notification' && this.menuOpen[type]) {
            this.notificationMenuOpened.emit($event);
        }
        this.cdr.detectChanges();
    };
    /**
     * @return {?}
     */
    HeaderComponent.prototype.closeMenu = /**
     * @return {?}
     */
    function () {
        this.menuOpen = {
            menu: false,
            notification: false,
            profile: false,
            tag: false,
            social: false
        };
    };
    /**
     * @param {?} event
     * @return {?}
     */
    HeaderComponent.prototype.tagMenuOutsideClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!event.target.classList.contains('icon-menu')) {
            this.menuOpen.tag = false;
        }
    };
    /**
     * @param {?} slug
     * @param {?=} action
     * @return {?}
     */
    HeaderComponent.prototype.navigationLinkClick = /**
     * @param {?} slug
     * @param {?=} action
     * @return {?}
     */
    function (slug, action) {
        if (action === void 0) { action = 'redirect'; }
        this.navigationLink.emit({ 'action': action, 'slug': slug });
    };
    /**
     * @param {?} event
     * @param {?=} flag
     * @return {?}
     */
    HeaderComponent.prototype._searchEvent = /**
     * @param {?} event
     * @param {?=} flag
     * @return {?}
     */
    function (event, flag) {
        if (flag === void 0) { flag = null; }
        this.searchEvent.emit(flag);
        this.showSearchBar = flag;
        if (flag == true) {
            this.searchBar.nativeElement.focus();
        }
        this.searchBar.nativeElement.value = '';
    };
    /**
     * @param {?} follow
     * @return {?}
     */
    HeaderComponent.prototype._publicationFollow = /**
     * @param {?} follow
     * @return {?}
     */
    function (follow) {
        this.publicationFollow.emit({ slug: this.headerData.publicationData.slug, follow: follow });
    };
    /**
     * @param {?} user
     * @param {?} follow
     * @return {?}
     */
    HeaderComponent.prototype._articleAuthorFollow = /**
     * @param {?} user
     * @param {?} follow
     * @return {?}
     */
    function (user, follow) {
        this.articleAuthorFollow.emit({ author: user, slug: user.publicKey, follow: follow });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    HeaderComponent.prototype._articleLiked = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.articleLiked.emit(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    HeaderComponent.prototype._continueArticle = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        this.continueArticle.emit(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    HeaderComponent.prototype._articleShared = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.articleShared.emit(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    HeaderComponent.prototype._publishArticle = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.publishArticleClick.emit(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    HeaderComponent.prototype._userFollow = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.userFollow.emit(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    HeaderComponent.prototype._userSignIn = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.userSignIn.emit(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    HeaderComponent.prototype._userSignUp = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.userSignUp.emit(event);
    };
    /**
     * @param {?} event
     * @param {?} slug
     * @return {?}
     */
    HeaderComponent.prototype.onLogoClick = /**
     * @param {?} event
     * @param {?} slug
     * @return {?}
     */
    function (event, slug) {
        event.preventDefault();
        this.navigationLinkClick(slug);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    HeaderComponent.prototype.onSeeMoreEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.seeMore.emit(event);
    };
    /**
     * @param {?} event
     * @param {?} type
     * @return {?}
     */
    HeaderComponent.prototype.onSocialClick = /**
     * @param {?} event
     * @param {?} type
     * @return {?}
     */
    function (event, type) {
        console.log(event);
        console.log(type);
    };
    HeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ui-header',
                    template: "<header class=\"header\" (uiClickOutside)=\"closeMenu()\">\n    <!-- `(dblclick)=\"toggleNavigation();\"` was removed -->\n  <div class=\"header__doubled\" [ngClass]=\"[isSecondActive ? 'header--narrow' : '']\" >\n    <div class=\"header__slider container\" [ngClass]=\"[isSecondActive ? 'header__slider--second' : '']\">\n      <div class=\"header__slide header__slide--main\">\n        <a href=\"#\" (click)=\"onLogoClick($event, '')\">\n          <img src=\"{{headerData.logo}}\" class=\"logo\" alt=\"PUBLIQ\" *ngIf=\"headerData && headerData.logo\" [ngClass]=\"{'no-logo' : articlePage && headerData.isLogged}\" (load)=\"imageLoaded()\">\n          <i class=\"icon icon-close\"></i>\n        </a>\n        <div class=\"header__tags\">\n          <ng-container *ngIf=\"articlePage && draftUpdate\">\n            <span class=\"header__tags-draft\" [ngClass]=\"{'pl-media' : articlePage && headerData.isLogged}\">{{('ui.header.draft_saved' | translate) + ': '}}{{headerData.draftData.updated * 1000 | localizedDate:'HH:mm:ss'}}</span>\n            <span class=\"header__tags-loading\" [hidden]=\"!showLoading\">\n              <ui-loader [color]=\"'blue'\" [size]=\"24\"></ui-loader>\n            </span>\n          </ng-container>\n          <ng-container *ngIf=\"!articlePage\">\n            <a *ngFor=\"let item of tagItems | slice:0:tagCountToSlice; let i=index\" class=\"header__tags-item\" (click)=\"selectTagValue(item['slug'])\">{{item['text']}}</a>\n            <i class=\"icon-menu header__tags-more\" tabindex=\"0\" #overlayMenuList (click)=\"passClick('tag', $event)\" (keypress)=\"$event.keyCode === 13 ? passClick('tag', $event) : null\" *ngIf=\"tagItems\" [ngClass]=\"{'after-visible' : menuOpen.tag}\"\n            [class.d-none]=\"tagItems.length <= 4\"></i>\n          </ng-container>\n        </div>\n        <div class=\"header__right-icons\">\n          <ng-container *ngIf=\"!articlePage\">\n            <ui-button [type]=\"'ordinary'\" [text]=\"'Search'\" [iconButton]=\"true\" [iconClassName]=\"'search search-icon'\" (btnClicked)=\"_searchEvent($event, true)\" [name]=\"'header_search'\"></ui-button>\n          </ng-container>\n          <ng-container *ngIf=\"articlePage\">\n            <a href=\"/\" (click)=\"_continueArticle($event)\">{{'ui.header.continue_later' | translate}}</a>\n            <div class=\"header-publish-button\" (click)=\"_publishArticle($event)\" *ngIf=\"articlePage && headerData.isLogged\"><span>{{'ui.header.publish' | translate}}</span> <i class=\"icon-arrow-link\"></i></div>\n          </ng-container>\n          <div class=\"vline d-none d-md-inline-block\"></div>\n          <div *ngIf=\"headerData.isLogged; else guestTemplate\" [ngClass]=\"{'no-visibility' : articlePage && headerData.isLogged}\">\n            <div class=\"notifications-wrapper\">\n              <i class=\"icon-energy\" tabindex=\"0\" #notificationMenuList (click)=\"passClick('notification', $event)\" (keypress)=\"$event.keyCode === 13 ? passClick('notification', $event) : null\"></i>\n              <small *ngIf=\"headerData.notificationData && headerData.notificationData.newNotificationsCount\">{{headerData.notificationData.newNotificationsCount}}</small>\n            </div>\n            <!-- <ui-dropdown-list [type]=\"'notification-list'\" [position]=\"'bottom'\" [icon]=\"'energy'\" [items]=\"headerData.notificationData\" [openerClassName]=\"'notification-list'\"></ui-dropdown-list> -->\n            <div class=\"header__menu-avatar\" tabindex=\"0\" (keypress)=\"$event.keyCode === 13 ? passClick('profile', $event) : null\" (click)=\"passClick('profile', $event)\" #profileMenuList>\n              <i class=\"icon-profile\" *ngIf=\"!headerData.userData || !headerData.userData.user || !headerData.userData.user.image\"></i>\n              <img src=\"{{headerData.userData.user.image}}\" *ngIf=\"headerData.userData && headerData.userData.user && headerData.userData.user.image\" alt=\"{{headerData.userData.user.fullName}}\" />\n            </div>\n          </div>\n          <ng-template #guestTemplate>\n            <ui-button [text]=\"'ui.header.sign_in' | translate\" [type]=\"'ordinary'\" [size]=\"'medium'\" [className]=\"'sign-in'\" (btnClicked)=\"_userSignIn($event)\"></ui-button>\n            <ui-button [text]=\"'ui.header.sign_up' | translate\" [type]=\"'primary'\" [size]=\"'medium'\" [className]=\"'sign-up'\" (btnClicked)=\"_userSignUp($event)\"></ui-button>\n          </ng-template>\n        </div>\n      </div>\n      <!--    publication block-->\n      <div *ngIf=\"headerData.publicationData\" class=\"header__slide header__slide--second-part\">\n        <div class=\"avatar avatar--squaric\">\n          <div *ngIf=\"headerData.publicationData\">\n            <ui-avatar [avatarData]=\"avatarData\" [size]=\"'small'\" [isSquaric]=\"true\" (click)=\"navigationLinkClick(headerData.publicationData.slug)\" ></ui-avatar>\n          </div>\n        </div>\n        <div class=\"header__slide__meta\">\n          <div *ngIf=\"headerData.publicationData\">\n            <h2 (click)=\"publicationTitleClick.emit(null)\">{{headerData.publicationData.title}}</h2>\n          </div>\n          <div class=\"button button--primary button--small\" *ngIf=\"headerData.publicationData.memberStatus !== 1\">\n            <ui-button [type]=\"!headerData.publicationData.following ? 'primary' : 'ordinary'\" [text]=\"headerData.publicationData.following ? ('ui.header.following' | translate) : ('ui.header.follow' | translate)\" [size]=\"'small'\" [isFollowing]=\"headerData.publicationData.following\" (btnClicked)=\"_publicationFollow(!headerData.publicationData.following)\" [className]=\"'publication-follow'\"></ui-button>\n          </div>\n        </div>\n        <div class=\"header__slide__stats\">\n          <div class=\"datum-list\">\n            <div class=\"datum-container\">\n              <span class=\"datum-container__count\">{{headerData.publicationData.views}}</span>\n              <span class=\"datum-container__property\">{{'ui.header.views' | translate}}</span>\n            </div>\n            <div class=\"datum-container\">\n              <span class=\"datum-container__count\">{{headerData.publicationData.storiesCount}}</span>\n              <span class=\"datum-container__property\">{{'ui.header.stories' | translate}}</span>\n            </div>\n            <div class=\"datum-container\">\n              <span class=\"datum-container__count\">{{headerData.publicationData.subscribersCount}}</span>\n              <span class=\"datum-container__property\">{{'ui.header.followers' | translate}}</span>\n            </div>\n            <div class=\"datum-container\">\n              <span class=\"datum-container__count\">{{headerData.publicationData.membersList ? headerData.publicationData.membersList.length : 0}}</span>\n              <span class=\"datum-container__property\">{{'ui.header.members' | translate}}</span>\n            </div>\n          </div>\n        </div>\n      </div>\n      <!--    user block -->\n      <div *ngIf=\"headerData.authorData\" class=\"header__slide header__slide--second-part\">\n        <div class=\"avatar avatar--squaric\">\n          <div *ngIf=\"headerData.authorData.user\">\n            <ui-avatar  [avatarData]=\"headerData.authorData.user\" [size]=\"'small'\" [isSquaric]=\"false\" (click)=\"navigationLinkClick(headerData.authorData.user)\"></ui-avatar>\n          </div>\n        </div>\n        <div class=\"header__slide__meta\">\n          <div *ngIf=\"headerData.authorData.user\">\n            <h2 (click)=\"navigationLinkClick(headerData.authorData.user)\">{{headerData.authorData.user.fullName}}</h2>\n          </div>\n          <div class=\"button button--primary button--small\" *ngIf=\"headerData.authorData.user\">\n            <ui-button [type]=\"'primary'\" [text]=\"'ui.header.follow' | translate\" [size]=\"'small'\" [isFollowing]=\"true\" (btnClicked)=\"_userFollow($event)\" [className]=\"'user-follow'\"></ui-button>\n          </div>\n        </div>\n        <div class=\"header__slide__stats\">\n          <div *ngIf=\"headerData.authorData.user\" class=\"user-info\">\n            <div *ngFor=\"let item of headerData.authorData.info\">\n              <ui-datum [property]=\"item.property\" [count]=\"item.count\"></ui-datum>\n            </div>\n          </div>\n        </div>\n      </div>\n      <!--    article block-->\n      <div *ngIf=\"headerData.articleData\" class=\"header__slide header__slide--second-part\">\n        <div class=\"avatar avatar--squaric\">\n          <div style=\"display: flex\">\n            <ui-avatar [avatarData]=\"headerData.articleData.user\" [size]=\"'small'\" [isSquaric]=\"false\" (click)=\"navigationLinkClick(headerData.articleData.slug)\"></ui-avatar>\n          </div>\n        </div>\n        <div class=\"header__slide__meta\">\n          <div>\n            <h2 (click)=\"articleTitleClick.emit(null)\" style=\"display: flex\">{{headerData.articleData.title}}</h2>\n          </div>\n        </div>\n        <div class=\"header__slide__stats\">\n          <div class=\"share-block\">\n            <ui-button *ngIf=\"!headerData.articleData.isCurrentUser\" [type]=\"!headerData.articleData.followingAuthor ? 'primary' : 'ordinary'\" [text]=\"headerData.articleData.followingAuthor ? ('ui.header.following' | translate) : ('ui.header.follow' | translate)\" [size]=\"'small'\" [isFollowing]=\"headerData.articleData.followingAuthor\" (btnClicked)=\"_articleAuthorFollow(this.headerData?.articleData?.user ,!headerData.articleData.followingAuthor)\" [className]=\"'publication-follow follow-button'\"></ui-button>\n            <div class=\"share-dropdown\" #socialMenuList (click)=\"passClick('social', $event)\" (keypress)=\"$event.keyCode === 13 ? passClick('social', $event) : null\">\n              <svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                <!-- Generator: Sketch 59.1 (86144) - https://sketch.com -->\n                <title>icon / gray / share</title>\n                <desc>Created with Sketch.</desc>\n                <g id=\"icon-/-gray-/-share\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n                  <rect id=\"Rectangle-Copy-5\" x=\"0\" y=\"0\" width=\"24\" height=\"24\"></rect>\n                  <g id=\"Group-27\" transform=\"translate(6.000000, 6.000000)\" stroke=\"#565A60\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\">\n                    <g id=\"Group\" transform=\"translate(4.285714, 0.000000)\">\n                      <line x1=\"1.71428571\" y1=\"7.70869808\" x2=\"1.71428571\" y2=\"0.851555224\" id=\"Stroke-349\"></line>\n                      <line x1=\"3.42857143\" y1=\"1.71316819\" x2=\"1.71428571\" y2=\"1.11022302e-16\" id=\"Stroke-350\"></line>\n                      <line x1=\"1.71428571\" y1=\"1.11022302e-16\" x2=\"0\" y2=\"1.71316819\" id=\"Stroke-351\"></line>\n                    </g>\n                    <path d=\"M9.42857143,3.85714286 L10.9984555,3.85714286 C11.5515932,3.85714286 12,4.29850533 12,4.86047215 L12,10.2784504 C12,10.7521414 11.616,11.1350345 11.1428571,11.1350345 L0.857142857,11.1350345 C0.384,11.1350345 0,10.7521414 0,10.2784504 L0,4.86047215 C0,4.30634868 0.454444885,3.85714286 0.996148927,3.85714286 L2.14285714,3.85714286\" id=\"Stroke-352\"></path>\n                  </g>\n                </g>\n              </svg>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"header__search\" [ngClass]=\"{'header__search__animation' : showSearchBar}\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-8 offset-md-2\">\n          <label for=\"search_bar\" class=\"search-input-space\"></label>\n          <input id=\"search_bar\" type=\"text\" #searchBar>\n          <div class=\"close-search\" (click)=\"_searchEvent($event, false)\">\n            <span>{{'ui.header.close' | translate}}</span>\n            <i class=\"icon icon-close\"></i>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <span class=\"header__article-read\" *ngIf=\"articleReadPercent\" [style.width]=\"articleReadPercent+'%'\"></span>\n  <!--TAGS-->\n  <div class=\"tags\" [ngClass]=\"{'tags--visible' : menuOpen.tag}\">\n    <ui-tag-menu (onTagItemSelect)=\"selectTagValue($event.slug)\" (onClickedOutside)=\"tagMenuOutsideClick($event)\" [tagItems]=\"tagItems.slice(tagCountToSlice)\"></ui-tag-menu>\n  </div>\n  <!--end-->\n</header>\n\n<div class=\"header-overlay\" [ngClass]=\"[isSecondActive ? 'header-overlay--narrow' : '']\">\n\n  <ui-dropdown-list [delta]=\"40\" [type]=\"'notification-list'\" [shadowed]=\"true\" [blockInfiniteScroll]=\"blockInfiniteScroll\" [seeMoreLoading]=\"seeMoreLoading\"\n                    (seeMore)=\"onSeeMoreEvent($event)\" [position]=\"'bottom'\" [icon]=\"'energy'\" [items]=\"headerData.notificationData.notifications\" (onItemSelect)=\"navigationLinkClick($event)\" [openerClassName]=\"'notification-list'\" class=\"header-overlay__item\" [style.left]=\"leftVal.notification + 'px'\" [(isOpen)]=\"menuOpen.notification\"></ui-dropdown-list>\n\n\n  <ui-dropdown-list [type]=\"'default'\" [shadowed]=\"true\" *ngIf=\"headerData.userLoggedData\" [userPublicKey]=\"headerData.userData.user.slug\" [items]=\"headerData.userLoggedData\" (onItemSelect)=\"navigationLinkClick($event)\" [icon]=\"'profile'\" [position]=\"'bottom'\" [openerClassName]=\"'user-data'\" class=\"header-overlay__item\" [style.left]=\"leftVal.profile + 'px'\" [(isOpen)]=\"menuOpen.profile\"></ui-dropdown-list>\n\n  <ui-dropdown-list [type]=\"'social-menu'\" [shadowed]=\"true\" [position]=\"'bottom'\" [icon]=\"'menu'\" [(isOpen)]=\"menuOpen.social\" [delta]=\"25\" [items]=\"\" [style.left]=\"leftVal.social + 'px'\" class=\"header-overlay__item\" (articleShared)=\"_articleShared($event)\"></ui-dropdown-list>\n\n</div>\n",
                    styles: ["@import url(https://stage-mainnet-state.publiq.network/icomoon/icomoon.css);/*!\n * Bootstrap Grid v4.3.1 (https://getbootstrap.com/)\n * Copyright 2011-2019 The Bootstrap Authors\n * Copyright 2011-2019 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,900);@import url(https://fonts.googleapis.com/css?family=Vollkorn:400,600,700,900);html{box-sizing:border-box;-ms-overflow-style:scrollbar}*,::after,::before{box-sizing:inherit}.container{width:100%;padding-right:5px;padding-left:5px;margin-right:auto;margin-left:auto}@media (min-width:576px){.container{max-width:540px}}@media (min-width:768px){.container{max-width:720px}}@media (min-width:1024px){.container{max-width:980px}}@media (min-width:1440px){.container{max-width:1320px}}.container-fluid{width:100%;padding-right:5px;padding-left:5px;margin-right:auto;margin-left:auto}.row{display:-webkit-box;display:flex;flex-wrap:wrap;margin-right:-5px;margin-left:-5px}.no-gutters{margin-right:0;margin-left:0}.no-gutters>.col,.no-gutters>[class*=col-]{padding-right:0;padding-left:0}.col,.col-1,.col-10,.col-11,.col-12,.col-2,.col-3,.col-4,.col-5,.col-6,.col-7,.col-8,.col-9,.col-auto,.col-lg,.col-lg-1,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9,.col-lg-auto,.col-md,.col-md-1,.col-md-10,.col-md-11,.col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-md-auto,.col-sm,.col-sm-1,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9,.col-sm-auto,.col-xl,.col-xl-1,.col-xl-10,.col-xl-11,.col-xl-12,.col-xl-2,.col-xl-3,.col-xl-4,.col-xl-5,.col-xl-6,.col-xl-7,.col-xl-8,.col-xl-9,.col-xl-auto{position:relative;width:100%;padding-right:5px;padding-left:5px}.col{flex-basis:0;-webkit-box-flex:1;flex-grow:1;max-width:100%}.col-auto{-webkit-box-flex:0;flex:0 0 auto;width:auto;max-width:100%}.col-1{-webkit-box-flex:0;flex:0 0 8.33333%;max-width:8.33333%}.col-2{-webkit-box-flex:0;flex:0 0 16.66667%;max-width:16.66667%}.col-3{-webkit-box-flex:0;flex:0 0 25%;max-width:25%}.col-4{-webkit-box-flex:0;flex:0 0 33.33333%;max-width:33.33333%}.col-5{-webkit-box-flex:0;flex:0 0 41.66667%;max-width:41.66667%}.col-6{-webkit-box-flex:0;flex:0 0 50%;max-width:50%}.col-7{-webkit-box-flex:0;flex:0 0 58.33333%;max-width:58.33333%}.col-8{-webkit-box-flex:0;flex:0 0 66.66667%;max-width:66.66667%}.col-9{-webkit-box-flex:0;flex:0 0 75%;max-width:75%}.col-10{-webkit-box-flex:0;flex:0 0 83.33333%;max-width:83.33333%}.col-11{-webkit-box-flex:0;flex:0 0 91.66667%;max-width:91.66667%}.col-12{-webkit-box-flex:0;flex:0 0 100%;max-width:100%}.order-first{-webkit-box-ordinal-group:0;order:-1}.order-last{-webkit-box-ordinal-group:14;order:13}.order-0{-webkit-box-ordinal-group:1;order:0}.order-1{-webkit-box-ordinal-group:2;order:1}.order-2{-webkit-box-ordinal-group:3;order:2}.order-3{-webkit-box-ordinal-group:4;order:3}.order-4{-webkit-box-ordinal-group:5;order:4}.order-5{-webkit-box-ordinal-group:6;order:5}.order-6{-webkit-box-ordinal-group:7;order:6}.order-7{-webkit-box-ordinal-group:8;order:7}.order-8{-webkit-box-ordinal-group:9;order:8}.order-9{-webkit-box-ordinal-group:10;order:9}.order-10{-webkit-box-ordinal-group:11;order:10}.order-11{-webkit-box-ordinal-group:12;order:11}.order-12{-webkit-box-ordinal-group:13;order:12}.offset-1{margin-left:8.33333%}.offset-2{margin-left:16.66667%}.offset-3{margin-left:25%}.offset-4{margin-left:33.33333%}.offset-5{margin-left:41.66667%}.offset-6{margin-left:50%}.offset-7{margin-left:58.33333%}.offset-8{margin-left:66.66667%}.offset-9{margin-left:75%}.offset-10{margin-left:83.33333%}.offset-11{margin-left:91.66667%}.d-none{display:none!important}.d-inline{display:inline!important}.d-inline-block{display:inline-block!important}.d-block{display:block!important}.d-table{display:table!important}.d-table-row{display:table-row!important}.d-table-cell{display:table-cell!important}.d-flex{display:-webkit-box!important;display:flex!important}.d-inline-flex{display:-webkit-inline-box!important;display:inline-flex!important}@media (min-width:576px){.col-sm{flex-basis:0;-webkit-box-flex:1;flex-grow:1;max-width:100%}.col-sm-auto{-webkit-box-flex:0;flex:0 0 auto;width:auto;max-width:100%}.col-sm-1{-webkit-box-flex:0;flex:0 0 8.33333%;max-width:8.33333%}.col-sm-2{-webkit-box-flex:0;flex:0 0 16.66667%;max-width:16.66667%}.col-sm-3{-webkit-box-flex:0;flex:0 0 25%;max-width:25%}.col-sm-4{-webkit-box-flex:0;flex:0 0 33.33333%;max-width:33.33333%}.col-sm-5{-webkit-box-flex:0;flex:0 0 41.66667%;max-width:41.66667%}.col-sm-6{-webkit-box-flex:0;flex:0 0 50%;max-width:50%}.col-sm-7{-webkit-box-flex:0;flex:0 0 58.33333%;max-width:58.33333%}.col-sm-8{-webkit-box-flex:0;flex:0 0 66.66667%;max-width:66.66667%}.col-sm-9{-webkit-box-flex:0;flex:0 0 75%;max-width:75%}.col-sm-10{-webkit-box-flex:0;flex:0 0 83.33333%;max-width:83.33333%}.col-sm-11{-webkit-box-flex:0;flex:0 0 91.66667%;max-width:91.66667%}.col-sm-12{-webkit-box-flex:0;flex:0 0 100%;max-width:100%}.order-sm-first{-webkit-box-ordinal-group:0;order:-1}.order-sm-last{-webkit-box-ordinal-group:14;order:13}.order-sm-0{-webkit-box-ordinal-group:1;order:0}.order-sm-1{-webkit-box-ordinal-group:2;order:1}.order-sm-2{-webkit-box-ordinal-group:3;order:2}.order-sm-3{-webkit-box-ordinal-group:4;order:3}.order-sm-4{-webkit-box-ordinal-group:5;order:4}.order-sm-5{-webkit-box-ordinal-group:6;order:5}.order-sm-6{-webkit-box-ordinal-group:7;order:6}.order-sm-7{-webkit-box-ordinal-group:8;order:7}.order-sm-8{-webkit-box-ordinal-group:9;order:8}.order-sm-9{-webkit-box-ordinal-group:10;order:9}.order-sm-10{-webkit-box-ordinal-group:11;order:10}.order-sm-11{-webkit-box-ordinal-group:12;order:11}.order-sm-12{-webkit-box-ordinal-group:13;order:12}.offset-sm-0{margin-left:0}.offset-sm-1{margin-left:8.33333%}.offset-sm-2{margin-left:16.66667%}.offset-sm-3{margin-left:25%}.offset-sm-4{margin-left:33.33333%}.offset-sm-5{margin-left:41.66667%}.offset-sm-6{margin-left:50%}.offset-sm-7{margin-left:58.33333%}.offset-sm-8{margin-left:66.66667%}.offset-sm-9{margin-left:75%}.offset-sm-10{margin-left:83.33333%}.offset-sm-11{margin-left:91.66667%}.d-sm-none{display:none!important}.d-sm-inline{display:inline!important}.d-sm-inline-block{display:inline-block!important}.d-sm-block{display:block!important}.d-sm-table{display:table!important}.d-sm-table-row{display:table-row!important}.d-sm-table-cell{display:table-cell!important}.d-sm-flex{display:-webkit-box!important;display:flex!important}.d-sm-inline-flex{display:-webkit-inline-box!important;display:inline-flex!important}}@media (min-width:768px){.col-md{flex-basis:0;-webkit-box-flex:1;flex-grow:1;max-width:100%}.col-md-auto{-webkit-box-flex:0;flex:0 0 auto;width:auto;max-width:100%}.col-md-1{-webkit-box-flex:0;flex:0 0 8.33333%;max-width:8.33333%}.col-md-2{-webkit-box-flex:0;flex:0 0 16.66667%;max-width:16.66667%}.col-md-3{-webkit-box-flex:0;flex:0 0 25%;max-width:25%}.col-md-4{-webkit-box-flex:0;flex:0 0 33.33333%;max-width:33.33333%}.col-md-5{-webkit-box-flex:0;flex:0 0 41.66667%;max-width:41.66667%}.col-md-6{-webkit-box-flex:0;flex:0 0 50%;max-width:50%}.col-md-7{-webkit-box-flex:0;flex:0 0 58.33333%;max-width:58.33333%}.col-md-8{-webkit-box-flex:0;flex:0 0 66.66667%;max-width:66.66667%}.col-md-9{-webkit-box-flex:0;flex:0 0 75%;max-width:75%}.col-md-10{-webkit-box-flex:0;flex:0 0 83.33333%;max-width:83.33333%}.col-md-11{-webkit-box-flex:0;flex:0 0 91.66667%;max-width:91.66667%}.col-md-12{-webkit-box-flex:0;flex:0 0 100%;max-width:100%}.order-md-first{-webkit-box-ordinal-group:0;order:-1}.order-md-last{-webkit-box-ordinal-group:14;order:13}.order-md-0{-webkit-box-ordinal-group:1;order:0}.order-md-1{-webkit-box-ordinal-group:2;order:1}.order-md-2{-webkit-box-ordinal-group:3;order:2}.order-md-3{-webkit-box-ordinal-group:4;order:3}.order-md-4{-webkit-box-ordinal-group:5;order:4}.order-md-5{-webkit-box-ordinal-group:6;order:5}.order-md-6{-webkit-box-ordinal-group:7;order:6}.order-md-7{-webkit-box-ordinal-group:8;order:7}.order-md-8{-webkit-box-ordinal-group:9;order:8}.order-md-9{-webkit-box-ordinal-group:10;order:9}.order-md-10{-webkit-box-ordinal-group:11;order:10}.order-md-11{-webkit-box-ordinal-group:12;order:11}.order-md-12{-webkit-box-ordinal-group:13;order:12}.offset-md-0{margin-left:0}.offset-md-1{margin-left:8.33333%}.offset-md-2{margin-left:16.66667%}.offset-md-3{margin-left:25%}.offset-md-4{margin-left:33.33333%}.offset-md-5{margin-left:41.66667%}.offset-md-6{margin-left:50%}.offset-md-7{margin-left:58.33333%}.offset-md-8{margin-left:66.66667%}.offset-md-9{margin-left:75%}.offset-md-10{margin-left:83.33333%}.offset-md-11{margin-left:91.66667%}.d-md-none{display:none!important}.d-md-inline{display:inline!important}.d-md-inline-block{display:inline-block!important}.d-md-block{display:block!important}.d-md-table{display:table!important}.d-md-table-row{display:table-row!important}.d-md-table-cell{display:table-cell!important}.d-md-flex{display:-webkit-box!important;display:flex!important}.d-md-inline-flex{display:-webkit-inline-box!important;display:inline-flex!important}}@media (min-width:1024px){.col-lg{flex-basis:0;-webkit-box-flex:1;flex-grow:1;max-width:100%}.col-lg-auto{-webkit-box-flex:0;flex:0 0 auto;width:auto;max-width:100%}.col-lg-1{-webkit-box-flex:0;flex:0 0 8.33333%;max-width:8.33333%}.col-lg-2{-webkit-box-flex:0;flex:0 0 16.66667%;max-width:16.66667%}.col-lg-3{-webkit-box-flex:0;flex:0 0 25%;max-width:25%}.col-lg-4{-webkit-box-flex:0;flex:0 0 33.33333%;max-width:33.33333%}.col-lg-5{-webkit-box-flex:0;flex:0 0 41.66667%;max-width:41.66667%}.col-lg-6{-webkit-box-flex:0;flex:0 0 50%;max-width:50%}.col-lg-7{-webkit-box-flex:0;flex:0 0 58.33333%;max-width:58.33333%}.col-lg-8{-webkit-box-flex:0;flex:0 0 66.66667%;max-width:66.66667%}.col-lg-9{-webkit-box-flex:0;flex:0 0 75%;max-width:75%}.col-lg-10{-webkit-box-flex:0;flex:0 0 83.33333%;max-width:83.33333%}.col-lg-11{-webkit-box-flex:0;flex:0 0 91.66667%;max-width:91.66667%}.col-lg-12{-webkit-box-flex:0;flex:0 0 100%;max-width:100%}.order-lg-first{-webkit-box-ordinal-group:0;order:-1}.order-lg-last{-webkit-box-ordinal-group:14;order:13}.order-lg-0{-webkit-box-ordinal-group:1;order:0}.order-lg-1{-webkit-box-ordinal-group:2;order:1}.order-lg-2{-webkit-box-ordinal-group:3;order:2}.order-lg-3{-webkit-box-ordinal-group:4;order:3}.order-lg-4{-webkit-box-ordinal-group:5;order:4}.order-lg-5{-webkit-box-ordinal-group:6;order:5}.order-lg-6{-webkit-box-ordinal-group:7;order:6}.order-lg-7{-webkit-box-ordinal-group:8;order:7}.order-lg-8{-webkit-box-ordinal-group:9;order:8}.order-lg-9{-webkit-box-ordinal-group:10;order:9}.order-lg-10{-webkit-box-ordinal-group:11;order:10}.order-lg-11{-webkit-box-ordinal-group:12;order:11}.order-lg-12{-webkit-box-ordinal-group:13;order:12}.offset-lg-0{margin-left:0}.offset-lg-1{margin-left:8.33333%}.offset-lg-2{margin-left:16.66667%}.offset-lg-3{margin-left:25%}.offset-lg-4{margin-left:33.33333%}.offset-lg-5{margin-left:41.66667%}.offset-lg-6{margin-left:50%}.offset-lg-7{margin-left:58.33333%}.offset-lg-8{margin-left:66.66667%}.offset-lg-9{margin-left:75%}.offset-lg-10{margin-left:83.33333%}.offset-lg-11{margin-left:91.66667%}.d-lg-none{display:none!important}.d-lg-inline{display:inline!important}.d-lg-inline-block{display:inline-block!important}.d-lg-block{display:block!important}.d-lg-table{display:table!important}.d-lg-table-row{display:table-row!important}.d-lg-table-cell{display:table-cell!important}.d-lg-flex{display:-webkit-box!important;display:flex!important}.d-lg-inline-flex{display:-webkit-inline-box!important;display:inline-flex!important}}@media (min-width:1440px){.col-xl{flex-basis:0;-webkit-box-flex:1;flex-grow:1;max-width:100%}.col-xl-auto{-webkit-box-flex:0;flex:0 0 auto;width:auto;max-width:100%}.col-xl-1{-webkit-box-flex:0;flex:0 0 8.33333%;max-width:8.33333%}.col-xl-2{-webkit-box-flex:0;flex:0 0 16.66667%;max-width:16.66667%}.col-xl-3{-webkit-box-flex:0;flex:0 0 25%;max-width:25%}.col-xl-4{-webkit-box-flex:0;flex:0 0 33.33333%;max-width:33.33333%}.col-xl-5{-webkit-box-flex:0;flex:0 0 41.66667%;max-width:41.66667%}.col-xl-6{-webkit-box-flex:0;flex:0 0 50%;max-width:50%}.col-xl-7{-webkit-box-flex:0;flex:0 0 58.33333%;max-width:58.33333%}.col-xl-8{-webkit-box-flex:0;flex:0 0 66.66667%;max-width:66.66667%}.col-xl-9{-webkit-box-flex:0;flex:0 0 75%;max-width:75%}.col-xl-10{-webkit-box-flex:0;flex:0 0 83.33333%;max-width:83.33333%}.col-xl-11{-webkit-box-flex:0;flex:0 0 91.66667%;max-width:91.66667%}.col-xl-12{-webkit-box-flex:0;flex:0 0 100%;max-width:100%}.order-xl-first{-webkit-box-ordinal-group:0;order:-1}.order-xl-last{-webkit-box-ordinal-group:14;order:13}.order-xl-0{-webkit-box-ordinal-group:1;order:0}.order-xl-1{-webkit-box-ordinal-group:2;order:1}.order-xl-2{-webkit-box-ordinal-group:3;order:2}.order-xl-3{-webkit-box-ordinal-group:4;order:3}.order-xl-4{-webkit-box-ordinal-group:5;order:4}.order-xl-5{-webkit-box-ordinal-group:6;order:5}.order-xl-6{-webkit-box-ordinal-group:7;order:6}.order-xl-7{-webkit-box-ordinal-group:8;order:7}.order-xl-8{-webkit-box-ordinal-group:9;order:8}.order-xl-9{-webkit-box-ordinal-group:10;order:9}.order-xl-10{-webkit-box-ordinal-group:11;order:10}.order-xl-11{-webkit-box-ordinal-group:12;order:11}.order-xl-12{-webkit-box-ordinal-group:13;order:12}.offset-xl-0{margin-left:0}.offset-xl-1{margin-left:8.33333%}.offset-xl-2{margin-left:16.66667%}.offset-xl-3{margin-left:25%}.offset-xl-4{margin-left:33.33333%}.offset-xl-5{margin-left:41.66667%}.offset-xl-6{margin-left:50%}.offset-xl-7{margin-left:58.33333%}.offset-xl-8{margin-left:66.66667%}.offset-xl-9{margin-left:75%}.offset-xl-10{margin-left:83.33333%}.offset-xl-11{margin-left:91.66667%}.d-xl-none{display:none!important}.d-xl-inline{display:inline!important}.d-xl-inline-block{display:inline-block!important}.d-xl-block{display:block!important}.d-xl-table{display:table!important}.d-xl-table-row{display:table-row!important}.d-xl-table-cell{display:table-cell!important}.d-xl-flex{display:-webkit-box!important;display:flex!important}.d-xl-inline-flex{display:-webkit-inline-box!important;display:inline-flex!important}}@media print{.d-print-none{display:none!important}.d-print-inline{display:inline!important}.d-print-inline-block{display:inline-block!important}.d-print-block{display:block!important}.d-print-table{display:table!important}.d-print-table-row{display:table-row!important}.d-print-table-cell{display:table-cell!important}.d-print-flex{display:-webkit-box!important;display:flex!important}.d-print-inline-flex{display:-webkit-inline-box!important;display:inline-flex!important}}.flex-row{-webkit-box-orient:horizontal!important;-webkit-box-direction:normal!important;flex-direction:row!important}.flex-column{-webkit-box-orient:vertical!important;-webkit-box-direction:normal!important;flex-direction:column!important}.flex-row-reverse{-webkit-box-orient:horizontal!important;-webkit-box-direction:reverse!important;flex-direction:row-reverse!important}.flex-column-reverse{-webkit-box-orient:vertical!important;-webkit-box-direction:reverse!important;flex-direction:column-reverse!important}.flex-wrap{flex-wrap:wrap!important}.flex-nowrap{flex-wrap:nowrap!important}.flex-wrap-reverse{flex-wrap:wrap-reverse!important}.flex-fill{-webkit-box-flex:1!important;flex:1 1 auto!important}.flex-grow-0{-webkit-box-flex:0!important;flex-grow:0!important}.flex-grow-1{-webkit-box-flex:1!important;flex-grow:1!important}.flex-shrink-0{flex-shrink:0!important}.flex-shrink-1{flex-shrink:1!important}.justify-content-start{-webkit-box-pack:start!important;justify-content:flex-start!important}.justify-content-end{-webkit-box-pack:end!important;justify-content:flex-end!important}.justify-content-center{-webkit-box-pack:center!important;justify-content:center!important}.justify-content-between{-webkit-box-pack:justify!important;justify-content:space-between!important}.justify-content-around{justify-content:space-around!important}.align-items-start{-webkit-box-align:start!important;align-items:flex-start!important}.align-items-end{-webkit-box-align:end!important;align-items:flex-end!important}.align-items-center{-webkit-box-align:center!important;align-items:center!important}.align-items-baseline{-webkit-box-align:baseline!important;align-items:baseline!important}.align-items-stretch{-webkit-box-align:stretch!important;align-items:stretch!important}.align-content-start{align-content:flex-start!important}.align-content-end{align-content:flex-end!important}.align-content-center{align-content:center!important}.align-content-between{align-content:space-between!important}.align-content-around{align-content:space-around!important}.align-content-stretch{align-content:stretch!important}.align-self-auto{-ms-grid-row-align:auto!important;align-self:auto!important}.align-self-start{align-self:flex-start!important}.align-self-end{align-self:flex-end!important}.align-self-center{-ms-grid-row-align:center!important;align-self:center!important}.align-self-baseline{align-self:baseline!important}.align-self-stretch{-ms-grid-row-align:stretch!important;align-self:stretch!important}.m-0{margin:0!important}.mt-0,.my-0{margin-top:0!important}.mr-0,.mx-0{margin-right:0!important}.mb-0,.my-0{margin-bottom:0!important}.ml-0,.mx-0{margin-left:0!important}.m-1{margin:.25rem!important}.mt-1,.my-1{margin-top:.25rem!important}.mr-1,.mx-1{margin-right:.25rem!important}.mb-1,.my-1{margin-bottom:.25rem!important}.ml-1,.mx-1{margin-left:.25rem!important}.m-2{margin:.5rem!important}.mt-2,.my-2{margin-top:.5rem!important}.mr-2,.mx-2{margin-right:.5rem!important}.mb-2,.my-2{margin-bottom:.5rem!important}.ml-2,.mx-2{margin-left:.5rem!important}.m-3{margin:1rem!important}.mt-3,.my-3{margin-top:1rem!important}.mr-3,.mx-3{margin-right:1rem!important}.mb-3,.my-3{margin-bottom:1rem!important}.ml-3,.mx-3{margin-left:1rem!important}.m-4{margin:1.5rem!important}.mt-4,.my-4{margin-top:1.5rem!important}.mr-4,.mx-4{margin-right:1.5rem!important}.mb-4,.my-4{margin-bottom:1.5rem!important}.ml-4,.mx-4{margin-left:1.5rem!important}.m-5{margin:3rem!important}.mt-5,.my-5{margin-top:3rem!important}.mr-5,.mx-5{margin-right:3rem!important}.mb-5,.my-5{margin-bottom:3rem!important}.ml-5,.mx-5{margin-left:3rem!important}.p-0{padding:0!important}.pt-0,.py-0{padding-top:0!important}.pr-0,.px-0{padding-right:0!important}.pb-0,.py-0{padding-bottom:0!important}.pl-0,.px-0{padding-left:0!important}.p-1{padding:.25rem!important}.pt-1,.py-1{padding-top:.25rem!important}.pr-1,.px-1{padding-right:.25rem!important}.pb-1,.py-1{padding-bottom:.25rem!important}.pl-1,.px-1{padding-left:.25rem!important}.p-2{padding:.5rem!important}.pt-2,.py-2{padding-top:.5rem!important}.pr-2,.px-2{padding-right:.5rem!important}.pb-2,.py-2{padding-bottom:.5rem!important}.pl-2,.px-2{padding-left:.5rem!important}.p-3{padding:1rem!important}.pt-3,.py-3{padding-top:1rem!important}.pr-3,.px-3{padding-right:1rem!important}.pb-3,.py-3{padding-bottom:1rem!important}.pl-3,.px-3{padding-left:1rem!important}.p-4{padding:1.5rem!important}.pt-4,.py-4{padding-top:1.5rem!important}.pr-4,.px-4{padding-right:1.5rem!important}.pb-4,.py-4{padding-bottom:1.5rem!important}.pl-4,.px-4{padding-left:1.5rem!important}.p-5{padding:3rem!important}.pt-5,.py-5{padding-top:3rem!important}.pr-5,.px-5{padding-right:3rem!important}.pb-5,.py-5{padding-bottom:3rem!important}.pl-5,.px-5{padding-left:3rem!important}.m-n1{margin:-.25rem!important}.mt-n1,.my-n1{margin-top:-.25rem!important}.mr-n1,.mx-n1{margin-right:-.25rem!important}.mb-n1,.my-n1{margin-bottom:-.25rem!important}.ml-n1,.mx-n1{margin-left:-.25rem!important}.m-n2{margin:-.5rem!important}.mt-n2,.my-n2{margin-top:-.5rem!important}.mr-n2,.mx-n2{margin-right:-.5rem!important}.mb-n2,.my-n2{margin-bottom:-.5rem!important}.ml-n2,.mx-n2{margin-left:-.5rem!important}.m-n3{margin:-1rem!important}.mt-n3,.my-n3{margin-top:-1rem!important}.mr-n3,.mx-n3{margin-right:-1rem!important}.mb-n3,.my-n3{margin-bottom:-1rem!important}.ml-n3,.mx-n3{margin-left:-1rem!important}.m-n4{margin:-1.5rem!important}.mt-n4,.my-n4{margin-top:-1.5rem!important}.mr-n4,.mx-n4{margin-right:-1.5rem!important}.mb-n4,.my-n4{margin-bottom:-1.5rem!important}.ml-n4,.mx-n4{margin-left:-1.5rem!important}.m-n5{margin:-3rem!important}.mt-n5,.my-n5{margin-top:-3rem!important}.mr-n5,.mx-n5{margin-right:-3rem!important}.mb-n5,.my-n5{margin-bottom:-3rem!important}.ml-n5,.mx-n5{margin-left:-3rem!important}.m-auto{margin:auto!important}.mt-auto,.my-auto{margin-top:auto!important}.mr-auto,.mx-auto{margin-right:auto!important}.mb-auto,.my-auto{margin-bottom:auto!important}.ml-auto,.mx-auto{margin-left:auto!important}@media (min-width:576px){.flex-sm-row{-webkit-box-orient:horizontal!important;-webkit-box-direction:normal!important;flex-direction:row!important}.flex-sm-column{-webkit-box-orient:vertical!important;-webkit-box-direction:normal!important;flex-direction:column!important}.flex-sm-row-reverse{-webkit-box-orient:horizontal!important;-webkit-box-direction:reverse!important;flex-direction:row-reverse!important}.flex-sm-column-reverse{-webkit-box-orient:vertical!important;-webkit-box-direction:reverse!important;flex-direction:column-reverse!important}.flex-sm-wrap{flex-wrap:wrap!important}.flex-sm-nowrap{flex-wrap:nowrap!important}.flex-sm-wrap-reverse{flex-wrap:wrap-reverse!important}.flex-sm-fill{-webkit-box-flex:1!important;flex:1 1 auto!important}.flex-sm-grow-0{-webkit-box-flex:0!important;flex-grow:0!important}.flex-sm-grow-1{-webkit-box-flex:1!important;flex-grow:1!important}.flex-sm-shrink-0{flex-shrink:0!important}.flex-sm-shrink-1{flex-shrink:1!important}.justify-content-sm-start{-webkit-box-pack:start!important;justify-content:flex-start!important}.justify-content-sm-end{-webkit-box-pack:end!important;justify-content:flex-end!important}.justify-content-sm-center{-webkit-box-pack:center!important;justify-content:center!important}.justify-content-sm-between{-webkit-box-pack:justify!important;justify-content:space-between!important}.justify-content-sm-around{justify-content:space-around!important}.align-items-sm-start{-webkit-box-align:start!important;align-items:flex-start!important}.align-items-sm-end{-webkit-box-align:end!important;align-items:flex-end!important}.align-items-sm-center{-webkit-box-align:center!important;align-items:center!important}.align-items-sm-baseline{-webkit-box-align:baseline!important;align-items:baseline!important}.align-items-sm-stretch{-webkit-box-align:stretch!important;align-items:stretch!important}.align-content-sm-start{align-content:flex-start!important}.align-content-sm-end{align-content:flex-end!important}.align-content-sm-center{align-content:center!important}.align-content-sm-between{align-content:space-between!important}.align-content-sm-around{align-content:space-around!important}.align-content-sm-stretch{align-content:stretch!important}.align-self-sm-auto{-ms-grid-row-align:auto!important;align-self:auto!important}.align-self-sm-start{align-self:flex-start!important}.align-self-sm-end{align-self:flex-end!important}.align-self-sm-center{-ms-grid-row-align:center!important;align-self:center!important}.align-self-sm-baseline{align-self:baseline!important}.align-self-sm-stretch{-ms-grid-row-align:stretch!important;align-self:stretch!important}.m-sm-0{margin:0!important}.mt-sm-0,.my-sm-0{margin-top:0!important}.mr-sm-0,.mx-sm-0{margin-right:0!important}.mb-sm-0,.my-sm-0{margin-bottom:0!important}.ml-sm-0,.mx-sm-0{margin-left:0!important}.m-sm-1{margin:.25rem!important}.mt-sm-1,.my-sm-1{margin-top:.25rem!important}.mr-sm-1,.mx-sm-1{margin-right:.25rem!important}.mb-sm-1,.my-sm-1{margin-bottom:.25rem!important}.ml-sm-1,.mx-sm-1{margin-left:.25rem!important}.m-sm-2{margin:.5rem!important}.mt-sm-2,.my-sm-2{margin-top:.5rem!important}.mr-sm-2,.mx-sm-2{margin-right:.5rem!important}.mb-sm-2,.my-sm-2{margin-bottom:.5rem!important}.ml-sm-2,.mx-sm-2{margin-left:.5rem!important}.m-sm-3{margin:1rem!important}.mt-sm-3,.my-sm-3{margin-top:1rem!important}.mr-sm-3,.mx-sm-3{margin-right:1rem!important}.mb-sm-3,.my-sm-3{margin-bottom:1rem!important}.ml-sm-3,.mx-sm-3{margin-left:1rem!important}.m-sm-4{margin:1.5rem!important}.mt-sm-4,.my-sm-4{margin-top:1.5rem!important}.mr-sm-4,.mx-sm-4{margin-right:1.5rem!important}.mb-sm-4,.my-sm-4{margin-bottom:1.5rem!important}.ml-sm-4,.mx-sm-4{margin-left:1.5rem!important}.m-sm-5{margin:3rem!important}.mt-sm-5,.my-sm-5{margin-top:3rem!important}.mr-sm-5,.mx-sm-5{margin-right:3rem!important}.mb-sm-5,.my-sm-5{margin-bottom:3rem!important}.ml-sm-5,.mx-sm-5{margin-left:3rem!important}.p-sm-0{padding:0!important}.pt-sm-0,.py-sm-0{padding-top:0!important}.pr-sm-0,.px-sm-0{padding-right:0!important}.pb-sm-0,.py-sm-0{padding-bottom:0!important}.pl-sm-0,.px-sm-0{padding-left:0!important}.p-sm-1{padding:.25rem!important}.pt-sm-1,.py-sm-1{padding-top:.25rem!important}.pr-sm-1,.px-sm-1{padding-right:.25rem!important}.pb-sm-1,.py-sm-1{padding-bottom:.25rem!important}.pl-sm-1,.px-sm-1{padding-left:.25rem!important}.p-sm-2{padding:.5rem!important}.pt-sm-2,.py-sm-2{padding-top:.5rem!important}.pr-sm-2,.px-sm-2{padding-right:.5rem!important}.pb-sm-2,.py-sm-2{padding-bottom:.5rem!important}.pl-sm-2,.px-sm-2{padding-left:.5rem!important}.p-sm-3{padding:1rem!important}.pt-sm-3,.py-sm-3{padding-top:1rem!important}.pr-sm-3,.px-sm-3{padding-right:1rem!important}.pb-sm-3,.py-sm-3{padding-bottom:1rem!important}.pl-sm-3,.px-sm-3{padding-left:1rem!important}.p-sm-4{padding:1.5rem!important}.pt-sm-4,.py-sm-4{padding-top:1.5rem!important}.pr-sm-4,.px-sm-4{padding-right:1.5rem!important}.pb-sm-4,.py-sm-4{padding-bottom:1.5rem!important}.pl-sm-4,.px-sm-4{padding-left:1.5rem!important}.p-sm-5{padding:3rem!important}.pt-sm-5,.py-sm-5{padding-top:3rem!important}.pr-sm-5,.px-sm-5{padding-right:3rem!important}.pb-sm-5,.py-sm-5{padding-bottom:3rem!important}.pl-sm-5,.px-sm-5{padding-left:3rem!important}.m-sm-n1{margin:-.25rem!important}.mt-sm-n1,.my-sm-n1{margin-top:-.25rem!important}.mr-sm-n1,.mx-sm-n1{margin-right:-.25rem!important}.mb-sm-n1,.my-sm-n1{margin-bottom:-.25rem!important}.ml-sm-n1,.mx-sm-n1{margin-left:-.25rem!important}.m-sm-n2{margin:-.5rem!important}.mt-sm-n2,.my-sm-n2{margin-top:-.5rem!important}.mr-sm-n2,.mx-sm-n2{margin-right:-.5rem!important}.mb-sm-n2,.my-sm-n2{margin-bottom:-.5rem!important}.ml-sm-n2,.mx-sm-n2{margin-left:-.5rem!important}.m-sm-n3{margin:-1rem!important}.mt-sm-n3,.my-sm-n3{margin-top:-1rem!important}.mr-sm-n3,.mx-sm-n3{margin-right:-1rem!important}.mb-sm-n3,.my-sm-n3{margin-bottom:-1rem!important}.ml-sm-n3,.mx-sm-n3{margin-left:-1rem!important}.m-sm-n4{margin:-1.5rem!important}.mt-sm-n4,.my-sm-n4{margin-top:-1.5rem!important}.mr-sm-n4,.mx-sm-n4{margin-right:-1.5rem!important}.mb-sm-n4,.my-sm-n4{margin-bottom:-1.5rem!important}.ml-sm-n4,.mx-sm-n4{margin-left:-1.5rem!important}.m-sm-n5{margin:-3rem!important}.mt-sm-n5,.my-sm-n5{margin-top:-3rem!important}.mr-sm-n5,.mx-sm-n5{margin-right:-3rem!important}.mb-sm-n5,.my-sm-n5{margin-bottom:-3rem!important}.ml-sm-n5,.mx-sm-n5{margin-left:-3rem!important}.m-sm-auto{margin:auto!important}.mt-sm-auto,.my-sm-auto{margin-top:auto!important}.mr-sm-auto,.mx-sm-auto{margin-right:auto!important}.mb-sm-auto,.my-sm-auto{margin-bottom:auto!important}.ml-sm-auto,.mx-sm-auto{margin-left:auto!important}}@media (min-width:768px){.flex-md-row{-webkit-box-orient:horizontal!important;-webkit-box-direction:normal!important;flex-direction:row!important}.flex-md-column{-webkit-box-orient:vertical!important;-webkit-box-direction:normal!important;flex-direction:column!important}.flex-md-row-reverse{-webkit-box-orient:horizontal!important;-webkit-box-direction:reverse!important;flex-direction:row-reverse!important}.flex-md-column-reverse{-webkit-box-orient:vertical!important;-webkit-box-direction:reverse!important;flex-direction:column-reverse!important}.flex-md-wrap{flex-wrap:wrap!important}.flex-md-nowrap{flex-wrap:nowrap!important}.flex-md-wrap-reverse{flex-wrap:wrap-reverse!important}.flex-md-fill{-webkit-box-flex:1!important;flex:1 1 auto!important}.flex-md-grow-0{-webkit-box-flex:0!important;flex-grow:0!important}.flex-md-grow-1{-webkit-box-flex:1!important;flex-grow:1!important}.flex-md-shrink-0{flex-shrink:0!important}.flex-md-shrink-1{flex-shrink:1!important}.justify-content-md-start{-webkit-box-pack:start!important;justify-content:flex-start!important}.justify-content-md-end{-webkit-box-pack:end!important;justify-content:flex-end!important}.justify-content-md-center{-webkit-box-pack:center!important;justify-content:center!important}.justify-content-md-between{-webkit-box-pack:justify!important;justify-content:space-between!important}.justify-content-md-around{justify-content:space-around!important}.align-items-md-start{-webkit-box-align:start!important;align-items:flex-start!important}.align-items-md-end{-webkit-box-align:end!important;align-items:flex-end!important}.align-items-md-center{-webkit-box-align:center!important;align-items:center!important}.align-items-md-baseline{-webkit-box-align:baseline!important;align-items:baseline!important}.align-items-md-stretch{-webkit-box-align:stretch!important;align-items:stretch!important}.align-content-md-start{align-content:flex-start!important}.align-content-md-end{align-content:flex-end!important}.align-content-md-center{align-content:center!important}.align-content-md-between{align-content:space-between!important}.align-content-md-around{align-content:space-around!important}.align-content-md-stretch{align-content:stretch!important}.align-self-md-auto{-ms-grid-row-align:auto!important;align-self:auto!important}.align-self-md-start{align-self:flex-start!important}.align-self-md-end{align-self:flex-end!important}.align-self-md-center{-ms-grid-row-align:center!important;align-self:center!important}.align-self-md-baseline{align-self:baseline!important}.align-self-md-stretch{-ms-grid-row-align:stretch!important;align-self:stretch!important}.m-md-0{margin:0!important}.mt-md-0,.my-md-0{margin-top:0!important}.mr-md-0,.mx-md-0{margin-right:0!important}.mb-md-0,.my-md-0{margin-bottom:0!important}.ml-md-0,.mx-md-0{margin-left:0!important}.m-md-1{margin:.25rem!important}.mt-md-1,.my-md-1{margin-top:.25rem!important}.mr-md-1,.mx-md-1{margin-right:.25rem!important}.mb-md-1,.my-md-1{margin-bottom:.25rem!important}.ml-md-1,.mx-md-1{margin-left:.25rem!important}.m-md-2{margin:.5rem!important}.mt-md-2,.my-md-2{margin-top:.5rem!important}.mr-md-2,.mx-md-2{margin-right:.5rem!important}.mb-md-2,.my-md-2{margin-bottom:.5rem!important}.ml-md-2,.mx-md-2{margin-left:.5rem!important}.m-md-3{margin:1rem!important}.mt-md-3,.my-md-3{margin-top:1rem!important}.mr-md-3,.mx-md-3{margin-right:1rem!important}.mb-md-3,.my-md-3{margin-bottom:1rem!important}.ml-md-3,.mx-md-3{margin-left:1rem!important}.m-md-4{margin:1.5rem!important}.mt-md-4,.my-md-4{margin-top:1.5rem!important}.mr-md-4,.mx-md-4{margin-right:1.5rem!important}.mb-md-4,.my-md-4{margin-bottom:1.5rem!important}.ml-md-4,.mx-md-4{margin-left:1.5rem!important}.m-md-5{margin:3rem!important}.mt-md-5,.my-md-5{margin-top:3rem!important}.mr-md-5,.mx-md-5{margin-right:3rem!important}.mb-md-5,.my-md-5{margin-bottom:3rem!important}.ml-md-5,.mx-md-5{margin-left:3rem!important}.p-md-0{padding:0!important}.pt-md-0,.py-md-0{padding-top:0!important}.pr-md-0,.px-md-0{padding-right:0!important}.pb-md-0,.py-md-0{padding-bottom:0!important}.pl-md-0,.px-md-0{padding-left:0!important}.p-md-1{padding:.25rem!important}.pt-md-1,.py-md-1{padding-top:.25rem!important}.pr-md-1,.px-md-1{padding-right:.25rem!important}.pb-md-1,.py-md-1{padding-bottom:.25rem!important}.pl-md-1,.px-md-1{padding-left:.25rem!important}.p-md-2{padding:.5rem!important}.pt-md-2,.py-md-2{padding-top:.5rem!important}.pr-md-2,.px-md-2{padding-right:.5rem!important}.pb-md-2,.py-md-2{padding-bottom:.5rem!important}.pl-md-2,.px-md-2{padding-left:.5rem!important}.p-md-3{padding:1rem!important}.pt-md-3,.py-md-3{padding-top:1rem!important}.pr-md-3,.px-md-3{padding-right:1rem!important}.pb-md-3,.py-md-3{padding-bottom:1rem!important}.pl-md-3,.px-md-3{padding-left:1rem!important}.p-md-4{padding:1.5rem!important}.pt-md-4,.py-md-4{padding-top:1.5rem!important}.pr-md-4,.px-md-4{padding-right:1.5rem!important}.pb-md-4,.py-md-4{padding-bottom:1.5rem!important}.pl-md-4,.px-md-4{padding-left:1.5rem!important}.p-md-5{padding:3rem!important}.pt-md-5,.py-md-5{padding-top:3rem!important}.pr-md-5,.px-md-5{padding-right:3rem!important}.pb-md-5,.py-md-5{padding-bottom:3rem!important}.pl-md-5,.px-md-5{padding-left:3rem!important}.m-md-n1{margin:-.25rem!important}.mt-md-n1,.my-md-n1{margin-top:-.25rem!important}.mr-md-n1,.mx-md-n1{margin-right:-.25rem!important}.mb-md-n1,.my-md-n1{margin-bottom:-.25rem!important}.ml-md-n1,.mx-md-n1{margin-left:-.25rem!important}.m-md-n2{margin:-.5rem!important}.mt-md-n2,.my-md-n2{margin-top:-.5rem!important}.mr-md-n2,.mx-md-n2{margin-right:-.5rem!important}.mb-md-n2,.my-md-n2{margin-bottom:-.5rem!important}.ml-md-n2,.mx-md-n2{margin-left:-.5rem!important}.m-md-n3{margin:-1rem!important}.mt-md-n3,.my-md-n3{margin-top:-1rem!important}.mr-md-n3,.mx-md-n3{margin-right:-1rem!important}.mb-md-n3,.my-md-n3{margin-bottom:-1rem!important}.ml-md-n3,.mx-md-n3{margin-left:-1rem!important}.m-md-n4{margin:-1.5rem!important}.mt-md-n4,.my-md-n4{margin-top:-1.5rem!important}.mr-md-n4,.mx-md-n4{margin-right:-1.5rem!important}.mb-md-n4,.my-md-n4{margin-bottom:-1.5rem!important}.ml-md-n4,.mx-md-n4{margin-left:-1.5rem!important}.m-md-n5{margin:-3rem!important}.mt-md-n5,.my-md-n5{margin-top:-3rem!important}.mr-md-n5,.mx-md-n5{margin-right:-3rem!important}.mb-md-n5,.my-md-n5{margin-bottom:-3rem!important}.ml-md-n5,.mx-md-n5{margin-left:-3rem!important}.m-md-auto{margin:auto!important}.mt-md-auto,.my-md-auto{margin-top:auto!important}.mr-md-auto,.mx-md-auto{margin-right:auto!important}.mb-md-auto,.my-md-auto{margin-bottom:auto!important}.ml-md-auto,.mx-md-auto{margin-left:auto!important}}@media (min-width:1024px){.flex-lg-row{-webkit-box-orient:horizontal!important;-webkit-box-direction:normal!important;flex-direction:row!important}.flex-lg-column{-webkit-box-orient:vertical!important;-webkit-box-direction:normal!important;flex-direction:column!important}.flex-lg-row-reverse{-webkit-box-orient:horizontal!important;-webkit-box-direction:reverse!important;flex-direction:row-reverse!important}.flex-lg-column-reverse{-webkit-box-orient:vertical!important;-webkit-box-direction:reverse!important;flex-direction:column-reverse!important}.flex-lg-wrap{flex-wrap:wrap!important}.flex-lg-nowrap{flex-wrap:nowrap!important}.flex-lg-wrap-reverse{flex-wrap:wrap-reverse!important}.flex-lg-fill{-webkit-box-flex:1!important;flex:1 1 auto!important}.flex-lg-grow-0{-webkit-box-flex:0!important;flex-grow:0!important}.flex-lg-grow-1{-webkit-box-flex:1!important;flex-grow:1!important}.flex-lg-shrink-0{flex-shrink:0!important}.flex-lg-shrink-1{flex-shrink:1!important}.justify-content-lg-start{-webkit-box-pack:start!important;justify-content:flex-start!important}.justify-content-lg-end{-webkit-box-pack:end!important;justify-content:flex-end!important}.justify-content-lg-center{-webkit-box-pack:center!important;justify-content:center!important}.justify-content-lg-between{-webkit-box-pack:justify!important;justify-content:space-between!important}.justify-content-lg-around{justify-content:space-around!important}.align-items-lg-start{-webkit-box-align:start!important;align-items:flex-start!important}.align-items-lg-end{-webkit-box-align:end!important;align-items:flex-end!important}.align-items-lg-center{-webkit-box-align:center!important;align-items:center!important}.align-items-lg-baseline{-webkit-box-align:baseline!important;align-items:baseline!important}.align-items-lg-stretch{-webkit-box-align:stretch!important;align-items:stretch!important}.align-content-lg-start{align-content:flex-start!important}.align-content-lg-end{align-content:flex-end!important}.align-content-lg-center{align-content:center!important}.align-content-lg-between{align-content:space-between!important}.align-content-lg-around{align-content:space-around!important}.align-content-lg-stretch{align-content:stretch!important}.align-self-lg-auto{-ms-grid-row-align:auto!important;align-self:auto!important}.align-self-lg-start{align-self:flex-start!important}.align-self-lg-end{align-self:flex-end!important}.align-self-lg-center{-ms-grid-row-align:center!important;align-self:center!important}.align-self-lg-baseline{align-self:baseline!important}.align-self-lg-stretch{-ms-grid-row-align:stretch!important;align-self:stretch!important}.m-lg-0{margin:0!important}.mt-lg-0,.my-lg-0{margin-top:0!important}.mr-lg-0,.mx-lg-0{margin-right:0!important}.mb-lg-0,.my-lg-0{margin-bottom:0!important}.ml-lg-0,.mx-lg-0{margin-left:0!important}.m-lg-1{margin:.25rem!important}.mt-lg-1,.my-lg-1{margin-top:.25rem!important}.mr-lg-1,.mx-lg-1{margin-right:.25rem!important}.mb-lg-1,.my-lg-1{margin-bottom:.25rem!important}.ml-lg-1,.mx-lg-1{margin-left:.25rem!important}.m-lg-2{margin:.5rem!important}.mt-lg-2,.my-lg-2{margin-top:.5rem!important}.mr-lg-2,.mx-lg-2{margin-right:.5rem!important}.mb-lg-2,.my-lg-2{margin-bottom:.5rem!important}.ml-lg-2,.mx-lg-2{margin-left:.5rem!important}.m-lg-3{margin:1rem!important}.mt-lg-3,.my-lg-3{margin-top:1rem!important}.mr-lg-3,.mx-lg-3{margin-right:1rem!important}.mb-lg-3,.my-lg-3{margin-bottom:1rem!important}.ml-lg-3,.mx-lg-3{margin-left:1rem!important}.m-lg-4{margin:1.5rem!important}.mt-lg-4,.my-lg-4{margin-top:1.5rem!important}.mr-lg-4,.mx-lg-4{margin-right:1.5rem!important}.mb-lg-4,.my-lg-4{margin-bottom:1.5rem!important}.ml-lg-4,.mx-lg-4{margin-left:1.5rem!important}.m-lg-5{margin:3rem!important}.mt-lg-5,.my-lg-5{margin-top:3rem!important}.mr-lg-5,.mx-lg-5{margin-right:3rem!important}.mb-lg-5,.my-lg-5{margin-bottom:3rem!important}.ml-lg-5,.mx-lg-5{margin-left:3rem!important}.p-lg-0{padding:0!important}.pt-lg-0,.py-lg-0{padding-top:0!important}.pr-lg-0,.px-lg-0{padding-right:0!important}.pb-lg-0,.py-lg-0{padding-bottom:0!important}.pl-lg-0,.px-lg-0{padding-left:0!important}.p-lg-1{padding:.25rem!important}.pt-lg-1,.py-lg-1{padding-top:.25rem!important}.pr-lg-1,.px-lg-1{padding-right:.25rem!important}.pb-lg-1,.py-lg-1{padding-bottom:.25rem!important}.pl-lg-1,.px-lg-1{padding-left:.25rem!important}.p-lg-2{padding:.5rem!important}.pt-lg-2,.py-lg-2{padding-top:.5rem!important}.pr-lg-2,.px-lg-2{padding-right:.5rem!important}.pb-lg-2,.py-lg-2{padding-bottom:.5rem!important}.pl-lg-2,.px-lg-2{padding-left:.5rem!important}.p-lg-3{padding:1rem!important}.pt-lg-3,.py-lg-3{padding-top:1rem!important}.pr-lg-3,.px-lg-3{padding-right:1rem!important}.pb-lg-3,.py-lg-3{padding-bottom:1rem!important}.pl-lg-3,.px-lg-3{padding-left:1rem!important}.p-lg-4{padding:1.5rem!important}.pt-lg-4,.py-lg-4{padding-top:1.5rem!important}.pr-lg-4,.px-lg-4{padding-right:1.5rem!important}.pb-lg-4,.py-lg-4{padding-bottom:1.5rem!important}.pl-lg-4,.px-lg-4{padding-left:1.5rem!important}.p-lg-5{padding:3rem!important}.pt-lg-5,.py-lg-5{padding-top:3rem!important}.pr-lg-5,.px-lg-5{padding-right:3rem!important}.pb-lg-5,.py-lg-5{padding-bottom:3rem!important}.pl-lg-5,.px-lg-5{padding-left:3rem!important}.m-lg-n1{margin:-.25rem!important}.mt-lg-n1,.my-lg-n1{margin-top:-.25rem!important}.mr-lg-n1,.mx-lg-n1{margin-right:-.25rem!important}.mb-lg-n1,.my-lg-n1{margin-bottom:-.25rem!important}.ml-lg-n1,.mx-lg-n1{margin-left:-.25rem!important}.m-lg-n2{margin:-.5rem!important}.mt-lg-n2,.my-lg-n2{margin-top:-.5rem!important}.mr-lg-n2,.mx-lg-n2{margin-right:-.5rem!important}.mb-lg-n2,.my-lg-n2{margin-bottom:-.5rem!important}.ml-lg-n2,.mx-lg-n2{margin-left:-.5rem!important}.m-lg-n3{margin:-1rem!important}.mt-lg-n3,.my-lg-n3{margin-top:-1rem!important}.mr-lg-n3,.mx-lg-n3{margin-right:-1rem!important}.mb-lg-n3,.my-lg-n3{margin-bottom:-1rem!important}.ml-lg-n3,.mx-lg-n3{margin-left:-1rem!important}.m-lg-n4{margin:-1.5rem!important}.mt-lg-n4,.my-lg-n4{margin-top:-1.5rem!important}.mr-lg-n4,.mx-lg-n4{margin-right:-1.5rem!important}.mb-lg-n4,.my-lg-n4{margin-bottom:-1.5rem!important}.ml-lg-n4,.mx-lg-n4{margin-left:-1.5rem!important}.m-lg-n5{margin:-3rem!important}.mt-lg-n5,.my-lg-n5{margin-top:-3rem!important}.mr-lg-n5,.mx-lg-n5{margin-right:-3rem!important}.mb-lg-n5,.my-lg-n5{margin-bottom:-3rem!important}.ml-lg-n5,.mx-lg-n5{margin-left:-3rem!important}.m-lg-auto{margin:auto!important}.mt-lg-auto,.my-lg-auto{margin-top:auto!important}.mr-lg-auto,.mx-lg-auto{margin-right:auto!important}.mb-lg-auto,.my-lg-auto{margin-bottom:auto!important}.ml-lg-auto,.mx-lg-auto{margin-left:auto!important}}@media (min-width:1440px){.flex-xl-row{-webkit-box-orient:horizontal!important;-webkit-box-direction:normal!important;flex-direction:row!important}.flex-xl-column{-webkit-box-orient:vertical!important;-webkit-box-direction:normal!important;flex-direction:column!important}.flex-xl-row-reverse{-webkit-box-orient:horizontal!important;-webkit-box-direction:reverse!important;flex-direction:row-reverse!important}.flex-xl-column-reverse{-webkit-box-orient:vertical!important;-webkit-box-direction:reverse!important;flex-direction:column-reverse!important}.flex-xl-wrap{flex-wrap:wrap!important}.flex-xl-nowrap{flex-wrap:nowrap!important}.flex-xl-wrap-reverse{flex-wrap:wrap-reverse!important}.flex-xl-fill{-webkit-box-flex:1!important;flex:1 1 auto!important}.flex-xl-grow-0{-webkit-box-flex:0!important;flex-grow:0!important}.flex-xl-grow-1{-webkit-box-flex:1!important;flex-grow:1!important}.flex-xl-shrink-0{flex-shrink:0!important}.flex-xl-shrink-1{flex-shrink:1!important}.justify-content-xl-start{-webkit-box-pack:start!important;justify-content:flex-start!important}.justify-content-xl-end{-webkit-box-pack:end!important;justify-content:flex-end!important}.justify-content-xl-center{-webkit-box-pack:center!important;justify-content:center!important}.justify-content-xl-between{-webkit-box-pack:justify!important;justify-content:space-between!important}.justify-content-xl-around{justify-content:space-around!important}.align-items-xl-start{-webkit-box-align:start!important;align-items:flex-start!important}.align-items-xl-end{-webkit-box-align:end!important;align-items:flex-end!important}.align-items-xl-center{-webkit-box-align:center!important;align-items:center!important}.align-items-xl-baseline{-webkit-box-align:baseline!important;align-items:baseline!important}.align-items-xl-stretch{-webkit-box-align:stretch!important;align-items:stretch!important}.align-content-xl-start{align-content:flex-start!important}.align-content-xl-end{align-content:flex-end!important}.align-content-xl-center{align-content:center!important}.align-content-xl-between{align-content:space-between!important}.align-content-xl-around{align-content:space-around!important}.align-content-xl-stretch{align-content:stretch!important}.align-self-xl-auto{-ms-grid-row-align:auto!important;align-self:auto!important}.align-self-xl-start{align-self:flex-start!important}.align-self-xl-end{align-self:flex-end!important}.align-self-xl-center{-ms-grid-row-align:center!important;align-self:center!important}.align-self-xl-baseline{align-self:baseline!important}.align-self-xl-stretch{-ms-grid-row-align:stretch!important;align-self:stretch!important}.m-xl-0{margin:0!important}.mt-xl-0,.my-xl-0{margin-top:0!important}.mr-xl-0,.mx-xl-0{margin-right:0!important}.mb-xl-0,.my-xl-0{margin-bottom:0!important}.ml-xl-0,.mx-xl-0{margin-left:0!important}.m-xl-1{margin:.25rem!important}.mt-xl-1,.my-xl-1{margin-top:.25rem!important}.mr-xl-1,.mx-xl-1{margin-right:.25rem!important}.mb-xl-1,.my-xl-1{margin-bottom:.25rem!important}.ml-xl-1,.mx-xl-1{margin-left:.25rem!important}.m-xl-2{margin:.5rem!important}.mt-xl-2,.my-xl-2{margin-top:.5rem!important}.mr-xl-2,.mx-xl-2{margin-right:.5rem!important}.mb-xl-2,.my-xl-2{margin-bottom:.5rem!important}.ml-xl-2,.mx-xl-2{margin-left:.5rem!important}.m-xl-3{margin:1rem!important}.mt-xl-3,.my-xl-3{margin-top:1rem!important}.mr-xl-3,.mx-xl-3{margin-right:1rem!important}.mb-xl-3,.my-xl-3{margin-bottom:1rem!important}.ml-xl-3,.mx-xl-3{margin-left:1rem!important}.m-xl-4{margin:1.5rem!important}.mt-xl-4,.my-xl-4{margin-top:1.5rem!important}.mr-xl-4,.mx-xl-4{margin-right:1.5rem!important}.mb-xl-4,.my-xl-4{margin-bottom:1.5rem!important}.ml-xl-4,.mx-xl-4{margin-left:1.5rem!important}.m-xl-5{margin:3rem!important}.mt-xl-5,.my-xl-5{margin-top:3rem!important}.mr-xl-5,.mx-xl-5{margin-right:3rem!important}.mb-xl-5,.my-xl-5{margin-bottom:3rem!important}.ml-xl-5,.mx-xl-5{margin-left:3rem!important}.p-xl-0{padding:0!important}.pt-xl-0,.py-xl-0{padding-top:0!important}.pr-xl-0,.px-xl-0{padding-right:0!important}.pb-xl-0,.py-xl-0{padding-bottom:0!important}.pl-xl-0,.px-xl-0{padding-left:0!important}.p-xl-1{padding:.25rem!important}.pt-xl-1,.py-xl-1{padding-top:.25rem!important}.pr-xl-1,.px-xl-1{padding-right:.25rem!important}.pb-xl-1,.py-xl-1{padding-bottom:.25rem!important}.pl-xl-1,.px-xl-1{padding-left:.25rem!important}.p-xl-2{padding:.5rem!important}.pt-xl-2,.py-xl-2{padding-top:.5rem!important}.pr-xl-2,.px-xl-2{padding-right:.5rem!important}.pb-xl-2,.py-xl-2{padding-bottom:.5rem!important}.pl-xl-2,.px-xl-2{padding-left:.5rem!important}.p-xl-3{padding:1rem!important}.pt-xl-3,.py-xl-3{padding-top:1rem!important}.pr-xl-3,.px-xl-3{padding-right:1rem!important}.pb-xl-3,.py-xl-3{padding-bottom:1rem!important}.pl-xl-3,.px-xl-3{padding-left:1rem!important}.p-xl-4{padding:1.5rem!important}.pt-xl-4,.py-xl-4{padding-top:1.5rem!important}.pr-xl-4,.px-xl-4{padding-right:1.5rem!important}.pb-xl-4,.py-xl-4{padding-bottom:1.5rem!important}.pl-xl-4,.px-xl-4{padding-left:1.5rem!important}.p-xl-5{padding:3rem!important}.pt-xl-5,.py-xl-5{padding-top:3rem!important}.pr-xl-5,.px-xl-5{padding-right:3rem!important}.pb-xl-5,.py-xl-5{padding-bottom:3rem!important}.pl-xl-5,.px-xl-5{padding-left:3rem!important}.m-xl-n1{margin:-.25rem!important}.mt-xl-n1,.my-xl-n1{margin-top:-.25rem!important}.mr-xl-n1,.mx-xl-n1{margin-right:-.25rem!important}.mb-xl-n1,.my-xl-n1{margin-bottom:-.25rem!important}.ml-xl-n1,.mx-xl-n1{margin-left:-.25rem!important}.m-xl-n2{margin:-.5rem!important}.mt-xl-n2,.my-xl-n2{margin-top:-.5rem!important}.mr-xl-n2,.mx-xl-n2{margin-right:-.5rem!important}.mb-xl-n2,.my-xl-n2{margin-bottom:-.5rem!important}.ml-xl-n2,.mx-xl-n2{margin-left:-.5rem!important}.m-xl-n3{margin:-1rem!important}.mt-xl-n3,.my-xl-n3{margin-top:-1rem!important}.mr-xl-n3,.mx-xl-n3{margin-right:-1rem!important}.mb-xl-n3,.my-xl-n3{margin-bottom:-1rem!important}.ml-xl-n3,.mx-xl-n3{margin-left:-1rem!important}.m-xl-n4{margin:-1.5rem!important}.mt-xl-n4,.my-xl-n4{margin-top:-1.5rem!important}.mr-xl-n4,.mx-xl-n4{margin-right:-1.5rem!important}.mb-xl-n4,.my-xl-n4{margin-bottom:-1.5rem!important}.ml-xl-n4,.mx-xl-n4{margin-left:-1.5rem!important}.m-xl-n5{margin:-3rem!important}.mt-xl-n5,.my-xl-n5{margin-top:-3rem!important}.mr-xl-n5,.mx-xl-n5{margin-right:-3rem!important}.mb-xl-n5,.my-xl-n5{margin-bottom:-3rem!important}.ml-xl-n5,.mx-xl-n5{margin-left:-3rem!important}.m-xl-auto{margin:auto!important}.mt-xl-auto,.my-xl-auto{margin-top:auto!important}.mr-xl-auto,.mx-xl-auto{margin-right:auto!important}.mb-xl-auto,.my-xl-auto{margin-bottom:auto!important}.ml-xl-auto,.mx-xl-auto{margin-left:auto!important}}*{box-sizing:border-box}:focus-visible{outline:#fff solid 3px}body{margin:0;font-family:\"Open Sans\",sans-serif;-webkit-font-smoothing:antialiased}a{color:#36f;text-decoration:none}.hline,.vline{display:inline-block;background:#ededed;vertical-align:middle}.vline{width:1px;height:100%}.hline{width:100%;height:1px}@media (max-width:575px){.container{padding-left:15px;padding-right:15px}}ui-avatar{line-height:0}.header{position:fixed;top:0;left:0;width:100%;max-height:72px;background-color:#fff;box-shadow:0 2px 10px rgba(43,43,43,.1);z-index:9}.header__doubled{max-height:72px;overflow:hidden;-webkit-transition:max-height .3s;transition:max-height .3s}.header .header-publish-button{background:#36f;box-shadow:0 3px 7px rgba(0,0,0,.07);border-radius:17.5px;padding:8px 20px;height:35px;min-width:109px;margin-left:20px;display:none;font-size:13px;color:#fff;cursor:pointer;font-family:'Open Sans',sans-serif;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center}.header .header-publish-button i{margin-left:0}.header__slider{-webkit-transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.header__slider--second{-webkit-transform:translateY(-50%);transform:translateY(-50%)}.header__slide{padding:24px 0;height:69px}.header__slide--main{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.header__slide--main .logo{-webkit-box-flex:0;flex:0;width:auto;max-height:35px;height:35px;margin-right:40px;cursor:pointer}.header__slide--main .logo+.icon-close{display:none;font-size:24px;color:#2b2b2b;vertical-align:middle}@media (max-width:767px){.header .header-publish-button{display:-webkit-inline-box;display:inline-flex}.header__slide--main .logo{margin-right:20px}.header__slide--main .logo.no-logo{display:none}.header__slide--main .logo.no-logo+.icon-close{display:-webkit-inline-box;display:inline-flex}}.header__slide--main .button{margin-left:15px;vertical-align:middle;font-weight:600;border-width:0}.header__slide--second-part{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.header__slide--second-part .header__slide__meta{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-flex:1;flex:1}.header__slide--second-part .header__slide__meta h2{display:inline-block;font:20px/28px Vollkorn,serif;margin:0 15px 0 20px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:900px;cursor:pointer}@media (max-width:1439px){.header__slide--second-part .header__slide__meta h2{max-width:700px}}@media (max-width:1023px){.header__slide--second-part .header__slide__meta h2{max-width:500px}}@media (max-width:767px){.header__slide--second-part .header__slide__meta h2{max-width:300px}}@media (max-width:575px){.header__slide--main .logo{max-height:30px;margin-right:10px}.header__slide--second-part .header__slide__meta h2{max-width:110px}}@media screen and (max-width:370px){.header__slide--second-part .header__slide__meta h2{max-width:90px}}.header__slide--second-part .header__slide__meta .button--small{line-height:24px;margin-top:-4px}.header__slide--second-part .header__slide__meta .button--icon{display:none}.header__slide--second-part .header__slide__stats ::ng-deep .follow-button{margin-right:15px}.header__slide--second-part .header__slide__stats .share-block{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.header__slide--second-part .header__slide__stats .share-block .share-dropdown{border:1px solid #ecf0f3;border-radius:50%;width:28px;height:28px;cursor:pointer;text-align:center}.header__slide--second-part .header__slide__stats i{font-size:24px;cursor:pointer;border:1px solid #ecf0f3;border-radius:50%;padding:3px}.header__slide--second-part .header__slide__stats i:active,.header__slide--second-part .header__slide__stats i:focus{outline:0}.header__slide--second-part .header__slide__stats .article-icons{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.header__slide--second-part .header__slide__stats .article-icons ::ng-deep .button.like-icon{margin:0 15px}.header__slide--second-part .header__slide__stats .user-info{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.header__slide--second-part .header__slide__stats .user-info ::ng-deep .datum-container{margin-right:25px}.header__slide--second-part .header__slide__stats .user-info ::ng-deep .datum-container.last-item{margin:0}.header__slide--second-part ::ng-deep .share-button{width:27px!important;height:27px!important;font-size:24px!important;margin-left:8px!important;-webkit-transition:opacity .3s;transition:opacity .3s}.header__slide--second-part ::ng-deep .share-button i{color:inherit;margin-right:-1px;font-size:22px}.header__slide--second-part ::ng-deep .share-button.share-button--facebook{border:1px solid #1778f2;color:#1778f2}.header__slide--second-part ::ng-deep .share-button.share-button--facebook:focus,.header__slide--second-part ::ng-deep .share-button.share-button--facebook:hover{opacity:.75}.header__slide--second-part ::ng-deep .share-button.share-button--twitter{border:1px solid #1b95e0;color:#1b95e0}.header__slide--second-part ::ng-deep .share-button.share-button--twitter:focus,.header__slide--second-part ::ng-deep .share-button.share-button--twitter:hover{opacity:.75}.header__slide--second-part ::ng-deep .share-button.share-button--linkedin{border:1px solid #0077b5;color:#0077b5}.header__slide--second-part ::ng-deep .share-button.share-button--linkedin:focus,.header__slide--second-part ::ng-deep .share-button.share-button--linkedin:hover{opacity:.75}.header__slide--second-part ::ng-deep .share-button.share-button--reddit{border:1px solid #ff4500;color:#ff4500}.header__slide--second-part ::ng-deep .share-button.share-button--reddit:focus,.header__slide--second-part ::ng-deep .share-button.share-button--reddit:hover{opacity:.75}.header__slide--second-part ::ng-deep .share-button:first-child{margin-left:0}@media (max-width:767px){.header__slide--second-part .header__slide__meta{-webkit-box-pack:justify;justify-content:space-between}.header__slide--second-part .header__slide__meta h2{font:700 18px/24px Vollkorn,serif;margin:0 15px 0 10px}.header__slide--second-part .header__slide__stats{display:none}}.header__tags{font-size:0;-webkit-box-flex:1;flex:1;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;position:relative;-ms-scroll-chaining:none;overscroll-behavior:contain}.header__tags-item{font:600 13px/13px \"Open Sans\",sans-serif;color:#8d929a;margin-right:20px;vertical-align:middle;cursor:pointer}.header__tags-item:focus{outline:0}.header__tags-item:hover{color:#565a60}.header__tags-draft{font-family:\"Open Sans\",sans-serif;font-style:normal;font-weight:400;font-size:13px;line-height:18px;color:#8d929a;padding:0 0 0 50px;margin-right:10px}@media (max-width:767px){.header__tags-item{display:none}.header__tags-draft.pl-media{padding-left:13px}}@media (max-width:575px){.header__slide--second-part .header__slide__meta .button--small{display:none}.header__slide--second-part .header__slide__meta .button--icon{border:none;display:-webkit-inline-box;display:inline-flex;background:0 0!important;color:#36f;font-size:20px}.header__tags-draft.pl-media{display:none}}.header__tags-more{cursor:pointer;vertical-align:middle;display:inline-block;font-size:18px;position:relative}.header__tags-more:focus{outline:0}.header__tags-more:after{opacity:0;-webkit-transition:.2s ease-out;transition:.2s ease-out;content:'';display:inline-block;position:absolute;width:12px;height:12px;border:1px solid #dee2e6;border-right:none;border-bottom:none;background-color:#fff;z-index:4;bottom:-30px;left:5px;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.header__tags-more.after-visible:after{opacity:1;-webkit-transition:.2s ease-out;transition:.2s ease-out}@media (max-width:767px){.header .no-visibility{display:none}}.header__right-icons{height:35px;font-size:0;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.header__right-icons:focus{outline:0}.header__right-icons .notifications-wrapper{display:inline-block;position:relative}.header__right-icons .notifications-wrapper small{display:-webkit-inline-box;display:inline-flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;width:16px;height:16px;border:2px solid #fff;font:600 8px/1 \"Open Sans\",sans-serif;position:absolute;top:-3px;right:-3px;background:#fc5d49;color:#fff;border-radius:50%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.header__right-icons a{font-family:\"Open Sans\",sans-serif;font-style:normal;font-weight:600;font-size:15px;line-height:20px;text-align:right;color:#565a60}.header__right-icons .icon-energy:focus{outline:0}.header__right-icons ::ng-deep .button.sign-in{border:none;margin-right:10px}@media (max-width:575px){.header__right-icons ::ng-deep .button.sign-in,.header__right-icons ::ng-deep .button.sign-up{white-space:nowrap;padding:0 10px;font-size:11px;line-height:28px}}.header__right-icons ::ng-deep .button.button--icon{border:none}.header__right-icons ::ng-deep .dropdown-item{top:3px;left:2px}.header__right-icons i{vertical-align:middle;font-size:24px;margin-left:15px;cursor:pointer}.header__right-icons .vline{height:24px;margin:0 15px}.header__menu-avatar{display:inline-block;width:30px;height:30px;background-color:#e9efff;vertical-align:middle;margin-left:25px;border-radius:10px;overflow:hidden;cursor:pointer;position:relative}.header__menu-avatar:focus{outline:0}.header__menu-avatar ::ng-deep i{color:#36f}.header__menu-avatar .icon-profile{display:inline-block;margin:3px;font-size:24px;color:#36f}.header__menu-avatar img{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.header--narrow{max-height:60px}.header--narrow .header__slide{padding:10px 0;height:60px}.header--narrow .header__slide__stats{display:-webkit-box;display:flex}.header__search{position:absolute;top:0;right:0;left:0;width:100%;height:0;overflow:hidden;background-color:#36f;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;-webkit-transition:height .3s ease-out;transition:height .3s ease-out}.header__search input{border:none;background:0 0;width:100%;font-size:25px;color:#fff;line-height:24px;margin-bottom:0}@media (max-width:767px){.header__search input{font-size:18px}}.header__search input:focus{outline:0}.header__search .close-search{opacity:0;position:absolute;top:50%;right:0;-webkit-transform:translateY(-50%);transform:translateY(-50%);color:#fff;font-size:24px;cursor:pointer;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;background:#3267ff;padding:10px 0 10px 10px}.header__search .close-search span{display:-webkit-inline-box;display:inline-flex;margin-right:4px;font-size:16px;font-family:\"Open Sans\",sans-serif}.header__search__animation{height:100%;-webkit-transition:height .3s ease-out;transition:height .3s ease-out;opacity:1;overflow:visible}.header__search__animation .close-search{opacity:1;-webkit-transition:.3s ease-out .3s;transition:.3s ease-out .3s}.header__article-read{display:inline-block;position:absolute;bottom:0;left:0;top:0;width:0;height:2px;background:#36f}.header-overlay{position:fixed;top:0;left:0;width:100%;height:0;z-index:9}.header-overlay ::ng-deep .dropdown-item{-webkit-transform:translateX(16px);transform:translateX(16px);background:red}.header-overlay ::ng-deep .dropdown-item__opener{display:none}.header-overlay__item{position:absolute;top:37px}.tags{visibility:hidden;pointer-events:none;opacity:0;-webkit-transition:.2s ease-out;transition:.2s ease-out}.tags--visible{visibility:visible;pointer-events:auto;opacity:1;-webkit-transition:.2s ease-out;transition:.2s ease-out}.avatar{cursor:pointer}.datum-list{display:-webkit-box;display:flex}.datum-container{display:-webkit-box;display:flex;font-family:\"Open Sans\",sans-serif;font-size:13px;margin-right:10px}.datum-container__count{font-weight:700;color:#2b2b2b;margin-right:7px}.datum-container__property{font-weight:600;color:#c1c4cb;text-transform:uppercase}::ng-deep .dropdown-list__item.inline-items{display:-webkit-inline-box;display:inline-flex}::ng-deep .dropdown-list__item.inline-items.language-title .dropdown-list__text{font-size:12px;line-height:16px;color:#8d929a;cursor:auto}::ng-deep .dropdown-list__item.inline-items.language-title .dropdown-list__text:hover{color:#8d929a!important}::ng-deep .dropdown-list__item.inline-items.language-title:hover{color:#8d929a!important}::ng-deep .dropdown-list__item.inline-items.language-switcher{text-align:center;text-transform:uppercase;color:#565a60;padding:3px;border-radius:5px;margin-left:7px;cursor:pointer;-webkit-transition:.2s ease-out;transition:.2s ease-out;min-width:26px;display:inline-block}::ng-deep .dropdown-list__item.inline-items.language-switcher.selected{background:#ecf0f3;font-weight:600}::ng-deep .dropdown-list__item:hover .dropdown-list__text{color:#8d929a!important}"]
                }] }
    ];
    /** @nocollapse */
    HeaderComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    HeaderComponent.propDecorators = {
        headerData: [{ type: Input }],
        showSearchBar: [{ type: Input }],
        articleReadPercent: [{ type: Input }],
        isSecondActive: [{ type: Input }],
        articlePage: [{ type: Input }],
        navigationLink: [{ type: Output }],
        searchEvent: [{ type: Output }],
        publicationFollow: [{ type: Output }],
        articleAuthorFollow: [{ type: Output }],
        articleLiked: [{ type: Output }],
        articleShared: [{ type: Output }],
        publishArticleClick: [{ type: Output }],
        articleTitleClick: [{ type: Output }],
        publicationTitleClick: [{ type: Output }],
        notificationMenuOpened: [{ type: Output }],
        userFollow: [{ type: Output }],
        onInputChange: [{ type: Output }],
        userSignIn: [{ type: Output }],
        userSignUp: [{ type: Output }],
        continueArticle: [{ type: Output }],
        tagItems: [{ type: Input }],
        onTagItemSelect: [{ type: Output }],
        isOpen: [{ type: Input }],
        customTagMenu: [{ type: Input }],
        blockInfiniteScroll: [{ type: Input }],
        seeMoreLoading: [{ type: Input }],
        isOpenChange: [{ type: Output }],
        seeMore: [{ type: Output }],
        overlayMenuList: [{ type: ViewChild, args: ['overlayMenuList', { static: false },] }],
        notificationMenuList: [{ type: ViewChild, args: ['notificationMenuList', { static: false },] }],
        profileMenuList: [{ type: ViewChild, args: ['profileMenuList', { static: false },] }],
        socialMenuList: [{ type: ViewChild, args: ['socialMenuList', { static: false },] }],
        searchBar: [{ type: ViewChild, args: ['searchBar', { static: false },] }],
        _leftValsListener: [{ type: HostListener, args: ['window:resize', [],] }],
        _closeMenus: [{ type: HostListener, args: ['window:scroll', [],] }]
    };
    return HeaderComponent;
}());
export { HeaderComponent };
if (false) {
    /** @type {?} */
    HeaderComponent.prototype.headerData;
    /** @type {?} */
    HeaderComponent.prototype.showSearchBar;
    /** @type {?} */
    HeaderComponent.prototype.articleReadPercent;
    /** @type {?} */
    HeaderComponent.prototype.isSecondActive;
    /** @type {?} */
    HeaderComponent.prototype.articlePage;
    /** @type {?} */
    HeaderComponent.prototype.navigationLink;
    /** @type {?} */
    HeaderComponent.prototype.searchEvent;
    /** @type {?} */
    HeaderComponent.prototype.publicationFollow;
    /** @type {?} */
    HeaderComponent.prototype.articleAuthorFollow;
    /** @type {?} */
    HeaderComponent.prototype.articleLiked;
    /** @type {?} */
    HeaderComponent.prototype.articleShared;
    /** @type {?} */
    HeaderComponent.prototype.publishArticleClick;
    /** @type {?} */
    HeaderComponent.prototype.articleTitleClick;
    /** @type {?} */
    HeaderComponent.prototype.publicationTitleClick;
    /** @type {?} */
    HeaderComponent.prototype.notificationMenuOpened;
    /** @type {?} */
    HeaderComponent.prototype.userFollow;
    /** @type {?} */
    HeaderComponent.prototype.onInputChange;
    /** @type {?} */
    HeaderComponent.prototype.userSignIn;
    /** @type {?} */
    HeaderComponent.prototype.userSignUp;
    /** @type {?} */
    HeaderComponent.prototype.continueArticle;
    /** @type {?} */
    HeaderComponent.prototype.tagItems;
    /** @type {?} */
    HeaderComponent.prototype.onTagItemSelect;
    /** @type {?} */
    HeaderComponent.prototype.isOpen;
    /** @type {?} */
    HeaderComponent.prototype.customTagMenu;
    /** @type {?} */
    HeaderComponent.prototype.blockInfiniteScroll;
    /** @type {?} */
    HeaderComponent.prototype.seeMoreLoading;
    /** @type {?} */
    HeaderComponent.prototype.isOpenChange;
    /** @type {?} */
    HeaderComponent.prototype.seeMore;
    /** @type {?} */
    HeaderComponent.prototype.overlayMenuList;
    /** @type {?} */
    HeaderComponent.prototype.notificationMenuList;
    /** @type {?} */
    HeaderComponent.prototype.profileMenuList;
    /** @type {?} */
    HeaderComponent.prototype.socialMenuList;
    /** @type {?} */
    HeaderComponent.prototype.searchBar;
    /** @type {?} */
    HeaderComponent.prototype.avatarData;
    /** @type {?} */
    HeaderComponent.prototype.tagCountToSlice;
    /** @type {?} */
    HeaderComponent.prototype.showLoading;
    /** @type {?} */
    HeaderComponent.prototype.draftUpdate;
    /** @type {?} */
    HeaderComponent.prototype.leftVal;
    /** @type {?} */
    HeaderComponent.prototype.menuOpen;
    /**
     * @type {?}
     * @private
     */
    HeaderComponent.prototype.cdr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3VpLWxpYi8iLCJzb3VyY2VzIjpbImxpYi9vcmdhbmlzbS9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUVOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFakMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXJEO0lBNkRFLHlCQUFvQixHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQXJEakMsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsdUJBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBQy9CLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBQ2hDLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzVCLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN6QyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDdEMsc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM1Qyx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzlDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN2QyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDM0Msd0JBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUNqRCxzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzVDLDBCQUFxQixHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDaEQsMkJB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LGlEQUEyRDs7SUFDM0QscUNBQStDOztJQUMvQyx3Q0FBa0Q7O0lBQ2xELHFDQUErQzs7SUFDL0MscUNBQStDOztJQUMvQywwQ0FBb0Q7O0lBQ3BELG1DQUE0Qzs7SUFDNUMsMENBQWtFOztJQUNsRSxpQ0FBaUM7O0lBQ2pDLHdDQUF3Qzs7SUFDeEMsOENBQThDOztJQUM5Qyx5Q0FBeUM7O0lBQ3pDLHVDQUErRDs7SUFDL0Qsa0NBQStEOztJQUMvRCwwQ0FBMkU7O0lBQzNFLCtDQUFxRjs7SUFDckYsMENBQTJFOztJQUMzRSx5Q0FBeUU7O0lBRXpFLG9DQUErRDs7SUFDL0QscUNBQWlDOztJQUNqQywwQ0FBMkI7O0lBQzNCLHNDQUFvQzs7SUFDcEMsc0NBQStCOztJQUUvQixrQ0FLRTs7SUFFRixtQ0FNRTs7Ozs7SUFFVSw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIEhvc3RMaXN0ZW5lcixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBDaGFuZ2VEZXRlY3RvclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhlYWRlckRhdGFPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9tb2RlbHMvaGVhZGVyRGF0YSc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IExpc3RJdGVtT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvbW9kZWxzL2xpc3RJdGVtJztcbmltcG9ydCB7IEF2YXRhciB9IGZyb20gJy4uLy4uLy4uL2NvcmUvbW9kZWxzL2F2YXRhcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3VpLWhlYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9oZWFkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9oZWFkZXIuY29tcG9uZW50LnNjc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIEhlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgaGVhZGVyRGF0YTogSGVhZGVyRGF0YU9wdGlvbnM7XG4gIEBJbnB1dCgpIHNob3dTZWFyY2hCYXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgYXJ0aWNsZVJlYWRQZXJjZW50OiBudW1iZXIgPSAwO1xuICBASW5wdXQoKSBpc1NlY29uZEFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBhcnRpY2xlUGFnZTogYm9vbGVhbiA9IGZhbHNlO1xuICBAT3V0cHV0KCkgbmF2aWdhdGlvbkxpbmsgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHNlYXJjaEV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBwdWJsaWNhdGlvbkZvbGxvdyA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgYXJ0aWNsZUF1dGhvckZvbGxvdyA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgYXJ0aWNsZUxpa2VkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBhcnRpY2xlU2hhcmVkID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBPdXRwdXQoKSBwdWJsaXNoQXJ0aWNsZUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBPdXRwdXQoKSBhcnRpY2xlVGl0bGVDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgcHVibGljYXRpb25UaXRsZUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBub3RpZmljYXRpb25NZW51T3BlbmVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSB1c2VyRm9sbG93ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBvbklucHV0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSB1c2VyU2lnbkluID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSB1c2VyU2lnblVwID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBjb250aW51ZUFydGljbGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQElucHV0KCkgdGFnSXRlbXM6IExpc3RJdGVtT3B0aW9uc1tdID0gbnVsbDtcbiAgQE91dHB1dCgpIG9uVGFnSXRlbVNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBJbnB1dCgpIGlzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBjdXN0b21UYWdNZW51OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGJsb2NrSW5maW5pdGVTY3JvbGw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgc2VlTW9yZUxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQE91dHB1dCgpIGlzT3BlbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBzZWVNb3JlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAVmlld0NoaWxkKCdvdmVybGF5TWVudUxpc3QnLCB7c3RhdGljOiBmYWxzZX0pIG92ZXJsYXlNZW51TGlzdDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnbm90aWZpY2F0aW9uTWVudUxpc3QnLCB7c3RhdGljOiBmYWxzZX0pIG5vdGlmaWNhdGlvbk1lbnVMaXN0OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdwcm9maWxlTWVudUxpc3QnLCB7c3RhdGljOiBmYWxzZX0pIHByb2ZpbGVNZW51TGlzdDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnc29jaWFsTWVudUxpc3QnLCB7c3RhdGljOiBmYWxzZX0pIHNvY2lhbE1lbnVMaXN0OiBFbGVtZW50UmVmO1xuXG4gIEBWaWV3Q2hpbGQoJ3NlYXJjaEJhcicsIHtzdGF0aWM6IGZhbHNlfSkgc2VhcmNoQmFyOiBFbGVtZW50UmVmO1xuICBwdWJsaWMgYXZhdGFyRGF0YTogQXZhdGFyID0gbnVsbDtcbiAgcHVibGljIHRhZ0NvdW50VG9TbGljZSA9IDA7XG4gIHB1YmxpYyBzaG93TG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgZHJhZnRVcGRhdGU6IG51bWJlciA9IDA7XG5cbiAgcHVibGljIGxlZnRWYWwgPSB7XG4gICAgbWVudTogMCxcbiAgICBub3RpZmljYXRpb246IDAsXG4gICAgcHJvZmlsZTogMCxcbiAgICBzb2NpYWw6IDBcbiAgfTtcblxuICBwdWJsaWMgbWVudU9wZW4gPSB7XG4gICAgbWVudTogZmFsc2UsXG4gICAgbm90aWZpY2F0aW9uOiBmYWxzZSxcbiAgICBwcm9maWxlOiBmYWxzZSxcbiAgICB0YWc6IGZhbHNlLFxuICAgIHNvY2lhbDogZmFsc2VcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gIH1cblxuICBzZWxlY3RUYWdWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMub25UYWdJdGVtU2VsZWN0LmVtaXQodmFsdWUpO1xuICAgIHRoaXMubWVudU9wZW4udGFnID0gZmFsc2U7XG4gICAgdGhpcy5zaG93U2VhcmNoQmFyID0gdHJ1ZTtcbiAgICB0aGlzLnNlYXJjaEJhci5uYXRpdmVFbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5vbklucHV0Q2hhbmdlLmVtaXQodmFsdWUpO1xuICB9XG5cbiAgYnVpbGRBdmF0YXJEYXRhKCkge1xuICAgIHRoaXMuYXZhdGFyRGF0YSA9IG5ldyBBdmF0YXIoe1xuICAgICAgZmlyc3RfbmFtZTogdGhpcy5oZWFkZXJEYXRhLnB1YmxpY2F0aW9uRGF0YSA/IHRoaXMuaGVhZGVyRGF0YS5wdWJsaWNhdGlvbkRhdGEudGl0bGUgOiBudWxsLFxuICAgICAgaW1hZ2U6IHRoaXMuaGVhZGVyRGF0YS5wdWJsaWNhdGlvbkRhdGEgPyAodGhpcy5oZWFkZXJEYXRhLnB1YmxpY2F0aW9uRGF0YS5sb2dvID8gdGhpcy5oZWFkZXJEYXRhLnB1YmxpY2F0aW9uRGF0YS5sb2dvIDogdGhpcy5oZWFkZXJEYXRhLnB1YmxpY2F0aW9uRGF0YS5jb3ZlcikgOiBudWxsXG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy5idWlsZEF2YXRhckRhdGEoKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2FsY3VsYXRlTGVmdFZhbHVlcygpO1xuICAgIH0sIDc1KTtcbiAgICBpZiAodGhpcy5oZWFkZXJEYXRhLmRyYWZ0RGF0YSAmJiB0aGlzLmhlYWRlckRhdGEuZHJhZnREYXRhLnVwZGF0ZWQpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnREcmFmdERhdGUgPSB0aGlzLmhlYWRlckRhdGEuZHJhZnREYXRhLnVwZGF0ZWQ7XG4gICAgICBpZiAodGhpcy5kcmFmdFVwZGF0ZSAhPSBjdXJyZW50RHJhZnREYXRlKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlTG9hZGluZyhjdXJyZW50RHJhZnREYXRlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcmFmdFVwZGF0ZSA9IDA7XG4gICAgfVxuICB9XG5cbiAgaW1hZ2VMb2FkZWQoKSB7XG4gICAgdGhpcy5jYWxjdWxhdGVMZWZ0VmFsdWVzKCk7XG4gIH1cblxuXG4gIGVuYWJsZUxvYWRpbmcoY3VycmVudERyYWZ0RGF0ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5zaG93TG9hZGluZyA9IHRydWU7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmRyYWZ0VXBkYXRlID0gY3VycmVudERyYWZ0RGF0ZTtcbiAgICAgIHRoaXMuc2hvd0xvYWRpbmcgPSBmYWxzZTtcbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2FsY3VsYXRlTGVmdFZhbHVlcygpO1xuICAgIH0sIDc1KTtcblxuICAgIGZyb21FdmVudCh0aGlzLnNlYXJjaEJhci5uYXRpdmVFbGVtZW50LCAnaW5wdXQnKS5waXBlKFxuICAgICAgZGVib3VuY2VUaW1lKDYwMCksXG4gICAgKS5zdWJzY3JpYmUoXG4gICAgICAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5vbklucHV0Q2hhbmdlLmVtaXQoZXZlbnRbJ3NyY0VsZW1lbnQnXVsndmFsdWUnXSk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGNhbGN1bGF0ZUxlZnRWYWx1ZXMoKSB7XG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IDEwMjQpIHtcbiAgICAgIHRoaXMudGFnQ291bnRUb1NsaWNlID0gNDtcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IDc2OCkge1xuICAgICAgdGhpcy50YWdDb3VudFRvU2xpY2UgPSAzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRhZ0NvdW50VG9TbGljZSA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3ZlcmxheU1lbnVMaXN0KSB7XG4gICAgICB0aGlzLmxlZnRWYWwubWVudSA9IHRoaXMub3ZlcmxheU1lbnVMaXN0Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCArIDQ7XG4gICAgfVxuICAgIGlmICh0aGlzLm5vdGlmaWNhdGlvbk1lbnVMaXN0KSB7XG4gICAgICB0aGlzLmxlZnRWYWwubm90aWZpY2F0aW9uID0gdGhpcy5ub3RpZmljYXRpb25NZW51TGlzdC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKyA0O1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9maWxlTWVudUxpc3QpIHtcbiAgICAgIHRoaXMubGVmdFZhbC5wcm9maWxlID0gdGhpcy5wcm9maWxlTWVudUxpc3QubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgNDtcbiAgICB9XG4gICAgaWYgKHRoaXMuc29jaWFsTWVudUxpc3QpIHtcbiAgICAgIHRoaXMubGVmdFZhbC5zb2NpYWwgPSB0aGlzLnNvY2lhbE1lbnVMaXN0Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCArIDQ7XG4gICAgfVxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbXSlcbiAgX2xlZnRWYWxzTGlzdGVuZXIoKSB7XG4gICAgdGhpcy5jYWxjdWxhdGVMZWZ0VmFsdWVzKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6c2Nyb2xsJywgW10pXG4gIF9jbG9zZU1lbnVzKCkge1xuICAgIHRoaXMubWVudU9wZW4gPSB7XG4gICAgICBtZW51OiBmYWxzZSxcbiAgICAgIG5vdGlmaWNhdGlvbjogZmFsc2UsXG4gICAgICBwcm9maWxlOiBmYWxzZSxcbiAgICAgIHRhZzogZmFsc2UsXG4gICAgICBzb2NpYWw6IGZhbHNlXG4gICAgfTtcbiAgfVxuXG4gIHBhc3NDbGljayh0eXBlLCAkZXZlbnQpIHtcbiAgICB0aGlzLm1lbnVPcGVuW3R5cGVdID0gIXRoaXMubWVudU9wZW5bdHlwZV07XG5cbiAgICBpZiAodHlwZSA9PT0gJ25vdGlmaWNhdGlvbicgJiYgdGhpcy5tZW51T3Blblt0eXBlXSkge1xuICAgICAgdGhpcy5ub3RpZmljYXRpb25NZW51T3BlbmVkLmVtaXQoJGV2ZW50KTtcbiAgICB9XG5cbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBjbG9zZU1lbnUgKCkge1xuICAgIHRoaXMubWVudU9wZW4gPSB7XG4gICAgICBtZW51OiBmYWxzZSxcbiAgICAgIG5vdGlmaWNhdGlvbjogZmFsc2UsXG4gICAgICBwcm9maWxlOiBmYWxzZSxcbiAgICAgIHRhZzogZmFsc2UsXG4gICAgICBzb2NpYWw6IGZhbHNlXG4gICAgfTtcbiAgfVxuXG4gIHRhZ01lbnVPdXRzaWRlQ2xpY2soZXZlbnQpIHtcbiAgICBpZiAoIWV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2ljb24tbWVudScpKSB7XG4gICAgICB0aGlzLm1lbnVPcGVuLnRhZyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG5hdmlnYXRpb25MaW5rQ2xpY2soc2x1ZywgYWN0aW9uID0gJ3JlZGlyZWN0Jykge1xuICAgIHRoaXMubmF2aWdhdGlvbkxpbmsuZW1pdCh7J2FjdGlvbic6IGFjdGlvbiwgJ3NsdWcnOiBzbHVnfSk7XG4gIH1cblxuICBfc2VhcmNoRXZlbnQoZXZlbnQsIGZsYWc6IGJvb2xlYW4gPSBudWxsKSB7XG4gICAgdGhpcy5zZWFyY2hFdmVudC5lbWl0KGZsYWcpO1xuICAgIHRoaXMuc2hvd1NlYXJjaEJhciA9IGZsYWc7XG4gICAgaWYgKGZsYWcgPT0gdHJ1ZSkge1xuICAgICAgdGhpcy5zZWFyY2hCYXIubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgICB0aGlzLnNlYXJjaEJhci5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gIH1cblxuICBfcHVibGljYXRpb25Gb2xsb3coZm9sbG93KSB7XG4gICAgdGhpcy5wdWJsaWNhdGlvbkZvbGxvdy5lbWl0KHtzbHVnOiB0aGlzLmhlYWRlckRhdGEucHVibGljYXRpb25EYXRhLnNsdWcsIGZvbGxvdzogZm9sbG93fSk7XG4gIH1cblxuICBfYXJ0aWNsZUF1dGhvckZvbGxvdyh1c2VyLCBmb2xsb3cpIHtcbiAgICB0aGlzLmFydGljbGVBdXRob3JGb2xsb3cuZW1pdCh7YXV0aG9yOiB1c2VyLCBzbHVnOiB1c2VyLnB1YmxpY0tleSwgZm9sbG93OiBmb2xsb3d9KTtcbiAgfVxuXG4gIF9hcnRpY2xlTGlrZWQoZXZlbnQpIHtcbiAgICB0aGlzLmFydGljbGVMaWtlZC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIF9jb250aW51ZUFydGljbGUoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuY29udGludWVBcnRpY2xlLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgX2FydGljbGVTaGFyZWQoZXZlbnQpIHtcbiAgICB0aGlzLmFydGljbGVTaGFyZWQuZW1pdChldmVudCk7XG4gIH1cblxuICBfcHVibGlzaEFydGljbGUoZXZlbnQpIHtcbiAgICB0aGlzLnB1Ymxpc2hBcnRpY2xlQ2xpY2suZW1pdChldmVudCk7XG4gIH1cblxuICBfdXNlckZvbGxvdyhldmVudCkge1xuICAgIHRoaXMudXNlckZvbGxvdy5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIF91c2VyU2lnbkluKGV2ZW50KSB7XG4gICAgdGhpcy51c2VyU2lnbkluLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgX3VzZXJTaWduVXAoZXZlbnQpIHtcbiAgICB0aGlzLnVzZXJTaWduVXAuZW1pdChldmVudCk7XG4gIH1cblxuICBvbkxvZ29DbGljayhldmVudDogTW91c2VFdmVudCwgc2x1Zykge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMubmF2aWdhdGlvbkxpbmtDbGljayhzbHVnKTtcbiAgfVxuXG4gIG9uU2VlTW9yZUV2ZW50KGV2ZW50KSB7XG4gICAgdGhpcy5zZWVNb3JlLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgb25Tb2NpYWxDbGljayhldmVudCwgdHlwZSkge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICBjb25zb2xlLmxvZyh0eXBlKTtcbiAgfVxufVxuIl19