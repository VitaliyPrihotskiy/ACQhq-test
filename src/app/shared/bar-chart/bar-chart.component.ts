import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  @Input() chartData: any;
  @Input() chartWidth: any;
  @Input() chartHeight: any;
  @Input() chartMetaInfo: any;

  @Input() chartContainerWidth: number = 400;
  @Input() chartContainerHeight: number = 300;

  constructor() {}

  ngOnInit() {
    const canvas = <HTMLCanvasElement>document.getElementById('barchart');
    const context = canvas.getContext('2d');
    if (context) {
      context.fillStyle = '#262a33';
      context.fillRect(0, 0, this.chartWidth, this.chartHeight);
      this.drawBarChart(context);
      this.addTitleToChart(context);
      this.addFooterToChart(context);
      this.addHorizontalLines(context);
    }
  }

  addTitleToChart(context: CanvasRenderingContext2D): void {
    context.font = this.chartMetaInfo.titleFont;
    context.fillStyle = this.chartMetaInfo.titleColor;
    context.fillText(this.chartMetaInfo.title, 100, 30);
  }

  addFooterToChart(context: CanvasRenderingContext2D): void {
    context.font = this.chartMetaInfo.footerFont;
    context.fillStyle = this.chartMetaInfo.footerColor;
    context.fillText(
      this.chartMetaInfo.footerTitle,
      this.chartWidth / 2,
      this.chartHeight - 10
    );
  }

  addColumnName(
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

    for (var i = 0; i < 11; i++) {
      context.lineWidth = 0.5;
      context.beginPath();
      context.moveTo(25, 20 * i + 40);
      context.lineTo(475, 20 * i + 40);
      context.strokeStyle = this.chartMetaInfo.leftaxisColor;
      context.stroke();
    }
  }

  addColumnHead(
    context: CanvasRenderingContext2D,
    name: string,
    xpos: number,
    ypos: number
  ): void {
    context.font = this.chartMetaInfo.columnFont;
    context.fillStyle = this.chartMetaInfo.columnTitleColor;
    context.fillText(name, xpos, ypos);
  }

  drawBarChart(context: CanvasRenderingContext2D): void {
    for (let cricketer = 0; cricketer < this.chartData.length; cricketer++) {
      context.fillStyle = '#36b5d8';
      let cricketerInfo = this.chartData[cricketer];
      context.fillRect(
        25 + cricketer * 100,
        this.chartHeight - cricketerInfo['centuries'] * 2 - 60,
        50,
        cricketerInfo['centuries'] * 2
      );
      this.addColumnName(
        context,
        cricketerInfo.name,
        25 + cricketer * 100,
        this.chartHeight - 40
      );
      this.addColumnHead(
        context,
        cricketerInfo['centuries'],
        45 + cricketer * 100,
        this.chartHeight - cricketerInfo['centuries'] * 2 - 65
      );
    }
  }
}
