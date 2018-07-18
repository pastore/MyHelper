import { NgModule } from '@angular/core';
import { FriendsRoutingModule } from './friends-routing.module';
import { CoreModule } from '../../shared/modules/core.module';
import { CardFilterModule } from '../shared/modules/card-filter.module';

import { FriendsPageComponent } from './friends-page.component';
import { MyFriendsComponent } from './my/my-friends.component';
import { SearchFriendsComponent } from './search/search-friends.component';
import { RequestsFriendsComponent } from './requests/requests-friends.component';
import { PersonCardComponent } from './shared/person/person-card.component';
import { FriendSearchService } from '../../shared/services/friend-search.service';

@NgModule({
  imports: [
    CoreModule,
    CardFilterModule,
    FriendsRoutingModule
  ],
  declarations: [
    FriendsPageComponent,
    MyFriendsComponent,
    SearchFriendsComponent,
    RequestsFriendsComponent,
    PersonCardComponent
  ],
  providers: [
    FriendSearchService
  ]
})
export class FriendsModule { }
