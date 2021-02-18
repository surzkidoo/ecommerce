const product = require('./models/product.js');
const User = require('./models/user.js');
const order = require('./models/order.js');
const advert = require('./models/advert.js');
var category = require('./models/category.js');
var cart = require('./models/cart.js');
const express = require('express');
const app = express()
const port = 3000
const con = require("./connection.js");
const mysql = require("mysql")
const productrounter = require("./controllers/product");
const userrounter = require("./controllers/user");
const categoryrounter = require("./controllers/category");
const cartrounter = require("./controllers/cart");
var cookieparser = require('cookie-parser');
const bodyParser = require('body-parser');


app.use(cookieparser());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.set('view engine', 'ejs');
app.use("/product", productrounter);
app.use("/cart", cartrounter);
app.use("/user", userrounter);
app.use("/category", categoryrounter);
app.use(express.static('public'));

var data = {}




app.get('/', (req, res) => {

  var dbdata = async () => {
    try {
      data.category = await new category().all();
      data.category.topcategory = await new category().topcategory();
      data.product = await new product().trending();
      data.product.topsale = await new product().topsale();
      data.advert = await new advert().side();
      data.advert.main = await new advert().main();
      res.render("index.ejs", {
        Data: data
      });
    } catch (e) {
      console.log(e);
    }

  };
  dbdata();

});



app.get('/checkout', (req, res) => {

  var dbdata = async () => {
    try {

      res.render("checkout.ejs", {
        Data: data
      });
    } catch (e) {
      console.log(e);
    }

  };
  dbdata();
});
app.post('/checkout', (req, res) => {
  var data = [];
  var whole = {}
  var numitem = 0;
  var totalprice = 0;
  var subtotal = 0;
  var order_des = " ";
  console.log(req.body);
  var dbdata = async () => {
    if (req.cookies.cart != null) {
      var obj = JSON.parse(req.cookies.cart)
      for (var i = 0; i < obj.length; i++) {
        let raw = await new product().get(obj[i].id);
        if (raw.length > 0) {
          raw[0].q = obj[i].q;
          numitem = numitem + parseInt(obj[i].q);
          subtotal = numitem * parseFloat(raw[0].product_price);
          order_des = order_des + " " + raw[0].product_id + "-" + raw[0].product_name + "-" + numitem;
          totalprice = totalprice + subtotal;
          data.push(raw[0]);
          console.log(order_des)

        }
      }
      var orders = [];
      orders.push(req.body.fname);
      orders.push(req.body.lname);
      orders.push(req.body.email);
      orders.push(req.body.phone);
      orders.push(req.body.address);
      orders.push(order_des);
      orders.push(totalprice);
      new order().insert(orders);
    }
  }
  dbdata();

  res.end();

});
app.get('/search', (req, res) => {

  var dbdata = async () => {
    try {
      q = req.query.q;
      qs="?q="+q+"&"
      page = 0;
      if (req.query.p != null) {
        page = Number.parseInt(req.query.p);
      }
      if (req.query.q != null) {
        data = await new product().search(q, page);
        size = await new product().searchfull(q);
      }
     console.log(data);
      res.render("search.ejs", {
        Data: data,
        page,
        size,
        qs
      });
    } catch (e) {
      console.log(e);
    }
  };
  dbdata();

});


app.get('/message', (req, res) => {

  var dbdata = async () => {
    try {
      console.log();
      res.render("message.ejs", {
        Data: data
      });
    } catch (e) {
      console.log(e);
    }

  };
  dbdata();

});



app.listen(port, () => console.log(`Example app listening on port port!`)) /*  */