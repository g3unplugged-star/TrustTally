export interface CompoundInput {
  principal: number;
  monthlyContribution: number;
  years: number;
  annualReturn: number;
  compoundFrequency: 'daily' | 'monthly' | 'quarterly' | 'annually';
  taxRate?: number;
  inflationRate?: number;
}

export interface CompoundResult {
  finalBalance: number;
  totalContributions: number;
  totalEarnings: number;
  afterTaxValue: number;
  inflationAdjustedValue: number;
  effectiveReturnRate: number;
  yearlyBreakdown: YearlyBreakdown[];
}

export interface YearlyBreakdown {
  year: number;
  balance: number;
  contributions: number;
  earnings: number;
  contributionsCumulative: number;
  earningsCumulative: number;
}

export function calculateCompound(input: CompoundInput): CompoundResult {
  const {
    principal,
    monthlyContribution,
    years,
    annualReturn,
    compoundFrequency,
    taxRate = 0,
    inflationRate = 0
  } = input;

  // Determine periods per year
  let periodsPerYear: number;
  switch (compoundFrequency) {
    case 'daily': periodsPerYear = 365; break;
    case 'monthly': periodsPerYear = 12; break;
    case 'quarterly': periodsPerYear = 4; break;
    case 'annually': periodsPerYear = 1; break;
    default: periodsPerYear = 12;
  }

  const periodicRate = annualReturn / 100 / periodsPerYear;
  const totalPeriods = years * periodsPerYear;
  const contributionPerPeriod = monthlyContribution * (12 / periodsPerYear);
  
  let balance = principal;
  let totalContributions = principal;
  const yearlyBreakdown: YearlyBreakdown[] = [];
  let contributionsCumulative = principal;
  let earningsCumulative = 0;

  for (let year = 1; year <= years; year++) {
    for (let period = 1; period <= periodsPerYear; period++) {
      // Add interest
      const interestEarned = balance * periodicRate;
      balance += interestEarned;
      
      // Add contribution at end of period
      if (period === periodsPerYear || year < years || period <= periodsPerYear) {
        balance += contributionPerPeriod;
        totalContributions += contributionPerPeriod;
        contributionsCumulative += contributionPerPeriod;
      }
    }

    const earnings = balance - contributionsCumulative;
    earningsCumulative = earnings;
    
    yearlyBreakdown.push({
      year,
      balance: Math.round(balance * 100) / 100,
      contributions: Math.round(contributionsCumulative * 100) / 100,
      earnings: Math.round(earnings * 100) / 100,
      contributionsCumulative: Math.round(contributionsCumulative * 100) / 100,
      earningsCumulative: Math.round(earningsCumulative * 100) / 100
    });
  }

  const totalEarnings = balance - totalContributions;
  const afterTaxValue = taxRate > 0 
    ? balance - (totalEarnings * (taxRate / 100))
    : balance;
  
  // Adjust for inflation
  const inflationFactor = Math.pow(1 + inflationRate / 100, years);
  const inflationAdjustedValue = balance / inflationFactor;
  
  // Calculate effective annual return
  const effectiveReturnRate = (Math.pow(balance / principal, 1 / years) - 1) * 100;

  return {
    finalBalance: Math.round(balance * 100) / 100,
    totalContributions: Math.round(totalContributions * 100) / 100,
    totalEarnings: Math.round(totalEarnings * 100) / 100,
    afterTaxValue: Math.round(afterTaxValue * 100) / 100,
    inflationAdjustedValue: Math.round(inflationAdjustedValue * 100) / 100,
    effectiveReturnRate: Math.round(effectiveReturnRate * 100) / 100,
    yearlyBreakdown
  };
}

// Utility function for quick compound interest calculation
export function quickCompound(
  principal: number,
  monthlyContribution: number,
  years: number,
  annualReturn: number
): number {
  const result = calculateCompound({
    principal,
    monthlyContribution,
    years,
    annualReturn,
    compoundFrequency: 'monthly'
  });
  return result.finalBalance;
}

// Calculate time to reach goal
export function yearsToGoal(
  principal: number,
  monthlyContribution: number,
  goal: number,
  annualReturn: number
): number {
  let balance = principal;
  let years = 0;
  const monthlyRate = annualReturn / 100 / 12;
  
  while (balance < goal && years < 100) {
    for (let month = 0; month < 12; month++) {
      balance += monthlyContribution;
      balance *= (1 + monthlyRate);
    }
    years++;
  }
  
  return years;
}
