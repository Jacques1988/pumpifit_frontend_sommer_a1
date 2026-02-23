import { Component, inject, input } from '@angular/core';
import { Member } from '../../shared/models/member';
import { MemberService } from '../../member-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-members-list',
  imports: [RouterLink],
  templateUrl: './members-list.html',
  styleUrl: './members-list.css',
})
export class MembersList {
  member = input.required<Member>();
  memberService = inject(MemberService);

  onDelete(id: number) {
    this.memberService.deleteMember(id).subscribe({
      next: () => this.memberService.allMembers.reload(),
      error: (err) => console.warn(err),
    });
  }
}
