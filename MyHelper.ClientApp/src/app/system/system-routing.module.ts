import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/services/authentication.guard';

import { SystemComponent } from './system.component';
import { NotesPageComponent } from './notes/notes-page.component';
import { TasksPageComponent } from './tasks/tasks-page.component';
import { FeedsPageComponent } from './feeds/feeds-page.component';

export const friends = './friends/friends.module#FriendsModule';

const routes: Routes = [
  { path: '', component: SystemComponent, canActivate: [AuthGuard],
      children: [
        {path: 'feeds', component: FeedsPageComponent},
        {path: 'notes', component: NotesPageComponent},
        {path: 'tasks', component: TasksPageComponent},
        {path: 'friends', loadChildren: friends}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemRoutingModule { }

