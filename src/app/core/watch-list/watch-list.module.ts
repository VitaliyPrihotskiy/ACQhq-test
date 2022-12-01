import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchListComponent } from './watch-list.component';
import { WatchListRoutingModule } from './watch-list-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [WatchListComponent],
  imports: [
    CommonModule,
    WatchListRoutingModule,
    MatCardModule,
    MatTabsModule,
    NgxChartsModule,
  ],
})
export class WatchListModule {}
