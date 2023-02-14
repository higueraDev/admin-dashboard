import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private _themeElement = document.querySelector('#theme');

  public themeSelected = 'default';
  public lightThemes = ['default', 'green', 'red', 'blue', 'purple', 'megna'];
  public darkThemes = [
    'default-dark',
    'green-dark',
    'red-dark',
    'blue-dark',
    'purple-dark',
    'megna-dark',
  ];

  constructor() {
    const theme = this.readTheme();
    if (theme) this.changeTheme(theme);
    else this.changeTheme(this.themeSelected);
  }

  changeTheme(theme: string) {
    this.selectTheme(theme);
    const themeUrl = `assets/css/colors/${theme}.css`;
    this._themeElement?.setAttribute('href', themeUrl);
  }

  readTheme() {
    return localStorage.getItem('theme');
  }

  saveTheme(theme: string) {
    localStorage.setItem('theme', theme);
  }

  selectTheme(theme: string) {
    this.themeSelected = theme;
  }
}
