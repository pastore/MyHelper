import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemHeaderComponent } from './system-header.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MhMaterialModule } from '../../../../shared/modules/mh-material.module';
import { mockRouter, mockAuthenticationService } from '../../mock.spec';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../shared/services/authentication.service';

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
        { provide: AuthenticationService, useValue: mockAuthenticationService}
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
