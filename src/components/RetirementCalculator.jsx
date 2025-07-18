import React, { useState } from 'react';

const RetirementCalculator = () => {
  const [yearlyIncome, setYearlyIncome] = useState('');
  const [yearsToRetirement, setYearsToRetirement] = useState('');
  const [annualReturn, setAnnualReturn] = useState('');
  const [consumptionRate, setConsumptionRate] = useState('4');
  const [customRate, setCustomRate] = useState('');
  const [results, setResults] = useState(null);

  const calculateRetirement = () => {
    const income = parseFloat(yearlyIncome);
    const years = parseInt(yearsToRetirement);
    const returnRate = parseFloat(annualReturn) / 100;
    const withdrawalRate = consumptionRate === 'custom' ? parseFloat(customRate) / 100 : parseFloat(consumptionRate) / 100;

    if (!income || !years || !returnRate || !withdrawalRate) {
      alert('Please fill in all fields with valid numbers');
      return;
    }

    // Calculate target retirement corpus (income / withdrawal rate)
    const targetCorpus = income / withdrawalRate;
    
    // Calculate required monthly savings using future value of annuity formula
    const monthlyReturn = returnRate / 12;
    const totalMonths = years * 12;
    
    // Future value of annuity formula: FV = PMT * (((1 + r)^n - 1) / r)
    // Solving for PMT: PMT = FV / (((1 + r)^n - 1) / r)
    const monthlyPayment = targetCorpus / (((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn));
    
    // Calculate annual savings
    const annualSavings = monthlyPayment * 12;
    
    // Calculate percentage of income to save
    const savingsPercentage = (annualSavings / income) * 100;

    setResults({
      targetCorpus: targetCorpus,
      monthlyPayment: monthlyPayment,
      annualSavings: annualSavings,
      savingsPercentage: savingsPercentage,
      withdrawalRate: withdrawalRate * 100,
      totalContributions: annualSavings * years,
      interestEarned: targetCorpus - (annualSavings * years)
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercent = (percent) => {
    return `${percent.toFixed(2)}%`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">
        Retirement Calculator
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-slate-700 font-medium mb-2">
              Desired Annual Income in Retirement
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
              <input
                type="number"
                value={yearlyIncome}
                onChange={(e) => setYearlyIncome(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600"
                placeholder="100,000"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-2">
              Years Until Retirement
            </label>
            <input
              type="number"
              value={yearsToRetirement}
              onChange={(e) => setYearsToRetirement(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600"
              placeholder="30"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-2">
              Expected Annual Return (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600"
              placeholder="7.0"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-2">
              Consumption Rate (Safe Withdrawal Rate)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="consumptionRate"
                  value="1"
                  checked={consumptionRate === '1'}
                  onChange={(e) => setConsumptionRate(e.target.value)}
                  className="mr-2"
                />
                1% (Conservative)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="consumptionRate"
                  value="3"
                  checked={consumptionRate === '3'}
                  onChange={(e) => setConsumptionRate(e.target.value)}
                  className="mr-2"
                />
                3% (Moderate)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="consumptionRate"
                  value="4"
                  checked={consumptionRate === '4'}
                  onChange={(e) => setConsumptionRate(e.target.value)}
                  className="mr-2"
                />
                4% (Standard)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="consumptionRate"
                  value="5"
                  checked={consumptionRate === '5'}
                  onChange={(e) => setConsumptionRate(e.target.value)}
                  className="mr-2"
                />
                5% (Aggressive)
              </label>
            </div>
            <label className="flex items-center mt-2">
              <input
                type="radio"
                name="consumptionRate"
                value="custom"
                checked={consumptionRate === 'custom'}
                onChange={(e) => setConsumptionRate(e.target.value)}
                className="mr-2"
              />
              Custom:
              <input
                type="number"
                step="0.1"
                value={customRate}
                onChange={(e) => setCustomRate(e.target.value)}
                disabled={consumptionRate !== 'custom'}
                className="ml-2 w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-600 disabled:bg-gray-100"
                placeholder="4.0"
              />
              <span className="ml-1">%</span>
            </label>
          </div>

          <button
            onClick={calculateRetirement}
            className="w-full bg-slate-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-slate-700 transition duration-200"
          >
            Calculate Retirement Needs
          </button>
        </div>

        {/* Results */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            Your Retirement Plan
          </h3>
          
          {results ? (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-slate-800 mb-2">Target Retirement Corpus</h4>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(results.targetCorpus)}</p>
                <p className="text-sm text-slate-600">
                  Based on {formatPercent(results.withdrawalRate)} withdrawal rate
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-slate-800 mb-2">Monthly Savings Required</h4>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(results.monthlyPayment)}</p>
                <p className="text-sm text-slate-600">
                  {formatCurrency(results.annualSavings)} annually
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-slate-800 mb-2">Savings Rate</h4>
                <p className="text-2xl font-bold text-slate-900">{formatPercent(results.savingsPercentage)}</p>
                <p className="text-sm text-slate-600">
                  of your desired retirement income
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-slate-800 mb-2">Breakdown</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Total Contributions:</span>
                    <span>{formatCurrency(results.totalContributions)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interest Earned:</span>
                    <span>{formatCurrency(results.interestEarned)}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-1">
                    <span>Total Corpus:</span>
                    <span>{formatCurrency(results.targetCorpus)}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-slate-600 text-center py-8">
              Enter your retirement goals above to see your personalized savings plan.
            </p>
          )}
        </div>
      </div>
      
      {/* Information Section */}
      <div className="mt-8 bg-blue-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">
          Understanding Safe Withdrawal Rates
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600">
          <div>
            <p className="mb-2">
              <strong>1% (Conservative):</strong> Very safe for long retirement periods, preserves wealth for heirs.
            </p>
            <p>
              <strong>3% (Moderate):</strong> Conservative approach with good wealth preservation.
            </p>
          </div>
          <div>
            <p className="mb-2">
              <strong>4% (Standard):</strong> The traditional "4% rule" - historically safe for 30-year retirements.
            </p>
            <p>
              <strong>5% (Aggressive):</strong> Higher risk of running out of money, but requires less savings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetirementCalculator;