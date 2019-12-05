import { Observable } from 'rxjs';
import { HttpHelperService } from './http-helper.service';
export declare class OauthService {
    private httpHelper;
    static DATA_RANG: number;
    brainKey: string;
    private url;
    private randomKey;
    brainKeySaved: boolean;
    brainKeySeen: boolean;
    privateKeySaved: boolean;
    constructor(httpHelper: HttpHelperService, url: string);
    private static getSignetString;
    signupConfirmation(code: string): Observable<{
        stringToSign: number;
    }>;
    signupComplete(stringToSign: any, code: any, password: any): Observable<any>;
    signinCheckCode(code: string): Observable<any>;
    authenticate(email: string, observeResponse?: boolean, relativeRoute?: string): Observable<any>;
    signinGetToken(encryptedBrainKey: any, stringToSign: any, code: any, password: any): Observable<any>;
    recoverAuthenticate(brainKey: string): Observable<{
        stringToSign: any;
    }>;
    recoverComplete(brainKey: string, stringToSign: number, password: string): Observable<any>;
    getSignedData(brainKey: string, actionObj: any): {
        signedJson: string;
        signedString: any;
        creation: number;
        expiry: number;
    };
    getSignedEmptyObject(brainKey: string): {
        publicKey: any;
        signedString: any;
        creationDate: number;
    };
    setBrainKeySeen(brainKey: string): Observable<any>;
    setBrainKeySaved(brainKey: string): Observable<any>;
    setPrivateKeySaved(brainKey: string): Observable<any>;
    generateRandomKey(): void;
}
