import { Injectable } from '@angular/core';
import { KeyPair } from 'cryptography-ts';
import * as SHA256 from 'crypto-js/sha256';
import { encode } from 'bs58';
import PubliqTransaction from 'publiq-models-ts/bin/models/PubliqTransaction';
import PubliqFile from 'publiq-models-ts/bin/models/PubliqFile';
import PubliqContentUnit from 'publiq-models-ts/bin/models/PubliqContentUnit';
import { environment } from '../../../environments/environment';
import PubliqSponsorContentUnit from 'publiq-models-ts/bin/models/PubliqSponsorContentUnit';
import PubliqSignedTransaction from 'publiq-models-ts/bin/models/PubliqSignedTransaction';
import PubliqAuthority from 'publiq-models-ts/bin/models/PubliqAuthority';
import PubliqCancelSponsorContentUnit from 'publiq-models-ts/bin/models/PubliqCancelSponsorContentUnit';
import { UtilsService } from 'shared-lib';

KeyPair.setPublicKeyPrefix(environment.coinName);

@Injectable()
export class CryptService {

  static FeeWhole: number = 0;
  static FeeFraction: number = 10000000;

  constructor() {}

  static hexStringToByteArray (hexStr) {
    return new Uint8Array(hexStr.match(/[\da-f]{2}/gi).map( h => {
      return parseInt(h, 16);
    }));
  }

  static GetFee () {
    return UtilsService.calculateBalance(CryptService.FeeWhole, CryptService.FeeFraction);
  }

  getSignBoost(fromBrainKey: string, uri: string, amount: number, feeWhole: number, feeFraction: number, currentTime: number, hours: number) {
    const keyPair = new KeyPair(fromBrainKey);
    const fromPublicKey = keyPair.PpublicKey;

    let now = new Date();
    if (currentTime) {
      now = new Date(currentTime * 1000);
    }
    const now_1h = new Date(now.getTime() + (60 * 60 * 1000));

    const amountData = this.amountStringToWholeFraction(amount);
    const boostObj =  new PubliqSponsorContentUnit( {
      sponsorAddress: fromPublicKey,
      uri: uri,
      startTimePoint: +now,
      hours: hours,
      amount: amountData,
    });

    const transactionObj = new PubliqTransaction({
      creation: +now,
      expiry: +now_1h,
      fee: {
        whole: feeWhole,
        fraction: feeFraction
      },
      action: boostObj
    });

    const signature = keyPair.signMessage(JSON.stringify(transactionObj.toJson()));

    const publiqAuthority = new PubliqAuthority({
      address: fromPublicKey,
      signature: signature
    });

    const transactionSignedObj = new PubliqSignedTransaction({
      transactionDetails: transactionObj,
      authorizations: [publiqAuthority]
    });

    const transactionObjString = JSON.stringify(transactionSignedObj.toJson());
    const transactionHashSHA256 = SHA256(transactionObjString).toString();
    const transactionHashBASE58 = encode(CryptService.hexStringToByteArray(transactionHashSHA256));

    return {
      signature: signature,
      transactionHash: transactionHashBASE58
    };
  }

  getSignCancelBoost(fromBrainKey: string, uri: string, transactionHash: string, feeWhole: number, feeFraction: number, currentTime: number) {
    const keyPair = new KeyPair(fromBrainKey);
    const fromPublicKey = keyPair.PpublicKey;

    let now = new Date();
    if (currentTime) {
      now = new Date(currentTime * 1000);
    }
    const now_1h = new Date(now.getTime() + (60 * 60 * 1000));

    const boostObj =  new PubliqCancelSponsorContentUnit( {
      sponsorAddress: fromPublicKey,
      uri: uri,
      transactionHash: transactionHash
    });

    const transactionObj = new PubliqTransaction({
      creation: +now,
      expiry: +now_1h,
      fee: {
        whole: feeWhole,
        fraction: feeFraction
      },
      action: boostObj
    });

    const signature = keyPair.signMessage(JSON.stringify(transactionObj.toJson()));

    const publiqAuthority = new PubliqAuthority({
      address: fromPublicKey,
      signature: signature
    });

    const transactionSignedObj = new PubliqSignedTransaction({
      transactionDetails: transactionObj,
      authorizations: [publiqAuthority]
    });

    const transactionObjString = JSON.stringify(transactionSignedObj.toJson());
    const transactionHashSHA256 = SHA256(transactionObjString).toString();
    const transactionHashBASE58 = encode(CryptService.hexStringToByteArray(transactionHashSHA256));

    return {
      signature: signature,
      transactionHash: transactionHashBASE58
    };
  }

