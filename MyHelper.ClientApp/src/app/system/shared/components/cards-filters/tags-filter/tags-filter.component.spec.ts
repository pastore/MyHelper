import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MhMaterialModule } from '../../../../../shared/modules/mh-material.module';
import { TagService } from '../../../../../shared/services/tag.service';
import { mockTagService } from '../../../mock.spec';
import { TagsFilterComponent } from './tags-filter.component';

describe('TagsFilterComponent', () => {
  let component: TagsFilterComponent;
  let fixture: ComponentFixture<TagsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MhMaterialModule
      ],
      declarations: [ TagsFilterComponent ],
      providers: [
        {provide: TagService, useValue: mockTagService },
        {provide: ChangeDetectorRef, useValue: {}}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
