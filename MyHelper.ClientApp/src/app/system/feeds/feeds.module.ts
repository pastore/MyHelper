import { NgModule } from '@angular/core';
import { CoreModule } from '../../shared/modules/core.module';
import { SharedSystemModule } from '../shared/modules/shared-system.module';
import { FeedsPageComponent } from './feeds-page.component';
import { FeedCardComponent } from './shared/feed-card.component';

@NgModule({
  imports: [
    CoreModule,
    SharedSystemModule
  ],
  exports: [],
  declarations: [FeedsPageComponent, FeedCardComponent],
  providers: [],
})
export class FeedsModule { }
