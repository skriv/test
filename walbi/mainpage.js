console.log("Hello Walbi");

//Main State

//COOKIES
// Cache DOM elements
// var pageWrapper = $(".page-wrapper");
// var navbarWrapper = $(".navbar-wrapper");
// var menuBtn = $("#mobile-menu");
// var dropdownTops = $(".dropdown.top");
// var mainWrapper = $(".main-wrapper");
// $(".dropdown-wrapper").show(); // показываем контейнер с dropdown menu

// Set initial theme based on cookie
// if (Cookies.get("darkTheme") == "enabled") {
//   pageWrapper.addClass("dark-theme");
//   setThemeColors("dark");
// } else {
//   setThemeColors("light");
// }

// Theme Switcher
// $(".theme-switch").on("click", function () {
//   pageWrapper.toggleClass("dark-theme");
//   if (pageWrapper.hasClass("dark-theme")) {
//     Cookies.set("darkTheme", "enabled", { path: "/", expires: 365 });
//     setThemeColors("dark");
//   } else {
//     Cookies.remove("darkTheme");
//     setThemeColors("light");
//   }
// });

// $("[data-hoverable]").hover(
//   function () {
//     setNavBarColor();
//   },
//   function () {
//     resetNavBarColor();
//   }
// );

// Change NavBar on Hover
// dropdownTops.hover(
//   function () {
//     setNavBarColor();
//   },
//   function () {
//     resetNavBarColor();
//   }
// );

// Change NavBar mobile
// menuBtn.click(function () {
//   if (!menuBtn.data("clicked")) {
//     setNavBarColor();
//   } else {
//     resetNavBarColor();
//   }
//   menuBtn.data("clicked", !menuBtn.data("clicked"));
// });

// function setThemeColors(theme) {
//   if (theme === "dark") {
//     document.documentElement.style.setProperty("--bg-color", "#fff");
//     document.documentElement.style.setProperty("--nav-color", "#fff");
//   } else {
//     document.documentElement.style.setProperty("--bg-color", "#000");
//     document.documentElement.style.setProperty("--nav-color", "#000");
//   }
// }

// function setNavBarColor() {
//   navbarWrapper.css("background-color", "var(--nav-color)");
// }

// function resetNavBarColor() {
//   navbarWrapper.css("background-color", "");
// }



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
});







// SWIPER

$(".slider-main_component").each(function (index) {
  let loopMode = false;
  if ($(this).attr("loop-mode") === "true") {
    loopMode = true;
  }
  let sliderDuration = 300;
  if ($(this).attr("slider-duration") !== undefined) {
    sliderDuration = +$(this).attr("slider-duration");
  }
  const swiper = new Swiper($(this).find(".swiper")[0], {
    speed: sliderDuration,
    loop: loopMode,
    autoHeight: false,
    centeredSlides: loopMode,
    followFinger: true,
    freeMode: false,
    slideToClickedSlide: false,
    slidesPerView: 1,
    spaceBetween: "4%",
    rewind: false,
    mousewheel: {
      forceToAxis: true
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    breakpoints: {
      // mobile landscape
      480: {
        slidesPerView: 1.5,
        spaceBetween: 12
      },
      // tablet
      768: {
        slidesPerView: 2,
        spaceBetween: 12
      },
      // desktop
      992: {
        slidesPerView: 3,
        spaceBetween: 12
      }
    },
    pagination: {
      el: $(this).find(".swiper-bullet-wrapper")[0],
      bulletActiveClass: "is-active",
      bulletClass: "swiper-bullet",
      bulletElement: "button",
      clickable: true
    },
    navigation: {
      nextEl: $(this).find(".swiper-next")[0],
      prevEl: $(this).find(".swiper-prev")[0],
      disabledClass: "is-disabled"
    },
    scrollbar: {
      el: $(this).find(".swiper-drag-wrapper")[0],
      draggable: true,
      dragClass: "swiper-drag",
      snapOnRelease: true
    },
    slideActiveClass: "is-active",
    slideDuplicateActiveClass: "is-active"
  });
});