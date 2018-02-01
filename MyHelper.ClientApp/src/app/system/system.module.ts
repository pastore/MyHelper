import { NgModule } from '@angular/core';
import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '../shared/modules/shared.module';

import { SystemComponent } from './system.component';
import { NotesPageComponent } from './notes/notes-page.component';
import { SystemSidebarComponent } from './shared/components/system-sidebar/system-sidebar.component';
import { SystemHeaderComponent } from './shared/components/system-header/system-header.component';
import { WrapperFilterComponent } from './shared/components/wrapper-filter/wrapper-filter.component';
import { DatetimeFilterComponent } from './shared/components/filter-items/datetime-filter/datetime-filter.component';
import { AutocompleteFilterComponent } from './shared/components/filter-items/autocomplete-filter/autocomplete-filter.component';
import { NoteCardComponent } from './notes/shared/note-card/note-card.component';
import { NoteDetailsComponent } from './notes/shared/note-details/note-details.component';
import { SearchFilterComponent } from './shared/components/filter-items/search-filter/search-filter.component';

@NgModule({
  imports: [SharedModule, SystemRoutingModule],
  declarations: [
    SystemComponent,
    SystemSidebarComponent,
    SystemHeaderComponent,
    NotesPageComponent,
    WrapperFilterComponent,
    DatetimeFilterComponent,
    AutocompleteFilterComponent,
    NoteCardComponent,
    NoteDetailsComponent,
    SearchFilterComponent
  ]
})
export class SystemModule { }
