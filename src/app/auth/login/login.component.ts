import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../login-register.component.css'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleButton') googleButton: ElementRef;
  public loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private ngZone: NgZone
  ) {
    this.createForm();
  }

  ngAfterViewInit() {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id:
        '758111435129-0f4qvpo96i0q22j62bf41fi8k3em1u58.apps.googleusercontent.com',
      callback: (response: any) => this.loginGoogle(response),
    });
    google.accounts.id.renderButton(
      this.googleButton.nativeElement,
      { theme: 'outline', size: 'large' } // customization attributes
    );
  }

  loginGoogle(response: any) {
    this.userService.loginGoogle(response.credential).subscribe({
      next: () => this.ngZone.run(() => this.router.navigateByUrl('/dashboard')),
      error: (error) =>
        Swal.fire('Error', error.error.errors.token.msg, 'error'),
    });
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: [
        localStorage.getItem('email' || ''),
        [Validators.required, Validators.email],
      ],
      password: ['', [Validators.required]],
      remember: [false],
    });
  }

  onSubmit() {
    const email = this.loginForm.get('email')!.value;
    if (this.loginForm.get('remember')!.value)
      localStorage.setItem('email', email);
    else localStorage.removeItem('email');

    this.login();
  }

  login() {
    this.userService.loginUser(this.loginForm.value).subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: (error) => Swal.fire('Error', error.error.msg, 'error'),
    });
  }
}
