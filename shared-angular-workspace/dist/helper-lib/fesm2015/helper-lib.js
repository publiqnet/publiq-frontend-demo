import { Injectable, ɵɵdefineInjectable, Component, ɵɵinject, Inject, NgModule } from '@angular/core';
import { throwError, of } from 'rxjs';
import { get, x64hash128 } from 'fingerprintjs2';
import { KeyPair } from 'cryptography-ts';
import { stringToSha256 } from 'cryptography-ts/bin/utils';
import PubliqTransaction from 'publiq-models-ts/bin/models/PubliqTransaction';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class HelperLibService {
    constructor() { }
}
HelperLibService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
HelperLibService.ctorParameters = () => [];
/** @nocollapse */ HelperLibService.ngInjectableDef = ɵɵdefineInjectable({ factory: function HelperLibService_Factory() { return new HelperLibService(); }, token: HelperLibService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class HelperLibComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
HelperLibComponent.decorators = [
    { type: Component, args: [{
                selector: 'helper-helper-lib',
                template: `
    <p>
      helper-lib works!
    </p>
  `
            }] }
];
/** @nocollapse */
HelperLibComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const HttpMethodTypes = {
    get: 'get',
    post: 'post',
    put: 'put',
    delete: 'delete',
};
class HttpHelperService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
    }
    /**
     * @param {?} headerConfigs
     * @return {?}
     */
    static setBaseHeaders(headerConfigs) {
        HttpHelperService.baseHeaders = headerConfigs;
    }
    /**
     * @param {?} method
     * @param {?} url
     * @param {?=} data
     * @param {?=} headers
     * @param {?=} observeResponse
     * @return {?}
     */
    customCall(method, url, data, headers, observeResponse = false) {
        return this.call(method, url, data, headers, observeResponse, false);
    }
    /**
     * @param {?} method
     * @param {?} url
     * @param {?=} data
     * @param {?=} headers
     * @param {?=} observeResponse
     * @param {?=} useBaseHeaders
     * @return {?}
     */
    call(method, url, data, headers, observeResponse = false, useBaseHeaders = true) {
        /** @type {?} */
        const _headers = {};
        if (useBaseHeaders && HttpHelperService.baseHeaders) {
            HttpHelperService.baseHeaders.forEach((/**
             * @param {?} headerConfig
             * @return {?}
             */
            headerConfig => {
                if (headerConfig.getHeaderValue()) {
                    _headers[headerConfig.headerKay] = headerConfig.getHeaderValue();
                }
            }));
        }
        if (headers) {
            headers.forEach((/**
             * @param {?} headerConfig
             * @return {?}
             */
            headerConfig => {
                if (headerConfig.value) {
                    _headers[headerConfig.key] = headerConfig.value;
                }
            }));
        }
        /** @type {?} */
        const options = {};
        if (_headers && Object.keys(_headers).length) {
            /** @type {?} */
            const headersData = new HttpHeaders(_headers);
            options['headers'] = headersData;
        }
        if (observeResponse) {
            options['observe'] = 'response';
        }
        if (method === HttpMethodTypes.get || method === HttpMethodTypes.delete) {
            return this.http[method](url, options);
        }
        else {
            return this.http[method](url, data, options);
        }
    }
}
HttpHelperService.baseHeaders = [];
HttpHelperService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
HttpHelperService.ctorParameters = () => [
    { type: HttpClient }
];
/** @nocollapse */ HttpHelperService.ngInjectableDef = ɵɵdefineInjectable({ factory: function HttpHelperService_Factory() { return new HttpHelperService(ɵɵinject(HttpClient)); }, token: HttpHelperService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OauthService {
    /**
     * @param {?} httpHelper
     * @param {?} url
     */
    constructor(httpHelper, url) {
        this.httpHelper = httpHelper;
        if (!url) {
            throw new Error('OauthService: oauthUrl not valid');
        }
        this.url = `${url}/api/user`;
        this.generateRandomKey();
    }
    /**
     * @private
     * @param {?} stringToSign
     * @param {?} brainKey
     * @return {?}
     */
    static getSignetString(stringToSign, brainKey) {
        /** @type {?} */
        const now = new Date(new Date(stringToSign * 1000));
        /** @type {?} */
        const now_1h = new Date(now.getTime() + OauthService.DATA_RANG);
        /** @type {?} */
        const keyPair = new KeyPair(brainKey.trim());
        /** @type {?} */
        const transactionObj = new PubliqTransaction({
            creation: +now,
            expiry: +now_1h,
            fee: {
                whole: 0,
                fraction: 0
            },
            action: {},
        });
        return keyPair.signMessage(JSON.stringify(transactionObj.toJson()));
    }
    /**
     * @param {?} code
     * @return {?}
     */
    signupConfirmation(code) {
        /** @type {?} */
        const url = this.url + `/signup/confirmation/${code}`;
        return this.httpHelper.customCall(HttpMethodTypes.get, url);
    }
    /**
     * @param {?} stringToSign
     * @param {?} code
     * @param {?} password
     * @return {?}
     */
    signupComplete(stringToSign, code, password) {
        KeyPair.setRandomKey(this.randomKey);
        /** @type {?} */
        const keyPair = new KeyPair();
        /** @type {?} */
        const encryptedBrainKey = keyPair.getEncryptedBrainKeyByPassword(password);
        /** @type {?} */
        const publicKey = keyPair.PpublicKey;
        /** @type {?} */
        const signedString = OauthService.getSignetString(stringToSign, keyPair.BrainKey);
        this.brainKey = keyPair.BrainKey;
        /** @type {?} */
        const url = this.url + `/signup/complete`;
        return this.httpHelper.customCall(HttpMethodTypes.post, url, {
            confirmationCode: code,
            brainKey: encryptedBrainKey,
            publicKey: publicKey,
            signedString: signedString
        });
    }
    /**
     * @param {?} code
     * @return {?}
     */
    signinCheckCode(code) {
        /** @type {?} */
        const url = this.url + `/signin/check-code/${code}`;
        return this.httpHelper.customCall(HttpMethodTypes.get, url);
    }
    /**
     * @param {?} email
     * @param {?=} observeResponse
     * @param {?=} relativeRoute
     * @return {?}
     */
    authenticate(email, observeResponse = false, relativeRoute = '') {
        /** @type {?} */
        const url = this.url + `/authentication`;
        /** @type {?} */
        const data = { 'email': email };
        if (relativeRoute) {
            data['relativeRoute'] = relativeRoute;
        }
        return this.httpHelper.customCall(HttpMethodTypes.put, url, data, null, observeResponse);
    }
    /**
     * @param {?} encryptedBrainKey
     * @param {?} stringToSign
     * @param {?} code
     * @param {?} password
     * @return {?}
     */
    signinGetToken(encryptedBrainKey, stringToSign, code, password) {
        /** @type {?} */
        const brainKeyData = KeyPair.decryptBrainKeyByPassword(encryptedBrainKey, password);
        if (!brainKeyData.isValid) {
            return throwError('oauth_decrypt_brain_key');
        }
        /** @type {?} */
        const brainKey = brainKeyData.brainKey;
        /** @type {?} */
        const keyPair = new KeyPair(brainKey.trim());
        /** @type {?} */
        const signedString = OauthService.getSignetString(stringToSign, keyPair.BrainKey);
        /** @type {?} */
        const url = this.url + `/signin/get-token`;
        this.brainKey = brainKey.trim();
        return this.httpHelper.customCall(HttpMethodTypes.post, url, {
            code: code,
            signedString: signedString
        })
            .pipe(map((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            this.brainKeySaved = data.brainKeySaved ? true : false;
            this.brainKeySeen = data.brainKeySeen ? true : false;
            this.privateKeySaved = data.privateKeySaved ? true : false;
            return data;
        })));
    }
    /**
     * @param {?} brainKey
     * @return {?}
     */
    recoverAuthenticate(brainKey) {
        /** @type {?} */
        const keyPair = new KeyPair(brainKey.trim());
        /** @type {?} */
        const publicKey = keyPair.PpublicKey;
        /** @type {?} */
        const url = this.url + `/recover/authenticate/${publicKey}`;
        return this.httpHelper.customCall(HttpMethodTypes.get, url);
    }
    /**
     * @param {?} brainKey
     * @param {?} stringToSign
     * @param {?} password
     * @return {?}
     */
    recoverComplete(brainKey, stringToSign, password) {
        /** @type {?} */
        const keyPair = new KeyPair(brainKey.trim());
        /** @type {?} */
        const encryptedBrainKey = keyPair.getEncryptedBrainKeyByPassword(password);
        /** @type {?} */
        const publicKey = keyPair.PpublicKey;
        /** @type {?} */
        const signedString = OauthService.getSignetString(stringToSign, keyPair.BrainKey);
        this.brainKey = keyPair.BrainKey;
        /** @type {?} */
        const url = this.url + '/recover/complete';
        return this.httpHelper.customCall(HttpMethodTypes.post, url, {
            brainKey: encryptedBrainKey,
            publicKey: publicKey,
            signedString: signedString
        })
            .pipe(map((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            this.brainKeySaved = data.brainKeySaved ? true : false;
            this.brainKeySeen = data.brainKeySeen ? true : false;
            this.privateKeySaved = data.privateKeySaved ? true : false;
            return data;
        })));
    }
    /**
     * @param {?} brainKey
     * @param {?} actionObj
     * @return {?}
     */
    getSignedData(brainKey, actionObj) {
        /** @type {?} */
        const now = new Date();
        // 1554369066000
        /** @type {?} */
        const now_1h = new Date(now.getTime() + OauthService.DATA_RANG);
        /** @type {?} */
        const keyPair = new KeyPair(brainKey.trim());
        /** @type {?} */
        const transactionObj = new PubliqTransaction({
            creation: +now,
            expiry: +now_1h,
            fee: {
                whole: 0,
                fraction: 0
            },
            action: actionObj
        });
        return {
            signedJson: JSON.stringify(transactionObj.toJson()),
            signedString: keyPair.signMessage(JSON.stringify(transactionObj.toJson())),
            creation: Math.floor(now.getTime() / 1000),
            expiry: Math.floor(now_1h.getTime() / 1000),
        };
    }
    /**
     * @param {?} brainKey
     * @return {?}
     */
    getSignedEmptyObject(brainKey) {
        /** @type {?} */
        const keyPair = new KeyPair(brainKey.trim());
        /** @type {?} */
        const signedData = this.getSignedData(brainKey.trim(), {});
        return {
            publicKey: keyPair.PpublicKey,
            signedString: signedData.signedString,
            creationDate: signedData.creation
        };
    }
    /**
     * @param {?} brainKey
     * @return {?}
     */
    setBrainKeySeen(brainKey) {
        /** @type {?} */
        const url = this.url + '/brain-key-seen';
        /** @type {?} */
        const signedEmptyObjectData = this.getSignedEmptyObject(brainKey.trim());
        return this.httpHelper.customCall(HttpMethodTypes.post, url, signedEmptyObjectData)
            .pipe(map((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            this.brainKeySeen = true;
            return data;
        })));
    }
    /**
     * @param {?} brainKey
     * @return {?}
     */
    setBrainKeySaved(brainKey) {
        /** @type {?} */
        const url = this.url + '/brain-key-saved';
        /** @type {?} */
        const signedEmptyObjectData = this.getSignedEmptyObject(brainKey.trim());
        return this.httpHelper.customCall(HttpMethodTypes.post, url, signedEmptyObjectData)
            .pipe(map((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            this.brainKeySeen = true;
            this.brainKeySaved = true;
            return data;
        })));
    }
    /**
     * @param {?} brainKey
     * @return {?}
     */
    setPrivateKeySaved(brainKey) {
        /** @type {?} */
        const url = this.url + '/private-key-saved';
        /** @type {?} */
        const signedEmptyObjectData = this.getSignedEmptyObject(brainKey.trim());
        return this.httpHelper.customCall(HttpMethodTypes.post, url, signedEmptyObjectData)
            .pipe(map((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            this.privateKeySaved = true;
            return data;
        })));
    }
    /**
     * @return {?}
     */
    generateRandomKey() {
        get({}, (/**
         * @param {?} components
         * @return {?}
         */
        (components) => {
            /** @type {?} */
            const fingerprint = x64hash128(components.map((/**
             * @param {?} component
             * @return {?}
             */
            function (component) { return component.value; })).join(''), 31).trim();
            /** @type {?} */
            const currentTime = new Date().getTime();
            /** @type {?} */
            const averageHash = `${fingerprint}${currentTime}`;
            /** @type {?} */
            const encodedAverageHash = stringToSha256(averageHash).substring(0, 8);
            this.randomKey = parseInt(encodedAverageHash, 16);
        }));
    }
}
OauthService.DATA_RANG = 60 * 60 * 1000;
OauthService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
OauthService.ctorParameters = () => [
    { type: HttpHelperService },
    { type: String, decorators: [{ type: Inject, args: ['oauthUrl',] }] }
];
/** @nocollapse */ OauthService.ngInjectableDef = ɵɵdefineInjectable({ factory: function OauthService_Factory() { return new OauthService(ɵɵinject(HttpHelperService), ɵɵinject("oauthUrl")); }, token: OauthService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class HttpObserverService {
    constructor() { }
    /**
     * @param {?} name
     * @param {?} request
     * @param {?=} refresh
     * @return {?}
     */
    observerCall(name, request, refresh = false) {
        return (!refresh && this.hasOwnProperty(name)) ? of(this[name]) : request.pipe(map((/**
         * @param {?} data
         * @return {?}
         */
        data => { this[name] = data; return data; })));
    }
}
HttpObserverService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
HttpObserverService.ctorParameters = () => [];
/** @nocollapse */ HttpObserverService.ngInjectableDef = ɵɵdefineInjectable({ factory: function HttpObserverService_Factory() { return new HttpObserverService(); }, token: HttpObserverService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class HelperLibModule {
}
HelperLibModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    HelperLibComponent
                ],
                imports: [],
                providers: [
                    OauthService,
                    HttpHelperService,
                    HttpObserverService
                ],
                exports: [
                    HelperLibComponent
                ]
            },] }
];

export { HelperLibComponent, HelperLibModule, HelperLibService, HttpHelperService, HttpMethodTypes, HttpObserverService, OauthService };
//# sourceMappingURL=helper-lib.js.map
