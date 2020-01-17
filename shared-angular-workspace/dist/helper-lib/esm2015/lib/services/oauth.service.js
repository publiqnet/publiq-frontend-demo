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
export class OauthService {
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
        Fingerprint2.get({}, (/**
         * @param {?} components
         * @return {?}
         */
        (components) => {
            /** @type {?} */
            const fingerprint = Fingerprint2.x64hash128(components.map((/**
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
            KeyPair.setRandomKey(this.randomKey);
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
/** @nocollapse */ OauthService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function OauthService_Factory() { return new OauthService(i0.ɵɵinject(i1.HttpHelperService), i0.ɵɵinject("oauthUrl")); }, token: OauthService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGguc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2hlbHBlci1saWIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvb2F1dGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEtBQUssWUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMxQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxpQkFBaUIsTUFBTSwrQ0FBK0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDM0UsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFLckMsTUFBTSxPQUFPLFlBQVk7Ozs7O0lBWXZCLFlBQ1UsVUFBNkIsRUFDakIsR0FBVztRQUR2QixlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQUdyQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1IsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1NBQ3JEO1FBRUQsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsV0FBVyxDQUFDO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7Ozs7SUFFTyxNQUFNLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxRQUFROztjQUM3QyxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDOztjQUM3QyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUM7O2NBQ3pELE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7O2NBQ3RDLGNBQWMsR0FBRyxJQUFJLGlCQUFpQixDQUFDO1lBQzNDLFFBQVEsRUFBRSxDQUFDLEdBQUc7WUFDZCxNQUFNLEVBQUUsQ0FBQyxNQUFNO1lBQ2YsR0FBRyxFQUFFO2dCQUNILEtBQUssRUFBRSxDQUFDO2dCQUNSLFFBQVEsRUFBRSxDQUFDO2FBQ1o7WUFDRCxNQUFNLEVBQUUsRUFBRTtTQUNYLENBQUM7UUFFRixPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7Ozs7O0lBRUQsa0JBQWtCLENBQUMsSUFBWTs7Y0FDdkIsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsd0JBQXdCLElBQUksRUFBRTtRQUNyRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFOUQsQ0FBQzs7Ozs7OztJQUVELGNBQWMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLFFBQVE7O2NBQ25DLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBRTs7Y0FDdkIsaUJBQWlCLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLFFBQVEsQ0FBQzs7Y0FDcEUsU0FBUyxHQUFHLE9BQU8sQ0FBQyxVQUFVOztjQUM5QixZQUFZLEdBQUcsWUFBWSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNqRixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7O2NBRTNCLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLGtCQUFrQjtRQUV6QyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO1lBQzNELGdCQUFnQixFQUFFLElBQUk7WUFDdEIsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixTQUFTLEVBQUUsU0FBUztZQUNwQixZQUFZLEVBQUUsWUFBWTtTQUMzQixDQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVELGVBQWUsQ0FBQyxJQUFZOztjQUNwQixHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxzQkFBc0IsSUFBSSxFQUFFO1FBQ25ELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM5RCxDQUFDOzs7Ozs7O0lBRUQsWUFBWSxDQUFDLEtBQWEsRUFBRSxrQkFBMkIsS0FBSyxFQUFFLGdCQUF3QixFQUFFOztjQUNoRixHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxpQkFBaUI7O2NBQ2xDLElBQUksR0FBRyxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUM7UUFDN0IsSUFBSSxhQUFhLEVBQUU7WUFDakIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLGFBQWEsQ0FBQztTQUN2QztRQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQztJQUMzRixDQUFDOzs7Ozs7OztJQUVELGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFFBQVE7O2NBQ3RELFlBQVksR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDO1FBRW5GLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFO1lBQ3pCLE9BQU8sVUFBVSxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDOUM7O2NBRUssUUFBUSxHQUFHLFlBQVksQ0FBQyxRQUFROztjQUNoQyxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDOztjQUN0QyxZQUFZLEdBQUcsWUFBWSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQzs7Y0FDM0UsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsbUJBQW1CO1FBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDM0QsSUFBSSxFQUFFLElBQUk7WUFDVixZQUFZLEVBQUUsWUFBWTtTQUMzQixDQUFDO2FBQ0MsSUFBSSxDQUNILEdBQUc7Ozs7UUFBQyxDQUFDLElBQVMsRUFBRSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDdkQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNyRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQzNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNOLENBQUM7Ozs7O0lBRUQsbUJBQW1CLENBQUMsUUFBZ0I7O2NBQzVCLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7O2NBQ3RDLFNBQVMsR0FBRyxPQUFPLENBQUMsVUFBVTs7Y0FDOUIsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcseUJBQXlCLFNBQVMsRUFBRTtRQUMzRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDOUQsQ0FBQzs7Ozs7OztJQUVELGVBQWUsQ0FBQyxRQUFnQixFQUFFLFlBQW9CLEVBQUUsUUFBZ0I7O2NBQ2hFLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7O2NBQ3RDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxRQUFRLENBQUM7O2NBQ3BFLFNBQVMsR0FBRyxPQUFPLENBQUMsVUFBVTs7Y0FDOUIsWUFBWSxHQUFHLFlBQVksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDakYsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDOztjQUUzQixHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxtQkFBbUI7UUFFMUMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtZQUMzRCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLFlBQVksRUFBRSxZQUFZO1NBQzNCLENBQUM7YUFDQyxJQUFJLENBQ0gsR0FBRzs7OztRQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7WUFDaEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUN2RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3JELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDM0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ04sQ0FBQzs7Ozs7O0lBRUQsYUFBYSxDQUFDLFFBQWdCLEVBQUUsU0FBUzs7Y0FDakMsR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFOzs7Y0FDaEIsTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDOztjQUN6RCxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDOztjQUN0QyxjQUFjLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQztZQUMzQyxRQUFRLEVBQUUsQ0FBQyxHQUFHO1lBQ2QsTUFBTSxFQUFFLENBQUMsTUFBTTtZQUNmLEdBQUcsRUFBRTtnQkFDSCxLQUFLLEVBQUUsQ0FBQztnQkFDUixRQUFRLEVBQUUsQ0FBQzthQUNaO1lBQ0QsTUFBTSxFQUFFLFNBQVM7U0FDbEIsQ0FBQztRQUNGLE9BQU87WUFDTCxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkQsWUFBWSxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUMxRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQzFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FDNUMsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRUQsb0JBQW9CLENBQUMsUUFBZ0I7O2NBQzdCLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7O2NBQ3RDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDMUQsT0FBTztZQUNMLFNBQVMsRUFBRSxPQUFPLENBQUMsVUFBVTtZQUM3QixZQUFZLEVBQUUsVUFBVSxDQUFDLFlBQVk7WUFDckMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxRQUFRO1NBQ2xDLENBQUM7SUFDSixDQUFDOzs7OztJQUVELGVBQWUsQ0FBQyxRQUFnQjs7Y0FDeEIsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsaUJBQWlCOztjQUNsQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3hFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUscUJBQXFCLENBQUM7YUFDaEYsSUFBSSxDQUFDLEdBQUc7Ozs7UUFBQyxJQUFJLENBQUMsRUFBRTtZQUNmLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsUUFBZ0I7O2NBQ3pCLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLGtCQUFrQjs7Y0FDbkMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN4RSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLHFCQUFxQixDQUFDO2FBQ2hGLElBQUksQ0FBQyxHQUFHOzs7O1FBQUMsSUFBSSxDQUFDLEVBQUU7WUFDZixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUMxQixPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsRUFBQyxDQUFDLENBQUM7SUFDUixDQUFDOzs7OztJQUVELGtCQUFrQixDQUFDLFFBQWdCOztjQUMzQixHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxvQkFBb0I7O2NBQ3JDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxxQkFBcUIsQ0FBQzthQUNoRixJQUFJLENBQUMsR0FBRzs7OztRQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2YsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7WUFDNUIsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQzs7OztJQUVELGlCQUFpQjtRQUNmLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRTs7OztRQUFFLENBQUMsVUFBVSxFQUFFLEVBQUU7O2tCQUM1QixXQUFXLEdBQUcsWUFBWSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRzs7OztZQUFDLFVBQVUsU0FBUyxJQUFJLE9BQU8sU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUU7O2tCQUMzSCxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUU7O2tCQUVsQyxXQUFXLEdBQUcsR0FBRyxXQUFXLEdBQUcsV0FBVyxFQUFFOztrQkFDNUMsa0JBQWtCLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRXRFLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7QUE5TU0sc0JBQVMsR0FBVyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQzs7WUFMM0MsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBTFEsaUJBQWlCO3lDQW9CckIsTUFBTSxTQUFDLFVBQVU7Ozs7O0lBWnBCLHVCQUEwQzs7SUFFMUMsZ0NBQXdCOzs7OztJQUN4QiwyQkFBb0I7Ozs7O0lBQ3BCLGlDQUEwQjs7SUFFMUIscUNBQThCOztJQUM5QixvQ0FBNkI7O0lBQzdCLHVDQUFnQzs7Ozs7SUFHOUIsa0NBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgKiBhcyBGaW5nZXJwcmludDIgZnJvbSAnZmluZ2VycHJpbnRqczInO1xuXG5pbXBvcnQgeyBLZXlQYWlyIH0gZnJvbSAnY3J5cHRvZ3JhcGh5LXRzJztcbmltcG9ydCB7IHN0cmluZ1RvU2hhMjU2IH0gZnJvbSAnY3J5cHRvZ3JhcGh5LXRzL2Jpbi91dGlscyc7XG5pbXBvcnQgUHVibGlxVHJhbnNhY3Rpb24gZnJvbSAncHVibGlxLW1vZGVscy10cy9iaW4vbW9kZWxzL1B1YmxpcVRyYW5zYWN0aW9uJztcbmltcG9ydCB7IEh0dHBIZWxwZXJTZXJ2aWNlLCBIdHRwTWV0aG9kVHlwZXMgfSBmcm9tICcuL2h0dHAtaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBPYXV0aFNlcnZpY2Uge1xuXG4gIHN0YXRpYyBEQVRBX1JBTkc6IG51bWJlciA9IDYwICogNjAgKiAxMDAwO1xuXG4gIHB1YmxpYyBicmFpbktleTogc3RyaW5nO1xuICBwcml2YXRlIHVybDogc3RyaW5nO1xuICBwcml2YXRlIHJhbmRvbUtleTogbnVtYmVyO1xuXG4gIHB1YmxpYyBicmFpbktleVNhdmVkOiBib29sZWFuO1xuICBwdWJsaWMgYnJhaW5LZXlTZWVuOiBib29sZWFuO1xuICBwdWJsaWMgcHJpdmF0ZUtleVNhdmVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cEhlbHBlcjogSHR0cEhlbHBlclNlcnZpY2UsXG4gICAgQEluamVjdCgnb2F1dGhVcmwnKSB1cmw6IHN0cmluZ1xuICApIHtcbiAgICBpZiAoIXVybCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdPYXV0aFNlcnZpY2U6IG9hdXRoVXJsIG5vdCB2YWxpZCcpO1xuICAgIH1cblxuICAgIHRoaXMudXJsID0gYCR7dXJsfS9hcGkvdXNlcmA7XG4gICAgdGhpcy5nZW5lcmF0ZVJhbmRvbUtleSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZ2V0U2lnbmV0U3RyaW5nKHN0cmluZ1RvU2lnbiwgYnJhaW5LZXkpIHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZShuZXcgRGF0ZShzdHJpbmdUb1NpZ24gKiAxMDAwKSk7XG4gICAgY29uc3Qgbm93XzFoID0gbmV3IERhdGUobm93LmdldFRpbWUoKSArIE9hdXRoU2VydmljZS5EQVRBX1JBTkcpO1xuICAgIGNvbnN0IGtleVBhaXIgPSBuZXcgS2V5UGFpcihicmFpbktleS50cmltKCkpO1xuICAgIGNvbnN0IHRyYW5zYWN0aW9uT2JqID0gbmV3IFB1YmxpcVRyYW5zYWN0aW9uKHtcbiAgICAgIGNyZWF0aW9uOiArbm93LFxuICAgICAgZXhwaXJ5OiArbm93XzFoLFxuICAgICAgZmVlOiB7XG4gICAgICAgIHdob2xlOiAwLFxuICAgICAgICBmcmFjdGlvbjogMFxuICAgICAgfSxcbiAgICAgIGFjdGlvbjoge30sXG4gICAgfSk7XG5cbiAgICByZXR1cm4ga2V5UGFpci5zaWduTWVzc2FnZShKU09OLnN0cmluZ2lmeSh0cmFuc2FjdGlvbk9iai50b0pzb24oKSkpO1xuICB9XG5cbiAgc2lnbnVwQ29uZmlybWF0aW9uKGNvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8eyBzdHJpbmdUb1NpZ246IG51bWJlciB9PiB7XG4gICAgY29uc3QgdXJsID0gdGhpcy51cmwgKyBgL3NpZ251cC9jb25maXJtYXRpb24vJHtjb2RlfWA7XG4gICAgcmV0dXJuIHRoaXMuaHR0cEhlbHBlci5jdXN0b21DYWxsKEh0dHBNZXRob2RUeXBlcy5nZXQsIHVybCk7XG5cbiAgfVxuXG4gIHNpZ251cENvbXBsZXRlKHN0cmluZ1RvU2lnbiwgY29kZSwgcGFzc3dvcmQpIHtcbiAgICBjb25zdCBrZXlQYWlyID0gbmV3IEtleVBhaXIoKTtcbiAgICBjb25zdCBlbmNyeXB0ZWRCcmFpbktleSA9IGtleVBhaXIuZ2V0RW5jcnlwdGVkQnJhaW5LZXlCeVBhc3N3b3JkKHBhc3N3b3JkKTtcbiAgICBjb25zdCBwdWJsaWNLZXkgPSBrZXlQYWlyLlBwdWJsaWNLZXk7XG4gICAgY29uc3Qgc2lnbmVkU3RyaW5nID0gT2F1dGhTZXJ2aWNlLmdldFNpZ25ldFN0cmluZyhzdHJpbmdUb1NpZ24sIGtleVBhaXIuQnJhaW5LZXkpO1xuICAgIHRoaXMuYnJhaW5LZXkgPSBrZXlQYWlyLkJyYWluS2V5O1xuXG4gICAgY29uc3QgdXJsID0gdGhpcy51cmwgKyBgL3NpZ251cC9jb21wbGV0ZWA7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwSGVscGVyLmN1c3RvbUNhbGwoSHR0cE1ldGhvZFR5cGVzLnBvc3QsIHVybCwge1xuICAgICAgY29uZmlybWF0aW9uQ29kZTogY29kZSxcbiAgICAgIGJyYWluS2V5OiBlbmNyeXB0ZWRCcmFpbktleSxcbiAgICAgIHB1YmxpY0tleTogcHVibGljS2V5LFxuICAgICAgc2lnbmVkU3RyaW5nOiBzaWduZWRTdHJpbmdcbiAgICB9KTtcbiAgfVxuXG4gIHNpZ25pbkNoZWNrQ29kZShjb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMudXJsICsgYC9zaWduaW4vY2hlY2stY29kZS8ke2NvZGV9YDtcbiAgICByZXR1cm4gdGhpcy5odHRwSGVscGVyLmN1c3RvbUNhbGwoSHR0cE1ldGhvZFR5cGVzLmdldCwgdXJsKTtcbiAgfVxuXG4gIGF1dGhlbnRpY2F0ZShlbWFpbDogc3RyaW5nLCBvYnNlcnZlUmVzcG9uc2U6IGJvb2xlYW4gPSBmYWxzZSwgcmVsYXRpdmVSb3V0ZTogc3RyaW5nID0gJycpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMudXJsICsgYC9hdXRoZW50aWNhdGlvbmA7XG4gICAgY29uc3QgZGF0YSA9IHsnZW1haWwnOiBlbWFpbH07XG4gICAgaWYgKHJlbGF0aXZlUm91dGUpIHtcbiAgICAgIGRhdGFbJ3JlbGF0aXZlUm91dGUnXSA9IHJlbGF0aXZlUm91dGU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmh0dHBIZWxwZXIuY3VzdG9tQ2FsbChIdHRwTWV0aG9kVHlwZXMucHV0LCB1cmwsIGRhdGEsIG51bGwsIG9ic2VydmVSZXNwb25zZSk7XG4gIH1cblxuICBzaWduaW5HZXRUb2tlbihlbmNyeXB0ZWRCcmFpbktleSwgc3RyaW5nVG9TaWduLCBjb2RlLCBwYXNzd29yZCkge1xuICAgIGNvbnN0IGJyYWluS2V5RGF0YSA9IEtleVBhaXIuZGVjcnlwdEJyYWluS2V5QnlQYXNzd29yZChlbmNyeXB0ZWRCcmFpbktleSwgcGFzc3dvcmQpO1xuXG4gICAgaWYgKCFicmFpbktleURhdGEuaXNWYWxpZCkge1xuICAgICAgcmV0dXJuIHRocm93RXJyb3IoJ29hdXRoX2RlY3J5cHRfYnJhaW5fa2V5Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgYnJhaW5LZXkgPSBicmFpbktleURhdGEuYnJhaW5LZXk7XG4gICAgY29uc3Qga2V5UGFpciA9IG5ldyBLZXlQYWlyKGJyYWluS2V5LnRyaW0oKSk7XG4gICAgY29uc3Qgc2lnbmVkU3RyaW5nID0gT2F1dGhTZXJ2aWNlLmdldFNpZ25ldFN0cmluZyhzdHJpbmdUb1NpZ24sIGtleVBhaXIuQnJhaW5LZXkpO1xuICAgIGNvbnN0IHVybCA9IHRoaXMudXJsICsgYC9zaWduaW4vZ2V0LXRva2VuYDtcbiAgICB0aGlzLmJyYWluS2V5ID0gYnJhaW5LZXkudHJpbSgpO1xuICAgIHJldHVybiB0aGlzLmh0dHBIZWxwZXIuY3VzdG9tQ2FsbChIdHRwTWV0aG9kVHlwZXMucG9zdCwgdXJsLCB7XG4gICAgICBjb2RlOiBjb2RlLFxuICAgICAgc2lnbmVkU3RyaW5nOiBzaWduZWRTdHJpbmdcbiAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy5icmFpbktleVNhdmVkID0gZGF0YS5icmFpbktleVNhdmVkID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgIHRoaXMuYnJhaW5LZXlTZWVuID0gZGF0YS5icmFpbktleVNlZW4gPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgdGhpcy5wcml2YXRlS2V5U2F2ZWQgPSBkYXRhLnByaXZhdGVLZXlTYXZlZCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICByZWNvdmVyQXV0aGVudGljYXRlKGJyYWluS2V5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPHsgc3RyaW5nVG9TaWduOiBhbnkgfT4ge1xuICAgIGNvbnN0IGtleVBhaXIgPSBuZXcgS2V5UGFpcihicmFpbktleS50cmltKCkpO1xuICAgIGNvbnN0IHB1YmxpY0tleSA9IGtleVBhaXIuUHB1YmxpY0tleTtcbiAgICBjb25zdCB1cmwgPSB0aGlzLnVybCArIGAvcmVjb3Zlci9hdXRoZW50aWNhdGUvJHtwdWJsaWNLZXl9YDtcbiAgICByZXR1cm4gdGhpcy5odHRwSGVscGVyLmN1c3RvbUNhbGwoSHR0cE1ldGhvZFR5cGVzLmdldCwgdXJsKTtcbiAgfVxuXG4gIHJlY292ZXJDb21wbGV0ZShicmFpbktleTogc3RyaW5nLCBzdHJpbmdUb1NpZ246IG51bWJlciwgcGFzc3dvcmQ6IHN0cmluZykge1xuICAgIGNvbnN0IGtleVBhaXIgPSBuZXcgS2V5UGFpcihicmFpbktleS50cmltKCkpO1xuICAgIGNvbnN0IGVuY3J5cHRlZEJyYWluS2V5ID0ga2V5UGFpci5nZXRFbmNyeXB0ZWRCcmFpbktleUJ5UGFzc3dvcmQocGFzc3dvcmQpO1xuICAgIGNvbnN0IHB1YmxpY0tleSA9IGtleVBhaXIuUHB1YmxpY0tleTtcbiAgICBjb25zdCBzaWduZWRTdHJpbmcgPSBPYXV0aFNlcnZpY2UuZ2V0U2lnbmV0U3RyaW5nKHN0cmluZ1RvU2lnbiwga2V5UGFpci5CcmFpbktleSk7XG4gICAgdGhpcy5icmFpbktleSA9IGtleVBhaXIuQnJhaW5LZXk7XG5cbiAgICBjb25zdCB1cmwgPSB0aGlzLnVybCArICcvcmVjb3Zlci9jb21wbGV0ZSc7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwSGVscGVyLmN1c3RvbUNhbGwoSHR0cE1ldGhvZFR5cGVzLnBvc3QsIHVybCwge1xuICAgICAgYnJhaW5LZXk6IGVuY3J5cHRlZEJyYWluS2V5LFxuICAgICAgcHVibGljS2V5OiBwdWJsaWNLZXksXG4gICAgICBzaWduZWRTdHJpbmc6IHNpZ25lZFN0cmluZ1xuICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICB0aGlzLmJyYWluS2V5U2F2ZWQgPSBkYXRhLmJyYWluS2V5U2F2ZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgdGhpcy5icmFpbktleVNlZW4gPSBkYXRhLmJyYWluS2V5U2VlbiA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICB0aGlzLnByaXZhdGVLZXlTYXZlZCA9IGRhdGEucHJpdmF0ZUtleVNhdmVkID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIGdldFNpZ25lZERhdGEoYnJhaW5LZXk6IHN0cmluZywgYWN0aW9uT2JqKSB7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTsgLy8gMTU1NDM2OTA2NjAwMFxuICAgIGNvbnN0IG5vd18xaCA9IG5ldyBEYXRlKG5vdy5nZXRUaW1lKCkgKyBPYXV0aFNlcnZpY2UuREFUQV9SQU5HKTtcbiAgICBjb25zdCBrZXlQYWlyID0gbmV3IEtleVBhaXIoYnJhaW5LZXkudHJpbSgpKTtcbiAgICBjb25zdCB0cmFuc2FjdGlvbk9iaiA9IG5ldyBQdWJsaXFUcmFuc2FjdGlvbih7XG4gICAgICBjcmVhdGlvbjogK25vdyxcbiAgICAgIGV4cGlyeTogK25vd18xaCxcbiAgICAgIGZlZToge1xuICAgICAgICB3aG9sZTogMCxcbiAgICAgICAgZnJhY3Rpb246IDBcbiAgICAgIH0sXG4gICAgICBhY3Rpb246IGFjdGlvbk9ialxuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICBzaWduZWRKc29uOiBKU09OLnN0cmluZ2lmeSh0cmFuc2FjdGlvbk9iai50b0pzb24oKSksXG4gICAgICBzaWduZWRTdHJpbmc6IGtleVBhaXIuc2lnbk1lc3NhZ2UoSlNPTi5zdHJpbmdpZnkodHJhbnNhY3Rpb25PYmoudG9Kc29uKCkpKSxcbiAgICAgIGNyZWF0aW9uOiBNYXRoLmZsb29yKG5vdy5nZXRUaW1lKCkgLyAxMDAwKSxcbiAgICAgIGV4cGlyeTogTWF0aC5mbG9vcihub3dfMWguZ2V0VGltZSgpIC8gMTAwMCksXG4gICAgfTtcbiAgfVxuXG4gIGdldFNpZ25lZEVtcHR5T2JqZWN0KGJyYWluS2V5OiBzdHJpbmcpIHtcbiAgICBjb25zdCBrZXlQYWlyID0gbmV3IEtleVBhaXIoYnJhaW5LZXkudHJpbSgpKTtcbiAgICBjb25zdCBzaWduZWREYXRhID0gdGhpcy5nZXRTaWduZWREYXRhKGJyYWluS2V5LnRyaW0oKSwge30pO1xuICAgIHJldHVybiB7XG4gICAgICBwdWJsaWNLZXk6IGtleVBhaXIuUHB1YmxpY0tleSxcbiAgICAgIHNpZ25lZFN0cmluZzogc2lnbmVkRGF0YS5zaWduZWRTdHJpbmcsXG4gICAgICBjcmVhdGlvbkRhdGU6IHNpZ25lZERhdGEuY3JlYXRpb25cbiAgICB9O1xuICB9XG5cbiAgc2V0QnJhaW5LZXlTZWVuKGJyYWluS2V5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMudXJsICsgJy9icmFpbi1rZXktc2Vlbic7XG4gICAgY29uc3Qgc2lnbmVkRW1wdHlPYmplY3REYXRhID0gdGhpcy5nZXRTaWduZWRFbXB0eU9iamVjdChicmFpbktleS50cmltKCkpO1xuICAgIHJldHVybiB0aGlzLmh0dHBIZWxwZXIuY3VzdG9tQ2FsbChIdHRwTWV0aG9kVHlwZXMucG9zdCwgdXJsLCBzaWduZWRFbXB0eU9iamVjdERhdGEpXG4gICAgICAucGlwZShtYXAoZGF0YSA9PiB7XG4gICAgICAgIHRoaXMuYnJhaW5LZXlTZWVuID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KSk7XG4gIH1cblxuICBzZXRCcmFpbktleVNhdmVkKGJyYWluS2V5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMudXJsICsgJy9icmFpbi1rZXktc2F2ZWQnO1xuICAgIGNvbnN0IHNpZ25lZEVtcHR5T2JqZWN0RGF0YSA9IHRoaXMuZ2V0U2lnbmVkRW1wdHlPYmplY3QoYnJhaW5LZXkudHJpbSgpKTtcbiAgICByZXR1cm4gdGhpcy5odHRwSGVscGVyLmN1c3RvbUNhbGwoSHR0cE1ldGhvZFR5cGVzLnBvc3QsIHVybCwgc2lnbmVkRW1wdHlPYmplY3REYXRhKVxuICAgICAgLnBpcGUobWFwKGRhdGEgPT4ge1xuICAgICAgICB0aGlzLmJyYWluS2V5U2VlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuYnJhaW5LZXlTYXZlZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSkpO1xuICB9XG5cbiAgc2V0UHJpdmF0ZUtleVNhdmVkKGJyYWluS2V5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMudXJsICsgJy9wcml2YXRlLWtleS1zYXZlZCc7XG4gICAgY29uc3Qgc2lnbmVkRW1wdHlPYmplY3REYXRhID0gdGhpcy5nZXRTaWduZWRFbXB0eU9iamVjdChicmFpbktleS50cmltKCkpO1xuICAgIHJldHVybiB0aGlzLmh0dHBIZWxwZXIuY3VzdG9tQ2FsbChIdHRwTWV0aG9kVHlwZXMucG9zdCwgdXJsLCBzaWduZWRFbXB0eU9iamVjdERhdGEpXG4gICAgICAucGlwZShtYXAoZGF0YSA9PiB7XG4gICAgICAgIHRoaXMucHJpdmF0ZUtleVNhdmVkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KSk7XG4gIH1cblxuICBnZW5lcmF0ZVJhbmRvbUtleSAoKSB7XG4gICAgRmluZ2VycHJpbnQyLmdldCh7fSwgKGNvbXBvbmVudHMpID0+IHtcbiAgICAgIGNvbnN0IGZpbmdlcnByaW50ID0gRmluZ2VycHJpbnQyLng2NGhhc2gxMjgoY29tcG9uZW50cy5tYXAoZnVuY3Rpb24gKGNvbXBvbmVudCkgeyByZXR1cm4gY29tcG9uZW50LnZhbHVlOyB9KS5qb2luKCcnKSwgMzEpLnRyaW0oKTtcbiAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgIGNvbnN0IGF2ZXJhZ2VIYXNoID0gYCR7ZmluZ2VycHJpbnR9JHtjdXJyZW50VGltZX1gO1xuICAgICAgY29uc3QgZW5jb2RlZEF2ZXJhZ2VIYXNoID0gc3RyaW5nVG9TaGEyNTYoYXZlcmFnZUhhc2gpLnN1YnN0cmluZygwLCA4KTtcblxuICAgICAgdGhpcy5yYW5kb21LZXkgPSBwYXJzZUludChlbmNvZGVkQXZlcmFnZUhhc2gsIDE2KTtcbiAgICAgIEtleVBhaXIuc2V0UmFuZG9tS2V5KHRoaXMucmFuZG9tS2V5KTtcbiAgICB9KTtcbiAgfVxufVxuIl19