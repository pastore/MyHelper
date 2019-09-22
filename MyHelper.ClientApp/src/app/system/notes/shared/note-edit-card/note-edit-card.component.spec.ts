import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA, forwardRef } from '@angular/core';
import { MhMaterialModule } from '../../../../shared/modules/mh-material.module';
import { NoteEditCardComponent } from './note-edit-card.component';
import { NoteService } from '../../../../shared/services/note.service';
import { mockNoteService, mockTagService, mockAuthenticationService, createMockNoteResponce } from '../../../shared/mock.spec';
import { TagService } from '../../../../shared/services/tag.service';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { NgxWigModule } from 'ngx-wig';

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
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteEditCardComponent);
    component = fixture.componentInstance;
  });

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
});
