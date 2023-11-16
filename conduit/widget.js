console.log("hello");

//const BASE_URL = "https://fede.dev-api.conduit.financial";
const BASE_URL = "https://api.conduit.financial";
const USDC_CODE = "USDC";
const USDT_CODE = "USDT";
const USD_CODE = "USD";

const INIT_FROM_CURRENCY = $("#widget").attr("send");
const INIT_TO_CURRENCY = $("#widget").attr("recieve");

print(INIT_FROM_CURRENCY);

var cSelect = $(".c-select");
var cDropdown = ".c-dropdown";
var cList = $(".c-list");
var cListItem = $(".c-list-item");
var cItemCode = ".c-item-code";
var cItemFlag = ".c-item-flag";
var changeArrows = $(".change-arrows");

var toField = $("#toField").prop("disabled", true);
toField.css("background-color", "white");
var toSend = $("#toSend");

// For store current excange rate
var exchangeRate = 1;
const fromCurrencyBlock = toSend;
const toCurrencyBlock = toField;
const amountField = toField;

// = HELPER =
function print(obj) {
  console.log(obj);
}
function commafy(num) {
  var str = num.split(".");
  if (str[0].length > 3) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }

  return str.join(".");
}

function addTrailingZeros(num, totalLength) {
  return String(num).padEnd(totalLength, "0");
}

function formatNumber(number, fixed = 2) {
  var arr = number.toString().split(".");
  if (arr.length == 1) {
    arr.push("00");
  }
  var dec = arr[1].substring(0, 4);
  if (arr[1] > 0) {
    dec = arr[1].substring(0, fixed);
  }

  return commafy(arr[0] + "." + addTrailingZeros(dec, fixed));
}
// ===========

// === LOGIC ====
function httpGet(path, params, callback) {
  $.ajax({
    async: false,
    method: "GET",
    url: BASE_URL + path,
    success: function (responce) {
      callback(responce.data);
    },
    data: params,
    error: function () {
      alert("error");
    }
  });
}

function isCrypta2UsdORVerca(codeFrom, codeTo) {
  return (
    (codeFrom === USDC_CODE && codeTo === USD_CODE) ||
    (codeFrom === USD_CODE && codeTo === USDC_CODE) ||
    (codeFrom === USDT_CODE && codeTo === USD_CODE) ||
    (codeFrom === USD_CODE && codeTo === USDT_CODE)
  );
}

function getCode(elem) {
  return elem
    .parent()
    .parent()
    .parent()
    .find(".c-select")
    .find(".c-item-code")
    .text();
}

function getCurrencyName(elem) {
  return elem
    .parent()
    .parent()
    .parent()
    .find(".c-select")
    .find(".c-item-name")
    .text();
}

function getBPS(codeFrom, codeTo) {
  if (codeFrom === codeTo) {
    return 0;
  }

  if (isCrypta2UsdORVerca(codeFrom, codeTo)) {
    return USDC_BPS; // Just to Crypt 2 USD or Verca
  }

  // Convert from Crypta or USD to ANY currency don't need fee
  if (
    codeFrom === USDC_CODE ||
    codeFrom === USDT_CODE ||
    codeFrom === USD_CODE
  ) {
    return 0;
  }

  return BPS;
}

function getAsset(code) {
  var type = "fiat";
  if (code === USDC_CODE || code === USDT_CODE) {
    type = "eth";
  }

  return `asset:${type}:${code}`;
}

function calculateRate(baseRate) {
  print("Base Rate:");
  print(baseRate);
  var codeFrom = getCode(fromCurrencyBlock);
  var codeTo = getCode(toCurrencyBlock);
  var bps = getBPS(codeFrom, codeTo);
  print("BPS");
  print(bps);

  if (isCrypta2UsdORVerca(codeFrom, codeTo)) {
    return 1 - bps / 10000;
  }
  return baseRate * (1 - bps / 10000); // One BPS = 0.0001
}

function saveExcangeRate(data) {
  var attributes = data.attributes;
  exchangeRate = calculateRate(attributes.exchangeRate);
  print("Conduit rate");
  print(exchangeRate);
}

function getRateFromAPI() {
  var codeFrom = getCode(fromCurrencyBlock);
  var codeTo = getCode(toCurrencyBlock);
  var params = {
    sourceAssetType: getAsset(codeFrom),
    targetAssetType: getAsset(codeTo),
    sourceAmount: 1
  };

  return httpGet("/rates", params, saveExcangeRate);
}

