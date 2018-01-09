import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperFilterComponent } from './wrapper-filter.component';

describe('WrapperFilterComponent', () => {
  let component: WrapperFilterComponent;
  let fixture: ComponentFixture<WrapperFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrapperFilterComponent ]
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
