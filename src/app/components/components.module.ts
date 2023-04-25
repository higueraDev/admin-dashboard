import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncreaserComponent } from './increaser/increaser.component';
import { FormsModule } from '@angular/forms';
import { DonutComponent } from './donut/donut.component';
import { NgChartsModule } from 'ng2-charts';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [
    IncreaserComponent,
    DonutComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports:[
    IncreaserComponent,
    DonutComponent,
    ModalComponent
  ]
})
export class ComponentsModule { }
