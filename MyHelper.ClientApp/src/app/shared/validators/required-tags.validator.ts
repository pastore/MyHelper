import { AbstractControl, ValidatorFn, FormControl } from '@angular/forms';

export function asyncRequiredTagsValidator(control: FormControl): any {
  const _ = this;

  return new Promise(resolve => {
   if ( _.detailedNote.tags.length > 0 ) {
    resolve(null);
    } else {
      resolve({ 'mhRequiredTags': false });
    }
  });
}
