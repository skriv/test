console.log("Hello Walbi1111");

// const ANDRIOD_BUTTON_NAME = "Download the app";
// const ANDROID_LINK = "https://play.google.com/store/apps/details?id=com.walbi.android";
// const JOIN_LINK = "https://app.walbi.com/"

var EMPTY = "";

var IOS_BUTTON_NAME = "Download iOS Beta";
var IOS_LINK = "https://testflight.apple.com/join/QRbXi8u3"

var ANDROID_BUTTON_NAME = "Download";
var ANDROID_LINK = "https://play.google.com/store/apps/details?id=com.walbi.android";

var JOIN_LINK = "https://app.walbi.com/";
var JOIN_BUTTON_NAME = "Join";



$(document).ready(function(){

  var userAgent = navigator.userAgent.toLowerCase();
  var isAndroid = userAgent.indexOf("android") > -1; // Провер
  var isIOS = /iphone|ipad|ipod/.test(userAgent); // Проверяем наличие iOS устройств

  var mainButton = $('#mainButton');

  if (isAndroid) {
    mainButton.text(ANDROID_BUTTON_NAME).attr('href', ANDROID_LINK);
  } else if (isIOS) {
    mainButton.text(IOS_BUTTON_NAME).attr('href', IOS_LINK);
  } else {
    mainButton.text(JOIN_BUTTON_NAME).attr('href', JOIN_LINK);
  }

  $('#blog-list').append('<div id="empty">&nbsp;</div>');

  EMPTY = $('#empty');
    updatePadding();
});




// Функция для обновления padding-right у элемента #empty в списке блогпостов
function updatePadding() {
  var windowWidth = $(window).width();
  var swiperWrapperWidth = $('.swiper-wrapper').width();
  var difference = (windowWidth - swiperWrapperWidth) / 2;
  EMPTY.css({
    'padding-right': difference + 'px',
    'margin-right': -difference + 'px'
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

const containers = $(".test-scroll.padding-medium");
let ppp = 0;

let result = 0;
for (let i = 0; i < containers.length; i++) {
  result += containers[i].clientWidth;
  ppp = ppp + 16;
}
ppp = ppp - 16;

let cont = $(".container-large").width();

var endX = cont - result - ppp;
console.log(endX)

// // создаем твин, который перемещает элемент по горизонтали
tl.to("#currency", {
  x: endX,
  ease: "none" // отключаем плавность анимации, чтобы получить плавный скроллинг
});



// // создаем триггер ScrollTrigger для запуска анимации
ScrollTrigger.create({
  trigger: "#currency", // элемент, который будет запускать триггер
  start: "top 95%", // точка начала анимации (верх центра экрана)
  end: "bottom 5%", // точка окончания анимации (низ центра экрана
  animation: tl, // анимация, которую мы создали с помощью GSAP
  scrub: true // плавность анимации при скроллинге
  //markers: true // показывать маркеры для отладки
});



$(window).resize(function () {
  // код, который нужно выполнить при изменении размера окна
  cont = $(".container-large").width();
  endX = cont - result - ppp;
  // console.log("cont");
  ScrollTrigger.update();


  updatePadding(); //обновляем паддинги для блог листинга
});