  amountStringToWholeFraction(amountString) {
    const fractionCoif = 100000000;
    const amountArr = ('' + amountString).split('.');
    const whole = amountArr[0] ? +amountArr[0] : 0;
    let fraction = 0;
    if (amountArr[1]) {
      const x = UtilsService.multFloats((+('0.' + amountArr[1])), fractionCoif);
      fraction = parseInt(x + '', 10);
    }

    return {
      whole,
      fraction
    };
  }

  getSignedData(brainKey: string, actionObj, feeWhole, feeFraction, currentTime) {
    let now = new Date();
    if (currentTime) {
      now = new Date(currentTime * 1000);
    }
    const now_1h = new Date(now.getTime() + (60 * 60 * 1000));
    const keyPair = new KeyPair(brainKey);
    const transactionObj = new PubliqTransaction({
      creation: +now,
      expiry: +now_1h,
      fee: {
        whole: feeWhole,
        fraction: feeFraction
      },
      action: actionObj
    });

    const signature = keyPair.signMessage(JSON.stringify(transactionObj.toJson()));

    const publiqAuthority = new PubliqAuthority({
      address: keyPair.PpublicKey,
      signature: signature
    });

    const transactionSignedObj = new PubliqSignedTransaction({
      transactionDetails: transactionObj,
      authorizations: [publiqAuthority]
    });

    const transactionObjString = JSON.stringify(transactionSignedObj.toJson());
    const transactionHashSHA256 = SHA256(transactionObjString).toString();
    const transactionHashBASE58 = encode(CryptService.hexStringToByteArray(transactionHashSHA256));

    return {
      signedJson: JSON.stringify(transactionObj.toJson()),
      signedString: signature,
      creation: Math.floor(now.getTime() / 1000),
      expiry: Math.floor(now_1h.getTime() / 1000),
      transactionHash: transactionHashBASE58
    };
  }

  // getSignetString(stringToSign, brainKey) {
  //   const now = new Date(new Date(stringToSign * 1000));
  //   const now_1h = new Date(now.getTime() + (1 * 60 * 1000));
  //   const keyPair = new KeyPair(brainKey);
  //   const transactionObj = new PubliqTransaction({
  //     creation: +now,
  //     expiry: +now_1h,
  //     fee: {
  //       whole: 0,
  //       fraction: 0
  //     },
  //     action: {}// transferObj,
  //   });
  //   const signedString = keyPair.signMessage(JSON.stringify(transactionObj.toJson()));
  //   return signedString;
  // }


  getSignedFile(brainKey: string, fileUri: string, feeWhole: number, feeFraction: number, currentTime: number) {
    const keyPair = new KeyPair(brainKey);
    const fileObj = new PubliqFile({
      uri: fileUri,
      authorAddresses: [keyPair.PpublicKey]
    });
    return this.getSignedData(brainKey, fileObj, feeWhole, feeFraction, currentTime);
  }

  getSignUnit(brainKey: string, contentUri: string, contentId: number, channelAddress: string, fileUris: Array<String>, feeWhole: number, feeFraction: number
              , currentTime: number) {
    const keyPair = new KeyPair(brainKey);
    const contentUnitObj = new PubliqContentUnit({
      uri: contentUri,
      contentId: contentId,
      authorAddresses: [keyPair.PpublicKey],
      channelAddress: channelAddress,
      fileUris: fileUris
    });
    return this.getSignedData(brainKey, contentUnitObj, feeWhole, feeFraction, currentTime);
  }

  checkPassword(brainKeyEncrypted: string, password: string): boolean {
    return KeyPair.decryptBrainKeyByPassword(brainKeyEncrypted, password).isValid;
  }

  getDecryptedBrainKey(brainKeyEncrypted: string, password: string) {
    return KeyPair.decryptBrainKeyByPassword(brainKeyEncrypted, password).brainKey;
  }

  getPrivateKey(brainKey: string): string {
    const keyPair = new KeyPair(brainKey);
    return keyPair.Private.Base58;
  }
}
