import { Input, Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[mhRequiredTags]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => RequiredTagsDirective), multi: true }
    ]
})
export class RequiredTagsDirective implements Validator {
  @Input() countTags: string;

  validate(control: AbstractControl): { [key: string]: any } {
      if (this.countTags && +this.countTags > 0) {
        return { mhRequiredTags: false };
      }

      return null;
  }
}
