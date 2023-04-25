import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Collections } from '../enums/collections';
import { environment } from '../../environments/environment';
import { SearchResponse } from '../interfaces/search-response';
import { map } from 'rxjs';
import { Factories } from '../utils/factories';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient, private userService: UserService) {}

  searchByCollection(collection: Collections, term: string) {
    const url = `${baseUrl}/search/collection/${collection}/${term}`;
    return this.http
      .get<SearchResponse>(url, this.userService.headers)
      .pipe(
        map((resp) =>
          resp.result.map((item) => Factories.build(collection, item))
        )
      );
  }
}
