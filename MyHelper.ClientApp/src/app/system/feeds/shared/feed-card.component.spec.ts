import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FeedResponse } from '../../../shared/models/feeds/feed-response.model';
import { AppUserViewModel } from '../../../shared/models/user/app-user-view.model';
import { MhMaterialModule } from '../../../shared/modules/mh-material.module';
import { CardType } from '../../../shared/utilities/enums';
import { FeedCardComponent } from './feed-card.component';

describe('FeedCardComponent', () => {
  let component: FeedCardComponent;
  let fixture: ComponentFixture<FeedCardComponent>;
  const feedResponse = new FeedResponse();
  feedResponse.appUserViewModel = new AppUserViewModel();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MhMaterialModule
      ],
      declarations: [ FeedCardComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(FeedCardComponent);
      component = fixture.componentInstance;
      component.card = { data: feedResponse, cardType: CardType.Feed };
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
