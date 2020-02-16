import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MhMaterialModule } from '../../../../shared/modules/mh-material.module';
import { NoteCardComponent } from './note-card.component';
import { MatDialogMock } from '../../../../shared/mock.spec';
import { NoteResponse } from '../../../../shared/models/notes/note-response.model';
import { CardType } from '../../../../shared/utilities/enums';
import { EMPTY } from 'rxjs';

describe('NoteCardComponent', () => {
  let component: NoteCardComponent;
  let fixture: ComponentFixture<NoteCardComponent>;
  const noteResponse = new NoteResponse();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MhMaterialModule
      ],
      declarations: [ NoteCardComponent ],
      providers: [
        {provide: MatDialog, useClass: MatDialogMock }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(NoteCardComponent);
      component = fixture.componentInstance;
      component.card = { data: noteResponse, cardType: CardType.Note };
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit openEditCard with card.data', () => {
    spyOn(component.openEditCard, 'emit');

    component.editCard();
    expect(component.openEditCard.emit).toHaveBeenCalledWith(noteResponse);
  });

  it('should be called openDialog', () => {
    const spyDialog =  spyOn(component.dialog, 'open')
      .and
      .returnValue({afterClosed: () => EMPTY});

    component.openDialog();
    expect(spyDialog).toHaveBeenCalled();
  });

  it('should be expandTitle equals cCollapse', () => {
    component.showDescription();
    expect(component.expandTitle).toBe('Collapse');
  });
});
