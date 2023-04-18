import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { FileUploadService } from '../../services/file-upload.service';
import { FileCollections } from '../../enums/file-collections';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  profileForm: FormGroup;
  user: User;
  imagePreview: string;
  imageToUpload: File;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService
  ) {
    this.userSubscription = this.loadUser();
  }

  ngOnInit(): void {
    const { name, email } = this.user;
    this.profileForm = this.formBuilder.group({
      name: [name, Validators.required],
      email: [email, [Validators.required, Validators.email]],
    });
  }

  loadUser() {
    return this.userService.user().subscribe({
      next: (user) => {
        if (!user) return;
        this.user = user;
      },
    });
  }

  updateProfile() {
    this.userService.updateUser(this.profileForm.value).subscribe({
      next: (resp) => {
        this.userService.setUser(resp.user);
        Swal.fire('Success', 'Profile Updated', 'success');
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      },
    });
  }

  loadImage(e: Event) {
    this.imagePreview = '';
    const target = e.target as HTMLInputElement;
    if (!target.files) return;
    const file = target.files[0];
    if (!target.files[0]) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imagePreview = reader.result as string;
    };

    this.imageToUpload = file;
  }

  updateImage() {
    this.fileUploadService
      .upload(this.imageToUpload, FileCollections.USERS, this.user.uid)
      .subscribe({
        next: (resp) => {
          this.user.image = resp.fileName;
          this.userService.setUser(this.user);
          Swal.fire('Success', 'Image Updated', 'success');
        },
        error(error) {
          Swal.fire('Error', error.error.msg, 'error');
        },
      });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
