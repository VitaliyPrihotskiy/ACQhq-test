import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchListComponent } from './watch-list.component';
import { WatchListRoutingModule } from './watch-list-routing.module';



@NgModule({
  declarations: [
    WatchListComponent
  ],
  imports: [
    CommonModule,
    WatchListRoutingModule
  ]
})
export class WatchListModule { }
