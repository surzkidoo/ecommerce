
btn=document.getElementsByClassName("add");

q=document.getElementById("q");

if(exist(btn[0].id,JSON.parse(getcokies()))!=-1 && exist(btn[0].id,JSON.parse(getcokies()))!=-2){
    $(".add").text("REMOVE FROM CART").removeClass("btn-success").addClass("btn-danger fa fa-delete");
}
     function getcokies(){
         
        newraw= document.cookie.split(";");
        for (let index = 0; index < newraw.length; index++) {
            if(newraw[index].charAt(0)==="c"){
                return newraw[index].split("=")[1];
            }
        }
        return "[]"
    }
    function exist(id,raw){
        if(raw.length==0){
            return -2;
        }
        for (let index = 0; index < raw.length; index++) {
            if(raw[index].id==id){
                return index;
            }
          
        }
        return -1;
    }
    function loader(){
        $(".blur").addClass("d-flex")
        var timer=setInterval(function(){
            $(".blur").removeClass("d-flex");
            clearInterval(timer);
        },2000)
    }

    function remove(id,raw){
        if(exist(id,raw)!=-1){
          let cookie = JSON.parse(getcokies());
          cookie.splice(exist(id,raw),1);
          document.cookie="cart="+JSON.stringify(cookie)+"; path=/;";
        }
        else{
            alert("doesn't exist");
        }
    }
    for(var i=0;i<btn.length;++i){
        btn[i].addEventListener("click",function(){
            if(q.value!=0){
                var cookie=[];
                if(getcokies()!=null){
                    cookie= JSON.parse(getcokies());
                }
                if(exist(this.id,cookie)==-1 || exist(this.id,cookie)==-2){
                    cookie.push({id:this.id,q:q.value});
                    document.cookie="cart="+JSON.stringify(cookie)+"; path=/;";
                   loader();
                    $(".add").text("REMOVE FROM CART").removeClass("btn-success").addClass("btn-danger fa fa-delete");
                }
                else{
                   loader();
                   remove(this.id,cookie)
                   $(".add").text("ADD TO CART").removeClass("btn-danger").addClass("btn-success")
                }
              
            }
        });
    }

    document.getElementById("minusq").addEventListener('click',function(){
        if(q.value>0){
            q.value=parseInt(q.value)-1;
        }
    });

    document.getElementById("addq").addEventListener('click',function(){
       
            q.value=parseInt(q.value)+1;
        
    });
 



