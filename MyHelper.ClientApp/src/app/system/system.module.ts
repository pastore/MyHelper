import { NgModule } from '@angular/core';
import { SystemRoutingModule } from './system-routing.module';
import { CoreModule } from '../shared/modules/core.module';
import { NotesModule } from './notes/notes.module';
import { MhTasksModule } from './mh-tasks/mh-tasks.module';

import { SystemComponent } from './system.component';
import { SystemSidebarComponent } from './shared/components/system-sidebar/system-sidebar.component';
import { SystemHeaderComponent } from './shared/components/system-header/system-header.component';

@NgModule({
  imports: [
    SystemRoutingModule,
    CoreModule,
    NotesModule,
    MhTasksModule
  ],
  declarations: [
    SystemComponent,
    SystemSidebarComponent,
    SystemHeaderComponent
  ]
})
export class SystemModule { }
