console.log("Hello RCM4");

let swiper;


// // VIDEO PLAYER
// $(document).ready(function () {
//   const players = Plyr.setup(".js-player", {
//     controls: [],
//   });

//   // Функция для остановки всех видео, кроме выбранного
//   function stopAllVideos(exceptPlayer) {
//     players.forEach(function (player) {
//       if (player !== exceptPlayer) {
//         player.pause();
//       }
//     });
//   }



//   // Добавьте обработчики событий "play" и "pause" для каждого плеера
//   players.forEach(function (player, index) {
//     player.on("play", function () {
//       stopAllVideos(player);
//       $(".cover").eq(index).hide(); // Скрываем "cover" для текущего видео
//     });

//     player.on("pause", function () {
//       $(".cover").eq(index).show(); // Показываем "cover" при паузе текущего видео
//     });
//   });

//   // Находим все элементы с классом "cover"

//   // Добавляем обработчики кликов для каждого "cover" элемента
//   $(".cover").each(function (index) {
//     $(this).click(function () {
//       const player = players[index];
//       if (player.paused) {
//         $(this).hide();
//         player.play();
//         stopAllVideos(player);
//       } else {
//         player.pause();
//         $(this).show();
//       }
  
//       if (swiper) {
//         swiper.slideTo(index);
//       }
//     });
//   });
// });


$(document).ready(function () {
    const players = Plyr.setup(".js-player", {
      controls: [],
    });
  
    // Функция для остановки всех видео, кроме выбранного
    function stopAllVideos(exceptPlayer) {
      players.forEach(function (player) {
        if (player !== exceptPlayer) {
          player.pause();
        }
      });
    }
  
    // Добавьте обработчики событий "play" и "pause" для каждого плеера
    players.forEach(function (player, index) {
      player.on("play", function () {
        stopAllVideos(player);
        $(".cover").eq(index).hide(); // Скрываем "cover" для текущего видео
      });
  
      player.on("pause", function () {
        $(".cover").eq(index).show(); // Показываем "cover" при паузе текущего видео
      });
    });
  
    // Находим все элементы с классом "cover"
    const coverElements = $(".cover");
  
    // Добавляем обработчики кликов и касаний для каждого "cover" элемента
    $(".cover").each(function (index) {
      $(this).on("click touchstart", function () {
        const player = players[index];
        if (player.paused) {
          $(this).hide();
          player.play();
          stopAllVideos(player);
        } else {
          player.pause();
          $(this).show();
        });
  
      // Добавляем обработчик события touchmove для документа
      $(document).on("touchmove", function () {
        // При скроллинге на мобильных устройствах останавливаем все видео
        stopAllVideos();
      });
    });
  });

  

// VIDEO SLIDER
$(".slider-main_component").each(function (index) {
  let sliderDuration = 300;
  if ($(this).attr("slider-duration") !== undefined) {
    sliderDuration = +$(this).attr("slider-duration");
  }
   swiper = new Swiper($(this).find(".swiper")[0], {
    speed: sliderDuration,
    loop: false,
    autoHeight: false,
    followFinger: true,
    freeMode: false,
    slideToClickedSlide: false,
    slidesPerView: 1,
    spaceBetween: "4%",
    rewind: false,
    mousewheel: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    breakpoints: {
      // mobile landscape
      480: {
        slidesPerView: 1,
        spaceBetween: "4%",
      },
      // tablet
      768: {
        slidesPerView: 2,
        spaceBetween: "4%",
      },
      // desktop
      992: {
        slidesPerView: 1.5,
        spaceBetween: 32,
      },
    },
    navigation: {
      nextEl: $(this).find(".swiper-next")[0],
      prevEl: $(this).find(".swiper-prev")[0],
      disabledClass: "is-disabled",
    },
    slideActiveClass: "is-active",
    slideDuplicateActiveClass: "is-active",
    // initialSlide: 1, // Второй слайд (индексация начинается с 0)
    centeredSlides: true,
  });
});
