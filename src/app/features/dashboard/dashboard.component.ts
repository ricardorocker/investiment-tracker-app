import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  portfolioSummary: {
    totalInvested: number;
    currentValue: number;
    totalReturn: number;
    totalReturnPercentage: number;
    monthlyChange: number;
    monthlyChangePercentage: number;
  } = {
    totalInvested: 125000,
    currentValue: 142350,
    totalReturn: 17350,
    totalReturnPercentage: 13.88,
    monthlyChange: 2450,
    monthlyChangePercentage: 1.75,
  };
  investments: {
    id: string;
    name: string;
    type: 'stock' | 'fund' | 'crypto' | 'bond';
    investedAmount: number;
    currentValue: number;
    return: number;
    returnPercentage: number;
    symbol: string;
  }[] = [
    {
      id: '1',
      name: 'Apple Inc.',
      type: 'stock',
      symbol: 'AAPL',
      investedAmount: 25000,
      currentValue: 28750,
      return: 3750,
      returnPercentage: 15.0,
    },
    {
      id: '2',
      name: 'Vanguard S&P 500 ETF',
      type: 'fund',
      symbol: 'VOO',
      investedAmount: 40000,
      currentValue: 44200,
      return: 4200,
      returnPercentage: 10.5,
    },
    {
      id: '3',
      name: 'Bitcoin',
      type: 'crypto',
      symbol: 'BTC',
      investedAmount: 15000,
      currentValue: 18900,
      return: 3900,
      returnPercentage: 26.0,
    },
    {
      id: '4',
      name: 'Microsoft Corporation',
      type: 'stock',
      symbol: 'MSFT',
      investedAmount: 30000,
      currentValue: 32100,
      return: 2100,
      returnPercentage: 7.0,
    },
    {
      id: '5',
      name: 'US Treasury Bond',
      type: 'bond',
      symbol: 'UST',
      investedAmount: 15000,
      currentValue: 15400,
      return: 400,
      returnPercentage: 2.67,
    },
  ];
  isLoadingSummary = true;
  isLoadingInvestments = true;
  isLoadingAllocation = true;
  isRefreshing = false;

  chartData: any = null;

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loadPortfolioSummary();
    this.loadInvestments();
    this.loadAssetAllocation();
  }

  private loadPortfolioSummary(): void {
    setTimeout(() => {
      this.isLoadingSummary = false;
    }, 1000);
  }

  private loadInvestments(): void {
    setTimeout(() => {
      this.isLoadingInvestments = false;
    }, 1000);
  }

  private loadAssetAllocation(): void {
    setTimeout(() => {
      this.isLoadingAllocation = false;
    }, 1000);
  }

  refreshData(): void {
    this.isRefreshing = true;

    setTimeout(() => {
      this.isRefreshing = false;
    }, 1000);
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
      'stock': 'bg-blue-100 text-blue-800',
      'fund': 'bg-green-100 text-green-800',
      'crypto': 'bg-yellow-100 text-yellow-800',
      'bond': 'bg-gray-100 text-gray-800'
    };
    return colorMap[type] || 'bg-gray-100 text-gray-800';
  }

  getTypeLabel(type: string): string {
    const labelMap: { [key: string]: string } = {
      'stock': 'Stock',
      'fund': 'Fund',
      'crypto': 'Crypto',
      'bond': 'Bond'
    };
    return labelMap[type] || type;
  }
}
