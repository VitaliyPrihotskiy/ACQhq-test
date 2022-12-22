import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ColumnData } from './../../shared/models/column-data.model';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit,OnChanges {
  @Input() chartData: ColumnData[] = [];
  @Input() chartWidth: any;
  @Input() chartHeight: any;
  @Input() chartMetaInfo: any;

  firstChange = true;
  
  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.drawAnimation();
    }, 0);
  }

  ngOnChanges(): void {
    if (this.firstChange) {
      this.firstChange = false;
    } else {
      this.drawAnimation();
    }
  }

  drawAnimation(): void {
    const canvas = <HTMLCanvasElement>document.getElementById('barchart');
    const context = canvas.getContext('2d');
    if (context) {
      for (let i = 1; i <= 30; i++) {
        const animationStage = (1 / 30) * i;
        setTimeout(() => {
          context.clearRect(0,0, canvas.width, canvas.height);
          this.drawBarChart(context, animationStage);
          this.addHorizontalLines(context);
        }, animationStage*500);
      }
    }
  }
  addText(
    context: CanvasRenderingContext2D,
    name: string,
    xpos: number,
    ypos: number
  ): void {
    context.font = this.chartMetaInfo.columnFont;
    context.fillStyle = this.chartMetaInfo.columnTitleColor;
    context.fillText(name, xpos, ypos);
  }

  addHorizontalLines(context: CanvasRenderingContext2D): void {
    context.font = this.chartMetaInfo.leftaxisFont;
    context.fillStyle = this.chartMetaInfo.leftaxisColor;
    context.lineWidth = 0.5;
    context.strokeStyle = this.chartMetaInfo.leftaxisColor;

    const yTop = 30;
    const yBottom = this.chartHeight - 20;
    const xStart = 35;
    const xEnd = this.chartWidth - 15;

    context.beginPath();
    context.moveTo(xStart, yTop);
    context.lineTo(xEnd, yTop);
    context.stroke();
    this.addText(context, '23:00', 10, yTop);

    context.beginPath();
    context.moveTo(xStart, yBottom);
    context.lineTo(xEnd, yBottom);
    context.stroke();
    this.addText(context, '7:00', 10, yBottom);
  }

  drawBarChart(context: CanvasRenderingContext2D, animationStage:number): void {
    const maxValue = this.chartData.reduce((a, b) =>
      a.value > b.value ? a : b
    ).value;
    const yTop = 30;
    const yBottom = this.chartHeight - 20;
    const xStart = 35;
    const xEnd = this.chartWidth - 15;
    const width = (xEnd - xStart) / (this.chartData.length * 3 - 2);
    const height = yBottom - 10;

    for (let i = 0; i < this.chartData.length; i++) {
      const column = this.chartData[i];
      const x = xStart + 3 * i * width;
      //Create column
      context.fillStyle = this.getGradient(context, this.chartData[i].color);
      this.roundRect(
        context,
        x,
        yBottom,
        width,
        (column.value / maxValue) * height * animationStage
      ).fill();
      //Create shade
      context.fillStyle = this.getGradient(
        context,
        this.chartData[i].color,
        true
      );
      this.roundRect(
        context,
        x + width * 0.9,
        yBottom + width / 2,
        width,
        (column.value / maxValue) * height * animationStage
      ).fill();
      if (this.chartData.length>10) {
        if (i%2 ===0){
          this.addText(context, column.name, x + width / 4, yBottom + 15);
        }
      } else {
        this.addText(context, column.name, x + width / 4, yBottom + 15);
      }
    }
  }

  private roundRect(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r?: number
  ): CanvasRenderingContext2D {
    r = r ? r : w / 2;
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    context.beginPath();
    context.moveTo(x + r, y);
    context.arcTo(x + w, y, x + w, y - h, r);
    context.arcTo(x + w, y - h, x, y - h, r);
    context.arcTo(x, y - h, x, y, r);
    context.arcTo(x, y, x + r, y, r);
    context.closePath();
    return context;
  }

  private getGradient(
    context: CanvasRenderingContext2D,
    color: 'pink' | 'yellow',
    shade = false
  ): CanvasGradient {
    const grd = context.createLinearGradient(0, 0, 0, 200);
    if (!shade) {
      if (color === 'pink') {
        grd.addColorStop(0, '#FC0FC0');
        grd.addColorStop(1, '#0B54FE');
      } else {
        grd.addColorStop(0, '#f9c570');
        grd.addColorStop(1, '#e94275');
      }
    } else {
      if (color === 'pink') {
        grd.addColorStop(0, 'rgba(252,15,192,0.25)');
        grd.addColorStop(1, 'rgba(11,84,254,0.25)');
      } else {
        grd.addColorStop(0, 'rgba(249,197,112,0.25)');
        grd.addColorStop(1, 'rgba(233,66,117,0.25)');
      }
    }

    return grd;
  }
}
