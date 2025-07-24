import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import { ChartComponent } from '../../shared/components/chart/chart.component';
import { PortfolioSummary } from '../../core/models/portfolio-summary';
import { Investment } from '../../core/models/investment';
import { InvestmentService } from '../../core/services/investment.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, CommonModule, ChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  portfolioSummary: PortfolioSummary | null = null;
  investments: Investment[] = [];
  isLoadingSummary = true;
  isLoadingInvestments = true;
  isLoadingAllocation = true;
  isRefreshing = false;

  chartData: any = null;
  chartOptions: any = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          usePointStyle: true,
          font: {
            size: 11,
          },
        },
      },
    },
  };

  constructor(private investmentService: InvestmentService) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loadPortfolioSummary();
    this.loadInvestments();
    this.loadAssetAllocation();
  }

  private loadPortfolioSummary(): void {
    this.investmentService.getPortfolioSummary().subscribe({
      next: (summary) => {
        this.portfolioSummary = summary;
        this.isLoadingSummary = false;
      },
      error: () => {
        this.isLoadingSummary = false;
      },
    });
  }

  private loadInvestments(): void {
    this.investmentService.getInvestments().subscribe({
      next: (investments) => {
        this.investments = investments;
        this.isLoadingInvestments = false;
      },
      error: () => {
        this.isLoadingInvestments = false;
      },
    });
  }

  private loadAssetAllocation(): void {
    this.investmentService.getAssetAllocation().subscribe({
      next: (allocation) => {
        this.isLoadingAllocation = false;
        this.createChartData(allocation);
      },
      error: () => {
        this.isLoadingAllocation = false;
      },
    });
  }

  private createChartData(
    allocation: { type: string; value: number; percentage: number }[]
  ): void {
    const colors = ['#061d40', '#3861be', '#46825a', '#6b7280', '#f59e0b'];

    this.chartData = {
      labels: allocation.map((item) => item.type),
      datasets: [
        {
          data: allocation.map((item) => item.value),
          backgroundColor: colors.slice(0, allocation.length),
          borderWidth: 2,
          borderColor: '#ffffff',
        },
      ],
    };
  }

  refreshData(): void {
    this.isRefreshing = true;
    this.investmentService.refreshData().subscribe({
      next: () => {
        this.loadData();
        this.isRefreshing = false;
      },
      error: () => {
        this.isRefreshing = false;
      },
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }

  formatPercentage(percentage: number): string {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  }

  getReturnColorClass(returnValue: number): string {
    return returnValue >= 0 ? 'text-green-600' : 'text-red-600';
  }

  getTypeColorClass(type: string): string {
    const colorMap: { [key: string]: string } = {
      stock: 'bg-blue-100 text-blue-800',
      fund: 'bg-green-100 text-green-800',
      crypto: 'bg-yellow-100 text-yellow-800',
      bond: 'bg-gray-100 text-gray-800',
    };
    return colorMap[type] || 'bg-gray-100 text-gray-800';
  }

  getTypeLabel(type: string): string {
    const labelMap: { [key: string]: string } = {
      stock: 'Stock',
      fund: 'Fund',
      crypto: 'Crypto',
      bond: 'Bond',
    };
    return labelMap[type] || type;
  }
}
