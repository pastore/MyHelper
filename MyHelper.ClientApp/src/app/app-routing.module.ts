import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

const routes: Routes = [
  { 
    path: '', redirectTo: 'feeds', pathMatch: 'full' 
  },
  {
    path: 'admin', loadChildren: './admin/admin.module#AdminModule'
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule],
})
export class AppRoutingModule { }

