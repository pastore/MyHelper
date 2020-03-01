import { NgModule } from '@angular/core';
import { CoreModule } from '../../shared/modules/core.module';
import { AdminTableFilterModule } from '../shared/modules/admin-table-filter.module';
import { TagsDetailsComponent } from './shared/tags-dialog/tags-dialog.component';
import { TagsPageComponent } from './tags-page.component';

@NgModule({
  imports: [
    CoreModule,
    AdminTableFilterModule
  ],
  declarations: [
    TagsPageComponent,
    TagsDetailsComponent
  ],
  entryComponents: [TagsDetailsComponent]
})

export class TagsModule { }
