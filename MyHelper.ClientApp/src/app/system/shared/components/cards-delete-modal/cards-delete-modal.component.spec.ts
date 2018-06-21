import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsDeleteModalComponent } from './cards-delete-modal.component';

describe('CardsDeleteModalComponent', () => {
  let component: CardsDeleteModalComponent;
  let fixture: ComponentFixture<CardsDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
