const express = require('express')
const product = require('../models/product.js');
const router = express.Router()


router.get("/", (req, res) => {
  var data = [];
  var whole = {}
  var numitem=0;
  var totalprice=0;
  var subtotal=0;
  var dbdata = async () => {
 
    try {
      if (req.cookies.cart != null) {
        var obj = JSON.parse(req.cookies.cart)
        for (var i = 0; i < obj.length; i++) {
          let raw = await new product().get(obj[i].id);
          if (raw.length > 0) {
            raw[0].q = obj[i].q;
            numitem =numitem+ parseInt(obj[i].q);
            subtotal = numitem * parseFloat(raw[0].product_price);
            totalprice=totalprice + subtotal;
            data.push(raw[0]);
          }
        }
        
      }whole.total=totalprice;
        whole.item=numitem;
        whole.data=data;
      console.log(data)
      res.render("cart.ejs", { Data: whole,});

    }
    catch (e) {
      console.log(e);
    }

  };
  dbdata();

})

router.get("/add", (req, res) => {
  var product_id=3;
  if (req.cookies.cart != null) {
    var obj = JSON.parse(req.cookies.cart)
    for (var i = 0; i < obj.length; i++) {
     if(obj[i].id==product_id){
       obj[i].q=1;
      }
    }
    
  }
  
})
router.post("/update", (req, res) => {
  var product_id;
  var q;

  if (req.cookies.cart != null) {
    var obj = JSON.parse(req.cookies.cart)
    for (var i = 0; i < obj.length; i++) {
     if(obj[i].id==product_id){
       obj[i].q=q;
      }
    }
    
  }
})
router.post("/delete", (req, res) => {
  var product_id;
  if (req.cookies.cart != null) {
    var obj = JSON.parse(req.cookies.cart)
    for (var i = 0; i < obj.length; i++) {
     if(obj[i].id==product_id){
       obj.splice(i,1);
      }
    }
    
  }
})
router.get("/all", (req, res) => {

})
module.exports = router;