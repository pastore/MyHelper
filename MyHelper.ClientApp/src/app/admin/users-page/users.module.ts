import { NgModule } from '@angular/core';
import { CoreModule } from '../../shared/modules/core.module';
import { AdminTableFilterModule } from '../shared/modules/admin-table-filter.module';
import { UsersPageComponent } from './users-page.component';

@NgModule({
  imports: [
    CoreModule,
    AdminTableFilterModule
  ],
  declarations: [
    UsersPageComponent
  ]
})

export class UsersModule { }
