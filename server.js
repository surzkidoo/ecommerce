const Product =require('./models/product.js');
const User =require('./models/user.js');
const express = require('express');
const app = express()
const port = 3000
const con =require("./connection.js");
const mysql = require("mysql")
const productrounter = require("./controllers/product");
const userrounter = require("./controllers/user");
const categoryrounter = require("./controllers/category");


app.set('view engine','ejs');
app.use("/product",productrounter);
app.use("/user",userrounter);
app.use("/category",categoryrounter);
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname+"/views/category.html");
});


app.listen(port, () => console.log(`Example app listening on port port!`))  /*  */