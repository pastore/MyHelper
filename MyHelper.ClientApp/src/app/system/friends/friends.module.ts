import { NgModule } from '@angular/core';
import { CoreModule } from '../../shared/modules/core.module';
import { FriendSearchService } from '../../shared/services/friend-search.service';
import { CardFilterModule } from '../shared/modules/card-filter.module';
import { SharedSystemModule } from '../shared/modules/shared-system.module';
import { FriendsPageComponent } from './friends-page.component';
import { FriendsRoutingModule } from './friends-routing.module';
import { MyFriendsComponent } from './my/my-friends.component';
import { RequestsFriendsComponent } from './requests/requests-friends.component';
import { SearchFriendsComponent } from './search/search-friends.component';
import { PersonCardComponent } from './shared/person/person-card.component';

@NgModule({
  imports: [
    CoreModule,
    CardFilterModule,
    FriendsRoutingModule,
    SharedSystemModule
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
