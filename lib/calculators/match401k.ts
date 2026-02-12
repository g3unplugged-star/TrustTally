export interface Match401kInput {
  salary: number;
  contributionPercentage: number;
  matchPercentage: number;
  matchLimit: number;
  currentAge: number;
  retirementAge: number;
  annualReturn: number;
}

export interface Match401kResult {
  yourContribution: number;
  employerMatch: number;
  totalAnnual: number;
  matchCaptured: boolean;
  missedMatch: number;
  futureValue: number;
  employerMatchValue: number;
}

export function calculateMatch401k(input: Match401kInput): Match401kResult {
  const {
    salary,
    contributionPercentage,
    matchPercentage,
    matchLimit,
    currentAge,
    retirementAge,
    annualReturn
  } = input;

  const yourContribution = salary * (contributionPercentage / 100);
  const maxMatchAmount = salary * (matchLimit / 100);
  const eligibleContribution = Math.min(yourContribution, maxMatchAmount);
  const employerMatch = eligibleContribution * (matchPercentage / 100);
  const totalAnnual = yourContribution + employerMatch;
  const matchCaptured = contributionPercentage >= matchLimit;
  const missedMatch = matchCaptured ? 0 : (maxMatchAmount - yourContribution) * (matchPercentage / 100);
  
  const years = retirementAge - currentAge;
  const annualRate = 1 + (annualReturn / 100);
  
  // Calculate future value of just employer match
  let matchFutureValue = 0;
  for (let i = 0; i < years; i++) {
    matchFutureValue += employerMatch;
    matchFutureValue *= annualRate;
  }
  
  // Calculate future value of total contributions
  let totalFutureValue = 0;
  for (let i = 0; i < years; i++) {
    totalFutureValue += totalAnnual;
    totalFutureValue *= annualRate;
  }

  return {
    yourContribution: Math.round(yourContribution),
    employerMatch: Math.round(employerMatch),
    totalAnnual: Math.round(totalAnnual),
    matchCaptured,
    missedMatch: Math.round(missedMatch),
    futureValue: Math.round(totalFutureValue),
    employerMatchValue: Math.round(matchFutureValue)
  };
}
