import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import {TagsPageComponent} from './admin/tags-page/tags-page.component'
import {AdminPageComponent} from './admin/admin-page/admin-page.component'

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '', component: AdminComponent, children: [
                    {path: '', redirectTo: '/admin', pathMatch: 'full'},
                    {path: '', component: AdminPageComponent},
                    {path: 'tags', component: TagsPageComponent}
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
        TagsPageComponent
    ]
})

export class AdminModule{

}