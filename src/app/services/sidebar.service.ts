import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public menu: any[] = [
    {
      title: 'dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', url: '' },
        { title: 'Progress', url: 'progress' },
        { title: 'Graphic1', url: 'graphic1' },
      ],
    },
  ];

  constructor() {}
}
