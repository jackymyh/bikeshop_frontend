var cart = {
	//"productName":"quantity order by customer"
};
var products = {
	//When unable to fetch from db, default products
	"Cruiser":{
		'price' : 10,
		'quantity' : 20
	},
	"Hybrid":{
		'price' : 15,
		'quantity' : 20
	},
	"Mountain":{
		'price' : 15,
		'quantity' : 20
	},
	"Tandem":{
		'price' : 30,
		'quantity' : 20
	},
	"Kids":{
		'price' : 5,
		'quantity' : 10
	},
	"Electric":{
		'price' : 20,
		'quantity' : 10
	}
};

var orders;
var inventoryId;
var discount = 0;
var totalPrice = 0;

document.addEventListener("DOMContentLoaded", function(event) {	
	document.forms['customer'].reset();
	showTime();
	resetOrder();
	hideRemoveButton();
  	//Escape key to close modal
  	$(document).keyup(function(e) {
       if (e.keyCode == 27) { // escape key maps to keycode `27`
       	$('#myModal').modal('hide');
       }
   });
  });

function addToCart(productName) {
	if (products[productName]['quantity'] > 0) {
		products[productName]['quantity']--;
		product_table();
		if (cart[productName] == null ) {
			cart[productName] = { 'quantity' : 1 }
		}
		else {
			cart[productName]['quantity']++;
		}

		// Show Remove Button
		document.getElementById(productName+'-remove').style.visibility = 'visible';

		// Update Total Price on Cart
		totalPrice += products[productName]['price'] * (1-discount);
		console.log("TotalPrice: " + totalPrice);
		updateCart();
	}
	else {
		alert(productName + " is out of stock.");
	}
}

function removeFromCart(productName) {
	if (cart[productName]['quantity'] > "0") {
		cart[productName]['quantity']--;
		products[productName]['quantity']++;
		product_table();
		if (cart[productName]['quantity'] == "0") {
			delete cart[productName];
			// Hide Remove Button
			document.getElementById(productName+'-remove').style.visibility = 'hidden';
		}

		// Update Total Price on Cart
		totalPrice -= products[productName]['price'] * (1-discount);
		console.log("TotalPrice: " + totalPrice);
		updateCart();
	}
	else {
		alert("No " + productName + " in cart.");
	}
}

function showTime() {
	timer = setInterval(function () {
		var date = Date();
		$('#footer').html(date);
	}, 1000);
}

function showCart() {
	name = document.getElementById("customer").elements[0].value + ' ' + document.getElementById("customer").elements[1].value;
	generate_table();
}

function cartItem(item, interval){
	setTimeout(function(){
		alert("Product: "+item+"\nQuantity: "+cart[item]);
	}, interval);

}

// Hide all Remove Buttons on default
function hideRemoveButton(){
	var removeButton = document.getElementsByClassName('remove');
	for(var i = 0; i < removeButton.length; ++i) {
		var item = removeButton[i];
		item.style.visibility = "hidden";
	}
}

// Clear cart and name
function resetOrder(){
	$('#customer').trigger("reset");
	cart = {};
	totalPrice = 0;
	discount = 0;
	generate_table();
	getInventory();
	$('#dLabel').html("Discount");
	updateCart();
}

//Disable return rental button
function disableReturn(returnId){
	$('#'+returnId).html("Rental returned");
	$('#'+returnId).attr("disabled", "disabled");
}

function setDiscount(percent){
	discount = percent / 100;
	totalPrice *= (1 - discount);
	$('#dLabel').html(percent + "%");
	generate_table();
	updateCart();
}

function updateCart(){
	$('#showCart').html("Show Cart ($" + totalPrice + ")"
	+ "<img id=\"cartImage\" src=\"images/cart.png\" alt=\"description here\" />");
}

function editOrder(editId){
	console.log(orders[editId]);
	editTable(orders[editId]);
}