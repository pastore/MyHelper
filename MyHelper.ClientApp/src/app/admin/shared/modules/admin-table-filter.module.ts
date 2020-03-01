import { NgModule } from '@angular/core';
import { CoreModule } from '../../../shared/modules/core.module';
import { AdminTableSearchComponent } from '../components/admin-table-search/admin-table-search.component';

@NgModule({
  imports: [
    CoreModule
  ],
  declarations: [
    AdminTableSearchComponent
  ],
  exports: [
    AdminTableSearchComponent
  ]
})
export class AdminTableFilterModule { }
