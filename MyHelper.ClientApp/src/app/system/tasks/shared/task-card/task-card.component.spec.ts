import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MhTaskResponse } from '../../../../shared/models/tasks/mh-task-response.model';
import { MhMaterialModule } from '../../../../shared/modules/mh-material.module';
import { CardType } from '../../../../shared/utilities/enums';
import { MatDialogMock } from '../../../../system/shared/mock.spec';
import { TaskCardComponent } from './task-card.component';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;
  const mhTaskResponse = new MhTaskResponse();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MhMaterialModule
      ],
      declarations: [ TaskCardComponent ],
      providers: [
        {provide: MatDialog, useClass: MatDialogMock }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(TaskCardComponent);
      component = fixture.componentInstance;
      component.card = { data: mhTaskResponse, cardType: CardType.Task };
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
