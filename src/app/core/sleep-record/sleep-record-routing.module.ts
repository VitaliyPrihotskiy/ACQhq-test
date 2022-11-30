import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SleepRecordComponent } from './sleep-record.component';

const routes: Routes = [{ path: '', component: SleepRecordComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SleepRecordRoutingModule {}
