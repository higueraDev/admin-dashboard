import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnDestroy {
  private userSubscription: Subscription;
  user: User;

  constructor(private userService: UserService) {
    this.userSubscription = this.loadUser();
  }

  get imageUrl() {
    return this.user?.imageUrl || '';
  }

  loadUser() {
    return this.userService.user().subscribe({
      next: (user) => {
        if (!user) return;
        this.user = user;
      },
    });
  }

  logout() {
    this.userService.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
