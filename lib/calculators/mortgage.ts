export interface MortgageInput {
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
  monthlyPrepayment: number;
}

export interface MortgageResult {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  payoffDate: string;
  monthsToPayoff: number;
  interestSaved: number;
  amortizationSchedule: AmortizationRow[];
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
  totalInterestPaid: number;
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const { loanAmount, interestRate, loanTermYears, monthlyPrepayment } = input;
  
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;
  
  // Standard monthly payment
  const monthlyPayment = 
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
    (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  let balance = loanAmount;
  let month = 0;
  let totalInterestPaid = 0;
  const schedule: AmortizationRow[] = [];
  
  // Calculate with prepayment
  while (balance > 0.01 && month < totalMonths) {
    month++;
    
    const interestPayment = balance * monthlyRate;
    let principalPayment = monthlyPayment - interestPayment;
    principalPayment += monthlyPrepayment;
    
    if (principalPayment > balance) {
      principalPayment = balance;
    }
    
    balance -= principalPayment;
    totalInterestPaid += interestPayment;
    
    schedule.push({
      month,
      payment: principalPayment + interestPayment,
      principal: principalPayment,
      interest: interestPayment,
      remainingBalance: Math.max(0, balance),
      totalInterestPaid
    });
  }
  
  // Calculate original total interest (no prepayment)
  const originalTotalInterest = calculateTotalInterest(
    loanAmount, 
    monthlyRate, 
    monthlyPayment, 
    totalMonths
  );
  
  const payoffDate = new Date();
  payoffDate.setMonth(payoffDate.getMonth() + month);
  
  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalInterest: Math.round(totalInterestPaid * 100) / 100,
    totalPayment: Math.round((loanAmount + totalInterestPaid) * 100) / 100,
    payoffDate: payoffDate.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    }),
    monthsToPayoff: month,
    interestSaved: Math.round((originalTotalInterest - totalInterestPaid) * 100) / 100,
    amortizationSchedule: schedule
  };
}

function calculateTotalInterest(
  principal: number, 
  monthlyRate: number, 
  payment: number, 
  months: number
): number {
  let balance = principal;
  let totalInterest = 0;
  
  for (let i = 0; i < months; i++) {
    const interest = balance * monthlyRate;
    const principalPaid = payment - interest;
    balance -= principalPaid;
    totalInterest += interest;
    if (balance <= 0) break;
  }
  
  return totalInterest;
}
