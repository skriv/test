// = HELPER =
function print(obj) {
    console.log(obj);
  }
  
  print("SSSSSS");
  
  // Slider Success Stories
  
  // Slider Testimonials
  
  $(".slider-ss").each(function (index) {
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
      // autoHeight: false,
      // centeredSlides: loopMode,
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
          slidesPerView: 1,
          spaceBetween: "4%"
        },
        // tablet
        768: {
          slidesPerView: 2,
          spaceBetween: 48
        },
        // desktop
        992: {
          slidesPerView: 3,
          spaceBetween: 48
        }
      },
      navigation: {
        nextEl: $(this).find(".swiper-next")[0],
        prevEl: $(this).find(".swiper-prev")[0],
        disabledClass: "is-disabled"
      },
      slideActiveClass: "is-active",
      slideDuplicateActiveClass: "is-active"
    });
  });
  