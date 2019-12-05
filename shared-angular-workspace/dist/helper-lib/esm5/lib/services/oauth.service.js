/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import * as Fingerprint2 from 'fingerprintjs2';
import { KeyPair } from 'cryptography-ts';
import { stringToSha256 } from 'cryptography-ts/bin/utils';
import PubliqTransaction from 'publiq-models-ts/bin/models/PubliqTransaction';
import { HttpHelperService, HttpMethodTypes } from './http-helper.service';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./http-helper.service";
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
        var keyPair = new KeyPair(brainKey.trim());
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
        KeyPair.setRandomKey(this.randomKey);
        /** @type {?} */
        var keyPair = new KeyPair();
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
        var brainKeyData = KeyPair.decryptBrainKeyByPassword(encryptedBrainKey, password);
        if (!brainKeyData.isValid) {
            return throwError('oauth_decrypt_brain_key');
        }
        /** @type {?} */
        var brainKey = brainKeyData.brainKey;
        /** @type {?} */
        var keyPair = new KeyPair(brainKey.trim());
        /** @type {?} */
        var signedString = OauthService.getSignetString(stringToSign, keyPair.BrainKey);
        /** @type {?} */
        var url = this.url + "/signin/get-token";
        this.brainKey = brainKey.trim();
        return this.httpHelper.customCall(HttpMethodTypes.post, url, {
            code: code,
            signedString: signedString
        })
            .pipe(map((/**
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
        var keyPair = new KeyPair(brainKey.trim());
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
        var keyPair = new KeyPair(brainKey.trim());
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
            .pipe(map((/**
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
        var keyPair = new KeyPair(brainKey.trim());
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
        var keyPair = new KeyPair(brainKey.trim());
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
            .pipe(map((/**
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
            .pipe(map((/**
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
            .pipe(map((/**
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
        Fingerprint2.get({}, (/**
         * @param {?} components
         * @return {?}
         */
        function (components) {
            /** @type {?} */
            var fingerprint = Fingerprint2.x64hash128(components.map((/**
             * @param {?} component
             * @return {?}
             */
            function (component) { return component.value; })).join(''), 31).trim();
            /** @type {?} */
            var currentTime = new Date().getTime();
            /** @type {?} */
            var averageHash = "" + fingerprint + currentTime;
            /** @type {?} */
            var encodedAverageHash = stringToSha256(averageHash).substring(0, 8);
            _this.randomKey = parseInt(encodedAverageHash, 16);
        }));
    };
    OauthService.DATA_RANG = 60 * 60 * 1000;
    OauthService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    OauthService.ctorParameters = function () { return [
        { type: HttpHelperService },
        { type: String, decorators: [{ type: Inject, args: ['oauthUrl',] }] }
    ]; };
    /** @nocollapse */ OauthService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function OauthService_Factory() { return new OauthService(i0.ɵɵinject(i1.HttpHelperService), i0.ɵɵinject("oauthUrl")); }, token: OauthService, providedIn: "root" });
    return OauthService;
}());
export { OauthService };
if (false) {
    /** @type {?} */
    OauthService.DATA_RANG;
    /** @type {?} */
    OauthService.prototype.brainKey;
    /**
     * @type {?}
     * @private
     */
    OauthService.prototype.url;
    /**
     * @type {?}
     * @private
     */
    OauthService.prototype.randomKey;
    /** @type {?} */
    OauthService.prototype.brainKeySaved;
    /** @type {?} */
    OauthService.prototype.brainKeySeen;
    /** @type {?} */
    OauthService.prototype.privateKeySaved;
    /**
     * @type {?}
     * @private
     */
    OauthService.prototype.httpHelper;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGguc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2hlbHBlci1saWIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvb2F1dGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEtBQUssWUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMxQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxpQkFBaUIsTUFBTSwrQ0FBK0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDM0UsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFFckM7SUFlRSxzQkFDVSxVQUE2QixFQUNqQixHQUFXO1FBRHZCLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBR3JDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDUixNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7U0FDckQ7UUFFRCxJQUFJLENBQUMsR0FBRyxHQUFNLEdBQUcsY0FBVyxDQUFDO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7Ozs7SUFFYyw0QkFBZTs7Ozs7O0lBQTlCLFVBQStCLFlBQVksRUFBRSxRQUFROztZQUM3QyxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDOztZQUM3QyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLFlBQVksQ0FBQyxT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QUFHLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNwRCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUE5TU0sc0JBQVMsR0FBVyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQzs7Z0JBTDNDLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBTFEsaUJBQWlCOzZDQW9CckIsTUFBTSxTQUFDLFVBQVU7Ozt1QkEzQnRCO0NBOE5DLEFBcE5ELElBb05DO1NBak5ZLFlBQVk7OztJQUV2Qix1QkFBMEM7O0lBRTFDLGdDQUF3Qjs7Ozs7SUFDeEIsMkJBQW9COzs7OztJQUNwQixpQ0FBMEI7O0lBRTFCLHFDQUE4Qjs7SUFDOUIsb0NBQTZCOztJQUM3Qix1Q0FBZ0M7Ozs7O0lBRzlCLGtDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0ICogYXMgRmluZ2VycHJpbnQyIGZyb20gJ2ZpbmdlcnByaW50anMyJztcblxuaW1wb3J0IHsgS2V5UGFpciB9IGZyb20gJ2NyeXB0b2dyYXBoeS10cyc7XG5pbXBvcnQgeyBzdHJpbmdUb1NoYTI1NiB9IGZyb20gJ2NyeXB0b2dyYXBoeS10cy9iaW4vdXRpbHMnO1xuaW1wb3J0IFB1YmxpcVRyYW5zYWN0aW9uIGZyb20gJ3B1YmxpcS1tb2RlbHMtdHMvYmluL21vZGVscy9QdWJsaXFUcmFuc2FjdGlvbic7XG5pbXBvcnQgeyBIdHRwSGVscGVyU2VydmljZSwgSHR0cE1ldGhvZFR5cGVzIH0gZnJvbSAnLi9odHRwLWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgT2F1dGhTZXJ2aWNlIHtcblxuICBzdGF0aWMgREFUQV9SQU5HOiBudW1iZXIgPSA2MCAqIDYwICogMTAwMDtcblxuICBwdWJsaWMgYnJhaW5LZXk6IHN0cmluZztcbiAgcHJpdmF0ZSB1cmw6IHN0cmluZztcbiAgcHJpdmF0ZSByYW5kb21LZXk6IG51bWJlcjtcblxuICBwdWJsaWMgYnJhaW5LZXlTYXZlZDogYm9vbGVhbjtcbiAgcHVibGljIGJyYWluS2V5U2VlbjogYm9vbGVhbjtcbiAgcHVibGljIHByaXZhdGVLZXlTYXZlZDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHBIZWxwZXI6IEh0dHBIZWxwZXJTZXJ2aWNlLFxuICAgIEBJbmplY3QoJ29hdXRoVXJsJykgdXJsOiBzdHJpbmdcbiAgKSB7XG4gICAgaWYgKCF1cmwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignT2F1dGhTZXJ2aWNlOiBvYXV0aFVybCBub3QgdmFsaWQnKTtcbiAgICB9XG5cbiAgICB0aGlzLnVybCA9IGAke3VybH0vYXBpL3VzZXJgO1xuICAgIHRoaXMuZ2VuZXJhdGVSYW5kb21LZXkoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGdldFNpZ25ldFN0cmluZyhzdHJpbmdUb1NpZ24sIGJyYWluS2V5KSB7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUobmV3IERhdGUoc3RyaW5nVG9TaWduICogMTAwMCkpO1xuICAgIGNvbnN0IG5vd18xaCA9IG5ldyBEYXRlKG5vdy5nZXRUaW1lKCkgKyBPYXV0aFNlcnZpY2UuREFUQV9SQU5HKTtcbiAgICBjb25zdCBrZXlQYWlyID0gbmV3IEtleVBhaXIoYnJhaW5LZXkudHJpbSgpKTtcbiAgICBjb25zdCB0cmFuc2FjdGlvbk9iaiA9IG5ldyBQdWJsaXFUcmFuc2FjdGlvbih7XG4gICAgICBjcmVhdGlvbjogK25vdyxcbiAgICAgIGV4cGlyeTogK25vd18xaCxcbiAgICAgIGZlZToge1xuICAgICAgICB3aG9sZTogMCxcbiAgICAgICAgZnJhY3Rpb246IDBcbiAgICAgIH0sXG4gICAgICBhY3Rpb246IHt9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGtleVBhaXIuc2lnbk1lc3NhZ2UoSlNPTi5zdHJpbmdpZnkodHJhbnNhY3Rpb25PYmoudG9Kc29uKCkpKTtcbiAgfVxuXG4gIHNpZ251cENvbmZpcm1hdGlvbihjb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHsgc3RyaW5nVG9TaWduOiBudW1iZXIgfT4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMudXJsICsgYC9zaWdudXAvY29uZmlybWF0aW9uLyR7Y29kZX1gO1xuICAgIHJldHVybiB0aGlzLmh0dHBIZWxwZXIuY3VzdG9tQ2FsbChIdHRwTWV0aG9kVHlwZXMuZ2V0LCB1cmwpO1xuXG4gIH1cblxuICBzaWdudXBDb21wbGV0ZShzdHJpbmdUb1NpZ24sIGNvZGUsIHBhc3N3b3JkKSB7XG4gICAgS2V5UGFpci5zZXRSYW5kb21LZXkodGhpcy5yYW5kb21LZXkpO1xuICAgIGNvbnN0IGtleVBhaXIgPSBuZXcgS2V5UGFpcigpO1xuICAgIGNvbnN0IGVuY3J5cHRlZEJyYWluS2V5ID0ga2V5UGFpci5nZXRFbmNyeXB0ZWRCcmFpbktleUJ5UGFzc3dvcmQocGFzc3dvcmQpO1xuICAgIGNvbnN0IHB1YmxpY0tleSA9IGtleVBhaXIuUHB1YmxpY0tleTtcbiAgICBjb25zdCBzaWduZWRTdHJpbmcgPSBPYXV0aFNlcnZpY2UuZ2V0U2lnbmV0U3RyaW5nKHN0cmluZ1RvU2lnbiwga2V5UGFpci5CcmFpbktleSk7XG4gICAgdGhpcy5icmFpbktleSA9IGtleVBhaXIuQnJhaW5LZXk7XG5cbiAgICBjb25zdCB1cmwgPSB0aGlzLnVybCArIGAvc2lnbnVwL2NvbXBsZXRlYDtcblxuICAgIHJldHVybiB0aGlzLmh0dHBIZWxwZXIuY3VzdG9tQ2FsbChIdHRwTWV0aG9kVHlwZXMucG9zdCwgdXJsLCB7XG4gICAgICBjb25maXJtYXRpb25Db2RlOiBjb2RlLFxuICAgICAgYnJhaW5LZXk6IGVuY3J5cHRlZEJyYWluS2V5LFxuICAgICAgcHVibGljS2V5OiBwdWJsaWNLZXksXG4gICAgICBzaWduZWRTdHJpbmc6IHNpZ25lZFN0cmluZ1xuICAgIH0pO1xuICB9XG5cbiAgc2lnbmluQ2hlY2tDb2RlKGNvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgdXJsID0gdGhpcy51cmwgKyBgL3NpZ25pbi9jaGVjay1jb2RlLyR7Y29kZX1gO1xuICAgIHJldHVybiB0aGlzLmh0dHBIZWxwZXIuY3VzdG9tQ2FsbChIdHRwTWV0aG9kVHlwZXMuZ2V0LCB1cmwpO1xuICB9XG5cbiAgYXV0aGVudGljYXRlKGVtYWlsOiBzdHJpbmcsIG9ic2VydmVSZXNwb25zZTogYm9vbGVhbiA9IGZhbHNlLCByZWxhdGl2ZVJvdXRlOiBzdHJpbmcgPSAnJyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgdXJsID0gdGhpcy51cmwgKyBgL2F1dGhlbnRpY2F0aW9uYDtcbiAgICBjb25zdCBkYXRhID0geydlbWFpbCc6IGVtYWlsfTtcbiAgICBpZiAocmVsYXRpdmVSb3V0ZSkge1xuICAgICAgZGF0YVsncmVsYXRpdmVSb3V0ZSddID0gcmVsYXRpdmVSb3V0ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaHR0cEhlbHBlci5jdXN0b21DYWxsKEh0dHBNZXRob2RUeXBlcy5wdXQsIHVybCwgZGF0YSwgbnVsbCwgb2JzZXJ2ZVJlc3BvbnNlKTtcbiAgfVxuXG4gIHNpZ25pbkdldFRva2VuKGVuY3J5cHRlZEJyYWluS2V5LCBzdHJpbmdUb1NpZ24sIGNvZGUsIHBhc3N3b3JkKSB7XG4gICAgY29uc3QgYnJhaW5LZXlEYXRhID0gS2V5UGFpci5kZWNyeXB0QnJhaW5LZXlCeVBhc3N3b3JkKGVuY3J5cHRlZEJyYWluS2V5LCBwYXNzd29yZCk7XG5cbiAgICBpZiAoIWJyYWluS2V5RGF0YS5pc1ZhbGlkKSB7XG4gICAgICByZXR1cm4gdGhyb3dFcnJvcignb2F1dGhfZGVjcnlwdF9icmFpbl9rZXknKTtcbiAgICB9XG5cbiAgICBjb25zdCBicmFpbktleSA9IGJyYWluS2V5RGF0YS5icmFpbktleTtcbiAgICBjb25zdCBrZXlQYWlyID0gbmV3IEtleVBhaXIoYnJhaW5LZXkudHJpbSgpKTtcbiAgICBjb25zdCBzaWduZWRTdHJpbmcgPSBPYXV0aFNlcnZpY2UuZ2V0U2lnbmV0U3RyaW5nKHN0cmluZ1RvU2lnbiwga2V5UGFpci5CcmFpbktleSk7XG4gICAgY29uc3QgdXJsID0gdGhpcy51cmwgKyBgL3NpZ25pbi9nZXQtdG9rZW5gO1xuICAgIHRoaXMuYnJhaW5LZXkgPSBicmFpbktleS50cmltKCk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cEhlbHBlci5jdXN0b21DYWxsKEh0dHBNZXRob2RUeXBlcy5wb3N0LCB1cmwsIHtcbiAgICAgIGNvZGU6IGNvZGUsXG4gICAgICBzaWduZWRTdHJpbmc6IHNpZ25lZFN0cmluZ1xuICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICB0aGlzLmJyYWluS2V5U2F2ZWQgPSBkYXRhLmJyYWluS2V5U2F2ZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgdGhpcy5icmFpbktleVNlZW4gPSBkYXRhLmJyYWluS2V5U2VlbiA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICB0aGlzLnByaXZhdGVLZXlTYXZlZCA9IGRhdGEucHJpdmF0ZUtleVNhdmVkID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIHJlY292ZXJBdXRoZW50aWNhdGUoYnJhaW5LZXk6IHN0cmluZyk6IE9ic2VydmFibGU8eyBzdHJpbmdUb1NpZ246IGFueSB9PiB7XG4gICAgY29uc3Qga2V5UGFpciA9IG5ldyBLZXlQYWlyKGJyYWluS2V5LnRyaW0oKSk7XG4gICAgY29uc3QgcHVibGljS2V5ID0ga2V5UGFpci5QcHVibGljS2V5O1xuICAgIGNvbnN0IHVybCA9IHRoaXMudXJsICsgYC9yZWNvdmVyL2F1dGhlbnRpY2F0ZS8ke3B1YmxpY0tleX1gO1xuICAgIHJldHVybiB0aGlzLmh0dHBIZWxwZXIuY3VzdG9tQ2FsbChIdHRwTWV0aG9kVHlwZXMuZ2V0LCB1cmwpO1xuICB9XG5cbiAgcmVjb3ZlckNvbXBsZXRlKGJyYWluS2V5OiBzdHJpbmcsIHN0cmluZ1RvU2lnbjogbnVtYmVyLCBwYXNzd29yZDogc3RyaW5nKSB7XG4gICAgY29uc3Qga2V5UGFpciA9IG5ldyBLZXlQYWlyKGJyYWluS2V5LnRyaW0oKSk7XG4gICAgY29uc3QgZW5jcnlwdGVkQnJhaW5LZXkgPSBrZXlQYWlyLmdldEVuY3J5cHRlZEJyYWluS2V5QnlQYXNzd29yZChwYXNzd29yZCk7XG4gICAgY29uc3QgcHVibGljS2V5ID0ga2V5UGFpci5QcHVibGljS2V5O1xuICAgIGNvbnN0IHNpZ25lZFN0cmluZyA9IE9hdXRoU2VydmljZS5nZXRTaWduZXRTdHJpbmcoc3RyaW5nVG9TaWduLCBrZXlQYWlyLkJyYWluS2V5KTtcbiAgICB0aGlzLmJyYWluS2V5ID0ga2V5UGFpci5CcmFpbktleTtcblxuICAgIGNvbnN0IHVybCA9IHRoaXMudXJsICsgJy9yZWNvdmVyL2NvbXBsZXRlJztcblxuICAgIHJldHVybiB0aGlzLmh0dHBIZWxwZXIuY3VzdG9tQ2FsbChIdHRwTWV0aG9kVHlwZXMucG9zdCwgdXJsLCB7XG4gICAgICBicmFpbktleTogZW5jcnlwdGVkQnJhaW5LZXksXG4gICAgICBwdWJsaWNLZXk6IHB1YmxpY0tleSxcbiAgICAgIHNpZ25lZFN0cmluZzogc2lnbmVkU3RyaW5nXG4gICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgIHRoaXMuYnJhaW5LZXlTYXZlZCA9IGRhdGEuYnJhaW5LZXlTYXZlZCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICB0aGlzLmJyYWluS2V5U2VlbiA9IGRhdGEuYnJhaW5LZXlTZWVuID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgIHRoaXMucHJpdmF0ZUtleVNhdmVkID0gZGF0YS5wcml2YXRlS2V5U2F2ZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgZ2V0U2lnbmVkRGF0YShicmFpbktleTogc3RyaW5nLCBhY3Rpb25PYmopIHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpOyAvLyAxNTU0MzY5MDY2MDAwXG4gICAgY29uc3Qgbm93XzFoID0gbmV3IERhdGUobm93LmdldFRpbWUoKSArIE9hdXRoU2VydmljZS5EQVRBX1JBTkcpO1xuICAgIGNvbnN0IGtleVBhaXIgPSBuZXcgS2V5UGFpcihicmFpbktleS50cmltKCkpO1xuICAgIGNvbnN0IHRyYW5zYWN0aW9uT2JqID0gbmV3IFB1YmxpcVRyYW5zYWN0aW9uKHtcbiAgICAgIGNyZWF0aW9uOiArbm93LFxuICAgICAgZXhwaXJ5OiArbm93XzFoLFxuICAgICAgZmVlOiB7XG4gICAgICAgIHdob2xlOiAwLFxuICAgICAgICBmcmFjdGlvbjogMFxuICAgICAgfSxcbiAgICAgIGFjdGlvbjogYWN0aW9uT2JqXG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNpZ25lZEpzb246IEpTT04uc3RyaW5naWZ5KHRyYW5zYWN0aW9uT2JqLnRvSnNvbigpKSxcbiAgICAgIHNpZ25lZFN0cmluZzoga2V5UGFpci5zaWduTWVzc2FnZShKU09OLnN0cmluZ2lmeSh0cmFuc2FjdGlvbk9iai50b0pzb24oKSkpLFxuICAgICAgY3JlYXRpb246IE1hdGguZmxvb3Iobm93LmdldFRpbWUoKSAvIDEwMDApLFxuICAgICAgZXhwaXJ5OiBNYXRoLmZsb29yKG5vd18xaC5nZXRUaW1lKCkgLyAxMDAwKSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0U2lnbmVkRW1wdHlPYmplY3QoYnJhaW5LZXk6IHN0cmluZykge1xuICAgIGNvbnN0IGtleVBhaXIgPSBuZXcgS2V5UGFpcihicmFpbktleS50cmltKCkpO1xuICAgIGNvbnN0IHNpZ25lZERhdGEgPSB0aGlzLmdldFNpZ25lZERhdGEoYnJhaW5LZXkudHJpbSgpLCB7fSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHB1YmxpY0tleToga2V5UGFpci5QcHVibGljS2V5LFxuICAgICAgc2lnbmVkU3RyaW5nOiBzaWduZWREYXRhLnNpZ25lZFN0cmluZyxcbiAgICAgIGNyZWF0aW9uRGF0ZTogc2lnbmVkRGF0YS5jcmVhdGlvblxuICAgIH07XG4gIH1cblxuICBzZXRCcmFpbktleVNlZW4oYnJhaW5LZXk6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgdXJsID0gdGhpcy51cmwgKyAnL2JyYWluLWtleS1zZWVuJztcbiAgICBjb25zdCBzaWduZWRFbXB0eU9iamVjdERhdGEgPSB0aGlzLmdldFNpZ25lZEVtcHR5T2JqZWN0KGJyYWluS2V5LnRyaW0oKSk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cEhlbHBlci5jdXN0b21DYWxsKEh0dHBNZXRob2RUeXBlcy5wb3N0LCB1cmwsIHNpZ25lZEVtcHR5T2JqZWN0RGF0YSlcbiAgICAgIC5waXBlKG1hcChkYXRhID0+IHtcbiAgICAgICAgdGhpcy5icmFpbktleVNlZW4gPSB0cnVlO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH0pKTtcbiAgfVxuXG4gIHNldEJyYWluS2V5U2F2ZWQoYnJhaW5LZXk6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgdXJsID0gdGhpcy51cmwgKyAnL2JyYWluLWtleS1zYXZlZCc7XG4gICAgY29uc3Qgc2lnbmVkRW1wdHlPYmplY3REYXRhID0gdGhpcy5nZXRTaWduZWRFbXB0eU9iamVjdChicmFpbktleS50cmltKCkpO1xuICAgIHJldHVybiB0aGlzLmh0dHBIZWxwZXIuY3VzdG9tQ2FsbChIdHRwTWV0aG9kVHlwZXMucG9zdCwgdXJsLCBzaWduZWRFbXB0eU9iamVjdERhdGEpXG4gICAgICAucGlwZShtYXAoZGF0YSA9PiB7XG4gICAgICAgIHRoaXMuYnJhaW5LZXlTZWVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5icmFpbktleVNhdmVkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KSk7XG4gIH1cblxuICBzZXRQcml2YXRlS2V5U2F2ZWQoYnJhaW5LZXk6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgdXJsID0gdGhpcy51cmwgKyAnL3ByaXZhdGUta2V5LXNhdmVkJztcbiAgICBjb25zdCBzaWduZWRFbXB0eU9iamVjdERhdGEgPSB0aGlzLmdldFNpZ25lZEVtcHR5T2JqZWN0KGJyYWluS2V5LnRyaW0oKSk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cEhlbHBlci5jdXN0b21DYWxsKEh0dHBNZXRob2RUeXBlcy5wb3N0LCB1cmwsIHNpZ25lZEVtcHR5T2JqZWN0RGF0YSlcbiAgICAgIC5waXBlKG1hcChkYXRhID0+IHtcbiAgICAgICAgdGhpcy5wcml2YXRlS2V5U2F2ZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH0pKTtcbiAgfVxuXG4gIGdlbmVyYXRlUmFuZG9tS2V5ICgpIHtcbiAgICBGaW5nZXJwcmludDIuZ2V0KHt9LCAoY29tcG9uZW50cykgPT4ge1xuICAgICAgY29uc3QgZmluZ2VycHJpbnQgPSBGaW5nZXJwcmludDIueDY0aGFzaDEyOChjb21wb25lbnRzLm1hcChmdW5jdGlvbiAoY29tcG9uZW50KSB7IHJldHVybiBjb21wb25lbnQudmFsdWU7IH0pLmpvaW4oJycpLCAzMSkudHJpbSgpO1xuICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgICAgY29uc3QgYXZlcmFnZUhhc2ggPSBgJHtmaW5nZXJwcmludH0ke2N1cnJlbnRUaW1lfWA7XG4gICAgICBjb25zdCBlbmNvZGVkQXZlcmFnZUhhc2ggPSBzdHJpbmdUb1NoYTI1NihhdmVyYWdlSGFzaCkuc3Vic3RyaW5nKDAsIDgpO1xuXG4gICAgICB0aGlzLnJhbmRvbUtleSA9IHBhcnNlSW50KGVuY29kZWRBdmVyYWdlSGFzaCwgMTYpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=