function showInformation(amount) {
  var codeFrom = getCode(fromCurrencyBlock);
  var codeTo = getCode(toCurrencyBlock);
  $(".c-details").first().find(".final-code-from").text(codeFrom);
  $(".c-details").last().find(".final-code-to").text(codeTo);

  infoBlockFrom = $(".c-details").first();
  infoBlockTo = $(".c-details").last();

  var rate = "";
  if (isCrypta2UsdORVerca(codeFrom, codeTo)) {
    rate = formatNumber(exchangeRate, 4);
  } else {
    rate = formatNumber(1 / exchangeRate, 4);
  }

  txt = `1 ${codeFrom} = ${formatNumber(exchangeRate, 4)} ${codeTo}`;
  infoBlockFrom.text(txt);

  txt = `1 ${codeTo} = ${rate} ${codeFrom}`;
  //infoBlockTo.find(".final-code-to").parent().text(txt);
  infoBlockTo.text(txt);
  amount = $(toSend).val();
  $(toField).val(formatNumber(amount * exchangeRate, 2));
}

// ==============
//Открываем DropDown
cSelect.click(function () {
  var list = $(this).parent(cDropdown).find(cList);
  list.show();
});

//Нажимаем на любой флаг
cListItem.click(function () {
  var listItem = $(this);
  updateItem(listItem);
});

// var initialFromCurrencyFlag =
// СМЕНА ВАЛЮТ
changeArrows.click(function () {
  var selectElements = cSelect;
  if (selectElements.length === 2) {
    var temp = selectElements.eq(0).html();
    selectElements.eq(0).html(selectElements.eq(1).html());
    selectElements.eq(1).html(temp);

    getRateFromAPI();
    showInformation(amountField.val());
  }
});

//
//
// СБРОС Dropdown по ESC
$(document).keyup(function (e) {
  if (e.key === "Escape") {
    cList.hide();
  }
});

// Cкрываем если клик вне dropdown
$(document).on("click", function (event) {
  var $cryptoWrapper = $(".crypto-wrapper");
  console.log("sss");
  // Проверяем, был ли клик внутри .crypto-wrapper
  if (!$(event.target).closest($cryptoWrapper).length) {
    // Если нет, скрываем .crypto-wrapper
    $cryptoWrapper.hide();
  }
});
//
//
// Обновляем флажки - получаем код
function updateItem(listItem) {
  var itemCode = listItem.find(cItemCode).text();
  var curImage = listItem.find("img").attr("src");
  cList.hide();

  // Найти элемент с классом c-select и заменить текст внутри элемента с классом c-item-code
  listItem.closest(cDropdown).find(cSelect).find(cItemCode).text(itemCode);

  // Найти изображение внутри элемента с классом c-item-flag и изменить его путь на значение переменной curImage
  listItem
    .closest(cDropdown)
    .find(cSelect)
    .find(cItemFlag + " img")
    .attr("src", curImage);

  getRateFromAPI();
  showInformation(amountField.val());
}

//
// Получаем данные из виджета о валдтах которые надо ставить
var fromAttribute = $("#widget").attr("send");
var toAttribute = $("#widget").attr("recieve");

$(".c-list-item").each(function () {
  var currentCode = $(this).find(".c-item-code").text();
  if (currentCode === fromAttribute) {
    var curImage = $(this).find("img").attr("src");
    $(".c-select:first .c-item-code").text(currentCode);
    $(".c-select:first .c-item-flag img").attr("src", curImage);
  }
  if (currentCode === toAttribute) {
    var curImage = $(this).find("img").attr("src");
    $(".c-select:last .c-item-code").text(currentCode);
    $(".c-select:last .c-item-flag img").attr("src", curImage);
  }
});

//
//
//  ВВОД Данных
$(toSend).on("input", function () {
  var inputText = $(this).val();
  showInformation(inputText);
  $(toField).val(formatNumber(inputText * exchangeRate, 2));
});

// Гугл тупит
$(window).on("load", function () {
  $(toSend).val(INIT_EXCAHGE_VAL);
  getRateFromAPI();
  showInformation(amountField.val());
});

// Поэтому так

$(toSend).val(INIT_EXCAHGE_VAL);
getRateFromAPI();
showInformation(amountField.val());
