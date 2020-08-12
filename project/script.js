"use strict";
// Nylek Jackson 8/4/2020 

window.addEventListener("load", function(){
   //Retrieve the field/ value pairs from th URL
   var formData = location.search.slice(1);
   formData = formData.replace(/\+/g,"");
   formData = decodeURIComponent(formData);
   // Take the formData string, use split() on any occurence of a = or & character. This will create an array of the form info
   var formFields = formData.split(/[&=]/g);
   console.log(formFields);

   // Write the field values from the array to the order form
   document.forms.order.elements.orderDate.value = formFields[1];
   document.forms.order.elements.modelName.value = formFields[5];
   document.forms.order.elements.qty.value = formFields[7];
   document.forms.order.elements.initialCost.value = formFields[9];
   document.forms.order.elements.protectionName.value = formFields[13];
   document.forms.order.elements.protectionCost.value = formFields[15];
   document.forms.order.elements.subtotal.value = formFields[17];
   document.forms.order.elements.salesTax.value = formFields[19];
   document.forms.order.elements.totalCost.value = formFields[21];

});

window.addEventListener("load", function() {
   document.getElementById("subButton").onclick = runSubmit;
   document.getElementById("cardName").oninput = validateName;
   document.getElementById("cardNumber").oninput = validateNumber;
   document.getElementById("expMonth").onchange = validateMonth;
   document.getElementById("expYear").onchange = validateYear;
   document.getElementById("cvc").oninput = validateCVC;
});

// definition of the runSubmit () function
function runSubmit() {
   validateName();
   validateCredit();
   validateNumber();
   validateMonth();
   validateYear();
   validateCVC();
}


// definition of the validateName() function
function validateName() {
   var cardName = document.getElementById("cardName");

   // check if the valueMissing property is "true"
if(cardName.validity.valueMissing) {
   cardName.setCustomValidity("Enter your name exactly as it appears on the card.");
} else {
   cardName.setCustomValidity("");
   }
}

// definition of the validateCredit() function
function validateCredit(){
   var creditCard = document.forms.payment.elements.credit[0];
   // check if the valueMissing property is"true"
   if(creditCard.validity.valueMissing) {
      creditCard.setCustomValidity("select your credit card.");
   } else {
      creditCard.setCustomValidity("");
   }
}

//definition of the validateNumber() function
function validateNumber(){
   var cardNumber = document.getElementById("cardNumber");
   // check if the valueMissing property is true first
   if(cardNumber.validity.valueMissing){
      cardNumber.setCustomValidity("Enter your card number.");
   } else if(cardNumber.validity.patternMismatch) {
      cardNumber.setCustomValidity("Enter a valid card number.");
   } else {
      cardNumber.setCustomValidity("");
   }
}

// definition of the validateMonth() function
function validateMonth(){
   var cardMonth = document.getElementById("expMonth");

   // check all of the options to see which is the selected index
if(cardMonth.selectedIndex === 0){
cardMonth.setCustomValidity("Select the expiration month.");
   } else {
      cardMonth.setCustomValidity("");
   }

}

// definition of the validateYear() function
function validateYear(){
   var cardYear = document.getElementById("expYear");

   // check all of the options to see which is the selected index
if(cardYear.selectedIndex === 0){
cardYear.setCustomValidity("Select the expiration Year.");
   } else {
      cardYear.setCustomValidity("");
   }

}

// definition of the validateCVC() function
function validateCVC(){
   var cardCVC = document.getElementById("cvc");
   var creditCard = document.querySelector('input[name="credit"]:checked').value;

   // First test to see if the field is empty
   if(cardCVC.validity.valueMissing){
      cardCVC.setCustomValidity("Enter your CVC number");
   } else if((creditCard === "amex") && (/^\d{4}$/.test(cardCVC.value) === false)) {
      cardCVC.setCustomValidity("Enter a 4-digit CVC number");
   } else if((creditCard !== "amex") && (/^\d{3}$/.test(cardCVC.value) === false)) {
      cardCVC.setCustomValidity("Enter a 3-digit CVC number");
   } else {
      cardCVC.setCustomValidity("");
   }

}