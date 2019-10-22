import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderService } from '../../../shared/loader/loader.service';
import { FriendSearchService } from '../../../shared/services/friend-search.service';
import { FriendService } from '../../../shared/services/friend.service';
import { mockFriendSearchService, mockFriendService, mockLoaderService } from '../../shared/mock.spec';
import { MyFriendsComponent } from './my-friends.component';

describe('MyFriendsComponent', () => {
  let component: MyFriendsComponent;
  let fixture: ComponentFixture<MyFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFriendsComponent ],
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
    fixture = TestBed.createComponent(MyFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
