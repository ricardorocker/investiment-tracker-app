import { Injectable } from '@angular/core';
import { PortfolioSummary } from '../models/portfolio-summary';
import { delay, Observable, of } from 'rxjs';
import { Investment } from '../models/investment';

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  constructor() {}

  getPortfolioSummary(): Observable<PortfolioSummary> {
    const mockSummary: PortfolioSummary = {
      totalInvested: 125000,
      currentValue: 142350,
      totalReturn: 17350,
      totalReturnPercentage: 13.88,
      monthlyChange: 2450,
      monthlyChangePercentage: 1.75,
    };

    return of(mockSummary).pipe(delay(800));
  }

  getInvestments(): Observable<Investment[]> {
    const mockInvestments: Investment[] = [
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

    return of(mockInvestments).pipe(delay(1200));
  }

  refreshData(): Observable<boolean> {
    return of(true).pipe(delay(2000));
  }

  getAssetAllocation(): Observable<
    { type: string; value: number; percentage: number }[]
  > {
    const mockAllocation = [
      { type: 'Stocks', value: 60850, percentage: 42.8 },
      { type: 'Funds', value: 44200, percentage: 31.1 },
      { type: 'Crypto', value: 18900, percentage: 13.3 },
      { type: 'Bonds', value: 15400, percentage: 10.8 },
      { type: 'Cash', value: 3000, percentage: 2.1 },
    ];

    return of(mockAllocation).pipe(delay(600));
  }
}
