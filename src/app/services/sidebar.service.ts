import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', url: '/dashboard' },
        { title: 'Progress', url: 'progress' },
        { title: 'Graphics', url: 'graphic1' },
        { title: 'Promises', url: 'promises' },
        { title: 'Rxjs', url: 'rxjs' },
      ],
    },
    {
      title: 'Management',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Users', url: 'users' },
        { title: 'Hospitals', url: 'hospitals' },
        { title: 'Physicians', url: 'physicians' },
      ],
    },
  ];

  constructor() {}
}
