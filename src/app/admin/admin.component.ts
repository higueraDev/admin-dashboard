import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { ModalService } from '../services/modal.service';

declare function customFunctionsInit(): void;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: [],
})
export class AdminComponent implements OnInit {
  constructor(
    private settingService: SettingsService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    customFunctionsInit();
  }
}
