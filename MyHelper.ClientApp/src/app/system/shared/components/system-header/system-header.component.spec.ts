import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MhMaterialModule } from '../../../../shared/modules/mh-material.module';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { SnackBarService } from '../../../../shared/snackbar/snackbar.service';
import { mockAuthenticationService, mockRouter, mockSnackBarService } from '../../../../shared/mock.spec';
import { SystemHeaderComponent } from './system-header.component';

describe('SystemHeaderComponent', () => {
  let component: SystemHeaderComponent;
  let fixture: ComponentFixture<SystemHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemHeaderComponent ],
      imports: [
        MhMaterialModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter},
        { provide: AuthenticationService, useValue: mockAuthenticationService},
        {provide: SnackBarService, useValue: mockSnackBarService}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
