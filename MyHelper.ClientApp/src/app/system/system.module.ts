import { NgModule } from '@angular/core';
import { SystemRoutingModule } from './system-routing.module';
import { CoreModule } from '../shared/modules/core.module';
import { NotesModule } from './notes/notes.module';
import { TasksModule } from './tasks/tasks.module';

import { SystemComponent } from './system.component';
import { SystemSidebarComponent } from './shared/components/system-sidebar/system-sidebar.component';
import { SystemHeaderComponent } from './shared/components/system-header/system-header.component';
import { CardsDeleteModalComponent } from './shared/components/cards-delete-modal/cards-delete-modal.component';

@NgModule({
  imports: [
    CoreModule,
    NotesModule,
    TasksModule,
    SystemRoutingModule
  ],
  declarations: [
    SystemComponent,
    SystemSidebarComponent,
    SystemHeaderComponent,
    CardsDeleteModalComponent
  ],
  entryComponents: [CardsDeleteModalComponent]
})
export class SystemModule { }
