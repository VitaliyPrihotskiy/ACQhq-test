import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { CircleProgressBarComponent } from './circle-progress-bar/circle-progress-bar.component';



@NgModule({
  declarations: [
    BarChartComponent,
    CircleProgressBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BarChartComponent,
    CircleProgressBarComponent
  ]
})
export class SharedModule { }
