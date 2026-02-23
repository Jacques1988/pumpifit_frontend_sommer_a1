import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { MemberService } from '../../member-service';

interface MemberFormData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  age: string;
}

@Component({
  selector: 'app-member-detail-component',
  imports: [RouterLink],
  templateUrl: './member-detail-component.html',
  styleUrl: './member-detail-component.css',
})
export class MemberDetailComponent {
  route = inject(ActivatedRoute);
  memberId = toSignal<string | null | undefined>(
    this.route.paramMap.pipe(map((params) => params.get('id'))),
  );
  memberService = inject(MemberService);
  member = this.memberService.getMemberById(this.memberId()!);
  memberFormModel = signal<MemberFormData>({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    age: '',
  });
}
