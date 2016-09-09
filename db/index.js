
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


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var Schema = mongoose.Schema;

var cartSchema = new Schema({
  name: String,
  cart: Object,
  total: Number
}, { collection: "carts"});


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
}, { collection: "bikeshop" });

mongoose.connect('mongodb://localhost/test');

var Cart = mongoose.model('Cart', cartSchema);
var Inventory = mongoose.model('Inventory', productSchema);

mongoose.model('bikeshop', productSchema);
mongoose.model('carts', cartSchema);

//Fetching inventory
app.get('/bikeshop', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  mongoose.model('bikeshop').find(function(err, products) {
    res.json(products);
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
        total: req.body.total
    };
    
    var cart = new Cart(cart_data);

    //saving cart info into db
    cart.save(function(error, data){
        if (error) return console.error(error);
    });

    var id = req.body.id;
    var orders = JSON.parse(req.body.cart);
    console.log(orders);
    //updating db inventory
    mongoose.model('bikeshop').findOne({_id: id}, function(err, products){
      var temp = JSON.parse(JSON.stringify(products));
      var inventory = JSON.parse(JSON.stringify(products));

      for(order in orders) {
        console.log(orders[order]);
        console.log(temp);
        inventory[order].quantity = temp[order].quantity - orders[order].quantity;
      }
      console.log(inventory);

      mongoose.model('bikeshop').remove({_id: id}).exec();;

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

    mongoose.model('carts').find(function(err, sales) {
      res.json(sales);
    });
});

//Returning order
app.post('/return', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log(req.body);

    //updating db inventory
    var returnId = req.body.returnId;
    var inventoryId = req.body.inventoryId;

    mongoose.model('carts').findOne({_id: returnId}, function(err, orders){
      console.log(orders);

      var returnItems = orders.cart;

      console.log(returnItems);

      mongoose.model('bikeshop').findOne({_id: inventoryId}, function(err, inventory){
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
