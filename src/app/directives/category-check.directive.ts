import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn, ValidationErrors, FormGroup } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

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
  categories: Observable<Category[]>;

  constructor(categoryService: CategoryService) {
    this.categories = categoryService.loadAllItems();
  }

  validate(control: AbstractControl): ValidationErrors {
    return checkCategory(control);
  }

}
