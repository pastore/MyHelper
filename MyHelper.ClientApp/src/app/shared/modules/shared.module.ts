import { NgModule, ModuleWithProviders } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { AuthGuard } from '../services/authentication.guard';
import { NoteService } from '../services/note.service';
import { TagService } from '../services/tag.service';
import { TaskService } from '../services/task.service';
import { LoaderService } from '../loader/loader.service';

@NgModule({
  declarations: []
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
              AuthenticationService,
              AuthGuard,
              LoaderService,
              NoteService,
              TaskService,
              TagService
            ]
        };
    }
}
