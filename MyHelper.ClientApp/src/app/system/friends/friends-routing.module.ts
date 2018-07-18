import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FriendsPageComponent } from './friends-page.component';
import { MyFriendsComponent } from './my/my-friends.component';
import { RequestsFriendsComponent } from './requests/requests-friends.component';
import { SearchFriendsComponent } from './search/search-friends.component';

const routes: Routes = [
  { path: '', component: FriendsPageComponent,
    children: [
      {path: '', redirectTo: 'my', pathMatch: 'full'},
      {path: 'my', component: MyFriendsComponent},
      {path: 'requests', component: RequestsFriendsComponent},
      {path: 'search', component: SearchFriendsComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendsRoutingModule { }
