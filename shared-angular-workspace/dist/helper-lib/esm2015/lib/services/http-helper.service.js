/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
/** @enum {string} */
const HttpMethodTypes = {
    get: 'get',
    post: 'post',
    put: 'put',
    delete: 'delete',
};
export { HttpMethodTypes };
export class HttpHelperService {
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
/** @nocollapse */ HttpHelperService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function HttpHelperService_Factory() { return new HttpHelperService(i0.ɵɵinject(i1.HttpClient)); }, token: HttpHelperService, providedIn: "root" });
if (false) {
    /** @type {?} */
    HttpHelperService.baseHeaders;
    /**
     * @type {?}
     * @private
     */
    HttpHelperService.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1oZWxwZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2hlbHBlci1saWIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvaHR0cC1oZWxwZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7OztJQUk3RCxLQUFNLEtBQUs7SUFDWCxNQUFPLE1BQU07SUFDYixLQUFNLEtBQUs7SUFDWCxRQUFTLFFBQVE7OztBQU1uQixNQUFNLE9BQU8saUJBQWlCOzs7O0lBUTVCLFlBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7SUFDcEMsQ0FBQzs7Ozs7SUFMRCxNQUFNLENBQUMsY0FBYyxDQUFDLGFBQW9FO1FBQ3hGLGlCQUFpQixDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUM7SUFDaEQsQ0FBQzs7Ozs7Ozs7O0lBS00sVUFBVSxDQUNmLE1BQXVCLEVBQ3ZCLEdBQVcsRUFDWCxJQUFhLEVBQ2IsT0FBMEMsRUFDMUMsa0JBQTJCLEtBQUs7UUFFaEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkUsQ0FBQzs7Ozs7Ozs7OztJQUVNLElBQUksQ0FDVCxNQUF1QixFQUN2QixHQUFXLEVBQ1gsSUFBYSxFQUNiLE9BQTBDLEVBQzFDLGtCQUEyQixLQUFLLEVBQ2hDLGlCQUEwQixJQUFJOztjQUV4QixRQUFRLEdBQUcsRUFBRTtRQUVuQixJQUFJLGNBQWMsSUFBSSxpQkFBaUIsQ0FBQyxXQUFXLEVBQUU7WUFDbkQsaUJBQWlCLENBQUMsV0FBVyxDQUFDLE9BQU87Ozs7WUFBQyxZQUFZLENBQUMsRUFBRTtnQkFDbkQsSUFBSSxZQUFZLENBQUMsY0FBYyxFQUFFLEVBQUU7b0JBQ2pDLFFBQVEsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDO2lCQUNsRTtZQUNILENBQUMsRUFBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLE9BQU8sRUFBRTtZQUNYLE9BQU8sQ0FBQyxPQUFPOzs7O1lBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQzdCLElBQUksWUFBWSxDQUFDLEtBQUssRUFBRTtvQkFDdEIsUUFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO2lCQUNqRDtZQUNILENBQUMsRUFBQyxDQUFDO1NBQ0o7O2NBRUssT0FBTyxHQUFHLEVBQUU7UUFDbEIsSUFBSSxRQUFRLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUU7O2tCQUN0QyxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDO1lBQzdDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxXQUFXLENBQUM7U0FDbEM7UUFFRCxJQUFJLGVBQWUsRUFBRTtZQUNuQixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsVUFBVSxDQUFDO1NBQ2pDO1FBRUQsSUFBSSxNQUFNLEtBQUssZUFBZSxDQUFDLEdBQUcsSUFBSSxNQUFNLEtBQUssZUFBZSxDQUFDLE1BQU0sRUFBRTtZQUN2RSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3hDO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztTQUM5QztJQUNILENBQUM7O0FBNURNLDZCQUFXLEdBQUcsRUFBRSxDQUFDOztZQUx6QixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFaUSxVQUFVOzs7OztJQWVqQiw4QkFBd0I7Ozs7O0lBTVosaUNBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBlbnVtIEh0dHBNZXRob2RUeXBlcyB7XG4gIGdldCA9ICdnZXQnLFxuICBwb3N0ID0gJ3Bvc3QnLFxuICBwdXQgPSAncHV0JyxcbiAgZGVsZXRlID0gJ2RlbGV0ZSdcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgSHR0cEhlbHBlclNlcnZpY2Uge1xuXG4gIHN0YXRpYyBiYXNlSGVhZGVycyA9IFtdO1xuXG4gIHN0YXRpYyBzZXRCYXNlSGVhZGVycyhoZWFkZXJDb25maWdzOiB7IGhlYWRlcktheTogc3RyaW5nLCBnZXRIZWFkZXJWYWx1ZTogKCkgPT4gc3RyaW5nIH1bXSkge1xuICAgIEh0dHBIZWxwZXJTZXJ2aWNlLmJhc2VIZWFkZXJzID0gaGVhZGVyQ29uZmlncztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICB9XG5cbiAgcHVibGljIGN1c3RvbUNhbGwoXG4gICAgbWV0aG9kOiBIdHRwTWV0aG9kVHlwZXMsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgZGF0YT86IG9iamVjdCxcbiAgICBoZWFkZXJzPzogeyBrZXk6IHN0cmluZzsgdmFsdWU6IHN0cmluZyB9W10sXG4gICAgb2JzZXJ2ZVJlc3BvbnNlOiBib29sZWFuID0gZmFsc2VcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FsbChtZXRob2QsIHVybCwgZGF0YSwgaGVhZGVycywgb2JzZXJ2ZVJlc3BvbnNlLCBmYWxzZSk7XG4gIH1cblxuICBwdWJsaWMgY2FsbChcbiAgICBtZXRob2Q6IEh0dHBNZXRob2RUeXBlcyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICBkYXRhPzogb2JqZWN0LFxuICAgIGhlYWRlcnM/OiB7IGtleTogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH1bXSxcbiAgICBvYnNlcnZlUmVzcG9uc2U6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICB1c2VCYXNlSGVhZGVyczogYm9vbGVhbiA9IHRydWVcbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCBfaGVhZGVycyA9IHt9O1xuXG4gICAgaWYgKHVzZUJhc2VIZWFkZXJzICYmIEh0dHBIZWxwZXJTZXJ2aWNlLmJhc2VIZWFkZXJzKSB7XG4gICAgICBIdHRwSGVscGVyU2VydmljZS5iYXNlSGVhZGVycy5mb3JFYWNoKGhlYWRlckNvbmZpZyA9PiB7XG4gICAgICAgIGlmIChoZWFkZXJDb25maWcuZ2V0SGVhZGVyVmFsdWUoKSkge1xuICAgICAgICAgIF9oZWFkZXJzW2hlYWRlckNvbmZpZy5oZWFkZXJLYXldID0gaGVhZGVyQ29uZmlnLmdldEhlYWRlclZhbHVlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChoZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzLmZvckVhY2goaGVhZGVyQ29uZmlnID0+IHtcbiAgICAgICAgaWYgKGhlYWRlckNvbmZpZy52YWx1ZSkge1xuICAgICAgICAgIF9oZWFkZXJzW2hlYWRlckNvbmZpZy5rZXldID0gaGVhZGVyQ29uZmlnLnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBvcHRpb25zID0ge307XG4gICAgaWYgKF9oZWFkZXJzICYmIE9iamVjdC5rZXlzKF9oZWFkZXJzKS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGhlYWRlcnNEYXRhID0gbmV3IEh0dHBIZWFkZXJzKF9oZWFkZXJzKTtcbiAgICAgIG9wdGlvbnNbJ2hlYWRlcnMnXSA9IGhlYWRlcnNEYXRhO1xuICAgIH1cblxuICAgIGlmIChvYnNlcnZlUmVzcG9uc2UpIHtcbiAgICAgIG9wdGlvbnNbJ29ic2VydmUnXSA9ICdyZXNwb25zZSc7XG4gICAgfVxuXG4gICAgaWYgKG1ldGhvZCA9PT0gSHR0cE1ldGhvZFR5cGVzLmdldCB8fCBtZXRob2QgPT09IEh0dHBNZXRob2RUeXBlcy5kZWxldGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBbbWV0aG9kXSh1cmwsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwW21ldGhvZF0odXJsLCBkYXRhLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==