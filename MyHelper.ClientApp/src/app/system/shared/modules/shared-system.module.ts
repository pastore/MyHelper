import { NgModule } from '@angular/core';
import { CoreModule } from '../../../shared/modules/core.module';
import { CardsTopScrollComponent } from '../components/cards-top-scroll/cards-top-scroll.component';

@NgModule({
  imports: [
    CoreModule
  ],
  declarations: [
    CardsTopScrollComponent
  ],
  exports: [
    CardsTopScrollComponent
  ]
})
export class SharedSystemModule { }
