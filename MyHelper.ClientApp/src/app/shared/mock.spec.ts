import { of } from 'rxjs';
import { AppUserViewModel } from './models/user/app-user-view.model';
import { UserRole } from './utilities/enums';
import { TagViewModel } from './models/tags/tag-view.model';
import { NoteResponse } from './models/notes/note-response.model';
import { MatChipInputEvent } from '@angular/material';
import { ILoaderState } from './loader/i-loader-state.model';
import { MhTaskResponse } from './models/tasks/mh-task-response.model';
import { TagAdminModel } from './models/tags/tag-admin.model';

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

export const createMockMhTaskResponce = (id?: number, name?: string, description?: string, tags?: TagViewModel[]) => {
  const mockNoteResponce = new MhTaskResponse();
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

export const mockNoteResponses = [
  createMockNoteResponce(1),
  createMockNoteResponce(2)
];

export const mockMhTaskResponses = [
  createMockMhTaskResponce(1),
  createMockMhTaskResponce(2)
];

export const mockTags = [
  new TagViewModel(1, 'Tag 1'),
  new TagViewModel(2, 'Tag 2')
];

export let mockNoteService = {
  getNotes: jasmine.createSpy('getNotes').and.returnValue(of(mockNoteResponses)),
  addNote: jasmine.createSpy('addNote').and.returnValue(of(true)),
  updateNote: jasmine.createSpy('updateNote').and.returnValue(of(true)),
  deleteNote: jasmine.createSpy('deleteNote')
};

export let mockTaskService = {
  getTasks: () => of(mockMhTaskResponses),
  addTask: () => of(true),
  updateTask: () => of(true),
  deleteTask: () => of(true)
};

export let mockFeedService = {
  getFeeds: () => of([])
};

export let mockFriendService = {
  getFriends: () => of([]),
  inviteFriend: () => of(true),
  cancelFriend: () => of(true),
  deleteFriend: () => of(true),
  updateFriendRequest: () => of(true)
};

export let mockFriendSearchService = {
  getFriendSearch: () => of(''),
  sharedFriendSearch: () => { }
};

export let mockLoaderService = {
  loaderState: of({isShow: true} as ILoaderState),
  show: jasmine.createSpy('show'),
  hide: jasmine.createSpy('hide')
};

export let mockTagService = {
  tags: of(mockTags),
  createTag: () => of(mockTags),
};

export let mockAuthenticationService = {
  currentUser: mockAppUserViewModel
};

export class MatChipInputEventMock implements MatChipInputEvent {
  input: HTMLInputElement;
  value: string;
}

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(true)
    };
  }
}

export let mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

export let mockSnackBarService = { };

export let mockMatSnackBar = {};

export let mockAdminTags = [
  new TagAdminModel(1, 'Tag 1'),
  new TagAdminModel(2, 'Tag 2')
];

export let mockTagAdminService = {
  getTags: () => of(mockAdminTags),
  deleteTag: () => of(true)
};
