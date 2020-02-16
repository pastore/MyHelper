import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderService } from '../../../shared/loader/loader.service';
import { FriendSearchService } from '../../../shared/services/friend-search.service';
import { FriendService } from '../../../shared/services/friend.service';
import { mockFriendSearchService, mockFriendService, mockLoaderService } from '../../../shared/mock.spec';
import { SearchFriendsComponent } from './search-friends.component';

describe('SearchFriendsComponent', () => {
  let component: SearchFriendsComponent;
  let fixture: ComponentFixture<SearchFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFriendsComponent ],
      providers: [
        {provide: FriendService, useValue: mockFriendService},
        {provide: FriendSearchService, useValue: mockFriendSearchService},
        {provide: LoaderService, useValue: mockLoaderService},
        {provide: ChangeDetectorRef, useValue: {}}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
