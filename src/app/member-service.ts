import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Member } from './shared/models/member';
import { Observable } from 'rxjs';

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

  deleteMember(id: number): Observable<Member> {
    return this.httpClient.delete<Member>(`${this.membersAPIUrl}${id}`);
  }
}
