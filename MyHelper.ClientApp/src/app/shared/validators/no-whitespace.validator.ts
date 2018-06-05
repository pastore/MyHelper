import { AbstractControl, ValidatorFn } from '@angular/forms';

export function NoWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const isWhitespace = (control.value || '').trim().length === 0;
    return !isWhitespace ? null : { 'whitespace': 'value is only whitespace' };
  };
}
