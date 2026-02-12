export interface HSAInput {
  currentAge: number;
  retirementAge: number;
  currentBalance: number;
  annualContribution: number;
  annualReturn: number;
  taxRate: number;
}

export interface HSAResult {
  hsaBalance: number;
  taxSavings: number;
  equivalent401k: number;
  totalValue: number;
}

export function calculateHSA(input: HSAInput): HSAResult {
  const {
    currentAge,
    retirementAge,
    currentBalance,
    annualContribution,
    annualReturn,
    taxRate
  } = input;

  const years = retirementAge - currentAge;
  const annualRate = 1 + (annualReturn / 100);
  
  let balance = currentBalance;
  let totalContributions = currentBalance;
  
  for (let i = 0; i < years; i++) {
    balance += annualContribution;
    totalContributions += annualContribution;
    balance *= annualRate;
  }
  
  // Tax savings: contributions × tax rate
  const taxSavings = (totalContributions - currentBalance) * (taxRate / 100);
  
  // HSA is triple tax-advantaged
  const equivalent401k = balance / (1 - (taxRate / 100));
  
  return {
    hsaBalance: Math.round(balance),
    taxSavings: Math.round(taxSavings),
    equivalent401k: Math.round(equivalent401k),
    totalValue: Math.round(balance + taxSavings)
  };
}
