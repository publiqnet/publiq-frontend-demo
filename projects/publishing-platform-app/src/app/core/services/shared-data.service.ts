import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedDataService {
  public articleReadPercent = 0;
  public currentArticle = new BehaviorSubject<any>(null);
  public currentPublication = new BehaviorSubject<any>(null);
  public headerSecondActive = false;
  public headerArticleActive = false;
}
