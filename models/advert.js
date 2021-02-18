const con =require("./../connection.js");
 
class advert{
   get(id){
    return new Promise((resole,reject)=> { con.query(`select * from advert where advert_id =?`,[id],function(err,result){
           if(err) throw err;
           return err? reject(err): resole(result)
       });
    });
   }
    all(){
        var result2;
       return new Promise((resole,reject)=> {con.query(`select * from advert `,(err,result)=>{
        return err? reject(err): resole(result)
       });
    });
   }
    side(){
        var result2;
    return new Promise((resole,reject)=> {con.query(`select * from advert where type=2`,(err,result)=>{
        return err? reject(err): resole(result)
        });
        });
    }

    main(){
        var result2;
    return new Promise((resole,reject)=> {con.query(`select * from advert where type=1`,(err,result)=>{
        return err? reject(err): resole(result)
        });
        });
    }
   
   delete(id){
    return new Promise((resole,reject)=> { con.query(`delete * from advert where advert_id =?`,[id],function(err,result){
        return err? reject(err): resole(result)
       });
    });
   }
   
   update(id,data){
       data.push(id);
      
       return new Promise((resole,reject)=> { con.query(`update advert set advert_name=? advert_sup=? where advert_id =?`,data,function(err,result){
        return err? reject(err): resole(result)
       });
    });
   }
   
   insert(data){
    return new Promise((resole,reject)=> { con.query(`insert into advert(advert_name, advert_sup) values(?,?)`,data,function(err,result){
        return err? reject(err): resole(result)
       });
    });
   }
   

}

module.exports = advert;