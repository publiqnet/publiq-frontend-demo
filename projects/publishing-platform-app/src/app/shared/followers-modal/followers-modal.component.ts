import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { AccountService } from '../../core/services/account.service';
import { takeUntil } from 'rxjs/operators';
import { Account } from '../../core/services/models/account';

@Component({
  selector: 'app-followers-modal',
  templateUrl: './followers-modal.component.html',
  styleUrls: ['./followers-modal.component.scss']
})

export class FollowersModalComponent implements OnInit, OnChanges, OnDestroy {
  @Output() onCloseModal = new EventEmitter<boolean>();
  @Output() onSeeMore = new EventEmitter<any>();
  @Input() modalType: string;
  @Input() followersData: Account[];
  @Input() hasMore: boolean = false;
  @Input() followersCount: number;
  public seeMoreLoading: boolean = false;
  public blockInfiniteScroll: boolean = false;
  private unsubscribe$ = new ReplaySubject<void>(1);

  constructor(
    private router: Router,
    public accountService: AccountService
  ) {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.followersData.previousValue !== changes.followersData.currentValue) {
      this.seeMoreLoading = false;
      this.blockInfiniteScroll = false;
    }
  }

  closePopup() {
    this.onCloseModal.emit();
  }

  getUser(uri) {
    this.onCloseModal.emit();
    this.router.navigate([`/a/${uri}`]);
  }

  followUser(e) {
    const followType = e.subscribed ? this.accountService.unfollow(e.publicKey) : this.accountService.follow(e.publicKey);
    followType
    .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
      () => {
        e.subscribed = !e.subscribed;
      }
    );
  }

  seeMore() {
    if (!this.hasMore) { return; }
    this.seeMoreLoading = true;
    this.blockInfiniteScroll = true;
    this.onSeeMore.emit('see more');
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
