import { Component, OnDestroy } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnDestroy {
  private userSubscription: Subscription;
  user: User;
  menuItems: any[] = [];

  constructor(
    private sidebarService: SidebarService,
    private userService: UserService
  ) {
    this.menuItems = sidebarService.menu;
    this.userSubscription = this.loadUser();
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
