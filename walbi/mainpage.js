console.log("Hello WalbiProduction");

var EMPTY = "";

var IOS_BUTTON_NAME = "Download iOS Beta";
var IOS_LINK = "https://testflight.apple.com/join/QRbXi8u3"

var IOS_INDIA = "Download";
var IOS_INDIA_LINK = "https://apps.apple.com/us/app/walbi-ai-crypto-assistant/id6451312745";

var ANDROID_BUTTON_NAME = "Download";
var ANDROID_LINK = "https://play.google.com/store/apps/details?id=com.walbi.android";

var JOIN_LINK = "https://app.walbi.com/";
var JOIN_BUTTON_NAME = "Join";


// USER AGENT
var userAgent = navigator.userAgent.toLowerCase();
var isAndroid = userAgent.indexOf("android") > -1; 
var isIOS = /iphone|ipad|ipod/.test(userAgent); // Проверяем наличие iOS устройств


var mainButton = $('.hero-section');
var userCountry = null;

$(document).ready(function() {
  initializeMainButton();
  initializeBlogList();
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
  mainButton.text(text).attr('href', href);
  console.log(href);
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
  if (userCountry === 'IN') {
    setMainButton(IOS_INDIA, IOS_INDIA_LINK);
  } else {
    setMainButton(IOS_BUTTON_NAME, IOS_LINK);
  }
}

function initializeBlogList() {
  $('#blog-list').append('<div id="empty">&nbsp;</div>');
  EMPTY = $('#empty');
  resetAndRecalculate();
}



// Add Padding to Blog Section
function resetAndRecalculate() {
  var swiperWrapper = $('.container-large');

  // Сброс положения элемента, если нужно
  // Например, 
  // swiperWrapper.css('left', '0px');

  // Вычисление и вывод новой позиции
  var distance = swiperWrapper.offset().left;
  EMPTY.css({
    'padding-right': distance + 'px',
    'margin-right': -distance + 'px'    
  });
}







// //GSAP
gsap.registerPlugin(ScrollTrigger);

var gsap = window.gsap;
var ScrollTrigger = window.ScrollTrigger;

// // создаем анимацию с помощью GSAP
var tl = gsap.timeline({
  defaults: {
    duration: 1 // длительность анимации
  }
});

const containers = $(".test-scroll");
let ppp = 0;

let result = 0;
for (let i = 0; i < containers.length; i++) {
  result += containers[i].clientWidth;
  ppp = ppp + 16;
}
ppp = ppp - 16;

let cont = $(".container-large").width();

var endX = cont - result - ppp;

// // создаем твин, который перемещает элемент по горизонтали
tl.to("#currency", {
  x: endX,
  ease: "none" // отключаем плавность анимации, чтобы получить плавный скроллинг
});



// создаем триггер ScrollTrigger для запуска анимации
ScrollTrigger.create({
  trigger: "#currency", // элемент, который будет запускать триггер
  start: "top 95%", // точка начала анимации (верх центра экрана)
  end: "bottom 5%", // точка окончания анимации (низ центра экрана
  animation: tl, // анимация, которую мы создали с помощью GSAP
  scrub: true // плавность анимации при скроллинге
  //markers: true // показывать маркеры для отладки
});


// код, который нужно выполнить при изменении размера окна
$(window).resize(function () {
  cont = $(".container-large").width();
  endX = cont - result - ppp;
  ScrollTrigger.update();

  resetAndRecalculate(); // Add Padding to Blog Section
});


