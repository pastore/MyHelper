import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEditCardComponent } from './task-edit-card.component';
import { mockAuthenticationService, mockTaskService, mockTagService } from '../../../../shared/mock.spec';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { TaskService } from '../../../../shared/services/task.service';
import { TagService } from '../../../../shared/services/tag.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MhMaterialModule } from '../../../../shared/modules/mh-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxWigModule } from 'ngx-wig';

describe('TaskEditCardComponent', () => {
  let component: TaskEditCardComponent;
  let fixture: ComponentFixture<TaskEditCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MhMaterialModule,
        NgxWigModule
      ],
      declarations: [ TaskEditCardComponent ],
      providers: [
        {provide: TaskService, useValue: mockTaskService},
        {provide: AuthenticationService, useValue: mockAuthenticationService},
        {provide: TagService, useValue: mockTagService }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
