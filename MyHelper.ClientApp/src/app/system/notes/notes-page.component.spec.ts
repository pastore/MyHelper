import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { ILoaderState } from '../../shared/loader/i-loader-state.model';
import { LoaderService } from '../../shared/loader/loader.service';
import { ICard } from '../../shared/models/base/i-card.model';
import { NoteFilterRequest } from '../../shared/models/notes/note-filter-request.model';
import { NoteResponse } from '../../shared/models/notes/note-response.model';
import { NoteService } from '../../shared/services/note.service';
import { Constants } from '../../shared/utilities/constants';
import { CardType, FilterType } from '../../shared/utilities/enums';
import { mockLoaderService, mockNoteResponses, mockNoteService } from '../../shared/mock.spec';
import { NotesPageComponent } from './notes-page.component';

describe('NotesPageComponent', () => {
  let component: NotesPageComponent;
  let fixture: ComponentFixture<NotesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesPageComponent ],
      providers: [
        {provide: NoteService, useValue: mockNoteService},
        {provide: LoaderService, useValue: mockLoaderService},
        {provide: ChangeDetectorRef, useValue: {}}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(NotesPageComponent);
      component = fixture.componentInstance;
    });
  }));

  afterEach(function() {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnit', () => {
    it('should set correctly searchPlaceholder', () => {
      component.ngOnInit();
      expect(component.searchPlaceholder).toBe('Search notes');
    });

    it('should set correctly cardsFilterModel.limit', () => {
      component.ngOnInit();
      expect(component.cardsFilterModel.limit).toBe(Constants.CardsPerPage);
    });

    it('should set correclty isLoading', () => {
      spyOn(mockLoaderService, 'loaderState')
        .and
        .returnValue(of({isShow: true} as ILoaderState));

      component.ngOnInit();
      expect(component.isLoading).toBe(true);
    });
  });

  describe('getCards', () => {
    beforeEach(function() {
      fixture.detectChanges();
    });

    it('should be called _noteService.getNotes', () => {
      const noteFilterRequest = new NoteFilterRequest();
      component.cardsFilterModel = noteFilterRequest;
      const getNotesSpy = mockNoteService.getNotes;

      component.getCards();
      expect(getNotesSpy).toHaveBeenCalledWith(noteFilterRequest);
    });

    it('should assign correct data for cards', () => {
      component.getCards();
      expect(component.cards.length).toEqual(mockNoteResponses.length);
    });
  });

  describe('deleteNote', () => {
    beforeEach(function() {
      fixture.detectChanges();
    });

    it('should be called _noteService.deleteNote', () => {
      const id = 1;
      mockNoteService.deleteNote.and.returnValue(of(true));
      mockNoteService.deleteNote.call(this, id);

      component.deleteNote(id);
      expect(mockNoteService.deleteNote).toHaveBeenCalledWith(id);
    });

    it('should be called getCatrds if delete success', () => {
      const id = 1;
      mockNoteService.deleteNote.and.returnValue(of(true));
      const getCardsSpy = spyOn(component, 'getCards');

      component.deleteNote(id);
      expect(getCardsSpy).toHaveBeenCalled();
    });

    it('should not be called getCatrds if delete fail', () => {
      const id = 2;
      mockNoteService.deleteNote.and.returnValue(of(false));
      const getCardsSpy = spyOn(component, 'getCards');

      component.deleteNote(id);
      expect(getCardsSpy).not.toHaveBeenCalled();
    });
  });

  describe('setFilterItems', () => {
    it('should set filter items correctly', () => {
      fixture.detectChanges();

      component.setFilterItems();
      expect(component.filterItems.map(x => x.type)).toContain(FilterType.TagsFilter);
    });
  });

  describe('handleScroll', () => {
    beforeEach(function() {
      const noteFilterRequest = new NoteFilterRequest();
      component.cardsFilterModel = noteFilterRequest;
    });

    it('should set cardsFilterModel.offset correctly', () => {
      const carsdsLength = 21;
      const offset = Math.floor(carsdsLength / Constants.CardsPerPage);
      component.cardsFilterModel.limit = Constants.CardsPerPage;
      component.cards = Array(carsdsLength)
        .fill({data : new NoteResponse(), cardType : CardType.Note } as ICard<NoteResponse>);

      component.handleScroll();
      expect(component.cardsFilterModel.offset).toBe(offset * Constants.CardsPerPage);
    });

    xit('should not be called _noteService.getNotes', () => {
      const carsdsLength = Constants.CardsPerPage - 1;
      component.cardsFilterModel.limit = Constants.CardsPerPage;
      component.cards = Array(carsdsLength)
        .fill({data : new NoteResponse(), cardType : CardType.Note } as ICard<NoteResponse>);

      component.handleScroll();
      expect(mockNoteService.getNotes).not.toHaveBeenCalled();
    });

    it('should be called _noteService.getNotes', () => {
      const carsdsLength = Constants.CardsPerPage;
      component.cardsFilterModel.limit = Constants.CardsPerPage;
      component.cards = Array(carsdsLength)
        .fill({data : new NoteResponse(), cardType : CardType.Note } as ICard<NoteResponse>);

      component.handleScroll();
      expect(mockNoteService.getNotes).toHaveBeenCalled();
    });

    xit('should set isScroll false if _noteService.getNotes return empty list', () => {
      const carsdsLength = Constants.CardsPerPage;
      component.cardsFilterModel.limit = Constants.CardsPerPage;
      component.cards = Array(carsdsLength)
        .fill({data : new NoteResponse(), cardType : CardType.Note } as ICard<NoteResponse>);
      mockNoteService.getNotes.and.returnValue(of([]));

      component.handleScroll();
      expect(component.isScroll).toBe(false);
    });
  });

  describe('closeEditCard', () => {
    beforeEach(function() {
      fixture.detectChanges();
    });

    it('should not be called getCards', fakeAsync(() => {
      spyOn(component, 'scrollTo').and.callFake(() => {});
      const getCardsSpy = spyOn(component, 'getCards');
      const [first] = mockNoteResponses;

      component.closeEditCard({id: first.id});
      tick(1);
      expect(getCardsSpy).not.toHaveBeenCalled();
    }));

    it('should be called getCards', () => {
      const getCardsSpy = spyOn(component, 'getCards');

      component.closeEditCard({id: mockNoteResponses[mockNoteResponses.length - 1].id + 1});
      expect(getCardsSpy).toHaveBeenCalled();
    });

    it('should not be called scrollTo', () => {
      const scrollToSpy = spyOn(component, 'scrollTo');

      component.closeEditCard({id: mockNoteResponses[mockNoteResponses.length - 1].id + 1});
      expect(scrollToSpy).not.toHaveBeenCalled();
    });

    it('should be called scrollTo', fakeAsync(() => {
      const scrollToSpy = spyOn(component, 'scrollTo');
      const [first] = mockNoteResponses;

      component.closeEditCard({id: first.id});
      tick(1);
      expect(scrollToSpy).toHaveBeenCalledWith(first.id);
    }));
  });
});
