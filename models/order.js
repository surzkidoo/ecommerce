const con =require("./../connection.js");
 
class order{
   insert(data){
    return new Promise((resole,reject)=> {
         con.query(`insert into orders(c_fname,c_lname,c_email,c_phone,c_address,order_details,order_price)values(?,?,?,?,?,?,?)`,data,function(err,result){
           if(err) throw err;
           return err? reject(err): resole(result)
       });
    });
   }
   user_cart_save(userid,cart){
      return new Promise((resole,reject)=> {
           con.query(`insert into cart set cartuser=?,product_id=?,product_qauntity=?,price=?`,[userid],function(err,result){
             if(err) throw err;
             return err? reject(err): resole(result);
         });
      });
     }
     cart_summary(userid){
      return new Promise((resole,reject)=> {
           con.query(`select * from product where product_id =?`,[id],function(err,result){
             if(err) throw err;
             return err? reject(err): resole(result);
         });
      });
     }
    
   

}

module.exports = order;