const mysql = require("mysql");
const con = mysql.createConnection({
    database:"ecommerce",
    host:"localhost",
    user:"root",
    password:"",
});
module.exports = con;