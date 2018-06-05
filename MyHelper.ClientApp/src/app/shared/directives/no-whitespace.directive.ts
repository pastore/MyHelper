import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Validator, AbstractControl, Validators, NG_VALIDATORS } from '@angular/forms';

import { NoWhitespaceValidator } from '../validators/no-whitespace.validator';

/**
 * This validator works like "required" but it does not allow whitespace either
 *
 * @export
 * @class NoWhitespaceDirective
 * @implements {Validator}
 */
@Directive({
    selector: '[mhNoWhiteSpace]',
    providers: [{ provide: NG_VALIDATORS, useExisting: NoWhiteSpaceDirective, multi: true }]
})
export class NoWhiteSpaceDirective implements Validator {

    private valFn = NoWhitespaceValidator();
    validate(control: AbstractControl): { [key: string]: any } {
      return this.valFn(control);
    }
}
