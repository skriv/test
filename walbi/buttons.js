console.log("Hello Buttons");


var IOS_BUTTON_NAME = "Download iOS Beta";
var IOS_LINK = "https://testflight.apple.com/join/QRbXi8u3"

var IOS_INDIA = "Download";
var IOS_INDIA_LINK = "https://apps.apple.com/us/app/walbi-ai-crypto-assistant/id6451312745";

var ANDROID_BUTTON_NAME = "Download";
var ANDROID_LINK = "https://play.google.com/store/apps/details?id=com.walbi.android";

var JOIN_LINK = "https://app.walbi.com/";
var JOIN_BUTTON_NAME = "Join";

var REGION = 'IN';

// USER AGENT
var userAgent = navigator.userAgent.toLowerCase();
var isAndroid = userAgent.indexOf("android") > -1; 
var isIOS = /iphone|ipad|ipod/.test(userAgent); // Проверяем наличие iOS устройств


var mainButton = $("button[data-utm], a[data-utm]");
var userCountry = null;

$(document).ready(function() {
  initializeMainButton();
});

function initializeMainButton() {
  if (isAndroid) {
    setMainButton(ANDROID_BUTTON_NAME, ANDROID_LINK);
  } else if (isIOS) {
    setupIosButton();
  } else {
    setMainButton(JOIN_BUTTON_NAME, JOIN_LINK);
  }
}

function setMainButton(text, href) {

  mainButton.each(function() {
    if ($(this).attr('data-nochange') !== "undefined") {
      $(this).attr("href");
    }else{
      $(this).text(text).attr('href', href);
    }
  });

  // mainButton.text(text).attr('href', href);
  console.log(href);
  setUTMtoButtons();
}

function setupIosButton() {
  if (userCountry === null) {
    $.getJSON('https://ipinfo.io', function(data) {
      if (data && data.country) {
        userCountry = data.country;
        updateIosButton();
      }
    }).fail(function() {
      console.error('Error request to ipinfo.io');
    });
  } else {
    updateIosButton();
  }
}

function updateIosButton() {
  if (userCountry === REGION) {
    setMainButton(IOS_INDIA, IOS_INDIA_LINK);
  } else {
    setMainButton(IOS_BUTTON_NAME, IOS_LINK);
  }
}


function setUTMtoButtons() {
  // Выбираем все ссылки с атрибутом data-utm
  mainButton.each(function () {
    var currentUrl = new URL(window.location.href);
    var linkUrl = new URL($(this).attr("href"));

    // Перечисляем UTM-параметры, которые нужно добавить или обновить
    [
      "utm_campaign",
      "utm_source",
      "utm_medium",
      "utm_term",
      "utm_content",
    ].forEach(function (param) {
      let value = currentUrl.searchParams.get(param);
      // Добавляем параметр, только если он есть в текущем URL
      if (value) linkUrl.searchParams.set(param, value);
    });

    // Обновляем href ссылки
    $(this).attr("href", linkUrl.toString());
  });
}











