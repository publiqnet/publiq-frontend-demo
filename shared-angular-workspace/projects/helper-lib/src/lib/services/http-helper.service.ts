import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum HttpMethodTypes {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete'
}

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  static baseHeaders = [];

  static setBaseHeaders(headerConfigs: { headerKay: string, getHeaderValue: () => string }[]) {
    HttpHelperService.baseHeaders = headerConfigs;
  }

  constructor(private http: HttpClient) {
  }

  public customCall(
    method: HttpMethodTypes,
    url: string,
    data?: object,
    headers?: { key: string; value: string }[],
    observeResponse: boolean = false
  ) {
    return this.call(method, url, data, headers, observeResponse, false);
  }

  public call(
    method: HttpMethodTypes,
    url: string,
    data?: object,
    headers?: { key: string; value: string }[],
    observeResponse: boolean = false,
    useBaseHeaders: boolean = true
  ): Observable<any> {
    const _headers = {};

    if (useBaseHeaders && HttpHelperService.baseHeaders) {
      HttpHelperService.baseHeaders.forEach(headerConfig => {
        if (headerConfig.getHeaderValue()) {
          _headers[headerConfig.headerKay] = headerConfig.getHeaderValue();
        }
      });
    }

    if (headers) {
      headers.forEach(headerConfig => {
        if (headerConfig.value) {
          _headers[headerConfig.key] = headerConfig.value;
        }
      });
    }

    const options = {};
    if (_headers && Object.keys(_headers).length) {
      const headersData = new HttpHeaders(_headers);
      options['headers'] = headersData;
    }

    if (observeResponse) {
      options['observe'] = 'response';
    }

    if (method === HttpMethodTypes.get || method === HttpMethodTypes.delete) {
      return this.http[method](url, options);
    } else {
      return this.http[method](url, data, options);
    }
  }
}
