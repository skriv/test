$(document).ready(function () {


    var typeTicket = $("input[name='Type']");
    var dsoSelect;
    var campusSelect = true;

    

    var ONLINE = $('form[data-commerce-product-id="659e4671e0fcbaa2240b96c2"]');
    var buttonInOnlineForm = ONLINE.find('a[data-node-type="commerce-buy-now-button"]');

    var CAMPUS = $('form[data-commerce-product-id="6596c104eca990a20e570900"]');
    var buttonInCampusForm = CAMPUS.find('a[data-node-type="commerce-buy-now-button"]');

    $("#other-dso").hide();
    $(".other-wrapper").hide();


   
    
  
    ticketName();


    // Функция для добавления строк
    function addAttendeeRows(quantity) {
      // Очищаем .add-info перед добавлением нового содержимого
      $(".add-info").empty();
  
      // Добавляем str в .add-info соответствующее количество раз
      for (var i = 0; i < quantity; i++) {
        var str =
          "<div class='attendee-row'><input type='text' class='form-text-rcm4 white w-input' maxlength='256' name='Attendee " +
          i +
          "' data-name='Attendee Name " +
          i +
          "' placeholder='Name' id='attendee " +
          i +
          "' required=''><input type='email' class='form-text-rcm4 white w-input' maxlength='256' name='email " +
          i +
          "' data-name='Attendee Email " +
          i +
          "' placeholder='Email' id='email " +
          i +
          "' required=''><input type='phone' class='form-text-rcm4 white w-input' maxlength='256' name='phone " +
          i +
          "' data-name='Attendee Phone " +
          i +
          "' placeholder='Phone' id='phone " +
          i +
          "' required=''></div>";
        $(".add-info").append(str);
      }
    }
  
    // Добавляем одну строку при загрузке страницы
    addAttendeeRows(1);
  
    // Обновляем строки при изменении значения поля ввода
    $(".rcm-4-quantity").on("input", function () {
      var quantity = parseInt($(this).val());
      addAttendeeRows(quantity);
    });
  
    // Обработчик изменения выбора Radio
    $("input[name='Radio']").change(function () {
      var selectedValue = $("input[name='Radio']:checked").val();
      if (selectedValue === "DSO") {
        dsoSelect = true;
        $(".other-wrapper").hide();
        $("#other-dso").hide().prop("required", false); // Hide and make not required
      } else if (selectedValue === "Vendor") {
        dsoSelect = false;
        $(".other-wrapper").hide();
        $("#other-dso").hide().prop("required", false); // Hide and make not required
      } else if (selectedValue === "Other") {
        dsoSelect = false;
        $(".other-wrapper").show();
        $("#other-dso").show().prop("required", true); // Show and make required
        $("#other-dso").focus();
      }
    });
  

    // Выбор формы для отслеживания события submit
    var form = $(".my-form");
  
    form.on("submit", function (event) {
      event.preventDefault(); // Предотвращаем отправку формы по умолчанию
      
      if (dsoSelect) { 
        if(campusSelect){
            buttonInCampusForm[0].click(); // Trigger click event on the first button element
        }else{
            buttonInOnlineForm[0].click();
        }
      }else{ // Если не выбран DSO

        $("#registration-wrapper").hide();

        $(".success-message-3 div").html("<div class='text-block-154 text-balanced'>The bootcamp attendance is reserved to Dental Support Organizations DSOs. <br/>For sponsorship opportunities, please send us an email <a href='mailto:growth@zentist.io'>growth@zentist.io</a>.</div>");

      }

      // COOKIES
      // var organizationName = "TEST";
        var organizationName = $('#Organization').val();
        console.log(organizationName);
        Cookies.set('myCookie', organizationName, { expires: 7 }); // Expires in 7 days
        
    });

    $(".rcm-plan4-wrapper").click(function () {


        // Remove the 'active' class from all divs with class rcm-plan4-wrapper
        $(".rcm-plan4-wrapper").removeClass("active");
    
        // Add the 'active' class to the clicked div
        $(this).addClass("active");
        ticketName();
        

        // Check if the clicked div contains the text "Campus"
        if ($(this).text().includes("RCM4 On-Campus")) {
            campusSelect = true;
        }else{
            campusSelect = false;
        }


      });   

      function ticketName(){
        var h2Value = $(".rcm-plan4-wrapper.active h2").text();
        typeTicket.val(h2Value);
      }

      

    // function showMessage() {
    //     //console.log("show message");
    //     dsoSelect = false;
    //     $("#other-dso").hide().prop("required", false); // Hide and make not required
    //   }
    
  });