import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogMock, mockAppUserService } from '../../shared/mock.spec';
import { MhMaterialModule } from '../../shared/modules/mh-material.module';
import { AppUserService } from '../../shared/services/app-user.service';
import { UsersPageComponent } from './users-page.component';

describe('TagsPageComponent', () => {
  let component: UsersPageComponent;
  let fixture: ComponentFixture<UsersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersPageComponent ],
      imports: [
        NoopAnimationsModule,
        MhMaterialModule
      ],
      providers: [
        {provide: MatDialog, useClass: MatDialogMock },
        {provide: AppUserService, useValue: mockAppUserService }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(UsersPageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
