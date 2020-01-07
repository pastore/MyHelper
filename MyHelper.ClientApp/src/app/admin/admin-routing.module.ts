import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { TagsPageComponent } from './tags-page/tags-page.component';


const routes: Routes = [
  { path: '', component: AdminComponent,
      children: [
        {path: '', redirectTo: '/admin/tags', pathMatch: 'full'},
        {path: 'tags', component: TagsPageComponent},
        {path: 'users', component: TagsPageComponent} // temp stub
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }

