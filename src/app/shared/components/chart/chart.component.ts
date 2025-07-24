import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas', { static: true })
  chartCanvas!: ElementRef<HTMLCanvasElement>;

  @Input() type: ChartType = 'doughnut';
  @Input() data: any = null;
  @Input() options: any = {};

  private chart: Chart | null = null;

  ngAfterViewInit(): void {
    if (this.data) {
      this.createChart();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private createChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom' as const,
          labels: {
            padding: 20,
            usePointStyle: true,
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const label = context.label || '';
              const value = context.parsed || 0;
              const percentage = ((value / this.getTotalValue()) * 100).toFixed(
                1
              );
              return `${label}: $${value.toLocaleString()} (${percentage}%)`;
            },
          },
        },
      },
    };

    const config: ChartConfiguration = {
      type: this.type,
      data: this.data,
      options: { ...defaultOptions, ...this.options },
    };

    this.chart = new Chart(ctx, config);
  }

  private getTotalValue(): number {
    if (!this.data || !this.data.datasets || !this.data.datasets[0]) return 0;
    return this.data.datasets[0].data.reduce(
      (sum: number, value: number) => sum + value,
      0
    );
  }
}
