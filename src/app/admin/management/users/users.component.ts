import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { SearchService } from '../../../services/search.service';
import { Collections } from '../../../enums/collections';
import Swal from 'sweetalert2';
import { Roles } from '../../../enums/roles';
import { ModalService } from '../../../services/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit, OnDestroy {
  private _users: User[];
  private _filteredUsers: User[];
  private _totalUsers: number = 0;
  from: number = 0;
  size: number = 5;
  loading: boolean = true;
  searching: boolean = false;
  modalSubscription: Subscription

  constructor(
    private userService: UserService,
    private searchService: SearchService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.modalSubscription = this.modalService.confirmed.subscribe({
      next: () => this.getUsers(),
    });
  }

  get totalUsers() {
    if (!this.searching) return this._totalUsers;
    return this._filteredUsers.length;
  }

  get users() {
    const users = this.searching ? this._filteredUsers : this._users;
    return users.filter((user) => user.uid !== this.userService.uid);
  }

  get prevPage() {
    return this.from - this.size >= 0;
  }

  get nextPage() {
    return this.from + this.size < this._totalUsers;
  }

  get roles() {
    return Object.values(Roles);
  }

  getUsers() {
    this.userService.getUsers(this.from).subscribe({
      next: ({ total, users }) => {
        this._users = users;
        this._totalUsers = total;
        this.loading = false;
      },
    });
  }

  changePage(next: boolean) {
    if (next) this.from += this.size;
    else this.from -= this.size;
    this.getUsers();
  }

  searchByCollection(term: string) {
    if (!term) this.searching = false;
    else {
      this.searchService.searchByCollection(Collections.USERS, term).subscribe({
        next: (result) => {
          this._filteredUsers = result as User[];
          this.searching = true;
        },
      });
    }
  }

  onRemove(user: User) {
    Swal.fire({
      title: 'User removal',
      text: `Are you sure you want to remove ${user.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) this.removeUser(user.uid);
    });
  }

  removeUser(id: User['uid']) {
    this.userService.removeUser(id).subscribe({
      next: () => {
        this.from = 0;
        this.getUsers();
        Swal.fire({
          text: 'User removed successfully',
          icon: 'success',
        });
      },
      error: (err) => {
        Swal.fire({
          text: err.error.msg,
          icon: 'error',
        });
      },
    });
  }

  changeRole(user: User) {
    this.userService.updateUser(user).subscribe({
      next: () => {
        this.getUsers();
        Swal.fire({
          text: 'User updated successfully',
          icon: 'success',
        });
      },
    });
  }

  updateUserImage(user: User) {
    this.modalService.data = user;
    this.modalService.toggleModal();
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }

}
