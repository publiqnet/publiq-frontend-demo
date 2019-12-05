(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('fingerprintjs2'), require('cryptography-ts'), require('cryptography-ts/bin/utils'), require('publiq-models-ts/bin/models/PubliqTransaction'), require('@angular/common/http'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('helper-lib', ['exports', '@angular/core', 'rxjs', 'fingerprintjs2', 'cryptography-ts', 'cryptography-ts/bin/utils', 'publiq-models-ts/bin/models/PubliqTransaction', '@angular/common/http', 'rxjs/operators'], factory) :
    (global = global || self, factory(global['helper-lib'] = {}, global.ng.core, global.rxjs, global.fingerprintjs2, global.cryptographyTs, global.utils, global.PubliqTransaction, global.ng.common.http, global.rxjs.operators));
}(this, (function (exports, core, rxjs, fingerprintjs2, cryptographyTs, utils, PubliqTransaction, http, operators) { 'use strict';

    PubliqTransaction = PubliqTransaction && PubliqTransaction.hasOwnProperty('default') ? PubliqTransaction['default'] : PubliqTransaction;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var HelperLibService = /** @class */ (function () {
        function HelperLibService() {
        }
        HelperLibService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        HelperLibService.ctorParameters = function () { return []; };
        /** @nocollapse */ HelperLibService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function HelperLibService_Factory() { return new HelperLibService(); }, token: HelperLibService, providedIn: "root" });
        return HelperLibService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var HelperLibComponent = /** @class */ (function () {
        function HelperLibComponent() {
        }
        /**
         * @return {?}
         */
        HelperLibComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
        };
        HelperLibComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'helper-helper-lib',
                        template: "\n    <p>\n      helper-lib works!\n    </p>\n  "
                    }] }
        ];
        /** @nocollapse */
        HelperLibComponent.ctorParameters = function () { return []; };
        return HelperLibComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var HttpMethodTypes = {
        get: 'get',
        post: 'post',
        put: 'put',
        delete: 'delete',
    };
    var HttpHelperService = /** @class */ (function () {
        function HttpHelperService(http) {
            this.http = http;
        }
        /**
         * @param {?} headerConfigs
         * @return {?}
         */
        HttpHelperService.setBaseHeaders = /**
         * @param {?} headerConfigs
         * @return {?}
         */
        function (headerConfigs) {
            HttpHelperService.baseHeaders = headerConfigs;
        };
        /**
         * @param {?} method
         * @param {?} url
         * @param {?=} data
         * @param {?=} headers
         * @param {?=} observeResponse
         * @return {?}
         */
        HttpHelperService.prototype.customCall = /**
         * @param {?} method
         * @param {?} url
         * @param {?=} data
         * @param {?=} headers
         * @param {?=} observeResponse
         * @return {?}
         */
        function (method, url, data, headers, observeResponse) {
            if (observeResponse === void 0) { observeResponse = false; }
            return this.call(method, url, data, headers, observeResponse, false);
        };
        /**
         * @param {?} method
         * @param {?} url
         * @param {?=} data
         * @param {?=} headers
         * @param {?=} observeResponse
         * @param {?=} useBaseHeaders
         * @return {?}
         */
        HttpHelperService.prototype.call = /**
         * @param {?} method
         * @param {?} url
         * @param {?=} data
         * @param {?=} headers
         * @param {?=} observeResponse
         * @param {?=} useBaseHeaders
         * @return {?}
         */
        function (method, url, data, headers, observeResponse, useBaseHeaders) {
            if (observeResponse === void 0) { observeResponse = false; }
            if (useBaseHeaders === void 0) { useBaseHeaders = true; }
            /** @type {?} */
            var _headers = {};
            if (useBaseHeaders && HttpHelperService.baseHeaders) {
                HttpHelperService.baseHeaders.forEach((/**
                 * @param {?} headerConfig
                 * @return {?}
                 */
                function (headerConfig) {
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
                function (headerConfig) {
                    if (headerConfig.value) {
                        _headers[headerConfig.key] = headerConfig.value;
                    }
                }));
            }
            /** @type {?} */
            var options = {};
            if (_headers && Object.keys(_headers).length) {
                /** @type {?} */
                var headersData = new http.HttpHeaders(_headers);
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
        };
        HttpHelperService.baseHeaders = [];
        HttpHelperService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        HttpHelperService.ctorParameters = function () { return [
            { type: http.HttpClient }
        ]; };
        /** @nocollapse */ HttpHelperService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function HttpHelperService_Factory() { return new HttpHelperService(core.ɵɵinject(http.HttpClient)); }, token: HttpHelperService, providedIn: "root" });
        return HttpHelperService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var OauthService = /** @class */ (function () {
        function OauthService(httpHelper, url) {
            this.httpHelper = httpHelper;
            if (!url) {
                throw new Error('OauthService: oauthUrl not valid');
            }
            this.url = url + "/api/user";
            this.generateRandomKey();
        }
        /**
         * @private
         * @param {?} stringToSign
         * @param {?} brainKey
         * @return {?}
         */
        OauthService.getSignetString = /**
         * @private
         * @param {?} stringToSign
         * @param {?} brainKey
         * @return {?}
         */
        function (stringToSign, brainKey) {
            /** @type {?} */
            var now = new Date(new Date(stringToSign * 1000));
            /** @type {?} */
            var now_1h = new Date(now.getTime() + OauthService.DATA_RANG);
            /** @type {?} */
            var keyPair = new cryptographyTs.KeyPair(brainKey.trim());
            /** @type {?} */
            var transactionObj = new PubliqTransaction({
                creation: +now,
                expiry: +now_1h,
                fee: {
                    whole: 0,
                    fraction: 0
                },
                action: {},
            });
            return keyPair.signMessage(JSON.stringify(transactionObj.toJson()));
        };
        /**
         * @param {?} code
         * @return {?}
         */
        OauthService.prototype.signupConfirmation = /**
         * @param {?} code
         * @return {?}
         */
        function (code) {
            /** @type {?} */
            var url = this.url + ("/signup/confirmation/" + code);
            return this.httpHelper.customCall(HttpMethodTypes.get, url);
        };
        /**
         * @param {?} stringToSign
         * @param {?} code
         * @param {?} password
         * @return {?}
         */
        OauthService.prototype.signupComplete = /**
         * @param {?} stringToSign
         * @param {?} code
         * @param {?} password
         * @return {?}
         */
        function (stringToSign, code, password) {
            cryptographyTs.KeyPair.setRandomKey(this.randomKey);
            /** @type {?} */
            var keyPair = new cryptographyTs.KeyPair();
            /** @type {?} */
            var encryptedBrainKey = keyPair.getEncryptedBrainKeyByPassword(password);
            /** @type {?} */
            var publicKey = keyPair.PpublicKey;
            /** @type {?} */
            var signedString = OauthService.getSignetString(stringToSign, keyPair.BrainKey);
            this.brainKey = keyPair.BrainKey;
            /** @type {?} */
            var url = this.url + "/signup/complete";
            return this.httpHelper.customCall(HttpMethodTypes.post, url, {
                confirmationCode: code,
                brainKey: encryptedBrainKey,
                publicKey: publicKey,
                signedString: signedString
            });
        };
        /**
         * @param {?} code
         * @return {?}
         */
        OauthService.prototype.signinCheckCode = /**
         * @param {?} code
         * @return {?}
         */
        function (code) {
            /** @type {?} */
            var url = this.url + ("/signin/check-code/" + code);
            return this.httpHelper.customCall(HttpMethodTypes.get, url);
        };
        /**
         * @param {?} email
         * @param {?=} observeResponse
         * @param {?=} relativeRoute
         * @return {?}
         */
        OauthService.prototype.authenticate = /**
         * @param {?} email
         * @param {?=} observeResponse
         * @param {?=} relativeRoute
         * @return {?}
         */
        function (email, observeResponse, relativeRoute) {
            if (observeResponse === void 0) { observeResponse = false; }
            if (relativeRoute === void 0) { relativeRoute = ''; }
            /** @type {?} */
            var url = this.url + "/authentication";
            /** @type {?} */
            var data = { 'email': email };
            if (relativeRoute) {
                data['relativeRoute'] = relativeRoute;
            }
            return this.httpHelper.customCall(HttpMethodTypes.put, url, data, null, observeResponse);
        };
        /**
         * @param {?} encryptedBrainKey
         * @param {?} stringToSign
         * @param {?} code
         * @param {?} password
         * @return {?}
         */
        OauthService.prototype.signinGetToken = /**
         * @param {?} encryptedBrainKey
         * @param {?} stringToSign
         * @param {?} code
         * @param {?} password
         * @return {?}
         */
        function (encryptedBrainKey, stringToSign, code, password) {
            var _this = this;
            /** @type {?} */
            var brainKeyData = cryptographyTs.KeyPair.decryptBrainKeyByPassword(encryptedBrainKey, password);
            if (!brainKeyData.isValid) {
                return rxjs.throwError('oauth_decrypt_brain_key');
            }
            /** @type {?} */
            var brainKey = brainKeyData.brainKey;
            /** @type {?} */
            var keyPair = new cryptographyTs.KeyPair(brainKey.trim());
            /** @type {?} */
            var signedString = OauthService.getSignetString(stringToSign, keyPair.BrainKey);
            /** @type {?} */
            var url = this.url + "/signin/get-token";
            this.brainKey = brainKey.trim();
            return this.httpHelper.customCall(HttpMethodTypes.post, url, {
                code: code,
                signedString: signedString
            })
                .pipe(operators.map((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                _this.brainKeySaved = data.brainKeySaved ? true : false;
                _this.brainKeySeen = data.brainKeySeen ? true : false;
                _this.privateKeySaved = data.privateKeySaved ? true : false;
                return data;
            })));
        };
        /**
         * @param {?} brainKey
         * @return {?}
         */
        OauthService.prototype.recoverAuthenticate = /**
         * @param {?} brainKey
         * @return {?}
         */
        function (brainKey) {
            /** @type {?} */
            var keyPair = new cryptographyTs.KeyPair(brainKey.trim());
            /** @type {?} */
            var publicKey = keyPair.PpublicKey;
            /** @type {?} */
            var url = this.url + ("/recover/authenticate/" + publicKey);
            return this.httpHelper.customCall(HttpMethodTypes.get, url);
        };
        /**
         * @param {?} brainKey
         * @param {?} stringToSign
         * @param {?} password
         * @return {?}
         */
        OauthService.prototype.recoverComplete = /**
         * @param {?} brainKey
         * @param {?} stringToSign
         * @param {?} password
         * @return {?}
         */
        function (brainKey, stringToSign, password) {
            var _this = this;
            /** @type {?} */
            var keyPair = new cryptographyTs.KeyPair(brainKey.trim());
            /** @type {?} */
            var encryptedBrainKey = keyPair.getEncryptedBrainKeyByPassword(password);
            /** @type {?} */
            var publicKey = keyPair.PpublicKey;
            /** @type {?} */
            var signedString = OauthService.getSignetString(stringToSign, keyPair.BrainKey);
            this.brainKey = keyPair.BrainKey;
            /** @type {?} */
            var url = this.url + '/recover/complete';
            return this.httpHelper.customCall(HttpMethodTypes.post, url, {
                brainKey: encryptedBrainKey,
                publicKey: publicKey,
                signedString: signedString
            })
                .pipe(operators.map((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                _this.brainKeySaved = data.brainKeySaved ? true : false;
                _this.brainKeySeen = data.brainKeySeen ? true : false;
                _this.privateKeySaved = data.privateKeySaved ? true : false;
                return data;
            })));
        };
        /**
         * @param {?} brainKey
         * @param {?} actionObj
         * @return {?}
         */
        OauthService.prototype.getSignedData = /**
         * @param {?} brainKey
         * @param {?} actionObj
         * @return {?}
         */
        function (brainKey, actionObj) {
            /** @type {?} */
            var now = new Date();
            // 1554369066000
            /** @type {?} */
            var now_1h = new Date(now.getTime() + OauthService.DATA_RANG);
            /** @type {?} */
            var keyPair = new cryptographyTs.KeyPair(brainKey.trim());
            /** @type {?} */
            var transactionObj = new PubliqTransaction({
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
        };
        /**
         * @param {?} brainKey
         * @return {?}
         */
        OauthService.prototype.getSignedEmptyObject = /**
         * @param {?} brainKey
         * @return {?}
         */
        function (brainKey) {
            /** @type {?} */
            var keyPair = new cryptographyTs.KeyPair(brainKey.trim());
            /** @type {?} */
            var signedData = this.getSignedData(brainKey.trim(), {});
            return {
                publicKey: keyPair.PpublicKey,
                signedString: signedData.signedString,
                creationDate: signedData.creation
            };
        };
        /**
         * @param {?} brainKey
         * @return {?}
         */
        OauthService.prototype.setBrainKeySeen = /**
         * @param {?} brainKey
         * @return {?}
         */
        function (brainKey) {
            var _this = this;
            /** @type {?} */
            var url = this.url + '/brain-key-seen';
            /** @type {?} */
            var signedEmptyObjectData = this.getSignedEmptyObject(brainKey.trim());
            return this.httpHelper.customCall(HttpMethodTypes.post, url, signedEmptyObjectData)
                .pipe(operators.map((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                _this.brainKeySeen = true;
                return data;
            })));
        };
        /**
         * @param {?} brainKey
         * @return {?}
         */
        OauthService.prototype.setBrainKeySaved = /**
         * @param {?} brainKey
         * @return {?}
         */
        function (brainKey) {
            var _this = this;
            /** @type {?} */
            var url = this.url + '/brain-key-saved';
            /** @type {?} */
            var signedEmptyObjectData = this.getSignedEmptyObject(brainKey.trim());
            return this.httpHelper.customCall(HttpMethodTypes.post, url, signedEmptyObjectData)
                .pipe(operators.map((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                _this.brainKeySeen = true;
                _this.brainKeySaved = true;
                return data;
            })));
        };
        /**
         * @param {?} brainKey
         * @return {?}
         */
        OauthService.prototype.setPrivateKeySaved = /**
         * @param {?} brainKey
         * @return {?}
         */
        function (brainKey) {
            var _this = this;
            /** @type {?} */
            var url = this.url + '/private-key-saved';
            /** @type {?} */
            var signedEmptyObjectData = this.getSignedEmptyObject(brainKey.trim());
            return this.httpHelper.customCall(HttpMethodTypes.post, url, signedEmptyObjectData)
                .pipe(operators.map((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                _this.privateKeySaved = true;
                return data;
            })));
        };
        /**
         * @return {?}
         */
        OauthService.prototype.generateRandomKey = /**
         * @return {?}
         */
        function () {
            var _this = this;
            fingerprintjs2.get({}, (/**
             * @param {?} components
             * @return {?}
             */
            function (components) {
                /** @type {?} */
                var fingerprint = fingerprintjs2.x64hash128(components.map((/**
                 * @param {?} component
                 * @return {?}
                 */
                function (component) { return component.value; })).join(''), 31).trim();
                /** @type {?} */
                var currentTime = new Date().getTime();
                /** @type {?} */
                var averageHash = "" + fingerprint + currentTime;
                /** @type {?} */
                var encodedAverageHash = utils.stringToSha256(averageHash).substring(0, 8);
                _this.randomKey = parseInt(encodedAverageHash, 16);
            }));
        };
        OauthService.DATA_RANG = 60 * 60 * 1000;
        OauthService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        OauthService.ctorParameters = function () { return [
            { type: HttpHelperService },
            { type: String, decorators: [{ type: core.Inject, args: ['oauthUrl',] }] }
        ]; };
        /** @nocollapse */ OauthService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function OauthService_Factory() { return new OauthService(core.ɵɵinject(HttpHelperService), core.ɵɵinject("oauthUrl")); }, token: OauthService, providedIn: "root" });
        return OauthService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var HttpObserverService = /** @class */ (function () {
        function HttpObserverService() {
        }
        /**
         * @param {?} name
         * @param {?} request
         * @param {?=} refresh
         * @return {?}
         */
        HttpObserverService.prototype.observerCall = /**
         * @param {?} name
         * @param {?} request
         * @param {?=} refresh
         * @return {?}
         */
        function (name, request, refresh) {
            var _this = this;
            if (refresh === void 0) { refresh = false; }
            return (!refresh && this.hasOwnProperty(name)) ? rxjs.of(this[name]) : request.pipe(operators.map((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { _this[name] = data; return data; })));
        };
        HttpObserverService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        HttpObserverService.ctorParameters = function () { return []; };
        /** @nocollapse */ HttpObserverService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function HttpObserverService_Factory() { return new HttpObserverService(); }, token: HttpObserverService, providedIn: "root" });
        return HttpObserverService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var HelperLibModule = /** @class */ (function () {
        function HelperLibModule() {
        }
        HelperLibModule.decorators = [
            { type: core.NgModule, args: [{
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
        return HelperLibModule;
    }());

    exports.HelperLibComponent = HelperLibComponent;
    exports.HelperLibModule = HelperLibModule;
    exports.HelperLibService = HelperLibService;
    exports.HttpHelperService = HttpHelperService;
    exports.HttpMethodTypes = HttpMethodTypes;
    exports.HttpObserverService = HttpObserverService;
    exports.OauthService = OauthService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=helper-lib.umd.js.map
