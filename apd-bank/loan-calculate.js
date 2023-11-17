function findInterestPerMonth(beginingBalance, interest, numDays) {
    const interestPerMonth = (beginingBalance * interest * numDays) / 360;
    return Math.round(interestPerMonth * 100) / 100;
  }
  
  function findInstallmentPerMonth(beginingBalance, interestPercent, period) {
    // Formula: P x (r x (1+r)^n) / ((1+r)^n) - 1)
    const monthlyBasicFirst = Math.pow(1 + interestPercent, period);
    const monthlyBasicSecond = monthlyBasicFirst - 1;
    const installmentPerMonth =
      beginingBalance *
      ((interestPercent * monthlyBasicFirst) / monthlyBasicSecond);
    return Math.ceil(installmentPerMonth);
  }
  
  function addMonths(date, months) {
    const dateCopy = new Date(date);
    dateCopy.setMonth(dateCopy.getMonth() + months);
    return dateCopy;
  }
  
  function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }
  function roundToDecimal(digit) {
    return Math.round(digit * 100) / 100;
  }
  
  function calculateInstallments(startDate, amount, percent, months) {
    let beginingBal = amount ? Number(amount) : 0;
    const numPayment = months ? Number(months) : 0;
    const interestAmt = percent ? Number(percent) / 100 : 0;
    const ratePerMonth = ((interestAmt / 12) * 365.25) / 360;
    const installmentAmt = findInstallmentPerMonth(
      beginingBal,
      ratePerMonth,
      numPayment
    );
  
    installments = [];
    for (let pos = 0; pos < months; pos++) {
      installment = {};
      installment.beginingBalance = roundToDecimal(beginingBal);
      installment.paymentDate = addMonths(startDate, pos);
  
      const start = addMonths(startDate, pos);
      const end = addMonths(startDate, pos + 1);
      const numDays = Math.abs(datediff(start, end));
      console.log(numDays);
      installment.days = numDays;
      installment.interest = this.findInterestPerMonth(
        beginingBal,
        interestAmt,
        numDays
      );
      installment.principal = installmentAmt - installment.interest;
      installment.endingBalance = beginingBal - installment.principal;
      if (pos === numPayment - 1) {
        installment.payment = beginingBal + installment.interest;
        installment.principal = installment.payment - installment.interest;
        installment.endingBalance = 0;
      } else {
        installment.payment = installmentAmt;
      }
      beginingBal = installment.endingBalance;
  
      installment.payment = installment.payment;
      installment.interest = installment.interest;
      installment.principal = installment.principal;
      installment.paymentDate = installment.paymentDate;
  
      installments.push(installment);
    }
    return installments;
  }
  
  function buildScheduler(date, amount, percent, months) {
    var scheduler = {
      installments: [],
      totalInterest: 0,
      monthlyPayment: 0,
      totalPrincipalInterest: 0
    };
    let beginDate = new Date(Date.parse(date));
    scheduler.installments = calculateInstallments(
      beginDate,
      amount,
      percent,
      months
    );
    scheduler.installments.forEach(
      (element) => (scheduler.totalInterest += element.interest)
    );
    scheduler.monthlyPayment = scheduler.installments[0].payment;
  
    scheduler.totalPrincipalInterest =
      parseInt(amount) + parseInt(scheduler.totalInterest);
  
    return scheduler;
  }
  