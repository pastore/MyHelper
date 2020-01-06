import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import {TagsPageComponent} from './tags-page/tags-page.component'
import {AdminPageComponent} from './admin-page/admin-page.component'
import { CoreModule } from '../shared/modules/core.module';
import { AdminHeaderComponent } from './shared/components/admin-header/admin-header.component';
import { AdminSidebarComponent } from './shared/components/admin-sidebar/admin-sidebar.component';
import { SharedModule } from '../shared/modules/shared.module';

@NgModule({
    imports: [
        CoreModule,
        CommonModule,
        RouterModule.forChild([
            {
                path: '', component: AdminComponent, children: [
                    {path: '', redirectTo: '/admin', pathMatch: 'full'},
                    {path: '', component: AdminPageComponent},
                    {path: 'tags', component: TagsPageComponent},
                    {path: 'users', component: TagsPageComponent} // temp stub
                ]
            }
        ])
    ],
    exports : [
        RouterModule
    ],
    declarations: [
        AdminComponent,
        AdminPageComponent,
        TagsPageComponent,
        AdminSidebarComponent,
        AdminHeaderComponent
    ]
})

export class AdminModule{

}