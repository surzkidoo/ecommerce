const con =require("./../connection.js");
 
class user{
   get(id){
       con.query(`select * from user where user_id =?`,[id],function(err,result){
           if(err) throw err;
           console.log(result);
       })
   }
   getall(){
       con.query(`select * from user`,function(err,result){
           if(err) throw err;
           console.log(result);
       })
   }
   
   delete(id){
       con.query(`delete * from user where user_id =?`,[id],function(err,result){
           if(err) throw err;
           console.log(result);
       });
   }
   
   update(id,data){
       data.push(id);
       console.log(data);
       con.query(`update user set username=?,password=?,address=?,state=?,phone=?,email=?,firstname=? lastname=? where product_id =?`,data,function(err,result){
           if(err) throw err;
           console.log(result);
       });
   }
   
   insert(data){
       con.query(`insert into user(username, password, address, state, phone, email, firstname,lastname) values(?,?,?,?,?,?,?,?)`,data,function(err,result){
           if(err) throw err;
           console.log(result);
       });
   }
   

}

module.exports = user;