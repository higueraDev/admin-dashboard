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
import { GetUsersResponse } from '../interfaces/get-users-response';
import { Factories } from '../utils/factories';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user$: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private googleSevice: GoogleService
  ) {}

  private get _user() {
    return this._user$.value;
  }

  get token() {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'auth-token': this.token,
      },
    };
  }

  get uid() {
    return this._user?.uid || '';
  }

  get email() {
    return this._user?.email || '';
  }

  private isGoogle(email: string) {
    if (email !== this.email) return false;
    return this._user?.google || false;
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

  user() {
    return this._user$.asObservable();
  }

  setUser(user: User) {
    this._user$.next(Factories.buildUser(user));
  }

  logout() {
    if (this._user?.google) {
      this.googleSevice.googleInit();
      this.revokeGoogleToken();
    }
    this.removeStorage();
    this.navigateToLogin();
  }

  validateToken(): Observable<boolean> {
    if (!this.token) return of(false);
    const url = `${base_url}/login/update-token`;
    return this.http.get<ValidateTokenResponse>(url, this.headers).pipe(
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

  updateUser(user: User) {
    const { uid, ...data } = user;
    if (data.google === undefined) data.google = this.isGoogle(data.email);

    return this.http.put<UpdateUserResponse>(
      `${base_url}/users/${uid}`,
      data,
      this.headers
    );
  }

  getUsers(from: number = 0) {
    const url = `${base_url}/users?from=${from}`;
    return this.http.get<GetUsersResponse>(url, this.headers).pipe(
      map((resp) => {
        const users = resp.users.map((user) => Factories.buildUser(user));
        return {
          total: resp.total,
          users,
        };
      })
    );
  }

  removeUser(uid: string) {
    return this.http.delete(`${base_url}/users/${uid}`, this.headers);
  }
}
