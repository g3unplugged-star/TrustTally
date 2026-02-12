export interface AffordabilityInput {
  annualIncome: number;
  monthlyDebts: number;
  downPayment: number;
  interestRate: number;
  loanTermYears: number;
  propertyTaxRate: number;
  homeInsurance: number;
  dtiLimit?: number;
}

export interface AffordabilityResult {
  maxHomePrice: number;
  maxLoanAmount: number;
  monthlyPayment: number;
  monthlyPrincipalInterest: number;
  monthlyTaxes: number;
  monthlyInsurance: number;
  totalMonthlyPayment: number;
  dti: number;
  incomeRequired: number;
}

export function calculateAffordability(input: AffordabilityInput): AffordabilityResult {
  const {
    annualIncome,
    monthlyDebts,
    downPayment,
    interestRate,
    loanTermYears,
    propertyTaxRate,
    homeInsurance,
    dtiLimit = 43
  } = input;

  const monthlyIncome = annualIncome / 12;
  const maxMonthlyPayment = (monthlyIncome * (dtiLimit / 100)) - monthlyDebts;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  // Calculate max loan amount from max monthly payment
  const maxLoanAmount = maxMonthlyPayment > 0
    ? (maxMonthlyPayment / monthlyRate) * (1 - 1 / Math.pow(1 + monthlyRate, totalMonths))
    : 0;

  // Binary search for max home price
  let low = 0;
  let high = maxLoanAmount * 2;
  let maxHomePrice = 0;
  
  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2;
    const loanNeeded = Math.max(0, mid - downPayment);
    
    if (loanNeeded > maxLoanAmount) {
      high = mid;
      continue;
    }
    
    const principalInterest = calculateMonthlyPayment(loanNeeded, monthlyRate, totalMonths);
    const monthlyTax = mid * (propertyTaxRate / 100 / 12);
    const totalMonthly = principalInterest + monthlyTax + homeInsurance;
    
    if (totalMonthly <= maxMonthlyPayment) {
      maxHomePrice = mid;
      low = mid;
    } else {
      high = mid;
    }
  }

  const actualLoanAmount = Math.max(0, maxHomePrice - downPayment);
  const monthlyPrincipalInterest = calculateMonthlyPayment(actualLoanAmount, monthlyRate, totalMonths);
  const monthlyTaxes = maxHomePrice * (propertyTaxRate / 100 / 12);
  const totalMonthlyPayment = monthlyPrincipalInterest + monthlyTaxes + homeInsurance;
  const dti = ((totalMonthlyPayment + monthlyDebts) / monthlyIncome) * 100;

  return {
    maxHomePrice: Math.round(maxHomePrice),
    maxLoanAmount: Math.round(actualLoanAmount),
    monthlyPayment: Math.round(monthlyPrincipalInterest * 100) / 100,
    monthlyPrincipalInterest: Math.round(monthlyPrincipalInterest * 100) / 100,
    monthlyTaxes: Math.round(monthlyTaxes * 100) / 100,
    monthlyInsurance: homeInsurance,
    totalMonthlyPayment: Math.round(totalMonthlyPayment * 100) / 100,
    dti: Math.round(dti * 100) / 100,
    incomeRequired: Math.round((totalMonthlyPayment + monthlyDebts) * 12)
  };
}

function calculateMonthlyPayment(loanAmount: number, monthlyRate: number, months: number): number {
  if (monthlyRate === 0) return loanAmount / months;
  return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
         (Math.pow(1 + monthlyRate, months) - 1);
}
