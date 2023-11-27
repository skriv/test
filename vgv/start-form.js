var buttonClick = $("#to-buy");
var wrapper = $("#button-wrapper");
var form = $("#buy-form");

form.hide(); // hide form

buttonClick.on("click", function () {
  buttonClick.hide();
  form.show();
});