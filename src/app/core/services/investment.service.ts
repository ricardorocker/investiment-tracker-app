import { Injectable } from '@angular/core';
import { PortfolioSummary } from '../models/portfolio-summary';
import { delay, Observable, of } from 'rxjs';
import { Investment } from '../models/investment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  private apiUrl = 'https://covsindf59.execute-api.us-east-2.amazonaws.com/dev';

  constructor(private http: HttpClient) {}

  getPortfolioSummary(): Observable<PortfolioSummary> {
    return this.http.get<PortfolioSummary>(`${this.apiUrl}/portfolio-summary`);
  }

  getInvestments(): Observable<Investment[]> {
    return this.http.get<Investment[]>(`${this.apiUrl}/investments`);
  }

  getAssetAllocation(): Observable<
    { type: string; value: number; percentage: number }[]
  > {
    return this.http.get<{ type: string; value: number; percentage: number }[]>(
      `${this.apiUrl}/asset-allocation`
    );
  }

  refreshData(): Observable<boolean> {
    return of(true).pipe(delay(2000));
  }
}
