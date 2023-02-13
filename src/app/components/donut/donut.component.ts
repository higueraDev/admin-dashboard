import { Component, Input, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [],
})
export class DonutComponent implements OnInit {
  @Input() title = '';
  @Input() labels: string[] = [];
  @Input() data: number[] = [];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{ data: [] }],
  };

  ngOnInit(): void {
    this.doughnutChartData.labels = this.labels;
    this.doughnutChartData.datasets[0].data = this.data
  }
}
