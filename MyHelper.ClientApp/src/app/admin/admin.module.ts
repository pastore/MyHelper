import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../shared/modules/core.module';
import { AppUserService } from '../shared/services/app-user.service';
import { TagAdminService } from '../shared/services/tag-admin.service';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminHeaderComponent } from './shared/components/admin-header/admin-header.component';
import { AdminSidebarComponent } from './shared/components/admin-sidebar/admin-sidebar.component';
import { TagsModule } from './tags-page/tags.module';
import { UsersModule } from './users-page/users.module';

@NgModule({
    imports: [
      CoreModule,
      TagsModule,
      UsersModule,
      AdminRoutingModule
    ],
    exports : [
      RouterModule
    ],
    declarations: [
        AdminComponent,
        AdminSidebarComponent,
        AdminHeaderComponent
    ],
    providers: [
      TagAdminService,
      AppUserService
    ]
})

export class AdminModule { }
