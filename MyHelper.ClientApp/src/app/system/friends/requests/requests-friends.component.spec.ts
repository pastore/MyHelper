import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsFriendsComponent } from './requests-friends.component';

describe('RequestsFriendsComponent', () => {
  let component: RequestsFriendsComponent;
  let fixture: ComponentFixture<RequestsFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsFriendsComponent ]
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
