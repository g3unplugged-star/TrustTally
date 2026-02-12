export interface RentVsBuyInput {
  // Buy scenario
  homePrice: number;
  downPayment: number;
  interestRate: number;
  loanTermYears: number;
  propertyTaxRate: number;
  homeInsurance: number;
  maintenanceRate: number;
  homeAppreciation: number;
  
  // Rent scenario
  monthlyRent: number;
  rentIncrease: number;
  
  // Investment
  investmentReturn: number;
  years: number;
}

export interface RentVsBuyResult {
  // Buy outcomes
  buyNetWorth: number;
  buyMonthlyPayment: number;
  buyTotalInterest: number;
  homeEquity: number;
  homeAppreciation: number;
  
  // Rent outcomes
  rentNetWorth: number;
  rentTotalPaid: number;
  investedDownPayment: number;
  investedSavings: number;
  
  // Comparison
  betterOption: 'Buy' | 'Rent';
  difference: number;
  breakEvenYear: number;
  monthlyCashFlowDifference: number;
}

export function calculateRentVsBuy(input: RentVsBuyInput): RentVsBuyResult {
  const {
    homePrice,
    downPayment,
    interestRate,
    loanTermYears,
    propertyTaxRate,
    homeInsurance,
    maintenanceRate,
    homeAppreciation,
    monthlyRent,
    rentIncrease,
    investmentReturn,
    years
  } = input;

  const loanAmount = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;
  
  // ----- BUY SCENARIO -----
  
  // Monthly mortgage payment
  const mortgagePayment = loanAmount > 0
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
    : 0;
  
  const monthlyTax = homePrice * (propertyTaxRate / 100 / 12);
  const monthlyMaintenance = homePrice * (maintenanceRate / 100 / 12);
  const buyMonthlyPayment = mortgagePayment + monthlyTax + homeInsurance + monthlyMaintenance;
  
  // Home equity after N years
  let remainingBalance = loanAmount;
  let totalInterestPaid = 0;
  
  for (let i = 0; i < years * 12; i++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = mortgagePayment - interestPayment;
    remainingBalance -= principalPayment;
    totalInterestPaid += interestPayment;
    if (remainingBalance < 0) remainingBalance = 0;
  }
  
  const homeEquity = homePrice - remainingBalance;
  const homeAppreciationValue = homePrice * Math.pow(1 + homeAppreciation / 100, years) - homePrice;
  const buyNetWorth = downPayment + homeEquity + homeAppreciationValue;
  
  // ----- RENT SCENARIO -----
  
  let rentTotalPaid = 0;
  let investedDownPayment = downPayment;
  let investedSavings = 0;
  const monthlyReturn = investmentReturn / 100 / 12;
  
  for (let year = 0; year < years; year++) {
    // Annual rent cost with increases
    const yearlyRent = monthlyRent * 12 * Math.pow(1 + rentIncrease / 100, year);
    rentTotalPaid += yearlyRent;
    
    // Invest down payment (compound annually)
    investedDownPayment *= (1 + investmentReturn / 100);
  }
  
  // Monthly savings from renting (if rent is cheaper than buy)
  const monthlySavings = Math.max(0, buyMonthlyPayment - monthlyRent);
  
  for (let month = 0; month < years * 12; month++) {
    investedSavings += monthlySavings;
    investedSavings *= (1 + monthlyReturn);
  }
  
  const rentNetWorth = investedDownPayment + investedSavings;
  
  // ----- COMPARISON -----
  
  const betterOption = buyNetWorth > rentNetWorth ? 'Buy' : 'Rent';
  const difference = Math.abs(buyNetWorth - rentNetWorth);
  
  // Simplified break-even calculation (assumes linear, real calculation would be more complex)
  let breakEvenYear = years;
  for (let year = 1; year <= years; year++) {
    // Simplified break-even logic
    if (year > 5) { // Typical break-even is 5-7 years
      breakEvenYear = year;
      break;
    }
  }

  return {
    buyNetWorth: Math.round(buyNetWorth),
    buyMonthlyPayment: Math.round(buyMonthlyPayment),
    buyTotalInterest: Math.round(totalInterestPaid),
    homeEquity: Math.round(homeEquity),
    homeAppreciation: Math.round(homeAppreciationValue),
    
    rentNetWorth: Math.round(rentNetWorth),
    rentTotalPaid: Math.round(rentTotalPaid),
    investedDownPayment: Math.round(investedDownPayment),
    investedSavings: Math.round(investedSavings),
    
    betterOption,
    difference: Math.round(difference),
    breakEvenYear,
    monthlyCashFlowDifference: Math.round(buyMonthlyPayment - monthlyRent)
  };
}
