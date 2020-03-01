import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MhMaterialModule } from '../../../../shared/modules/mh-material.module';
import { AdminTableSearchComponent } from './admin-table-search.component';

describe('AdminTableSearchComponent', () => {
  let component: AdminTableSearchComponent;
  let fixture: ComponentFixture<AdminTableSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTableSearchComponent ],
      imports: [
        NoopAnimationsModule,
        MhMaterialModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTableSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
