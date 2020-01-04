import { FormControl } from '@angular/forms';

export function asyncRequiredTagsValidator(control: FormControl): any {
  const that = this;

  return new Promise(resolve => {
   if ( that.editCardModel.tags.length > 0 ) {
      resolve(null);
    } else {
      resolve({ 'mhRequiredTags': false });
    }
  });
}
