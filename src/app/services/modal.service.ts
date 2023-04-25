import {  Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _show: boolean = false;

  private _data: unknown  = null;

  confirmed: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  get data() {
    return this._data;
  }

  set data(data: unknown) {
    this._data = data;
  }

  get showModal() {
    return this._show;
  }

  toggleModal(){
    this._show = !this._show;
  }

}
