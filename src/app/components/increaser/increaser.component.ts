import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: [],
})
export class IncreaserComponent {
  @Input('value') progress: number = 0;
  @Input() buttonClass: string = 'btn-info';
  @Output() change: EventEmitter<number> = new EventEmitter();

  setProgressByClick(value: number) {
    const result = (this.progress += value);
    const validatedValue = this.validProgress(result);
    this.progress = validatedValue;
    this.change.emit(validatedValue);
  }

  setProgressByInput(value: number) {
    this.validProgress(value);
  }

  validProgress(value: number): number {
    if (value < 0) return 0;

    if (value > 100) return 100;

    return value;
  }
}
