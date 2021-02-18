const con =require("./../connection.js");
 limit=2
class category{
   get(slug,page){
    var offset;
   offset=limit*page;
    return new Promise((resole,reject)=> { con.query(`select * from ctaegory join product where ctaegory.category_id =product.product_category_id and category_name =? limit ?,?`,[slug,offset,limit],function(err,result){
           if(err) throw err;
           return err? reject(err): resole(result);
       });
    });
   }
    all(){
       
       return new Promise((resole,reject)=> {con.query(`select * from ctaegory`,(err,result)=>{
        return err? reject(err): resole(result)
       });
    });
   }
   size(slug){
   
    return new Promise((resole,reject)=> { con.query(`select * from ctaegory join product where ctaegory.category_id =product.product_category_id and category_name =?`,[slug],function(err,result){
        if(err) throw err;
        return err? reject(err): resole(result.length);
    });
 });
}
   paginate(page=0){
    var result2,limit,offset;
    limit=2;
    offset=limit*page;
   return new Promise((resole,reject)=> {con.query(`select * from ctaegory limit ?,?`,[offset,limit],(err,result)=>{
    return err? reject(err): resole(result)
   });
});
}
    topcategory(){
        
    return new Promise((resole,reject)=> {con.query(`select * from ctaegory where top=1`,(err,result)=>{
        return err? reject(err): resole(result)
    });
    });
    }

   
   filter(slug,brand,min=0,max=1500000,page=0){
    var offset;
    offset=limit*page;
    return new Promise((resole,reject)=> { con.query(`select * from ctaegory join product where ctaegory.category_id =product.product_category_id and category_name=? and product_brand=? and product_price between ? and ? limit ?,?`,[slug,brand,min,max,offset,limit],function(err,result){
        return err? reject(err): resole(result)
       });
    });
   }
   filterSize(slug,brand,min=0,max=1500000){
    return new Promise((resole,reject)=> { con.query(`select * from ctaegory join product where ctaegory.category_id =product.product_category_id and category_name=? and product_brand=? and product_price between ? and ? `,[slug,brand,min,max],function(err,result){
        return err? reject(err): resole(result.length);
       });
    });
   }
   
   update(id,data){
       data.push(id);
       return new Promise((resole,reject)=> { con.query(`update category set category_name=? category_sup=? where category_id =?`,data,function(err,result){
        return err? reject(err): resole(result)
       });
    });
   }
   
   insert(data){
    return new Promise((resole,reject)=> { con.query(`insert into category(category_name, category_sup) values(?,?)`,data,function(err,result){
        return err? reject(err): resole(result)
       });
    });
   }
   

}

module.exports = category;