import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'sleep-record', pathMatch: 'full' },
  { path: 'sleep-record', loadChildren: () => import('./core/sleep-record/sleep-record.module').then( (m) => m.SleepRecordModule )},
  { path: 'watch-list', loadChildren: () => import('./core/watch-list/watch-list.module').then( (m) => m.WatchListModule )},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

