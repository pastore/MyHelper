import { NgModule } from '@angular/core';
import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '../shared/modules/shared.module';
import {NgxWigModule} from 'ngx-wig';

import { SystemComponent } from './system.component';
import { NotesPageComponent } from './notes/notes-page.component';
import { SystemSidebarComponent } from './shared/components/system-sidebar/system-sidebar.component';
import { SystemHeaderComponent } from './shared/components/system-header/system-header.component';
import { WrapperFilterComponent } from './shared/components/wrapper-filter/wrapper-filter.component';
import { DatetimeFilterComponent } from './shared/components/filter-items/datetime-filter/datetime-filter.component';
import { TagsFilterComponent } from './shared/components/filter-items/tags-filter/tags-filter.component';
import { NoteCardComponent } from './notes/shared/note-card/note-card.component';
import { NoteDetailsComponent } from './notes/shared/note-details/note-details.component';
import { SearchFilterComponent } from './shared/components/filter-items/search-filter/search-filter.component';
import { NoteDeleteModalComponent } from './notes/shared/note-delete-modal/note-delete-modal.component';

@NgModule({
  imports: [
    SharedModule,
    SystemRoutingModule,
    NgxWigModule
  ],
  declarations: [
    SystemComponent,
    SystemSidebarComponent,
    SystemHeaderComponent,
    NotesPageComponent,
    WrapperFilterComponent,
    DatetimeFilterComponent,
    TagsFilterComponent,
    NoteCardComponent,
    NoteDetailsComponent,
    SearchFilterComponent,
    NoteDeleteModalComponent
  ],
  entryComponents: [NoteDeleteModalComponent]
})
export class SystemModule { }
