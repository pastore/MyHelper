import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MhMaterialModule } from '../../shared/modules/mh-material.module';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { mockAuthenticationService, mockRouter, mockSnackBarService } from '../../system/shared/mock.spec';
import { RegistrationComponent } from './registration.component';
import { SnackBarService } from '../../shared/snackbar/snackbar.service';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MhMaterialModule
      ],
      declarations: [ RegistrationComponent ],
      providers: [
        {provide: Router, useValue: mockRouter },
        {provide: AuthenticationService, useValue: mockAuthenticationService},
        {provide: SnackBarService, useValue: mockSnackBarService}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
