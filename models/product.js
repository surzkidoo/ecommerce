 const con =require("./../connection.js");
 var limit=4;
 class product{
    get(id){
        return new Promise((resole,reject)=> {con.query(`select * from product where product_id =?`,[id],function(err,result){
            return err? reject(err): resole(result)
        });
     });
    }
    all(){
        return new Promise((resole,reject)=> { con.query(`select * from product`,function(err,result){
            return err? reject(err): resole(result)
        });
    });
    }
    trending(){
        return new Promise((resole,reject)=> { con.query(`select * from product where trending=1`,function(err,result){
            return err? reject(err): resole(result)
        });
    });
    }

    topsale(){
        return new Promise((resole,reject)=> { con.query(`select * from product order by sold desc`,function(err,result){
            return err? reject(err): resole(result)
        });
    });
    }
    
    delete(id){
        return new Promise((resole,reject)=> { con.query(`delete * from product where product_id =?`,[id],function(err,result){
            return err? reject(err): resole(result)
        });
    });
        
    }
    prd_img(id){
        return new Promise((resole,reject)=> { con.query(`select * from product join slide  where slide.product_id=?`,[id],function(err,result){
            return err? reject(err): resole(result)
        });
    });
        
    }
    spec(id){
        return new Promise((resole,reject)=> { con.query(`select * from  product_spec  where product_id=?`,[id],function(err,result){
            return err? reject(err): resole(result)
        });
    });
        
    }
    search(id,page){
        var offset;
        offset=limit*page;
        id="%"+id+"%";
        return new Promise((resole,reject)=> { con.query(`select * from  product join  ctaegory on product.product_category_id=ctaegory.category_id where product_name like ? or product_brand like ? or category_name  like ? limit ?,?`,[id,id,id,offset,limit],function(err,result){
            return err? reject(err): resole(result)
        });
    });
        
    }
    searchfull(id){
        id="%"+id+"%";
        return new Promise((resole,reject)=> { con.query(`select * from  product join  ctaegory on product.product_category_id=ctaegory.category_id where product_name like ? or product_brand like ? or category_name  like ?`,[id,id,id],function(err,result){
            return err? reject(err): resole(result.length);
        });
    });
        
    }

    update(id,data){
        data.push(id);
        return new Promise((resole,reject)=> { con.query(`update product set product_name=?,product_stock=?,product_desc=?,product_price=?,product_img=?,product_details=?,product_vendor=? where product_id =?`,data,function(err,result){
            return err? reject(err): resole(result)
        });
    });
    }
    
    insert(data){
        return new Promise((resole,reject)=> { con.query(`insert into product(product_name, product_stock, product_disc, product_price, product_img, product_details, product_vendor) values(?,?,?,?,?,?,?)`,data,function(err,result){
            return err? reject(err): resole(result)
        });
    });
    }
    

}

module.exports = product;