import { ElementRef, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';

declare const google: any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class GoogleService {
  constructor(private ngZone: NgZone, private router: Router, private http: HttpClient) {}

  renderButton(button: ElementRef) {
    google.accounts.id.renderButton(
      button.nativeElement,
      { theme: 'outline', size: 'large' } // customization attributes
    );
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id:
        '758111435129-0f4qvpo96i0q22j62bf41fi8k3em1u58.apps.googleusercontent.com',
      callback: (response: any) => this.handleLogin(response.credential),
    });
  }

  private handleLogin(credential: string) {
    this.login(credential).subscribe({
      next: () =>
        this.ngZone.run(() => this.router.navigateByUrl('/dashboard')),
      error: (error) =>
        Swal.fire('Error', error.error.errors.token.msg, 'error'),
    });
  }


  revokeGoogleToken(email: string) {
    google.accounts.id.revoke(email);
  }

  private login(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap({
        next: (resp: any) => localStorage.setItem('token', resp.token),
      })
    );
  }
}
