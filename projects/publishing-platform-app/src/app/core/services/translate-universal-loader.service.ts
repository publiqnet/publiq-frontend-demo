import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export class TranslationLoader implements TranslateLoader {
  url = environment.backend + '/jsons/';

  constructor(private http: HttpClient) { }

  getTranslation(lang: string): Observable<any> {
    if (typeof window !== 'undefined') {
      lang = (localStorage && localStorage.getItem('lang')) ? localStorage.getItem('lang') : 'en';
    }

    return this.http.get(this.url +  lang + '.json');
  }
}
