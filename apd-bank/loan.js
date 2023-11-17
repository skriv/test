console.log("hello loan");

// Select the select box
const selectbox = $("#field");
const selectboxMonth = $("#Month");
const otherPercent = $("#other");
const loanAmount = $("#loan-value-form");
const startDate = $("#loan-date");
const resultWrap = $("#result-wrap");
const tablePrint = $("#table-print");

var currencyValue;
var loanAmountValue;

//Main State
otherPercent.hide();
resultWrap.hide();

$("#loan-form").submit(submitLoanForm);

//Create options and add them to the select box
$(".cms-loan").each(function () {
  //Select CMS Items
  const $this = $(this);
  const loanName = $this.find(".cms-loan-name").text();
  const percent = $this.find(".cms-loan-percent").text();

  $("<option>", {
    text: loanName + " - " + percent + "%",
    value: percent
  }).appendTo(selectbox);
});

//Add aditional option - "Other"
$("<option>", {
  text: "Other",
  value: 0
}).appendTo(selectbox);

//Check If "Other" selected
$("#field").change(function () {
  if (selectbox.find("option:selected").text() === "Other") {
    console.log("Show Other");
    otherPercent.prop("required", true);
    otherPercent.show();
    otherPercent.focus();
  } else {
    otherPercent.prop("required", false);
    otherPercent.hide();
  }
});

// Get current Date
var today = new Date();
// Date format
var formattedDate = today.toISOString().substr(0, 10);
// Set date to input
$("#loan-date").val(formattedDate);

//Resent Form Data
$("#loan-reset") //
  .click(function (e) {
    e.preventDefault();
    var formElement = $('form[data-name="loan-form"]');
    var inputElements = formElement
      .find(":input")
      .not(":button, :submit, :reset, :hidden");
    inputElements.val("").prop("checked", false).prop("selected", false);
    otherPercent.hide();
  });

// Check Currency Selected
$("input[type=radio]").change(function () {
  currencyValue = $("input[name=Radio]:checked").val();
  $("#send-currency").val(currencyValue);
});

// Loan Amount on Change
loanAmount.change(function () {
  loanAmountValue = loanAmount.val();
});

// Date on Change
startDate.change(function () {
  formattedDate = startDate.val();
});

function getInterest() {
  if (selectbox.find("option:selected").text() === "Other") {
    return otherPercent.val();
  }
  return selectbox.val();
}

function getAmount() {
  return loanAmountValue;
}

function getMonth() {
  return selectboxMonth.val();
}

function getCurrency() {
  return currencyValue;
}

function getFirstInstallmentDate() {
  return formattedDate;
}

function submitLoanForm(e) {
  e.preventDefault();
  e.stopPropagation();

  console.log("Currency: " + getCurrency());
  console.log("Interest: " + getInterest());
  console.log("Loan: " + getAmount());
  console.log("Month: " + getMonth());
  console.log("Date: " + getFirstInstallmentDate());

  scheduler = buildScheduler(
    getFirstInstallmentDate(),
    getAmount(),
    getInterest(),
    getMonth()
  );

  //RESULT SECTION
  $(
    "#result-monthly-payment, #result-t-payment,#table-monthly-payment, #send-mothly-payment"
  ).text(formatingMoney(scheduler.monthlyPayment.toFixed(2)));
  $("#result-total").text(
    formatingMoney(scheduler.totalPrincipalInterest.toFixed(2))
  );
  $("#result-months, #result-t-month, #table-number-month, #send-months").text(
    getMonth()
  );
  $("#result-total-principle, #table-total-interest").text(
    formatingMoney(scheduler.totalInterest.toFixed(2))
  );

  $("#result-t-borrow, #table-loan-amount, #total-begining-balance").text(
    formatingMoney(scheduler.totalPrincipalInterest.toFixed(2))
  );
  $(
    "#result-t-borrow, #table-loan-amount, #total-instalment, #send-loan-amount"
  ).text(formatingMoney(Number.parseFloat(getAmount())));
  $("#total-principle, #send-total-interest").text(
    formatingMoney(scheduler.totalInterest.toFixed(2))
  );

  $("#result-t-interest, #table-interest-rate, #send-interest-rate").text(
    getInterest() + "%"
  );
  $("#table-loan-date, #send-loan-date").text(getFirstInstallmentDate());
  //
  //
  //
  //SEND EMAIL SECTION
  $("#send-mothly-payment").val(
    formatingMoney(scheduler.monthlyPayment.toFixed(2))
  );

  $("#send-months").val(getMonth());

  $("#send-loan-amount").val(formatingMoney(Number.parseFloat(getAmount())));

  $("#send-total-interest").val(
    formatingMoney(scheduler.totalInterest.toFixed(2))
  );

  $("#send-interest-rate").val(getInterest() + "%");
  $("#send-loan-date").val(getFirstInstallmentDate());

  // Animation Result Section
  resultWrap.animate(
    {
      opacity: 100,
      top: "0px"
    },
    300
  );
  createTable(scheduler.installments);
}

function formatingDate(dt) {
  return dt
    .toLocaleDateString("ru-Ru", {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    })
    .replaceAll(".", "-");
}

function commafy(num) {
  var str = num.split(".");
  if (str[0].length > 3) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  if (str[1] && str[1].length >= 3) {
    str[1] = str[1].replace(/(\d{3})/g, "$1 ");
  }
  return str.join(".");
}

function formatingMoney(cost) {
  const c = commafy(Number.parseFloat(cost).toFixed(2));
  if (getCurrency() === "USD") {
    return "$ " + c;
  }

  return c;
}

//CREATE TABLES
function createTable(installments) {
  var tableRow = $(".table-row").first(); // Найти элементы с классом "table-row"
  var tableWrapper = $(".table-wrapper"); // Найти элементы с классом "table-wrapper"

  $(".table-row").remove();

  for (let q = 0; q < installments.length; q++) {
    var clonedRow = tableRow.clone();

    const i = installments[q];
    clonedRow.find(".number").text(q + 1);
    clonedRow.find(".paymentdate").text(formatingDate(i.paymentDate));
    clonedRow.find(".days").text(i.days);
    clonedRow
      .find(".instalment")
      .text(commafy((i.principal + i.interest).toFixed(2)));
    clonedRow.find(".principal").text(commafy(i.principal.toFixed(2)));
    clonedRow.find(".interest").text(commafy(i.interest.toFixed(2)));

    clonedRow
      .find(".beginingbalance")
      .text(commafy(i.beginingBalance.toFixed(2)));
    clonedRow.find(".endingbalance").text(commafy(i.endingBalance.toFixed(2)));
    tableWrapper.append(clonedRow);
  }
}

// PRINT RESULT
tablePrint.click(function (e) {
  $("iframe").remove();
  var styles = $('style, link[rel="stylesheet"]');
  var stylesText = "";
  styles.each(function () {
    stylesText += $(this).prop("outerHTML");
  });

  // Create new document
  var printDocument = document.createElement("iframe");
  printDocument.setAttribute(
    "style",
    "position:absolute;width:0px;height:0px;left:-500px;top:-500px;"
  );
  document.body.appendChild(printDocument);
  printDocument = printDocument.contentWindow.document;

  // Write styles to new document
  printDocument.write(
    "<html><head>" + stylesText + "</head><body></body></html>"
  );

  var table = $("#table-content").clone().removeAttr("id");

  var tableWrapper = $(table).find(".table-wrapper");
  tableWrapper.css({
    overflow: "visible",
    "max-height": "none"
  });

  printDocument.body.appendChild(table[0]);
  printDocument.close();
  window.frames[0].focus();
  window.frames[0].print();
});
