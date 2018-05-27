import { NgModule } from '@angular/core';
import { CoreModule } from '../../../shared/modules/core.module';

import { WrapperFilterComponent } from '../components/cards-filters/wrapper-filter/wrapper-filter.component';
import { DatetimeFilterComponent } from '../components/cards-filters/datetime-filter/datetime-filter.component';
import { TagsFilterComponent } from '../components/cards-filters/tags-filter/tags-filter.component';
import { SearchFilterComponent } from '../components/cards-filters/search-filter/search-filter.component';

@NgModule({
  imports: [
    CoreModule
  ],
  declarations: [
    WrapperFilterComponent,
    DatetimeFilterComponent,
    TagsFilterComponent,
    SearchFilterComponent
  ],
  exports: [
    WrapperFilterComponent,
    DatetimeFilterComponent,
    TagsFilterComponent,
    SearchFilterComponent
  ]
})
export class CardFilterModule { }
