import { NgModule, ModuleWithProviders } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { AuthGuard } from '../services/authentication.guard';
import { NoteService } from '../services/note.service';

@NgModule({})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                AuthenticationService,
                AuthGuard,
                NoteService
            ]
        };
    }
}
