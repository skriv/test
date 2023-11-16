console.log("HI NEW START");
console.log("HI NEW START_MY FIX");
console.log("HI NEW START_MY FIX");

let BASE_URL = "https://app-proxy-api-9eb71dd330e9.herokuapp.com";
let INIT_EXCAHGE_VAL = 100;
let INIT_FROM_CURRENCY = "USD";
let INIT_TO_CURRENCY = "EUR";
let FIX = 0.5;
let PERCENT = 2.9 / 100;
let BPS = 1;

// = HELPER =
function commafy(num) {
  return num;
  // var str = num.split(".");
  // if (str[0].length > 3) {
  //   str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  // }
  // if (str[1] && str[1].length >= 3) {
  //   str[1] = str[1].replace(/(\d{3})/g, "$1 ");
  // }
  // return str.join(".");
}



function print(obj) {
  console.log(obj);
}
// ====

function calculateCommision(amount) {
  return amount - (amount * PERCENT + FIX);
}

function httpGet(path, params, callback) {
  $.ajax({
    async: false,
    method: "GET",
    url: BASE_URL + path,
    success: function (responce) {
      print(responce);
      callback(responce);
    },
    data: params,
    error: function () {
      alert("error");
    }
  });
}

// function findElementByText(text) {
//   var jSpot = $("span:contains(" + text + ")")
//               .filter(function() { return $(this).children().length === 0;})
//               .parent();  // because you asked the parent of that element

//   return jSpot;
// }

function setActiveCurrency(elem, code) {
  elem.find(".combo-selected").removeClass("combo-selected");
  elem.contains(code).parent().parent().addClass("combo-selected");
}

function getCode(elem) {
  return elem.find(".combo-selected").find(".combo-text-code").text();
}

function getCurrencyName(elem) {
  return elem.find(".combo-selected").find(".combo-text-name").text();
}

function show(data) {
  print(data);
  $("#final-count-from").text(data.amount);
  $("#final-name-from").text(getCurrencyName($("#from")));

  var mid = data.to[0].mid;
  $("#final-count-to").text(mid);
  $("#final-name-to").text(getCurrencyName($("#to")));

  $("#final-rate-to").text(commafy(data.amount / mid));
  $("#final-rate-from").text(commafy(mid / data.amount));

  $(".final-code-to").text(getCode($("#to")));
  $(".final-code-from").text(getCode($("#from")));
}

function calculate() {
  var amount = $("#amount").val();
  var params = {
    from: getCode($("#from")),
    to: getCode($("#to")),
    amount: amount,
    margin: BPS
  };

  httpGet("/convert", params, show);
  $("#rate-info").show();
}

$(document).ready(function () {
  // Находим все элементы с классом .base-combo
  var baseCombos = $(".base-combo");
  var curWrapper = $(".cur-wrapper");
  var curElements = $(".cur");
  var flagOriginalElement = $(".flag-original");

  $("#get-rate").on("click", calculate);



  $("#amount").val(INIT_EXCAHGE_VAL);
  $("#rate-info").hide();
  //setActiveCurrency($("#to"), INIT_TO_CURRENCY);

  // Создаем список валют из базы
  curElements.each(function () {
    // Создать копию элемента с классом "flag-original"
    var copyElement = flagOriginalElement.clone();

    // Найти картинку внутри элемента с классом "cur" и получить ее путь
    var curImageSrc = $(this).find("img").attr("src");
    copyElement.find("img").attr("src", curImageSrc);

    // Найти текст из класса "cur-code"
    var curCodeText = $(this).find(".cur-code").text();
    var curNameText = $(this).find(".cur-name").text();

    // Найти элемент с классом "combo-text-code" в копии элемента и установить в него текст из класса "cur-code"
    copyElement.find(".combo-text-code").text(curCodeText);
    copyElement.find(".combo-text-name").text(curNameText);

    // Добавить событие клика для каждой валюты
    copyElement.on("click", function () {
      curWrapper.hide();
      updateSelectedCurrencyInfo(copyElement);

      // Выполнить функцию после паузы в 1000 миллисекунд (1 секунда)
      setTimeout(function () {
        $(".base-combo").removeClass("active");
        console.log("remove");
      }, 300);
    });

    // Вставить копию элемента внутрь элемента с классом "cur-wrapper"
    curWrapper.append(copyElement);
  });




// Устанавливаем начальные флаги 
  function updateCurrencySelection(element, currencyFlag) {
    var comboSelected = element.find(".combo-selected");
    comboSelected.find(".combo-text-code").text(currencyFlag.find(".combo-text-code").text());
    comboSelected.find(".combo-text-name").text(currencyFlag.find(".combo-text-name").text());
    comboSelected.find(".cur-flag-icon").attr("src", currencyFlag.find("img").attr("src"));
}

var initialFromCurrencyFlag = $(".cur-wrapper .flag-original:contains(" + INIT_FROM_CURRENCY + ")");
updateCurrencySelection($("#from"), initialFromCurrencyFlag);

var initialToCurrencyFlag = $(".cur-wrapper .flag-original:contains(" + INIT_TO_CURRENCY + ")");
updateCurrencySelection($("#to"), initialToCurrencyFlag);



  
  // Обновляем компонент
  function updateSelectedCurrencyInfo(element) {
    var name = element.find(".combo-text-name").text();
    var code = element.find(".combo-text-code").text();
    var image = element.find("img").attr("src");

    var activeBaseCombo = $(".base-combo.active");
    var selectedCurrency = activeBaseCombo.find(".combo-selected");
    selectedCurrency.find(".combo-text-name").text(name);
    selectedCurrency.find(".combo-text-code").text(code);
    selectedCurrency.find(".cur-flag-icon").attr("src", image);
  }

  function sendToCount() {
    // console.log(from)
  }

  // Добавляем обработчик события клика на элементы с классом .base-combo
  baseCombos.on("click", function () {
    // Если кликнули на текущий элемент .base-combo, то не выполняем действия
    if ($(this).hasClass("active")) {
      return;
    }

    // Скрываем все .combo-form и показываем все .dropdown
    $(".combo-form").hide();
    $(".dropdown").show();

    // Находим текущий элемент .combo-form внутри текущего .base-combo
    var comboForm = $(this).find(".combo-form");

    // Находим текущий элемент .dropdown внутри текущего .base-combo
    var dropdown = $(this).find(".dropdown");

    // Показываем .combo-form и скрываем .dropdown
    comboForm.show();
    dropdown.hide();

    // Активируем (даем фокус) элементу с классом "text-input" внутри "combo-form"
    $(".text-input").val("");
    $(".flag-original").show();
    comboForm.find(".text-input").focus();

    // Находим элемент с классом "cur-wrapper"
    var curWrapper = $(".cur-wrapper");

    // Скрываем .cur-wrapper у других .base-combo
    $(".cur-wrapper").not(curWrapper).hide();

    // Показываем элемент "cur-wrapper"
    curWrapper.show();

    // Перемещаем элемент "cur-wrapper" внутрь активного элемента с классом ".base-combo"
    $(this).append(curWrapper);

    // Добавляем класс 'active' текущему .base-combo и удаляем класс 'active' у остальных
    $(this).addClass("active");
    baseCombos.not(this).removeClass("active");
  });

  // Обработчик события ввода текста в поле
  $(document).on("input", ".text-input", searchAndHide);

  function searchAndHide() {
    var searchText = $(this).val().toLowerCase();
    $(".flag-original").each(function () {
      var flagText = $(this).text().toLowerCase();
      if (flagText.includes(searchText)) {
        $(this).show(); // Показываем элемент с совпадением
      } else {
        $(this).hide(); // Скрываем элемент без совпадения
      }
    });
  }

  // Если пропал фокус с тектового поля
  $(document).on("blur", ".text-input", function () {
    $(".combo-form").hide();
    $(".dropdown").show();
  });

  // Добавляем обработчик события клика на любой другой элемент на странице
  $(document).on("click", function (event) {
    // Если кликнули на элемент вне .base-combo, то возвращаем все в начальное состояние
    if (!$(event.target).closest(".base-combo").length) {
      $(".combo-form").hide();
      $(".dropdown").show();
      $(".cur-wrapper").hide();
      baseCombos.removeClass("active");
    }
  });
});

