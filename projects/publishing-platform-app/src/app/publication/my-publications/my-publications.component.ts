import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, ParamMap, Router, RouterEvent } from '@angular/router';
import { PublicationService } from '../../core/services/publication.service';
import { AccountService } from '../../core/services/account.service';

import { Publication } from '../../core/services/models/publication';
import { Publications } from '../../core/services/models/publications';

import { ReplaySubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-my-publications',
  templateUrl: './my-publications.component.html',
  styleUrls: ['./my-publications.component.scss']
})
export class MyPublicationsComponent implements OnInit, OnDestroy {
  public publications: Publication[];
  public myPublications: Publication[];
  public membership: Publication[];
  public invitations: Publication[];
  public requests: Publication[];
  public subscriptions = [];
  @Input() showCustomModal: boolean = false;
  showModalType = 'invitation';

  private unsubscribe$ = new ReplaySubject<void>(1);

  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    public publicationService: PublicationService,
    public translateService: TranslateService
  ) {

  }

  set PublicationsData(data: Publications) {
    this.myPublications = data.owned;
    this.membership = data.membership;
    this.invitations = data.invitations;
    this.requests = data.requests;
    this.publications = this.myPublications.concat(this.membership);
    this.publications = this.publications.map((el: any) => {
      el.membersList = el.members;
      return el;
    });
  }

  ngOnInit() {
    this.openInvitations();
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.openInvitations();
    });
    this.getMyPublications();
    this.getMySubscriptions();
  }

  private openInvitations = () => {
    const openInvitations = this.activeRoute.snapshot.paramMap.get('openInvitations');
    if (openInvitations === 'true') { this.openPublicationModal(true, 'invitation'); }
  }

  openPublicationModal(flag: boolean, type: string = null) {
    this.showCustomModal = flag;
    this.showModalType = type;
  }

  getMyPublications() {
    this.publicationService.getMyPublications()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((data: Publications) => {
        this.PublicationsData = data;
      });
  }

  getMySubscriptions() {
    this.publicationService.getUserSubscriptions()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((data: Publications[]) => {
        this.subscriptions = data;
      });
  }

  unfollow(publication, index) {
    this.publicationService.unfollow(publication.slug).pipe(
      takeUntil(this.unsubscribe$)
    )
      .subscribe(
        () => {
          this.subscriptions.splice(index, 1);
        }
      );
  }

  changeRoute(url) {
    this.router.navigateByUrl(url);
  }

  memberClick(event) {
    if (event && event.publicKey) {
      this.router.navigate([`/a/${event.publicKey}`]);
    }
  }

  ngOnDestroy() {

  }
}
