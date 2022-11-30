import { Component, OnInit ,ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-sleep-record',
  templateUrl: './sleep-record.component.html',
  styleUrls: ['./sleep-record.component.scss'],
  encapsulation:ViewEncapsulation.None,
  
})
export class SleepRecordComponent implements OnInit {
  datesRange = [new Date(Date.now() - 604800000), Date.now()];
  averageTime = '7h 30m';
  sleepQuality = 85;
  sleepingStates = [
    { rate: 20, name: 'Awake', outerStrokeColor:"#fff164",  outerStrokeGradientStopColor:"#ff1e00"},
    { rate: 50, name: 'Light', outerStrokeColor:"#fc5bff",  outerStrokeGradientStopColor:"#9500ff" },
    { rate: 30, name: 'Deep', outerStrokeColor:"#1d88ff",  outerStrokeGradientStopColor:"#0200d1" },
  ];
  constructor() {}

  ngOnInit(): void {}
}
