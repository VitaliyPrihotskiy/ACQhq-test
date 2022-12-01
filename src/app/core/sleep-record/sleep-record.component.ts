import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from 'angular-dark-mode';
import { curveBasis } from 'd3-shape';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
  dayCustomColors,
  dayData,
  dayDataLine,
  monthCustomColors,
  monthData,
  monthDataLine,
  sleepingStates,
  weekCustomColors,
  weekData,
  weekDataLine,
} from './data';
import { ScaleType,Color } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-sleep-record',
  templateUrl: './sleep-record.component.html',
  styleUrls: ['./sleep-record.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SleepRecordComponent implements OnInit{
  chartView = true;
  matTabLabel: HTMLElement[] | null = null;
  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;
  datesRange = [new Date(Date.now() - 604800000), Date.now()];
  averageTime = '7h 30m';
  sleepQuality = 85;
  sleepingStates = sleepingStates;
  data = [dayData, weekData, monthData];
  dataLine = [dayDataLine, weekDataLine, monthDataLine];
  customColors = [dayCustomColors, weekCustomColors, monthCustomColors];

  curve: any = curveBasis;
  customSchemeType = ScaleType.Linear;
  customColor: Color = {
    name: 'customColor',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#0B54FE', '#4743EF', '#8432DF', '#8432DF','#FC0FC0' ],
  };

  constructor(
    private darkModeService: DarkModeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.matTabLabel = Array.from(
        document.querySelectorAll('div.mat-tab-label')
      );
    }, 0);
  }

  onToggle(): void {
    this.darkModeService.toggle();
  }

  changeView(): void {
    this.chartView = this.chartView ? false : true;
  }

  goToWatchList(): void {
    this.router.navigate(['watch-list']);
  }
}
