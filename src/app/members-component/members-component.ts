import { Component, inject } from '@angular/core';
import { MembersList } from './members-list/members-list';
import { MemberService } from '../member-service';
import { Member } from '../shared/models/member';

@Component({
  selector: 'app-members-component',
  imports: [MembersList],
  templateUrl: './members-component.html',
  styleUrl: './members-component.css',
})
export class MembersComponent {
  members = inject(MemberService).getAllMembers();
}
