import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [],
})
export class AccountSettingsComponent {
  constructor(private settingsService: SettingsService) {}

  handleTheme(theme: string) {
    this.settingsService.changeTheme(theme);
    this.settingsService.saveTheme(theme);
  }

  get lightThemes() {
    return this.settingsService.lightThemes;
  }

  get darkThemes() {
    return this.settingsService.darkThemes;
  }

  get themeSelected() {
    return this.settingsService.themeSelected;
  }
}
