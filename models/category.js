const con =require("./../connection.js");
 
class category{
   get(id){
       con.query(`select * from category where category_id =?`,[id],function(err,result){
           if(err) throw err;
           console.log(result);
       })
   }
   getall(){
       con.query(`select * from category`,function(err,result){
           if(err) throw err;
           console.log(result);
       })
   }
   
   delete(id){
       con.query(`delete * from category where category_id =?`,[id],function(err,result){
           if(err) throw err;
           console.log(result);
       })
   }
   
   update(id,data){
       data.push(id);
       console.log(data);
       con.query(`update category set category_name=? category_sup=? where category_id =?`,data,function(err,result){
           if(err) throw err;
           console.log(result);
       })
   }
   
   insert(data){
       con.query(`insert into category(category_name, category_sup) values(?,?)`,data,function(err,result){
           if(err) throw err;
           console.log(result);
       })
   }
   

}

module.exports = category;