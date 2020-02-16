import { TestBed, inject } from '@angular/core/testing';
import { SnackBarService } from './snackbar.service';
import { MatSnackBar } from '@angular/material';
import { mockMatSnackBar } from '../mock.spec';

describe('SnackBarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SnackBarService,
        {provide: MatSnackBar, useValue: mockMatSnackBar}
      ]
    });
  });
it('should be created', inject([SnackBarService], (service: SnackBarService) => {
    expect(service).toBeTruthy();
  }));
});
