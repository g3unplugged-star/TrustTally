export interface DCAInput {
  initialInvestment: number;
  monthlyContribution: number;
  years: number;
  annualReturn: number;
  dividendYield?: number;
  taxRate?: number;
}

export interface DCAResult {
  finalBalance: number;
  totalContributions: number;
  totalEarnings: number;
  dividendIncome: number;
  afterTaxValue: number;
  effectiveReturn: number;
  yearlyBreakdown: {
    year: number;
    balance: number;
    contributions: number;
    dividends: number;
  }[];
}

export function calculateDCA(input: DCAInput): DCAResult {
  const {
    initialInvestment,
    monthlyContribution,
    years,
    annualReturn,
    dividendYield = 0,
    taxRate = 0
  } = input;

  const monthlyRate = annualReturn / 100 / 12;
  const dividendRate = dividendYield / 100 / 12;
  const totalMonths = years * 12;
  
  let balance = initialInvestment;
  let totalContributions = initialInvestment;
  let totalDividends = 0;
  const yearlyBreakdown = [];

  for (let month = 1; month <= totalMonths; month++) {
    // Add monthly contribution
    balance += monthlyContribution;
    totalContributions += monthlyContribution;
    
    // Apply market return
    balance *= (1 + monthlyRate);
    
    // Apply dividend reinvestment
    const monthlyDividend = balance * dividendRate;
    balance += monthlyDividend;
    totalDividends += monthlyDividend;

    // Record yearly snapshot
    if (month % 12 === 0) {
      yearlyBreakdown.push({
        year: month / 12,
        balance: Math.round(balance),
        contributions: Math.round(totalContributions),
        dividends: Math.round(totalDividends)
      });
    }
  }

  const totalEarnings = balance - totalContributions;
  const afterTaxValue = balance - (totalEarnings * (taxRate / 100));
  const effectiveReturn = (Math.pow(balance / initialInvestment, 1 / years) - 1) * 100;

  return {
    finalBalance: Math.round(balance),
    totalContributions: Math.round(totalContributions),
    totalEarnings: Math.round(totalEarnings),
    dividendIncome: Math.round(totalDividends),
    afterTaxValue: Math.round(afterTaxValue),
    effectiveReturn: Math.round(effectiveReturn * 100) / 100,
    yearlyBreakdown
  };
}

export function calculateYearsToGoal(
  initialInvestment: number,
  monthlyContribution: number,
  goal: number,
  annualReturn: number
): number {
  let balance = initialInvestment;
  let years = 0;
  const monthlyRate = annualReturn / 100 / 12;
  
  while (balance < goal && years < 50) {
    for (let month = 0; month < 12; month++) {
      balance += monthlyContribution;
      balance *= (1 + monthlyRate);
    }
    years++;
  }
  
  return years;
}
