import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Member, MemberFormData } from './shared/models/member';
import { first, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  membersAPIUrl = environment.membersAPIUrl;
  allMembers = httpResource<Member[]>(() => this.membersAPIUrl);
  httpClient = inject(HttpClient);

  getAllMembers() {
    return this.allMembers;
  }

  getMemberById(id: string) {
    const memberId = +id;
    return httpResource<Member>(() => `${this.membersAPIUrl}${memberId}`);
  }

  updateMember(member: MemberFormData): Observable<Member> {
    console.log(member);
    const updatedMember = {
      id: +member.id,
      first_name: member.first_name,
      last_name: member.last_name,
      email: member.email,
      age: +member.age,
    };
    return this.httpClient.patch<Member>(
      `${this.membersAPIUrl}${updatedMember.id}`,
      updatedMember,
    );
  }

  deleteMember(id: number): Observable<Member> {
    return this.httpClient.delete<Member>(`${this.membersAPIUrl}${id}`);
  }
}
