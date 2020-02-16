import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksPageComponent } from './tasks-page.component';
import { TaskService } from '../../shared/services/task.service';
import { mockTaskService, mockLoaderService } from '../../shared/mock.spec';
import { LoaderService } from '../../shared/loader/loader.service';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';

describe('TaskPageComponent', () => {
  let component: TasksPageComponent;
  let fixture: ComponentFixture<TasksPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksPageComponent ],
      providers: [
        {provide: TaskService, useValue: mockTaskService},
        {provide: LoaderService, useValue: mockLoaderService},
        {provide: ChangeDetectorRef, useValue: {}}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(TasksPageComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call setFilterFromTodayDate correctly', () => {
      component.ngOnInit();
      expect(component.cardsFilterModel.fromDate.toString()).toBe(component.today);
    });
  });
});
