export interface RothInput {
  currentAge: number;
  retirementAge: number;
  currentBalance: number;
  annualContribution: number;
  annualReturn: number;
  currentTaxRate: number;
  retirementTaxRate: number;
}

export interface RothResult {
  rothBalance: number;
  traditionalBalance: number;
  rothAfterTax: number;
  traditionalAfterTax: number;
  taxSavings: number;
  betterOption: 'Roth' | 'Traditional';
}

export function calculateRoth(input: RothInput): RothResult {
  const {
    currentAge,
    retirementAge,
    currentBalance,
    annualContribution,
    annualReturn,
    currentTaxRate,
    retirementTaxRate
  } = input;

  const years = retirementAge - currentAge;
  const annualRate = 1 + (annualReturn / 100);
  
  // Roth: Pay tax now, grow tax-free
  const rothContribution = annualContribution;
  let rothBalance = currentBalance;
  for (let i = 0; i < years; i++) {
    rothBalance += rothContribution;
    rothBalance *= annualRate;
  }
  
  // Traditional: Tax-deferred, pay tax on withdrawals
  const traditionalContribution = annualContribution / (1 - (currentTaxRate / 100));
  let traditionalBalance = currentBalance;
  for (let i = 0; i < years; i++) {
    traditionalBalance += traditionalContribution;
    traditionalBalance *= annualRate;
  }
  
  const rothAfterTax = rothBalance;
  const traditionalAfterTax = traditionalBalance * (1 - (retirementTaxRate / 100));
  const taxSavings = Math.abs(rothAfterTax - traditionalAfterTax);
  
  return {
    rothBalance: Math.round(rothBalance),
    traditionalBalance: Math.round(traditionalBalance),
    rothAfterTax: Math.round(rothAfterTax),
    traditionalAfterTax: Math.round(traditionalAfterTax),
    taxSavings: Math.round(taxSavings),
    betterOption: rothAfterTax > traditionalAfterTax ? 'Roth' : 'Traditional'
  };
}
