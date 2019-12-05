import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare enum HttpMethodTypes {
    get = "get",
    post = "post",
    put = "put",
    delete = "delete"
}
export declare class HttpHelperService {
    private http;
    static baseHeaders: any[];
    static setBaseHeaders(headerConfigs: {
        headerKay: string;
        getHeaderValue: () => string;
    }[]): void;
    constructor(http: HttpClient);
    customCall(method: HttpMethodTypes, url: string, data?: object, headers?: {
        key: string;
        value: string;
    }[], observeResponse?: boolean): Observable<any>;
    call(method: HttpMethodTypes, url: string, data?: object, headers?: {
        key: string;
        value: string;
    }[], observeResponse?: boolean, useBaseHeaders?: boolean): Observable<any>;
}
