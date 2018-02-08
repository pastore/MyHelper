import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteDeleteModalComponent } from './note-delete-modal.component';

describe('NoteDeleteModalComponent', () => {
  let component: NoteDeleteModalComponent;
  let fixture: ComponentFixture<NoteDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
