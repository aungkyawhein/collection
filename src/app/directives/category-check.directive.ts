import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn, ValidationErrors, FormGroup } from '@angular/forms';

export const checkCategory: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const name = control.get('name');
  // TODO:
  // to check firebase category list
  const existingCategoryName = 'css';

  return name && existingCategoryName && name.value === existingCategoryName ? {categoryCheck: true } : null;
};

@Directive({
  selector: '[appCategoryCheck]',
  providers: [{provide: NG_VALIDATORS, useExisting: CategoryCheckDirective, multi: true}]
})
export class CategoryCheckDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors {
    return checkCategory(control);
  }

}
