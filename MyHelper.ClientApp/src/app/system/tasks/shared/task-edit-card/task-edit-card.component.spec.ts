import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEditCardComponent } from './task-edit-card.component';

describe('MhTaskDetailsComponent', () => {
  let component: TaskEditCardComponent;
  let fixture: ComponentFixture<TaskEditCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskEditCardComponent ]
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
