import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CoreModule } from '../shared/modules/core.module';
import { AdminHeaderComponent } from './shared/components/admin-header/admin-header.component';
import { AdminSidebarComponent } from './shared/components/admin-sidebar/admin-sidebar.component';
import { TagsModule } from './tags-page/tags.module';
import { AdminRoutingModule } from './admin-routing.module';
import { TagAdminService } from '../shared/services/tag-admin.service';

@NgModule({
    imports: [
        CoreModule,
        TagsModule,
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
    providers: [TagAdminService]
})

export class AdminModule{}