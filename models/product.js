 const con =require("./../connection.js");
 
 class product{
    get(id){
        con.query(`select * from product where product_id =?`,[id],function(err,result){
            if(err) throw err;
            console.log(result);
        })
    }
    getall(){
        con.query(`select * from product`,function(err,result){
            if(err) throw err;
            console.log(result);
        })
    }
    
    delete(id){
        con.query(`delete * from product where product_id =?`,[id],function(err,result){
            if(err) throw err;
            console.log(result);
        })
    }
    
    update(id,data){
        data.push(id);
        console.log(data);
        con.query(`update product set product_name=?,product_stock=?,product_disc=?,product_price=?,product_img=?,product_details=?,product_vendor=? where product_id =?`,data,function(err,result){
            if(err) throw err;
            console.log(result);
        })
    }
    
    insert(data){
        con.query(`insert into product(product_name, product_stock, product_disc, product_price, product_img, product_details, product_vendor) values(?,?,?,?,?,?,?)`,data,function(err,result){
            if(err) throw err;
            console.log(result);
        })
    }
    

}

module.exports = product;