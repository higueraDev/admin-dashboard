import { AbstractControl } from '@angular/forms';

export class MyValidators {
  static passwordMatch(form: AbstractControl) {
    const password = form.get('password')!.value;
    const confirmation = form.get('confirmPassword');

    if (confirmation!.touched && password !== confirmation!.value)
      return {
        passwordMatch: true,
      };

    return null;
  }
}
