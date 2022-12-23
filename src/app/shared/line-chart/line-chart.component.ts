import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ColumnData } from './../../shared/models/column-data.model';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input() chartData: ColumnData[] = [];
  @Input() chartWidth: any;
  @Input() chartHeight: any;
  @Input() chartMetaInfo: any;

  firstChange = true;

  yTop = 30;
  xStart = 35;
  yBottom!: number;
  xEnd!: number;
  maxValue!: number;
  width!: number;
  height!: number;

  constructor() {}

  ngOnInit(): void {
    this.setConstants();
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
    const chartValuesLength = this.chartData.length;

    if (context) {
      for (let i = 1; i < chartValuesLength; i++) {
        const animationStage = (1 / chartValuesLength) * i;
        setTimeout(() => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          this.drawLineChart(context, i);
          this.addHorizontalLines(context);
        }, animationStage * 500);
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

    context.beginPath();
    context.moveTo(this.xStart, this.yTop);
    context.lineTo(this.xEnd, this.yTop);
    context.stroke();
    this.addText(context, '23:00', 10, this.yTop);

    context.beginPath();
    context.moveTo(this.xStart, this.yBottom);
    context.lineTo(this.xEnd, this.yBottom);
    context.stroke();
    this.addText(context, '7:00', 10, this.yBottom);

    for (let i = 0; i < this.chartData.length; i++) {
      this.addText(
        context,
        this.chartData[i].name,
        this.xStart + this.width * i,
        this.yBottom + 15
      );
    }
  }

  drawLineChart(
    context: CanvasRenderingContext2D,
    animationStage: number
  ): void {
    const chartValues = this.chartData
      .slice()
      .map((v) => (v.value / this.maxValue) * this.height);

    context.fillStyle = this.getGradient(context);
    this.createLine(
      context,
      this.xStart,
      this.yBottom,
      this.width,
      chartValues,
      animationStage
    );
    //Create shade
    context.fillStyle = this.getGradient(context, true);
    context.lineWidth = 3;
    this.createLine(
      context,
      this.xStart + this.width / 2,
      this.yBottom + this.width / 2,
      this.width,
      chartValues,
      animationStage
    );
  }

  private createLine(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    values: number[],
    animationStage: number
  ): CanvasRenderingContext2D {
    
    context.beginPath();
    console.log(x, y, w, values);
    context.moveTo(120, 20);

    context.moveTo(x, y - values[0]);
    for (let i = 1; i < animationStage; i++) {
      const prevVal = values[i - 1];
      const curVal = values[i];
      context.lineTo(x+w*i,y-curVal)
      // context.arcTo(x + w * i,y - curVal,)
      // if (prevVal < curVal) {
      //   context.quadraticCurveTo(
      //     x + w / 2 + w * (i - 1),
      //     y - (curVal - prevVal) / 2 - w / 2,
      //     x + w * i,
      //     y - curVal
      //   );
      // } else {
      //   context.quadraticCurveTo(
      //     x + w / 2 + w * (i - 1),
      //     y + (prevVal - curVal) / 2 + w / 2,
      //     x + w * i,
      //     y - curVal
      //   );
      // }
    }
    context.stroke();
    return context;
  }

  private getGradient(
    context: CanvasRenderingContext2D,
    shade = false
  ): CanvasGradient {
    const grd = context.createLinearGradient(0, 0, 0, 200);
    if (!shade) {
      grd.addColorStop(0, '#4dacdc');
      grd.addColorStop(1, '#c92867');
    } else {
      grd.addColorStop(0, 'rgba(77,172,220,0.25)');
      grd.addColorStop(1, 'rgba(172,40,101,0.25)');
    }

    return grd;
  }

  setConstants(): void {
    this.yBottom = this.chartHeight - 20;
    this.xEnd = this.chartWidth - 15;
    this.maxValue = this.chartData.reduce((a, b) =>
      a.value > b.value ? a : b
    ).value;
    this.width = (this.xEnd - this.xStart) / (this.chartData.length - 1);
    this.height = this.yBottom - 10;
  }
}
