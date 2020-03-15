import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogMock, mockTagAdminService } from '../../shared/mock.spec';
import { MhMaterialModule } from '../../shared/modules/mh-material.module';
import { TagAdminService } from '../../shared/services/tag-admin.service';
import { TagsPageComponent } from './tags-page.component';

describe('TagsPageComponent', () => {
  let component: TagsPageComponent;
  let fixture: ComponentFixture<TagsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsPageComponent ],
      imports: [
        NoopAnimationsModule,
        MhMaterialModule
      ],
      providers: [
        {provide: MatDialog, useClass: MatDialogMock },
        {provide: TagAdminService, useValue: mockTagAdminService }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(TagsPageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
