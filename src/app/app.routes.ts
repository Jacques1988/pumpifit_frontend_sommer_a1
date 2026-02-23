import { Routes } from '@angular/router';
import { MembersComponent } from './members-component/members-component';
import { MemberDetailComponent } from './members-component/member-detail-component/member-detail-component';

export const routes: Routes = [
  { path: '', component: MembersComponent },
  { path: 'details/:id', component: MemberDetailComponent },
];
