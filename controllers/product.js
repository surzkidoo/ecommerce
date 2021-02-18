const product =require('../models/product.js');
const express = require('express')
const router = express.Router()


router.get("/:slug/:id",(req,res)=>{
    var data={};
    var call =async ()=>{
        var productobj= new product();
         data.product= await productobj.get(req.params.id);
         data.product.slideimage= await productobj.prd_img(req.params.id);
         data.product.spec= await productobj.spec(req.params.id);
         res.render("product.ejs",{Data:data});
     }
     call();
  
   
   
});
router.get("/add",(req,res)=>{
   res.render("addproduct.ejs")
    

})
router.post("/add",(req,res)=>{
    data=[];
    

})

router.post("/product/update",(req,res)=>{

})
router.get("/delete",(req,res)=>{

})
router.get("/all",(req,res)=>{

})
module.exports = router;