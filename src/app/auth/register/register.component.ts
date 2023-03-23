import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyValidators } from '../../utils/validators';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login-register.component.css'],
})
export class RegisterComponent {
  public registerForm: FormGroup;
  public formSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        terms: [false, [Validators.requiredTrue]],
      },
      {
        validators: MyValidators.passwordMatch,
      }
    );
  }

  createUser() {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.userService.createUser(this.registerForm.value).subscribe({
      next: (resp) => this.router.navigateByUrl('/dashboard'),
      error: (error) => {
        Swal.fire('Error', error.error.msg, 'error');
      },
    });
  }

  fieldNotValid(field: string): boolean {
    const f = this.registerForm.get(field);
    const fieldTouched = f!.touched;
    const fieldInvalid = f!.invalid;
    return fieldTouched && fieldInvalid;
  }
}
