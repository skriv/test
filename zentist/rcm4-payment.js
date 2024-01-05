console.log("Test Payment")

$(document).ready(function() {
    // Функция для добавления строк
    function addAttendeeRows(quantity) {
        // Очищаем .add-info перед добавлением нового содержимого
        $('.add-info').empty();

        // Добавляем str в .add-info соответствующее количество раз
        for (var i = 0; i < quantity; i++) {
            var str = "<div class='attendee-row'><input type='text' class='card-number w-input' maxlength='256' name='Attendee " + i + "' data-name='Attendee Name " + i + "' placeholder='Name' id='attendee " + i + "' required=''><input type='email' class='card-number w-input' maxlength='256' name='email " + i + "' data-name='Attendee Email " + i + "' placeholder='Email' id='email " + i + "' required=''><input type='phone' class='card-number w-input' maxlength='256' name='phone " + i + "' data-name='Attendee Phone " + i + "' placeholder='Phone' id='phone " + i + "' required=''></div>";
            $('.add-info').append(str);
        }
    }

    // Добавляем одну строку при загрузке страницы
    addAttendeeRows(1);

    // Обновляем строки при изменении значения поля ввода
    $('.rcm-4-quantity').on('input', function() {
        var quantity = parseInt($(this).val());
        addAttendeeRows(quantity);
    });


    var form = document.querySelector('.my-form'); // Выберите форму, которую вы хотите отслеживать
    var buyNowButton = document.querySelector('a[data-node-type="commerce-buy-now-button"]'); // Выберите ссылку "Buy now"


        form.addEventListener('submit', function (event) {
            console.log("ready")
          event.preventDefault(); // Предотвратите отправку формы по умолчанию
          buyNowButton.click();
          console.log("submitted")


        });

        



    });
