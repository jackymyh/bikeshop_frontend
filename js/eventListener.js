document.addEventListener("DOMContentLoaded", function(event) {

  var Cruiser_Add = document.getElementById("Cruiser-add");
  Cruiser_Add.addEventListener('click', function() {
      addToCart('Cruiser');
  }, false);

  var Cruiser_Remove = document.getElementById("Cruiser-remove");
  Cruiser_Remove.addEventListener('click', function() {
      removeFromCart('Cruiser');
  }, false);

  var Hybrid_Add = document.getElementById("Hybrid-add");
  Hybrid_Add.addEventListener('click', function() {
      addToCart('Hybrid');
  }, false);

  var Hybrid_Remove = document.getElementById("Hybrid-remove");
  Hybrid_Remove.addEventListener('click', function() {
      removeFromCart('Hybrid');
  }, false);

  var Mountain_Add = document.getElementById("Mountain-add");
  Mountain_Add.addEventListener('click', function() {
      addToCart('Mountain');
  }, false);

  var Mountain_Remove = document.getElementById("Mountain-remove");
  Mountain_Remove.addEventListener('click', function() {
      removeFromCart('Mountain');
  }, false);

  var Tandem_Add = document.getElementById("Tandem-add");
  Tandem_Add.addEventListener('click', function() {
      addToCart('Tandem');
  }, false);

  var Tandem_Remove = document.getElementById("Tandem-remove");
  Tandem_Remove.addEventListener('click', function() {
      removeFromCart('Tandem');
  }, false);

  var Kids_Add = document.getElementById("Kids-add");
  Kids_Add.addEventListener('click', function() {
      addToCart('Kids');
  }, false);

  var Kids_Remove = document.getElementById("Kids-remove");
  Kids_Remove.addEventListener('click', function() {
      removeFromCart('Kids');
  }, false);

  var Electric_Add = document.getElementById("Electric-add");
  Electric_Add.addEventListener('click', function() {
      addToCart('Electric');
  }, false);

  var Electric_Remove = document.getElementById("Electric-remove");
  Electric_Remove.addEventListener('click', function() {
      removeFromCart('Electric');
  }, false);

  var Inventory = document.getElementById("inventory");
  Inventory.addEventListener('click', function() {
      product_table();
  }, false);
  

});
