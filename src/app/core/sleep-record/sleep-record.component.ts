import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from 'angular-dark-mode';
import { curveBasis } from 'd3-shape';
import { Observable } from 'rxjs';
import { sleepingStates } from './data';
import { ScaleType, Color } from '@swimlane/ngx-charts';
import { DataService } from './data.service';

@Component({
  selector: 'app-sleep-record',
  templateUrl: './sleep-record.component.html',
  styleUrls: ['./sleep-record.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SleepRecordComponent implements OnInit {
  currentTab = 2;
  chartBarView = true;
  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;
  modeColor!: string;
  datesRange = [new Date(Date.now() - 604800000), Date.now()];
  averageTime = '7h 30m';
  sleepQuality = 85;
  sleepingStates = sleepingStates;
  chartData = this.dataService.weekData;

  curve: any = curveBasis;
  customSchemeType = ScaleType.Linear;
  customColor: Color = {
    name: 'customColor',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#0B54FE', '#4743EF', '#8432DF', '#8432DF', '#FC0FC0'],
  };

  constructor(
    private darkModeService: DarkModeService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.darkMode$.subscribe(
      (mode) => (this.modeColor = !mode ? '#c2c4d1' : '#000000')
    );
    this.changeCurrentTab(2);
  }

  onToggle(): void {
    this.darkModeService.toggle();
  }

  changeView(): void {
    this.chartBarView = this.chartBarView ? false : true;
  }

  goToWatchList(): void {
    this.router.navigate(['watch-list']);
  }

  changeCurrentTab(tab: number): void {
    this.currentTab = tab;
    const tabs = <HTMLElement[]>(
      Array.from(document.getElementsByClassName('chart-tab'))
    );
    tabs.forEach((tab) => (tab.style.color = this.modeColor));
    tabs[tab - 1].style.color =
      this.modeColor !== '#c2c4d1' ? '#c2c4d1' : '#000000';

    const inkBarRow = <HTMLElement>document.getElementById('ink-bar-row');
    switch (tab) {
      case 1:
        inkBarRow.style.justifyContent = 'start';
        this.chartData = this.dataService.dayData;
        break;
      case 2:
        inkBarRow.style.justifyContent = 'center';
        this.chartData = this.dataService.weekData;
        break;
      case 3:
        inkBarRow.style.justifyContent = 'end';
        this.chartData = this.dataService.monthData;
        break;
    }
  }

  metaInfo = {
    // 'title':'Indian cricketers',
    // 'titleColor':'#c1d0cd',
    // 'titleFont': '20px sans-serif',
    columnTitleColor: '#c2c4d1',
    columnFont: '8px sans-serif',
    // 'footerTitle':'Cricketer',
    // 'footerColor':'#c1d0cd',
    // 'footerFont': '12px sans-serif',
    leftaxisColor: '#c1d0cd',
    leftaxisFont: '8px sans-serif',
  };
}
