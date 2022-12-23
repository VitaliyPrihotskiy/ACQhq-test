import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { CircleProgressBarComponent } from './circle-progress-bar/circle-progress-bar.component';
import { LineChartComponent } from './line-chart/line-chart.component';



@NgModule({
  declarations: [
    BarChartComponent,
    CircleProgressBarComponent,
    LineChartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BarChartComponent,
    CircleProgressBarComponent,
    LineChartComponent
  ]
})
export class SharedModule { }
