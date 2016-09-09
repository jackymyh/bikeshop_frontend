document.addEventListener("DOMContentLoaded", function(event) {

	//Submit order to server
	$(document).ready(function() {
		$("#checkout").click(function(event) {

			var order = {
				id: inventoryId,
				name: name,
				cart: JSON.stringify(cart),
				total: totalPrice
			}
			console.log(products);
			console.log("Sending " + JSON.stringify(order));
			$.ajax({
				type: 'POST',
				url: 'http://localhost:5000/orders',
				data: order,
				success: function (data) {
					console.log("Success to Nodejs...");
					console.log(data);
					$('#myModal').modal('hide');
					resetOrder();
					product_table();
					hideRemoveButton();
				},
				error: function (xhr, status, error) {
					console.log(status);
				}
			});
		});
	});


  	// When page first load, fetch inventory
  	$(document).ready(function() {
  		$.ajax({
  			url: 'http://localhost:5000/bikeshop',
  			dataType: "json",
  			tryCount : 0,
  			retryLimit : 5,
  			success: function(data) {
  				console.log("Success to Nodejs...");
  				console.log(data[0]);
  				inventoryId = data[0]._id;	  			
  				products = data[0];
  				product_table();
  				hideRemoveButton();
  			},
  			error : function(xhr, status, error ) {
  				console.log(status);
  				if (status == 'error' || status == 'timeout' ) {
  					this.tryCount++;
  					if (this.tryCount <= this.retryLimit) {
		                //try again
		                $.ajax(this);
		                return;
		            }
		            return;
		        }
		        if (xhr.status == 500) {
		            //handle error
		            console.log(xhr.responseText);
		        } else {
		            //handle error
		            console.log(xhr.responseText);
		        }
		    },
		    timeout: 3000
		});
  	});

  	//Fetch sales from server
  	$(document).ready(function() {
  		$("#sales").click(function(event) {
  			$.ajax({
  				type: 'GET',
  				url: 'http://localhost:5000/sales',
  				dataType: "json",
  				success: function (data) {
  					console.log("Success to Nodejs...");
  					sales_table(data);
  				},
  				error: function (xhr, status, error) {
  					console.log(status);
  				}
  			});
  		});
  	});

});