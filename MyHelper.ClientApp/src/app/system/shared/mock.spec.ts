import { of as obsevableOf } from 'rxjs';
import { AppUserViewModel } from '../../shared/models/user/app-user-view.model';
import { UserRole } from '../../shared/utilities/enums';
import { TagViewModel } from '../../shared/models/tags/tag-view.model';
import { NoteResponse } from '../../shared/models/notes/note-response.model';
import { MatChipInputEvent } from '@angular/material';

const mockAppUserViewModel: AppUserViewModel = {
  id: 1,
  userName: 'admin',
  email: 'admin@gmail.com',
  avatar: '',
  createdDate: new Date().toString(),
  userRole: UserRole.Admin
};

export const createMockNoteResponce = (id?: number, name?: string, description?: string, tags?: TagViewModel[]) => {
  const mockNoteResponce = new NoteResponse();
  if (id) {
    mockNoteResponce.id = id;
  }
  if (name) {
    mockNoteResponce.name = name;
  }
  if (description) {
    mockNoteResponce.description = description;
  }
  if (tags) {
    mockNoteResponce.tags = tags;
  }
  return mockNoteResponce;
};

const mockNoteResponses = [
  createMockNoteResponce(),
  createMockNoteResponce()
];

export const mockTags = [
  new TagViewModel(1, 'Tag 1'),
  new TagViewModel(2, 'Tag 2')
];

export let mockNoteService = {
  getNotes: jasmine.createSpy('getNotes').and.returnValue(obsevableOf(mockNoteResponses)),
  addNote: jasmine.createSpy('addNote').and.returnValue(obsevableOf(true)),
  updateNote: jasmine.createSpy('updateNote').and.returnValue(obsevableOf(true)),
  deleteNote: jasmine.createSpy('deleteNote').and.returnValue(obsevableOf(true))
};

export let mockTagService = {
  tags: obsevableOf(mockTags),
  createTag: () => obsevableOf(mockTags),
};

export let mockAuthenticationService = {
  currentUser: mockAppUserViewModel
};

export class MatChipInputEventMock implements MatChipInputEvent {
  input: HTMLInputElement;
  value: string;
}

export let spyMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
