import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderService } from '../../../shared/loader/loader.service';
import { FriendSearchService } from '../../../shared/services/friend-search.service';
import { FriendService } from '../../../shared/services/friend.service';
import { mockFriendSearchService, mockFriendService, mockLoaderService } from '../../shared/mock.spec';
import { RequestsFriendsComponent } from './requests-friends.component';

describe('RequestsFriendsComponent', () => {
  let component: RequestsFriendsComponent;
  let fixture: ComponentFixture<RequestsFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsFriendsComponent ],
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
    fixture = TestBed.createComponent(RequestsFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
