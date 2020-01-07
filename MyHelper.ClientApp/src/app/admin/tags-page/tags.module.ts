import { NgModule } from '@angular/core';
import { CoreModule } from '../../shared/modules/core.module';
import { TagsPageComponent } from './tags-page.component';
import { MhMaterialModule } from '../../shared/modules/mh-material.module';

@NgModule({
  imports: [
    CoreModule,
    MhMaterialModule
  ],
  exports: [],
  declarations: [TagsPageComponent],
  providers: [],
})
export class TagsModule { }