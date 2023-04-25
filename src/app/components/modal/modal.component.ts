import { Component } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { Collections } from '../../enums/collections';
import Swal from 'sweetalert2';
import { User } from '../../models/user';
import { ModalService } from '../../services/modal.service';
import { Factories } from '../../utils/factories';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [],
})
export class ModalComponent {
  user: User;
  imagePreview: string;
  imageToUpload: File;
  imageUrl: string;

  constructor(
    private fileUploadService: FileUploadService,
    public modalService: ModalService
  ) {
    this.loadUser();
  }

  loadUser() {
    const user = Factories.buildUser(this.modalService.data as User);
    this.user = user;
    this.imageUrl = this.user.imageUrl;
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
    this.modalService.toggleModal();
    this.fileUploadService
      .upload(this.imageToUpload, Collections.USERS, this.user.uid)
      .subscribe({
        next: () => {
          this.modalService.confirmed.next(true);
          Swal.fire('Success', 'Image Updated', 'success');
        },
        error(error) {
          Swal.fire('Error', error.error.msg, 'error');
        },
      });
  }
}
