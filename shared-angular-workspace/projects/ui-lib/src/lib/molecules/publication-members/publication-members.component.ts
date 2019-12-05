import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Avatar } from '../../../core/models/avatar';

@Component({
  selector: 'ui-publication-members',
  templateUrl: './publication-members.component.html',
  styleUrls: ['./publication-members.component.scss'],
})

export class PublicationMembersComponent implements OnInit {
  @Input() membersData: Avatar[] = null;
  @Input() className: string = '';
  @Input() iconClassName: string = '';
  @Output() getMember = new EventEmitter<any>();

  ngOnInit(): void {
    this.getMembersInfo() ;
  }

  getMembersInfo () {
    if (this.membersData && this.membersData.length) {
      this.membersData.map((data: any) => data = new Avatar(data));
    }
  }

  getMemberData(member) {
    this.getMember.emit(member);
  }

}
