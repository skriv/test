


$(document).ready(function() {
    var IconYellow = $(".webinar-icon-star").hide();
    var IconBlue = $(".webinar-icon-triangle").hide();
    var IconPink = $(".webinar-icon-pink-circle").hide();
    var IconOrange = $(".webinar-icon-circle").hide();
    var IconMulti = $(".webinar-icon-sign").hide();

    // Проверяем количество авторов
    var authors = $('.author-grid .author');
    if (authors.length === 1) {
        // Если один автор, показываем соответствующие иконки
        IconYellow.show();
        IconBlue.show();
        IconOrange.show();
        IconMulti.show();
    } else if (authors.length === 2) {
        // Если два автора, показываем разные иконки для каждого
        $(authors[0]).find('.webinar-icon-star, .webinar-icon-pink-circle').show();
        $(authors[1]).find('.webinar-icon-triangle, .webinar-icon-sticks').show();
    }else if (authors.length === 3) {
        // Если два автора, показываем разные иконки для каждого
        $(authors[0]).find('.webinar-icon-star').show();
        $(authors[1]).find('.webinar-icon-triangle').show();
        $(authors[2]).find('.webinar-icon-sticks').show();
    }else if (authors.length === 4) {
        // Если два автора, показываем разные иконки для каждого
        $(authors[0]).find('.webinar-icon-star').show();
        $(authors[1]).find('.webinar-icon-triangle').show();
        $(authors[2]).find('.webinar-icon-sticks').show();
        $(authors[3]).find('.webinar-icon-green').show();
    }
});


