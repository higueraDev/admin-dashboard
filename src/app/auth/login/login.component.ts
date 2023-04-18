import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GoogleService } from '../../services/google.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../login-register.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('googleButton') googleButton: ElementRef;
  public loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private googleService: GoogleService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.googleService.googleInit();
  }

  ngAfterViewInit() {
    this.googleService.renderButton(this.googleButton);
  }

  get email() {
    return localStorage.getItem('email') || '';
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: [this.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: [!!this.email],
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
