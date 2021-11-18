import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl } from '@angular/forms';


// validation function
function validateFakeEmailFactory() : ValidatorFn {
  return (c: AbstractControl) => {
    let EMAIL_REGEXP = new RegExp(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/)
    if(EMAIL_REGEXP.test(c.value)) {
      return null;
    } else {
      return {
        validateEmail: {
          valid: false
        }
      };
    }

  }
}


@Directive({
  selector: '[validateEmail][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: validateFakeEmailFactory, multi: true }
  ]
})
export class FakeEmailValidator implements Validator {
  validator: ValidatorFn;
  
  constructor() {
    this.validator = validateFakeEmailFactory();
  }
  
  validate(c: FormControl) {
    return this.validator(c);
  }
  
}
