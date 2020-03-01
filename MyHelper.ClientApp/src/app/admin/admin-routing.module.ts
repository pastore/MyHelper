import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/services/authentication.guard';
import { UserRole } from '../shared/utilities/enums';
import { AdminComponent } from './admin.component';
import { TagsPageComponent } from './tags-page/tags-page.component';
import { UsersPageComponent } from './users-page/users-page.component';

const routes: Routes = [
  { path: '', component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRole.Admin] },
    children: [
      { path: '', redirectTo: 'tags', pathMatch: 'full' },
      { path: 'tags', component: TagsPageComponent },
      { path: 'users', component: UsersPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }

