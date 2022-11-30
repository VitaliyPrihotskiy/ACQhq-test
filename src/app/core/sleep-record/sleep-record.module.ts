import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SleepRecordComponent } from './sleep-record.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SleepRecordRoutingModule } from './sleep-record-routing.module';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MatCardModule } from '@angular/material/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [SleepRecordComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    SleepRecordRoutingModule,
    MatCardModule,
    NgxChartsModule,
    NgCircleProgressModule.forRoot({
      radius: 35,
      space: -5,
      outerStrokeWidth: 5,
      innerStrokeWidth: 5,
      animation: true,
      animationDuration: 300,
      showSubtitle: false,
      titleFontWeight: '700',
      unitsFontSize: '20',
      outerStrokeGradient: true,
    }),
  ],
})
export class SleepRecordModule {}
