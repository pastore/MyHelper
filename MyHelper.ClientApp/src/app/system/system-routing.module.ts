import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/services/authentication.guard';
import { FeedsPageComponent } from './feeds/feeds-page.component';
import { NotesPageComponent } from './notes/notes-page.component';
import { SystemComponent } from './system.component';
import { TasksPageComponent } from './tasks/tasks-page.component';

const routes: Routes = [
  { path: '', component: SystemComponent, canActivate: [AuthGuard],
      children: [
        {path: 'feeds', component: FeedsPageComponent},
        {path: 'notes', component: NotesPageComponent},
        {path: 'tasks', component: TasksPageComponent},
        {path: 'friends',  loadChildren: () => import('./friends/friends.module').then(m => m.FriendsModule)}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemRoutingModule { }

