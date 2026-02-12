export interface RetirementInput {
  currentAge: number;
  retirementAge: number;
  currentBalance: number;
  monthlyContribution: number;
  annualReturn: number;
  employerMatch?: number;
  matchLimit?: number;
  salary?: number;
  dividendYield?: number;
}

export interface RetirementResult {
  finalBalance: number;
  totalContributions: number;
  totalEarnings: number;
  employerMatchTotal: number;
  dividendIncome: number;
  afterTaxValue: number;
}

export function calculateRetirement(input: RetirementInput): RetirementResult {
  const {
    currentAge,
    retirementAge,
    currentBalance,
    monthlyContribution,
    annualReturn,
    employerMatch = 0,
    matchLimit = 0,
    salary = 0,
    dividendYield = 0
  } = input;

  const years = retirementAge - currentAge;
  const months = years * 12;
  const monthlyRate = annualReturn / 100 / 12;
  const dividendRate = dividendYield / 100 / 12;
  
  let balance = currentBalance;
  let totalContributions = currentBalance;
  let totalEmployerMatch = 0;
  let totalDividends = 0;
  
  // Calculate monthly contribution with employer match
  const employeeContribution = monthlyContribution;
  const maxMatchAmount = salary > 0 ? (salary / 12) * (matchLimit / 100) : 0;
  const matchContribution = Math.min(employeeContribution, maxMatchAmount) * (employerMatch / 100);
  const totalMonthlyContribution = employeeContribution + matchContribution;

  for (let month = 0; month < months; month++) {
    // Add contributions
    balance += totalMonthlyContribution;
    totalContributions += employeeContribution;
    totalEmployerMatch += matchContribution;
    
    // Apply market return
    const monthlyReturn = balance * monthlyRate;
    balance += monthlyReturn;
    
    // Apply dividend reinvestment
    const monthlyDividend = balance * dividendRate;
    balance += monthlyDividend;
    totalDividends += monthlyDividend;
  }

  const totalEarnings = balance - totalContributions - totalEmployerMatch;
  const afterTaxValue = balance - (totalEarnings * 0.15); // 15% capital gains

  return {
    finalBalance: Math.round(balance),
    totalContributions: Math.round(totalContributions),
    totalEarnings: Math.round(totalEarnings),
    employerMatchTotal: Math.round(totalEmployerMatch),
    dividendIncome: Math.round(totalDividends),
    afterTaxValue: Math.round(afterTaxValue)
  };
}
