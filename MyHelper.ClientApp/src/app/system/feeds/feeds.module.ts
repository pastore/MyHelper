import { NgModule } from '@angular/core';
import { CoreModule } from '../../shared/modules/core.module';
import { CardFilterModule } from '../shared/modules/card-filter.module';
import { SharedSystemModule } from '../shared/modules/shared-system.module';
import { FeedsPageComponent } from './feeds-page.component';
import { FeedCardComponent } from './shared/feed-card.component';

@NgModule({
  imports: [
    CoreModule,
    SharedSystemModule,
    CardFilterModule
  ],
  exports: [],
  declarations: [FeedsPageComponent, FeedCardComponent],
  providers: [],
})
export class FeedsModule { }
