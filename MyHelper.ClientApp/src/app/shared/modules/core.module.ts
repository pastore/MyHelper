import { NgModule, ModuleWithProviders } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { AuthGuard } from '../services/authentication.guard';
import { NoteService } from '../services/note.service';
import { TagService } from '../services/tag.service';

import { RequiredTagsDirective } from '../directives/require-tags.directive';

@NgModule({
  declarations: [RequiredTagsDirective]
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
              AuthenticationService,
              AuthGuard,
              NoteService,
              TagService
            ]
        };
    }
}
