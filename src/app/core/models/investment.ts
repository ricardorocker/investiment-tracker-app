export interface Investment {
  id: string;
  name: string;
  type: 'stock' | 'fund' | 'crypto' | 'bond';
  investedAmount: number;
  currentValue: number;
  return: number;
  returnPercentage: number;
  symbol: string;
}
