import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-circle-progress-bar',
  templateUrl: './circle-progress-bar.component.html',
  styleUrls: ['./circle-progress-bar.component.scss'],
})
export class CircleProgressBarComponent implements OnInit, OnChanges {
  @Input() barName: string = 'default';
  @Input() percent: number = 0;
  @Input() outerStrokeColor!: 'pink' | 'yellow' | 'blue';
  @Input() innerStrokeColor!: string;

  canvasClassName!: string;
  procentClassName!: string;
  private canvas!: HTMLCanvasElement;
  private spanProcent!: HTMLElement;
  private context!: CanvasRenderingContext2D | null;
  private gradient!: CanvasGradient;
  private firstChange = true;

  constructor() {}

  ngOnInit(): void {
    this.canvasClassName = 'canvas-' + this.barName;
    this.procentClassName = 'procent-' + this.barName;

    setTimeout(() => {
      this.canvas = <HTMLCanvasElement>(
        document.getElementsByClassName(this.canvasClassName)[0]
      );
      this.spanProcent = <HTMLElement>(
        document.getElementsByClassName(this.procentClassName)[0]
      );
      if (this.canvas) {
        this.context = this.canvas.getContext('2d');
      }
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
    if (this.context) {
      this.gradient = this.getGradient(this.context, this.outerStrokeColor);
    }
    if (this.context) {
      const posX = this.canvas.width / 2;
      const posY = this.canvas.height / 2;
      const fps = 500 / this.percent;
      const result = this.percent;
      let procent = 0;

      this.context.lineCap = 'round';

      let acrInterval = setInterval(() => {
        procent += 1;
        if (this.context) {
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

          this.spanProcent.innerHTML = procent.toFixed();

          this.context.beginPath();
          this.context.arc(
            posX,
            posY,
            35,
            (Math.PI / 180) * 270,
            (Math.PI / 180) * (270 + 360)
          );
          this.context.strokeStyle = this.innerStrokeColor;
          this.context.lineWidth = 5;
          this.context.stroke();

          this.context.beginPath();
          this.context.strokeStyle = this.gradient;
          this.context.lineWidth = 5;
          this.context.arc(
            posX,
            posY,
            35,
            (Math.PI / 180) * 270,
            (Math.PI / 180) * (270 + (360 / 100) * procent)
          );
          this.context.stroke();
          if (procent >= result) clearInterval(acrInterval);
        }
      }, fps);
    }
  }

  private getGradient(
    context: CanvasRenderingContext2D,
    color: 'pink' | 'yellow' | 'blue'
  ): CanvasGradient {
    const grd = context.createLinearGradient(0, 0, 0, 200);
    switch (color) {
      case 'pink':
        grd.addColorStop(0, '#FC0FC0');
        grd.addColorStop(1, '#0B54FE');
        break;
      case 'yellow':
        grd.addColorStop(0, '#f9c570');
        grd.addColorStop(1, '#e94275');
        break;
      case 'blue':
        grd.addColorStop(0, '#3c85e8');
        grd.addColorStop(1, '#2d3bf2');
        break;
    }
    return grd;
  }
}
