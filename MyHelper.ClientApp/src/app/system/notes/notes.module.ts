import { NgModule } from '@angular/core';
import { NgxWigModule } from 'ngx-wig';
import { CoreModule } from '../../shared/modules/core.module';
import { CardFilterModule } from '../shared/modules/card-filter.module';
import { SharedSystemModule } from '../shared/modules/shared-system.module';
import { NotesPageComponent } from './notes-page.component';
import { NoteCardComponent } from './shared/note-card/note-card.component';
import { NoteEditCardComponent } from './shared/note-edit-card/note-edit-card.component';

@NgModule({
  imports: [
    NgxWigModule,
    CoreModule,
    CardFilterModule,
    SharedSystemModule
  ],
  declarations: [
    NotesPageComponent,
    NoteCardComponent,
    NoteEditCardComponent
  ]
})
export class NotesModule { }
