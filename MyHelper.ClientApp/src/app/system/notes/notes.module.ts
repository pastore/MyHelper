import { NgModule } from '@angular/core';
import { NgxWigModule } from 'ngx-wig';
import { CoreModule } from '../../shared/modules/core.module';
import { CardFilterModule } from '../shared/modules/card-filter.module';

import { NotesPageComponent } from './notes-page.component';
import { NoteCardComponent } from './shared/note-card/note-card.component';
import { NoteDetailsComponent } from './shared/note-details/note-details.component';
import { NoteDeleteModalComponent } from './shared/note-delete-modal/note-delete-modal.component';

@NgModule({
  imports: [
    NgxWigModule,
    CoreModule,
    CardFilterModule
  ],
  declarations: [
    NotesPageComponent,
    NoteCardComponent,
    NoteDetailsComponent,
    NoteDeleteModalComponent
  ],
  entryComponents: [NoteDeleteModalComponent]
})
export class NotesModule { }
