import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SleepRecordModule } from './sleep-record/sleep-record.module';
import { WatchListModule } from './watch-list/watch-list.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SleepRecordModule,
    WatchListModule
  ]
})
export class CoreModule { }
