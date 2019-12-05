import { Observable } from 'rxjs';
export declare class HttpObserverService {
    constructor();
    observerCall(name: string, request: any, refresh?: boolean): Observable<any>;
}
