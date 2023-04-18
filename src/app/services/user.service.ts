import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form';
import { tap, map, Observable, catchError, of, BehaviorSubject } from 'rxjs';
import { RegisterResponse } from '../interfaces/register-response';
import { LoginResponse } from '../interfaces/login-response';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { GoogleService } from './google.service';
import { UpdateUserResponse } from '../interfaces/update-user-response';
import { ValidateTokenResponse } from '../interfaces/validate-token-response';
import { UpdateUserForm } from '../interfaces/update-user-form';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private googleSevice: GoogleService
  ) {}

  private get _user() {
    return this.user$.value;
  }

  user() {
    return this.user$.asObservable();
  }

  setUser(user: User) {
    const { name, email, uid, role, google, image } = user;
    this.user$.next(new User(uid, name, email, google, role, image));
  }

  get token() {
    return localStorage.getItem('token') || '';
  }

  get uid() {
    return this._user?.uid || '';
  }

  get email() {
    return this._user?.email || '';
  }

  logout() {
    if (this._user?.google) {
      this.googleSevice.googleInit();
      this.revokeGoogleToken();
    }
    this.removeStorage();
    this.navigateToLogin();
  }

  private revokeGoogleToken() {
    this.googleSevice.revokeGoogleToken(this.email);
  }

  private navigateToLogin() {
    this.router.navigateByUrl('/login');
  }

  private removeStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  private isGoogle(email: string) {
    if(email !== this.email) return false;
    return this._user?.google || false;
  }

  validateToken(): Observable<boolean> {
    if (!this.token) return of(false);
    return this.http
      .get<ValidateTokenResponse>(`${base_url}/login/update-token`, {
        headers: { 'auth-token': this.token },
      })
      .pipe(
        map((resp) => {
          this.setUser(resp.user);
          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError((_) => of(false))
      );
  }

  createUser(formData: RegisterForm) {
    return this.http.post<RegisterResponse>(`${base_url}/users`, formData).pipe(
      tap({
        next: (resp) => localStorage.setItem('token', resp.token),
      })
    );
  }

  loginUser(formData: LoginForm) {
    return this.http.post<LoginResponse>(`${base_url}/login`, formData).pipe(
      tap({
        next: (resp) => localStorage.setItem('token', resp.token),
      })
    );
  }

  updateUser(form: UpdateUserForm) {
    const data = {
      ...form,
      google: this.isGoogle(form.email),
      role: this._user?.role || 'USER_ROLE',
    };
    return this.http.put<UpdateUserResponse>(
      `${base_url}/users/${this.uid}`,
      data,
      {
        headers: { 'auth-token': this.token },
      }
    );
  }
}
