console.log("Hello Main Page");

var EMPTY = "";

$(document).ready(function () {
  initializeBlogList();
});


function initializeBlogList() {
  $("#blog-list").append('<div id="empty">&nbsp;</div>');
  EMPTY = $("#empty");
  resetAndRecalculate();
}

// Add Padding to Blog Section
function resetAndRecalculate() {
  var swiperWrapper = $(".container-large")

  // Вычисление и вывод новой позиции
  var distance = swiperWrapper.offset().left;
  EMPTY.css({
    "padding-right": distance + "px",
    "margin-right": -distance + "px",
  });
}

// //GSAP
gsap.registerPlugin(ScrollTrigger);

var gsap = window.gsap;
var ScrollTrigger = window.ScrollTrigger;

// // создаем анимацию с помощью GSAP
var tl = gsap.timeline({
  defaults: {
    duration: 1, // длительность анимации
  },
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
  ease: "none", // отключаем плавность анимации, чтобы получить плавный скроллинг
});

// создаем триггер ScrollTrigger для запуска анимации
ScrollTrigger.create({
  trigger: "#currency", // элемент, который будет запускать триггер
  start: "top 95%", // точка начала анимации (верх центра экрана)
  end: "bottom 5%", // точка окончания анимации (низ центра экрана
  animation: tl, // анимация, которую мы создали с помощью GSAP
  scrub: true, // плавность анимации при скроллинге
  //markers: true // показывать маркеры для отладки
});

// код, который нужно выполнить при изменении размера окна
$(window).resize(function () {
  cont = $(".container-large").width();
  endX = cont - result - ppp;
  ScrollTrigger.update();

  resetAndRecalculate(); // Add Padding to Blog Section
});
