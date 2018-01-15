import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/services/authentication.guard';

import { SystemComponent } from './system.component';
import { NotesPageComponent } from './notes/notes-page.component';

const routes: Routes = [
  { path: '', component: SystemComponent, canActivate: [AuthGuard],
      children: [
        {path: 'notes', component: NotesPageComponent}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemRoutingModule { }

