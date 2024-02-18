console.log("Signature");
var imageURL;
var content = document.getElementById("copy");
var wrapper = $("#contentWrapper");

//Buttons
var copyButton = $("#copyButton");
var generateButton = $("#generateButton");

//Fields
var fNameField = $("#fname");
var lNameField = $("#lname");
var positionField = $("#position");
var emailField = $("#email");
var phoneField = $("#phone");

var copied = $("#copied");


generateButton.hide();
wrapper.hide();

$(document).ready(function () {
    // get a widget reference
    const widget = uploadcare.SingleWidget("[role=uploadcare-uploader]");

    // listen to the "upload completed" event
    widget.onUploadComplete((fileInfo) => {
    imageURL = fileInfo.cdnUrl; //   console.log(fileInfo.cdnUrl);
    generateButton.show();
  });


});


//COPY CLICK
generateButton.click(function () {
    var fname = fNameField.val(); // Получаем значение из текстового поля
    var lname = lNameField.val(); // Получаем значение из текстового поля
    var position = positionField.val(); // Получаем значение из текстового поля
    var email = emailField.val(); // Получаем значение из текстового поля
    var phone = phoneField.val(); // Получаем значение из текстового поля
    console.log(fname);
    console.log(lname);
    console.log(position);

    //Change Photo
    $("#userImage").attr("src", imageURL); // Заменяет URL изображения на "VAL"

    //Change Content
    $("#userName").text(fname); 
    $("#userLast").text(lname); 
    $("#userPosition").text(position);

    //Change Email
    $("#userEmail").text(email); 
    $("#userEmail").attr("href", "mailto:" + email);

      //Change Phone
      $("#userPhone").text(phone); 
      $("#userPhone").attr("href", "tel:" + phone);

      //Show Block
      wrapper.show().css("opacity", "1");
});


//COPY CLICK
copyButton.click(function () {
  var range = document.createRange();
  range.selectNode(content);
  window.getSelection().removeAllRanges(); // Очистка текущего выделения
  window.getSelection().addRange(range); // Выделение содержимого элемента

  try {
    // Попытка скопировать выделенное содержимое в буфер обмена
    var successful = document.execCommand("copy");
    var msg = successful ? "успешно" : "неудачно";
    console.log("Копирование " + msg);
    copied.animate({opacity: 1}, 300);

    // Запускаем таймер
    setTimeout(function() {
        // Плавно изменяем прозрачность элемента на 0 за 0.5 секунды (500 мс)
        $("#copied").animate({opacity: 0}, 300);
    }, 5000); // 5000 мс = 5 секунд
    

  } catch (err) {
    console.log("Ошибка при копировании");
  }

  window.getSelection().removeAllRanges(); // Снятие выделения
});
