import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SleepRecordComponent } from './sleep-record.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SleepRecordRoutingModule } from './sleep-record-routing.module';
import { MatCardModule } from '@angular/material/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SleepRecordComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    SleepRecordRoutingModule,
    MatCardModule,
    NgxChartsModule,
    SharedModule,
  ],
})
export class SleepRecordModule {}