//
$("#change").on("click", function () {
  // Переставляем местами первый и второй элементы .cur-wrapper внутри их общего родителя
  var firstCurWrapper = $(".cur-wrapper").first();
  var secondCurWrapper = $(".cur-wrapper").eq(1);

  if (firstCurWrapper.length && secondCurWrapper.length) {
    var parent = firstCurWrapper.parent();
    firstCurWrapper.detach();
    secondCurWrapper.detach();
    parent.prepend(secondCurWrapper);
    parent.prepend(firstCurWrapper);
  }
});

// Меняем местами
$("#change").on("click", function () {
  // Находим элементы с классом "combo-selected"
  var comboSelectedElements = $(".combo-selected");

  // Находим первый элемент с классом "combo-text-name" внутри первого "combo-selected"
  var firstComboTextName = comboSelectedElements
    .first()
    .find(".combo-text-name");

  // Находим первый элемент с классом "combo-text-code" внутри первого "combo-selected"
  var firstComboTextCode = comboSelectedElements
    .first()
    .find(".combo-text-code");

  // Находим первый элемент с классом "cur-flag-icon" внутри первого "combo-selected"
  var firstCurFlagIcon = comboSelectedElements.first().find(".cur-flag-icon");

  // Находим второй элемент с классом "combo-text-name" внутри второго "combo-selected"
  var secondComboTextName = comboSelectedElements
    .eq(1)
    .find(".combo-text-name");

  // Находим второй элемент с классом "combo-text-code" внутри второго "combo-selected"
  var secondComboTextCode = comboSelectedElements
    .eq(1)
    .find(".combo-text-code");

  // Находим второй элемент с классом "cur-flag-icon" внутри второго "combo-selected"
  var secondCurFlagIcon = comboSelectedElements.eq(1).find(".cur-flag-icon");

  // Получаем текст из первого элемента
  var firstTextName = firstComboTextName.text();
  var firstTextCode = firstComboTextCode.text();
  var firstImageSrc = firstCurFlagIcon.attr("src");

  // Получаем текст из второго элемента
  var secondTextName = secondComboTextName.text();
  var secondTextCode = secondComboTextCode.text();
  var secondImageSrc = secondCurFlagIcon.attr("src");

  // Меняем текст и src внутри первого элемента на текст и src из второго элемента
  firstComboTextName.text(secondTextName);
  firstComboTextCode.text(secondTextCode);
  firstCurFlagIcon.attr("src", secondImageSrc);

  // Меняем текст и src внутри второго элемента на текст и src из первого элемента
  secondComboTextName.text(firstTextName);
  secondComboTextCode.text(firstTextCode);
  secondCurFlagIcon.attr("src", firstImageSrc);
});
