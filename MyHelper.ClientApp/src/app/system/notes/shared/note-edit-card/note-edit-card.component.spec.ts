import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MhMaterialModule } from '../../../../shared/modules/mh-material.module';
import { NoteEditCardComponent } from './note-edit-card.component';
import { NoteService } from '../../../../shared/services/note.service';
import {
  mockNoteService,
  mockTagService,
  mockAuthenticationService,
  createMockNoteResponce,
  mockTags,
  MatChipInputEventMock } from '../../../../shared/mock.spec';
import { TagService } from '../../../../shared/services/tag.service';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { NgxWigModule } from 'ngx-wig';
import { of } from 'rxjs';
import { TagViewModel } from '../../../../shared/models/tags/tag-view.model';

describe('NoteEditCardComponent', () => {
  let component: NoteEditCardComponent;
  let fixture: ComponentFixture<NoteEditCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MhMaterialModule,
        NgxWigModule
      ],
      declarations: [ NoteEditCardComponent ],
      providers: [
        {provide: NoteService, useValue: mockNoteService },
        {provide: TagService, useValue: mockTagService },
        {provide: AuthenticationService, useValue: mockAuthenticationService}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(NoteEditCardComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnit', () => {
    it('should nitialize editCardModel', () => {
      const id = 1;
      component.originalEditCardModel = createMockNoteResponce(id);

      component.ngOnInit();
      expect(component.editCardModel.id).toBe(id);
    });

    it('should initialize tags', () => {
      component.ngOnInit();
      expect(component.tags.length > 0).toBeTruthy();
    });

    it('should initialize tagCtrl', () => {
      component.ngOnInit();
      expect(component.tagCtrl.value).toBeTruthy();
    });
  });

  describe('onCancel', () => {
    it('should be called', () => {
      spyOn(component, 'onCancel').and.callThrough();

      component.onCancel();
      expect(component.onCancel).toHaveBeenCalled();
    });

    it('should emit closeEditCard with null', () => {
      spyOn(component.closeEditCard, 'emit');

      component.onCancel();
      expect(component.closeEditCard.emit).toHaveBeenCalledWith(null);
    });
  });

  describe('onSave', () => {
    const formBuilder: FormBuilder = new FormBuilder();
    let formGroup;

    beforeEach(() => {
      formGroup = formBuilder.group({
        id: null,
        name: null,
        description: null,
        appUserId: null,
        tagIds: null
      });

      fixture.detectChanges();
    });

    it('should be called', () => {
      const button = fixture.debugElement.nativeElement.querySelector('.js-button-save');
      spyOn(component, 'onSave');

      button.click();
      expect(component.onSave).toHaveBeenCalled();
    });

    it('should call addNote method of _noteService', () => {
      spyOn(component, 'tagCtrl');
      spyOn(component.tagCtrl, 'valid').and.returnValue(true);

      component.onSave(formGroup);
      expect(mockNoteService.addNote).toHaveBeenCalled();
    });

    it('should call updateNote method of _noteService', () => {
      spyOn(component, 'tagCtrl');
      spyOn(component.tagCtrl, 'valid').and.returnValue(true);
      component.editCardModel.id = 1;

      component.onSave(formGroup);
      expect(mockNoteService.updateNote).toHaveBeenCalled();
    });

    it('should emit by closeEditCard', () => {
      spyOn(component, 'tagCtrl');
      spyOn(component.tagCtrl, 'valid').and.returnValue(true);
      spyOn(component.closeEditCard, 'emit');

      component.onSave(formGroup);
      expect(component.closeEditCard.emit).toHaveBeenCalled();
    });
  });

  describe('addTag', () => {
    let event, tagName, tags;

    beforeEach(function() {
      fixture.detectChanges();

      tagName = 'newTag';
      event = new MatChipInputEventMock();
      event.value = tagName;

      tags = mockTags.slice(0);
      tags.push(new TagViewModel(12, tagName));
      spyOn(mockTagService, 'createTag').and.callFake(() => of(tags));
    });

    it('should add tag', () => {
      component.addTag(event);
      expect(component.tags.map(x => x.name)).toContain(tagName);
    });

    it('should update editCardModel.tags', () => {
      component.addTag(event);
      expect(component.editCardModel.tags.length).toBe(1);
    });
  });

  describe('removeTag', () => {
    beforeEach(function() {
      fixture.detectChanges();
    });

    it('should remove tag from editCardModel.tags', () => {
      const {0 : tagToRemove } = mockTags;
      component.editCardModel.tags = mockTags;

      component.removeTag(tagToRemove);
      expect(component.editCardModel.tags.map(x => x.name)).not.toContain(tagToRemove.name);
    });
  });

  describe('selectTag', () => {
    beforeEach(function() {
      fixture.detectChanges();
    });

    it('should update editCardModel.tags', () => {
      component.selectTag({id: 12, name: 'tagName'});
      expect(component.editCardModel.tags.length).toBe(1);
    });

    it('should be called tagCtrl.reset()', () => {
      spyOn(component, 'tagCtrl');
      spyOn(component.tagCtrl, 'reset');

      component.selectTag({id: 12, name: 'tagName'});
      expect(component.tagCtrl.reset).toHaveBeenCalled();
    });
  });
});
