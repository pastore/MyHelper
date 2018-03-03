import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MhTaskPageComponent } from './mh-task-page.component';

describe('MhTaskPageComponent', () => {
  let component: MhTaskPageComponent;
  let fixture: ComponentFixture<MhTaskPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MhTaskPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MhTaskPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
