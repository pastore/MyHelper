import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/services/authentication.guard';

import { SystemComponent } from './system.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  { path: '', component: SystemComponent, canActivate: [AuthGuard],
      children: [
        {path: 'notes', component: NotesComponent}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemRoutingModule { }

