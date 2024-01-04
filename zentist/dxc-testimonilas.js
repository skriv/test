// = HELPER =
function print(obj) {
    console.log(obj);
  }
  
  print("test")
  
  // Slider Testimonials
  $(".slider-main_component").each(function (index) {
    let loopMode = false;
    if ($(this).attr("loop-mode") === "true") {
      loopMode = false;
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
      spaceBetween: 100,
      speed: 1000,
      // effect: "fade",
      rewind: false,
      // mousewheel: {
      //   forceToAxis: true
      // },
      keyboard: {
        enabled: true,
        onlyInViewport: true
      },
      breakpoints: {
        // mobile landscape
        480: {
          slidesPerView: 1,
          spaceBetween: 32
        },
        // tablet
        768: {
          slidesPerView: 2,
          spaceBetween: 32
        },
        // desktop
        992: {
          slidesPerView: 3,
          spaceBetween: 32
        }
      },
      pagination: {
        el: $(this).find(".swiper-bullet-wrapper")[0],
        bulletActiveClass: "is-active",
        bulletClass: "swiper-bullet",
        bulletElement: "button",
        clickable: true
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      }
    });
  });
  