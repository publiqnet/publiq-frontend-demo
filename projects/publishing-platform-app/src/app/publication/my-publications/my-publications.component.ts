import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicationService } from '../../core/services/publication.service';
import { Publication } from '../../core/services/models/publication';
import { Publications } from '../../core/services/models/publications';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { NotificationListener } from '../../core/services/notificationListener';
import { UiNotificationService } from '../../core/services/ui-notification.service';
import { Author } from '../../core/services/models/author';

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
  public invitationsCount: number = 0;
  @Input() showCustomModal: boolean = false;
  showModalType = 'invitation';

  private unsubscribe$ = new ReplaySubject<void>(1);

  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    public publicationService: PublicationService,
    public translateService: TranslateService,
    private uiNotificationService: UiNotificationService
  ) {

  }

  set PublicationsData(data: Publications) {
    this.myPublications = data.owned;
    this.membership = data.membership;
    this.invitations = data.invitations;
    this.invitationsCount = this.invitations && this.invitations.length;
    this.requests = data.requests;
    this.publications = this.myPublications.concat(this.membership);
    this.publications = this.publications.map((el: any) => {
      el.membersList = el.members;
      return el;
    });
  }

  ngOnInit() {
    this.getMyPublications();
    this.getMySubscriptions();
    this.initDataChangeListner();
  }

  openPublicationModal(flag: boolean, type: string = null) {
    this.showCustomModal = flag;
    this.showModalType = type;
  }

  closeModal(invitationsCount?: number) {
    this.showCustomModal = false;
    this.invitationsCount = invitationsCount;
  }

  getMyPublications() {
    this.publicationService.getMyPublications()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Publications) => {
        this.PublicationsData = data;
      });
  }

  getMySubscriptions() {
    this.publicationService.getUserSubscriptions()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Publications[]) => {
        this.subscriptions = data;
      });
  }

  unfollow(publication, index) {
    this.publicationService.unfollow(publication.slug).pipe(takeUntil(this.unsubscribe$))
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

  private initDataChangeListner() {
    this.uiNotificationService.notificationsListenerDataChanged
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((listenerData: NotificationListener[]) => {
        if (!(listenerData && listenerData.length)) { return; }
        listenerData.filter(listener => listener.type === 'publication_invitation_new' || listener.type === 'publication_invitation_cancelled')
          .forEach(listener => {
            switch (listener.type) {
              case 'publication_invitation_new' :
                this.invitationsCount += 1;
                this.invitations.push({...listener.data.publication, inviter: new Author(listener.data.performer)});
                break;
              case 'publication_invitation_cancelled' :
                this.invitationsCount -= 1;
                const index = this.invitations.findIndex((invitation) => invitation.slug === listener.data.publication.slug);
                this.invitations.splice(index, 1);
                break;
            }
          });
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
