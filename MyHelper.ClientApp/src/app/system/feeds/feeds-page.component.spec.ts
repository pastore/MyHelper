import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderService } from '../../shared/loader/loader.service';
import { FeedService } from '../../shared/services/feed.service';
import { mockFeedService, mockLoaderService } from '../../shared/mock.spec';
import { FeedsPageComponent } from './feeds-page.component';

describe('FeedsPageComponent', () => {
  let component: FeedsPageComponent;
  let fixture: ComponentFixture<FeedsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedsPageComponent ],
      providers: [
        {provide: FeedService, useValue: mockFeedService},
        {provide: LoaderService, useValue: mockLoaderService},
        {provide: ChangeDetectorRef, useValue: {}}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
