import { NgModule } from '@angular/core';

import { FeedsPageComponent } from './feeds-page.component';
import { CoreModule } from '../../shared/modules/core.module';
import { FeedCardComponent } from './shared/feed-card.component';

@NgModule({
  imports: [
    CoreModule
  ],
  exports: [],
  declarations: [FeedsPageComponent, FeedCardComponent],
  providers: [],
})
export class FeedsModule { }
