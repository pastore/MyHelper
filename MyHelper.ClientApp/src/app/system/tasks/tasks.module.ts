import { NgModule } from '@angular/core';
import { NgxWigModule } from 'ngx-wig';
import { CoreModule } from '../../shared/modules/core.module';
import { CardFilterModule } from '../shared/modules/card-filter.module';
import { SharedSystemModule } from '../shared/modules/shared-system.module';
import { TaskCardComponent } from './shared/task-card/task-card.component';
import { TaskEditCardComponent } from './shared/task-edit-card/task-edit-card.component';
import { TasksPageComponent } from './tasks-page.component';

@NgModule({
  imports: [
    NgxWigModule,
    CoreModule,
    CardFilterModule,
    SharedSystemModule
  ],
  declarations: [
    TasksPageComponent,
    TaskCardComponent,
    TaskEditCardComponent
  ]
})
export class TasksModule { }
