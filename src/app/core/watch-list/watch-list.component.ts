import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from 'angular-dark-mode';
import { curveBasis } from 'd3-shape';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import {
  dayData,
  dayLineData,
  fiveDaysData,
  fiveDaysLineData,
  fiveYearsData,
  fiveYearsLineData,
  sixMonthsData,
  sixMonthsLineData,
  threeMonthsData,
  threeMonthsLineData,
  yearData,
  yearLineData,
} from './mock-data';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss'],
})
export class WatchListComponent implements OnInit, OnDestroy {
  private readonly ngUnsubscribe = new Subject<void>();

  chartView = true;
  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;
  data = [
    { tabName: '1D', data: dayData, lineData: dayLineData, barPadding: 2 },
    {
      tabName: '5D',
      data: fiveDaysData,
      lineData: fiveDaysLineData,
      barPadding: 2,
    },
    {
      tabName: '3M',
      data: threeMonthsData,
      lineData: threeMonthsLineData,
      barPadding: 3,
    },
    {
      tabName: '6M',
      data: sixMonthsData,
      lineData: sixMonthsLineData,
      barPadding: 2,
    },
    { tabName: '1Y', data: yearData, lineData: yearLineData, barPadding: 3 },
    {
      tabName: '5Y',
      data: fiveYearsData,
      lineData: fiveYearsLineData,
      barPadding: 2,
    },
  ];

  customColor: Color = {
    name: 'customColor',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#FC0FC0', '#8432DF', '#8432DF', '#4743EF', '#0B54FE'],
  };
  customSchemeType = ScaleType.Linear;
  curve: any = curveBasis;

  open = dayData.at(0)?.value;
  current = dayData.at(-1)?.value;
  high = Math.max(...dayData.map((o) => o.value));
  low = Math.min(...dayData.map((o) => o.value));
  change: number = 0;
  changePercent: number = 0;

  constructor(
    private darkModeService: DarkModeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.open && this.current) {
      this.change = this.open - this.current;
      this.changePercent = this.change / this.current;
    }
    setTimeout(() => {
      let matTabLabel = Array.from(
        document.querySelectorAll<HTMLElement>('div.mat-tab-label')
      );
      matTabLabel.forEach((item) => {
        item.style.minWidth = '0px';
        item.style.width = '45px';
        item.style.padding = '1';
        item.style.color = '#c2c4d1';
      });
    }, 0);
    this.darkMode$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((value) => {
      const content = document.querySelector<HTMLElement>('div.content');
      const analytics = document.querySelector<HTMLElement>('div.analytics');
      if (content && analytics) {
        content.style.backgroundColor = value ? '#102957' : '#ffffff' ;
        analytics.style.backgroundColor = value ? '#0b2551' : '#ffffff' ;
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onToggle(): void {
    this.darkModeService.toggle();
  }

  changeView(): void {
    this.chartView = this.chartView ? false : true;
  }

  goToSleepRecord(): void {
    this.router.navigate(['sleep-record']);
  }
}
