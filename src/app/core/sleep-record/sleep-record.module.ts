import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SleepRecordComponent } from './sleep-record.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SleepRecordRoutingModule } from './sleep-record-routing.module';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [SleepRecordComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    SleepRecordRoutingModule,
    MatCardModule,
    NgCircleProgressModule.forRoot(),
  ],
})
export class SleepRecordModule {}
