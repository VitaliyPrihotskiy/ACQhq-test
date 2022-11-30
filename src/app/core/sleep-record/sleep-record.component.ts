import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sleep-record',
  templateUrl: './sleep-record.component.html',
  styleUrls: ['./sleep-record.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SleepRecordComponent implements OnInit {
  private readonly ngUnsubscribe = new Subject<void>();
  matTabLabel: HTMLElement[] | null = null;
  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;
  datesRange = [new Date(Date.now() - 604800000), Date.now()];
  averageTime = '7h 30m';
  sleepQuality = 85;
  sleepingStates = [
    {
      rate: 20,
      name: 'Awake',
      outerStrokeColor: '#fac770',
      outerStrokeGradientStopColor: '#e83f75',
    },
    {
      rate: 50,
      name: 'Light',
      outerStrokeColor: '#f94ff0',
      outerStrokeGradientStopColor: '#7e24fc',
    },
    {
      rate: 30,
      name: 'Deep',
      outerStrokeColor: '#3c81e8',
      outerStrokeGradientStopColor: '#2c3ff3',
    },
  ];

  data = [
    {
      name: 'Mon',
      value: 40,
    },
    {
      name: 'Tue',
      value: 50,
    },
    {
      name: 'Wed',
      value: 50,
    },
    {
      name: 'Thr',
      value: 50,
    },
    {
      name: 'Fri',
      value: 50,
    },
    {
      name: 'Sat',
      value: 50,
    },
    {
      name: 'Sun',
      value: 50,
    },
  ];

  lineData = [
    {
      name: '',
      series: [...this.data],
    },
  ];
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };

  constructor(private darkModeService: DarkModeService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.matTabLabel = Array.from(
        document.querySelectorAll('div.mat-tab-label')
      );
    }, 0);
    this.darkMode$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((value) => {
      if (this.matTabLabel) {
        const color = value === true ? '#ffffff' : '#000000';
        this.matTabLabel.forEach((elem) => (elem.style.color = color));
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onToggle(): void {
    this.darkModeService.toggle();
    // this.matTabLabel?.style.color =
  }
}
