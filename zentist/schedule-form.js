console.log("Schedule form111");

$(document).ready(function() {
    // Константа с ожидаемым значением
    const REF = "RE-54ZP-AI";

    // Обработчик события отправки формы
    $('#schedule-submit').on('click', function(e) {
        // Получаем значение из поля ввода
        var referralValue = $('#referral').val();

        // Проверяем, совпадает ли оно с ожидаемым
        if(referralValue !== REF) {
            // Если не совпадает, очищаем поле
            $('#referral').val('');
            // Предотвращаем отправку формы, если необходимо
            // e.preventDefault();
        }
        // Если необходимо отправить форму даже после изменения, 
        // уберите комментарий с e.preventDefault() и добавьте здесь код для отправки формы.
    });
});
