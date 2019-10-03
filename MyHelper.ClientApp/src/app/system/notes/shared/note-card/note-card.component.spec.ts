import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MhMaterialModule } from '../../../../shared/modules/mh-material.module';
import { NoteCardComponent } from './note-card.component';
import { spyMatDialog } from '../../../../system/shared/mock.spec';
import { NoteResponse } from '../../../../shared/models/notes/note-response.model';
import { CardType } from '../../../../shared/utilities/enums';

fdescribe('NoteCardComponent', () => {
  let component: NoteCardComponent;
  let fixture: ComponentFixture<NoteCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MhMaterialModule
      ],
      declarations: [ NoteCardComponent ],
      providers: [
        {provide: MatDialog, useValue: spyMatDialog }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(NoteCardComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit openEditCard with card.data', () => {
    spyOn(component.openEditCard, 'emit');
    const noteResponse = new NoteResponse();
    component.card = {data: noteResponse, cardType: CardType.Note };
    component.editCard();
    expect(component.openEditCard.emit).toHaveBeenCalledWith(noteResponse);
  });
});
