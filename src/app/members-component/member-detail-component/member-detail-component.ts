import { Component, inject, signal, effect } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { MemberService } from '../../member-service';
import { form, FormField, submit } from '@angular/forms/signals';
import { MemberFormData } from '../../shared/models/member';

@Component({
  selector: 'app-member-detail-component',
  imports: [RouterLink, FormField],
  templateUrl: './member-detail-component.html',
  styleUrl: './member-detail-component.css',
})
export class MemberDetailComponent {
  router = inject(Router);
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
  memberForm = form(this.memberFormModel);

  constructor() {
    effect(() => {
      if (this.member.hasValue()) {
        this.memberFormModel.set({
          id: this.member.value()!.id.toString(),
          first_name: this.member.value()!.first_name,
          last_name: this.member.value()!.last_name,
          email: this.member.value()!.email,
          age: this.member.value()!.age.toString(),
        });
      }
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.memberForm, async () => {
      this.memberService.updateMember(this.memberFormModel()).subscribe({
        next: () => {
          this.memberService.allMembers.reload();
          this.router.navigate(['']);
        },
        error: (err) => console.warn(err),
      });
    });
  }
}
