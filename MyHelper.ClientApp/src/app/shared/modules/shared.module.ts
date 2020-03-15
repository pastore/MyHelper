import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ErrorHandlerInterceptor } from '../http-interceptors/error-handler.interceptor';
import { LoaderService } from '../loader/loader.service';
import { AccountService } from '../services/account.servise';
import { AppUserService } from '../services/app-user.service';
import { AuthGuard } from '../services/authentication.guard';
import { AuthenticationService } from '../services/authentication.service';
import { FeedService } from '../services/feed.service';
import { FriendService } from '../services/friend.service';
import { NoteService } from '../services/note.service';
import { TagService } from '../services/tag.service';
import { TaskService } from '../services/task.service';
import { SnackBarService } from '../snackbar/snackbar.service';

@NgModule({
  declarations: []
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [
              AuthenticationService,
              AccountService,
              AuthGuard,
              LoaderService,
              SnackBarService,
              NoteService,
              TaskService,
              AppUserService,
              FriendService,
              TagService,
              FeedService,
              { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true }
            ]
        };
    }
}
