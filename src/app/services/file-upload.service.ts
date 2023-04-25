import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Collections } from '../enums/collections';
import { UserService } from './user.service';
import { FileUploadResponse } from '../interfaces/file-upload-response';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient, private userService: UserService) {}

  private createFormData(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    return formData;
  }

  upload(file: File, collection: Collections, id: string) {
    return this.http.put<FileUploadResponse>(
      `${base_url}/upload/${collection}/${id}`,
      this.createFormData(file),
      {
        headers: {
          'auth-token': this.userService.token,
        },
      }
    );
  }
}
