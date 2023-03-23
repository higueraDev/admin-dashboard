import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form';
import { tap, map, Observable, catchError, of } from 'rxjs';
import { RegisterResponse } from '../interfaces/register-response';
import { LoginResponse } from '../interfaces/login-response';
import { Router } from '@angular/router';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  logout(){
    // TODO: google email variable
    google.accounts.id.revoke('contact@higueradev.com', () => {
      this.router.navigateByUrl('/login');
    })
    localStorage.removeItem('token');
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http
      .get(`${base_url}/login/update-token`, {
        headers: { 'auth-token': token },
      })
      .pipe(
        tap({
          next: (resp: any) => localStorage.setItem('token', resp.token),
        }),
        map((resp: any) => true),
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

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap({
        next: (resp: any) => localStorage.setItem('token', resp.token),
      })
    );
  }
}
