import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable()
export class SnackBarService {
  private config: MatSnackBarConfig;
  private horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private snackBar: MatSnackBar) {
    this.config = new MatSnackBarConfig();
    this.config.horizontalPosition = this.horizontalPosition;
    this.config.verticalPosition = this.verticalPosition;
   }

  showError(message: string) {
    this.config.duration = 0;
    this.snackBar.open(message, 'Close', this.config);
  }

  showInfo(message: string) {
    this.config.duration = 3000;
    this.config.panelClass = 'accent_snackbar';
    this.snackBar.open(message, null, this.config);
  }

  showSuccess(message: string) {
    this.config.duration = 2000;
    this.config.panelClass = 'primary_snackbar';
    this.snackBar.open(message, null, this.config);
  }

  close() {
    this.snackBar.dismiss();
  }
}
