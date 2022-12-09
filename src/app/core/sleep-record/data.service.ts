import { Injectable } from '@angular/core';
import { ColumnData } from './../../shared/models/column-data.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  weekData: ColumnData[] = [
    {
      name: 'S',
      value: 22,
      color: 'pink',
    },
    {
      name: 'M',
      value: 19,
      color: 'yellow',
    },
    {
      name: 'T',
      value: 24,
      color: 'pink',
    },
    {
      name: 'W',
      value: 22,
      color: 'pink',
    },
    {
      name: 'T',
      value: 19,
      color: 'yellow',
    },
    {
      name: 'F',
      value: 18,
      color: 'pink',
    },
    {
      name: 'S',
      value: 21,
      color: 'pink',
    },
  ];

  weekDataLine = [
    {
      name: 'Sleep Record',
      series: this.weekData,
    },
  ];

  dayData: ColumnData[];
  dayDataLine: { name: string; series: ColumnData[] }[];

  monthData: ColumnData[];
  monthDataLine: { name: string; series: ColumnData[] }[];

  constructor() {
    const accDay: ColumnData[] = [];
    for (let time = 0; time <= 24; time++) {
      const randomValue = 18 + Math.floor(Math.random() * 6);
      accDay.push({ name: time.toString(), value: randomValue, color: 'pink' });
    }
    this.dayData = accDay;
    this.dayDataLine = [
      {
        name: 'Sleep Record',
        series: this.dayData,
      },
    ];
    const accMonth: ColumnData[] = [];

    for (let date = 1; date <= 30; date++) {
      const randomValue = 18 + Math.floor(Math.random() * 6);
      accMonth.push({ name: date.toString(), value: randomValue, color: 'pink' });
    }
    this.monthData = accMonth;

    this.monthDataLine = [
      {
        name: 'Sleep Record',
        series: this.monthData,
      },
    ];
  }
}
