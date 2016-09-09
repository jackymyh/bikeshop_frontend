
var express = require('express')
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

var Schema = mongoose.Schema;

var cartSchema = new Schema({
  name: String,
  cart: Object,
  total: Number,
  returned: Boolean
}, { collection: "orders"});

var productSchema = new Schema({
  _id: Schema.ObjectId,
  Cruiser: {
    price: Number,
    quantity: Number
  },
  Hybrid: {
    price: Number,
    quantity: Number
  },
  Mountain: {
    price: Number,
    quantity: Number
  },
  Tandem: {
    price: Number,
    quantity: Number
  },
  Kids: {
    price: Number,
    quantity: Number
  },
  Electric: {
    price: Number,
    quantity: Number
  }
}, { collection: "inventory" });

//Connecting local mongodb
mongoose.connect('mongodb://localhost/test');

var Cart = mongoose.model('Cart', cartSchema);
var Inventory = mongoose.model('Inventory', productSchema);

var inventoryList = mongoose.model('inventory', productSchema);
var orderList = mongoose.model('orders', cartSchema);

//Fetching inventory
app.get('/inventory', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  inventoryList.find(function(err, inventory) {
    res.json(inventory);
  });
});

//Placing order
app.post('/orders', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log(req.body);
  
  var cart_data = {
    name: req.body.name,
    cart: JSON.parse(req.body.cart),
    total: req.body.total,
    returned: false
  };
  
  var cart = new Cart(cart_data);

    //Saving cart info into db
    cart.save(function(error, data){
      if (error) return console.error(error);
    });

    var id = req.body.id;
    var orders = JSON.parse(req.body.cart);
    console.log(orders);
    //Updating db inventory
    inventoryList.findOne({_id: id}, function(err, products){
      var inventory = JSON.parse(JSON.stringify(products));

      for(order in orders) {
        console.log(orders[order]);
        inventory[order].quantity -= orders[order].quantity;
      }
      console.log(inventory);

      inventoryList.remove({_id: id}).exec();;

      var inventory_new = new Inventory(inventory);
      inventory_new.save(function(error, data){
        if (error) return console.error(error);
        res.send('DB Updated!');
      });
    });
  });

//Fetching all orders
app.get('/sales', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  orderList.find(function(err, sales) {
    res.json(sales);
  });
});

//Returning order
app.post('/return', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log(req.body);

    //Updating db inventory
    var returnId = req.body.returnId;
    var inventoryId = req.body.inventoryId;

    orderList.findOne({_id: returnId}, function(err, orders){
      console.log(orders);

      var returnItems = orders.cart;
      orders.returned = true;
      orders.save();

      console.log(returnItems);

      inventoryList.findOne({_id: inventoryId}, function(err, inventory){
        console.log(inventory);
        for(returnItem in returnItems) {
          console.log(returnItems[returnItem].quantity);
          inventory[returnItem].quantity +=  returnItems[returnItem].quantity;
          console.log(inventory);
        }
        inventory.save(function(error, data){
          if (error) return console.error(error);
          res.send(inventory);
        });
      });
    });
  });

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})