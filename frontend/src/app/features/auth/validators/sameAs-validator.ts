import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function sameAs(fieldName: string): ValidatorFn {
  let subscribed = false;
  return (control: AbstractControl): ValidationErrors | null => {
    const form = control.parent
    if(!form) {
        return null;
    }
    const other = form.get(fieldName);
    if(!other) {
        return null;
    }
    if(!subscribed) {
        subscribed=true;
        other.valueChanges.subscribe(()=>{
           control.updateValueAndValidity({
              onlySelf: true,
              emitEvent: false,
           });
        });
    }

    const errors: ValidationErrors = {};

    const otherValidator = other.validator;

    if (otherValidator) {
      Object.assign(
        errors,
        otherValidator(control)
      );
    }

    if (control.value !== other.value) {
      errors['sameAs'] = true;
    }

    return Object.keys(errors).length > 0
      ? errors
      : null;
  };
}