import { NgModule } from '@angular/core';
import { CoreModule } from '../../../shared/modules/core.module';

import { WrapperFilterComponent } from '../components/card-filters/wrapper-filter/wrapper-filter.component';
import { DatetimeFilterComponent } from '../components/card-filters/datetime-filter/datetime-filter.component';
import { TagsFilterComponent } from '../components/card-filters/tags-filter/tags-filter.component';
import { SearchFilterComponent } from '../components/card-filters/search-filter/search-filter.component';

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
