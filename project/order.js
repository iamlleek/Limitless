"use strict";


window.addEventListener("load", function(){
   // variable that acts as a shortcut to the order from object
   var orderForm = document.forms.orderForm;

   //find the orderDate element in the form and update its value property
   orderForm.elements.orderDate.value = new Date().toDateString();

   // add the focus to the wrapc field when page loads
   orderForm.elements.wrapc.focus(); 

   //Call the calcOrder() function which calculates the cost of the order
   calcOrder();

   // Event handlers for the web form
   orderForm.elements.wrapc.onchange = calcOrder;
    orderForm.elements.qty.onchange = calcOrder;

    // variable which will build a collection of all the radio buttons
    var planOptions = document.querySelectorAll('input[name="Warranty"]');
    // for loop that loops through each element in planOptions
    for (var i = 0; i < planOptions.length; i++) {
      planOptions[i].onclick = calcOrder;
    } // end of loops

});

// function definition of calcOrder()
function calcOrder() {
   var orderForm = document.forms.orderForm;

   // Calculate the initial cost of the order
   var mIndex = orderForm.elements.wrapc.selectedIndex;
   var mCost = orderForm.elements.wrapc.options[mIndex].value;
   var qIndex = orderForm.elements.qty.selectedIndex;
   var quantity =  orderForm.elements.qty.options[qIndex].value;

   // Initial cost is wrapc cost multiplied by quantity
   var initialCost = mCost * quantity;

   // Write the initialCost value to the element on the form
   orderForm.elements.initialCost.value = formatUSCurrency(initialCost);

   // Retrieve the cost of the user's Warranty plan
   var pCost = document.querySelector('input[name="Warranty"]:checked').value * quantity;

   // Write the pCost value to the element on the form
   orderForm.elements.protectionCost.value = formatNumber(pCost, 2);

   // Calculate the order subtotal Warranty cost plus initial cost
   orderForm.elements.subtotal.value = formatNumber(initialCost + pCost, 2);

   // Calculate the sales tax
   var salesTax = 0.05 * (initialCost + pCost);

   // Write the salesTax value to the element on the form
   orderForm.elements.salesTax.value = formatNumber(salesTax, 2);

   // Calculate the cost of the total order
   var totalCost = salesTax + initialCost + pCost;

   // write the totalCost value to the element on the form
   orderForm.elements.totalCost.value = formatUSCurrency(totalCost);

 //store the order details in hidden fields
 orderForm.elements.modelName.value = orderForm.elements.wrapc.options[mIndex].text;
 orderForm.elements.protectionName.value = document.querySelector('input[name="Warranty"]:checked').nextSibling.nodeValue;
}

// function to format the numerical values
function formatNumber(val, decimals) {
   return val.toLocaleString(undefined, 
            {minimumFractionDigits: decimals,
            maximumFractionDigits: decimals});
}

// function to add the US currency symbol and the comma separator
function formatUSCurrency(val){
   return val.toLocaleString('en-US', 
      {style: "currency",
      currency: "USD"});
}