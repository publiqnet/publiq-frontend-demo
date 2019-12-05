import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import * as Fingerprint2 from 'fingerprintjs2';

import { KeyPair } from 'cryptography-ts';
import { stringToSha256 } from 'cryptography-ts/bin/utils';
import PubliqTransaction from 'publiq-models-ts/bin/models/PubliqTransaction';
import { HttpHelperService, HttpMethodTypes } from './http-helper.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  static DATA_RANG: number = 60 * 60 * 1000;

  public brainKey: string;
  private url: string;
  private randomKey: number;

  public brainKeySaved: boolean;
  public brainKeySeen: boolean;
  public privateKeySaved: boolean;

  constructor(
    private httpHelper: HttpHelperService,
    @Inject('oauthUrl') url: string
  ) {
    if (!url) {
      throw new Error('OauthService: oauthUrl not valid');
    }

    this.url = `${url}/api/user`;
    this.generateRandomKey();
  }

  private static getSignetString(stringToSign, brainKey) {
    const now = new Date(new Date(stringToSign * 1000));
    const now_1h = new Date(now.getTime() + OauthService.DATA_RANG);
    const keyPair = new KeyPair(brainKey.trim());
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

  signupConfirmation(code: string): Observable<{ stringToSign: number }> {
    const url = this.url + `/signup/confirmation/${code}`;
    return this.httpHelper.customCall(HttpMethodTypes.get, url);

  }

  signupComplete(stringToSign, code, password) {
    KeyPair.setRandomKey(this.randomKey);
    const keyPair = new KeyPair();
    const encryptedBrainKey = keyPair.getEncryptedBrainKeyByPassword(password);
    const publicKey = keyPair.PpublicKey;
    const signedString = OauthService.getSignetString(stringToSign, keyPair.BrainKey);
    this.brainKey = keyPair.BrainKey;

    const url = this.url + `/signup/complete`;

    return this.httpHelper.customCall(HttpMethodTypes.post, url, {
      confirmationCode: code,
      brainKey: encryptedBrainKey,
      publicKey: publicKey,
      signedString: signedString
    });
  }

  signinCheckCode(code: string): Observable<any> {
    const url = this.url + `/signin/check-code/${code}`;
    return this.httpHelper.customCall(HttpMethodTypes.get, url);
  }

  authenticate(email: string, observeResponse: boolean = false, relativeRoute: string = ''): Observable<any> {
    const url = this.url + `/authentication`;
    const data = {'email': email};
    if (relativeRoute) {
      data['relativeRoute'] = relativeRoute;
    }
    return this.httpHelper.customCall(HttpMethodTypes.put, url, data, null, observeResponse);
  }

  signinGetToken(encryptedBrainKey, stringToSign, code, password) {
    const brainKeyData = KeyPair.decryptBrainKeyByPassword(encryptedBrainKey, password);

    if (!brainKeyData.isValid) {
      return throwError('oauth_decrypt_brain_key');
    }

    const brainKey = brainKeyData.brainKey;
    const keyPair = new KeyPair(brainKey.trim());
    const signedString = OauthService.getSignetString(stringToSign, keyPair.BrainKey);
    const url = this.url + `/signin/get-token`;
    this.brainKey = brainKey.trim();
    return this.httpHelper.customCall(HttpMethodTypes.post, url, {
      code: code,
      signedString: signedString
    })
      .pipe(
        map((data: any) => {
          this.brainKeySaved = data.brainKeySaved ? true : false;
          this.brainKeySeen = data.brainKeySeen ? true : false;
          this.privateKeySaved = data.privateKeySaved ? true : false;
          return data;
        })
      );
  }

  recoverAuthenticate(brainKey: string): Observable<{ stringToSign: any }> {
    const keyPair = new KeyPair(brainKey.trim());
    const publicKey = keyPair.PpublicKey;
    const url = this.url + `/recover/authenticate/${publicKey}`;
    return this.httpHelper.customCall(HttpMethodTypes.get, url);
  }

  recoverComplete(brainKey: string, stringToSign: number, password: string) {
    const keyPair = new KeyPair(brainKey.trim());
    const encryptedBrainKey = keyPair.getEncryptedBrainKeyByPassword(password);
    const publicKey = keyPair.PpublicKey;
    const signedString = OauthService.getSignetString(stringToSign, keyPair.BrainKey);
    this.brainKey = keyPair.BrainKey;

    const url = this.url + '/recover/complete';

    return this.httpHelper.customCall(HttpMethodTypes.post, url, {
      brainKey: encryptedBrainKey,
      publicKey: publicKey,
      signedString: signedString
    })
      .pipe(
        map((data: any) => {
          this.brainKeySaved = data.brainKeySaved ? true : false;
          this.brainKeySeen = data.brainKeySeen ? true : false;
          this.privateKeySaved = data.privateKeySaved ? true : false;
          return data;
        })
      );
  }

  getSignedData(brainKey: string, actionObj) {
    const now = new Date(); // 1554369066000
    const now_1h = new Date(now.getTime() + OauthService.DATA_RANG);
    const keyPair = new KeyPair(brainKey.trim());
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

  getSignedEmptyObject(brainKey: string) {
    const keyPair = new KeyPair(brainKey.trim());
    const signedData = this.getSignedData(brainKey.trim(), {});
    return {
      publicKey: keyPair.PpublicKey,
      signedString: signedData.signedString,
      creationDate: signedData.creation
    };
  }

  setBrainKeySeen(brainKey: string): Observable<any> {
    const url = this.url + '/brain-key-seen';
    const signedEmptyObjectData = this.getSignedEmptyObject(brainKey.trim());
    return this.httpHelper.customCall(HttpMethodTypes.post, url, signedEmptyObjectData)
      .pipe(map(data => {
        this.brainKeySeen = true;
        return data;
      }));
  }

  setBrainKeySaved(brainKey: string): Observable<any> {
    const url = this.url + '/brain-key-saved';
    const signedEmptyObjectData = this.getSignedEmptyObject(brainKey.trim());
    return this.httpHelper.customCall(HttpMethodTypes.post, url, signedEmptyObjectData)
      .pipe(map(data => {
        this.brainKeySeen = true;
        this.brainKeySaved = true;
        return data;
      }));
  }

  setPrivateKeySaved(brainKey: string): Observable<any> {
    const url = this.url + '/private-key-saved';
    const signedEmptyObjectData = this.getSignedEmptyObject(brainKey.trim());
    return this.httpHelper.customCall(HttpMethodTypes.post, url, signedEmptyObjectData)
      .pipe(map(data => {
        this.privateKeySaved = true;
        return data;
      }));
  }

  generateRandomKey () {
    Fingerprint2.get({}, (components) => {
      const fingerprint = Fingerprint2.x64hash128(components.map(function (component) { return component.value; }).join(''), 31).trim();
      const currentTime = new Date().getTime();

      const averageHash = `${fingerprint}${currentTime}`;
      const encodedAverageHash = stringToSha256(averageHash).substring(0, 8);

      this.randomKey = parseInt(encodedAverageHash, 16);
    });
  }
}
