import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteEditCardComponent } from './note-edit-card.component';

describe('MhNoteDetailsComponent', () => {
  let component: NoteEditCardComponent;
  let fixture: ComponentFixture<NoteEditCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteEditCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteEditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
