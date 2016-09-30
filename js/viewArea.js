//Display inventory and functions on viewArea
function product_table() {

    $('#viewArea').empty();

    var content = '<table><tr>';
    var col = 0;
    for(var prod in products) {
        if(prod != "_id" && prod != "__v") {
            content += '<td class="product">' +
            '<img class="cart" src="images/cart.png" alt="description here" />' +
            '<button id="'+prod+'-add" class="add" onClick="addToCart(\''+prod+'\')">Add</button>' +
            '<button id="'+prod+'-remove" class="remove" onClick="removeFromCart(\''+prod+'\')">Remove</button>'+
            '<img src="images/products/bike.gif"/>'+
            '<p class="price">$'+products[prod].price+'</p><br>'+prod+':'+products[prod].quantity+'</br>' +
            '</td>';

            //Three products per row
            col += 1;
            if (col >= 3) {
                col = 0;
                content += '</tr><tr>'
            }
        }
    }
    content += '</tr></table>';

    $('#viewArea').append(content);

    // Update Show Cart Button too
    document.getElementById("showCart").innerHTML= "Show Cart ($" + totalPrice + ")"
    + "<img id=\"cartImage\" src=\"images/cart.png\" alt=\"description here\" />";
}

//Display sales and functions on viewArea
function sales_table(sales) {

    $('#viewArea').empty();

    var totalSales = 0;
    var totalOrders = 0;
    var content = '<p>';

    for(var i = 0; i < sales.length; i++) {
        content += '<br> Date: ' + sales[i].date + '<br> Name: ' + sales[i].name + '<br> Orders: ' + JSON.stringify(sales[i].cart) + '<br> Price: $' + sales[i].total +
        '<br><button id= edit_'+ sales[i]._id +' type="button" class="btn btn-info" onClick="editOrder(\''+ i +'\')">Edit Rental ' +  sales[i]._id + '</button>';

        if(sales[i].returned == true) {
            content += '<br> Status: Returned';
        } else {
            content += '<br> Status: Not Returned<br><button id='+ sales[i]._id +' type="button" class="btn btn-success" onClick="returnOrder(\''+ sales[i]._id +'\')">Return Rental ' +  sales[i]._id + '</button>';        
        }
        totalSales += sales[i].total;
        totalOrders++;
    };

    content += '<br> Total Orders: '+ totalOrders +' Total Sales: $' + totalSales + '</p>';

    $('#viewArea').append(content);
}