var right = document.getElementById("right");
var left = document.getElementById("left");
var rright = document.getElementById("rright");
var rleft = document.getElementById("rleft");
var range = document.getElementById("range");

function leftf() {
    var _this = rleft;
    var min = parseInt(_this.min);
    var max = parseInt(_this.max);
    _this.value = Math.min(parseInt(_this.value), parseInt(rright.value));
    var per = ((_this.value - min) / (max - min)) * 100;
    left.style.left =per + "%";
   
}
//leftf();

function rightf() {
    var _this = rright;
    var min = parseInt(_this.min);
    var max = parseInt(_this.max);
    _this.value = Math.max(parseInt(_this.value), parseInt(rleft.value));
    var per = ((_this.value - min) / (max - min)) * 100;
    right.style.right = (100 - per) + "%";
    console.log(100-per)
}
//rightf();
rleft.addEventListener("input", leftf);
rright.addEventListener("input", rightf);