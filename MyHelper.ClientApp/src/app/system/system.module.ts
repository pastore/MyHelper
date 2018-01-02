import { NgModule } from '@angular/core';
import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '../shared/modules/shared.module';

import { SystemComponent } from './system.component';
import { NotesComponent } from './notes/notes.component';

@NgModule({
  imports: [SharedModule, SystemRoutingModule],
  declarations: [SystemComponent, NotesComponent]
})
export class SystemModule { }
