import { NgModule } from '@angular/core';
import { CoreModule } from '../../shared/modules/core.module';
import { MhMaterialModule } from '../../shared/modules/mh-material.module';
import { TagService } from '../../shared/services/tag.service';
import { TagsDetailsComponent } from './shared/tags-details/tags-details.component';
import { TagsPageComponent } from './tags-page.component';

@NgModule({
  imports: [
    CoreModule,
    MhMaterialModule
  ],
  exports: [],
  declarations: [TagsPageComponent,  TagsDetailsComponent],
  entryComponents: [TagsDetailsComponent],
  providers: [TagService],
})

export class TagsModule { }
