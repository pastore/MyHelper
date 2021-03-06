import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperFilterComponent } from './wrapper-filter.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('WrapperFilterComponent', () => {
  let component: WrapperFilterComponent;
  let fixture: ComponentFixture<WrapperFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrapperFilterComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
