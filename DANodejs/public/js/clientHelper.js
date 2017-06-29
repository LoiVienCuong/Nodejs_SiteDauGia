function getDateFormated(origin){
   var ngayDang = this.convertNumber(origin.getDate());
    var thangDang = this.convertNumber(origin.getMonth() + 1);
    var namDang = origin.getFullYear();
    var gioDang = this.convertNumber(origin.getHours());
    var phutDang = this.convertNumber(origin.getMinutes());
    var giayDang = this.convertNumber(origin.getSeconds());
    var date = namDang + "-" + thangDang + "-" + ngayDang + " " + gioDang + ":" + phutDang + ":" + giayDang  ;
    return date;
}
convertNumber = function(x) {
            if(x < 10){
                return "0" + x.toString();
            }
            else return x;
}
urlImage_format = function(str) {
            return str.split("#").join("/");
}

function formatCost(num){
        var n = num.toString(), p = n.indexOf('.');
        return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function($0, i){
            return p<0 || i<p ? ($0+',') : $0;
        });
}

time_format = function(context) {
	 var origin = new Date(context);
	 var ngayDang = this.convertNumber(origin.getDate());
	 var thangDang = this.convertNumber(origin.getMonth() + 1);
	 var namDang = origin.getFullYear();
	 var gioDang = this.convertNumber(origin.getHours());
	 var phutDang = this.convertNumber(origin.getMinutes());
	 var giayDang = this.convertNumber(origin.getSeconds());
	 return gioDang + ":" + phutDang + ":" + giayDang + " " + ngayDang + "/" + thangDang + "/" + namDang;
}

formatExtraTime = function(amount) { //
    //lay giay
    var seconds = parseInt(amount/1000);

    //lay phut
    var minutes = parseInt(seconds/60);

    //laygio
    var hours = parseInt(minutes/60);

    ///lay ngay
    var days = parseInt(hours/24);

    var rs = days + " ngày " + this.convertNumber(hours%24) + " : " + this.convertNumber(minutes%60) + " : " + this.convertNumber(seconds%60); 
    

    return rs;
}
hoTen_format = function(str){
            var half = parseInt(str.length/2);
            var newStr = "";
            for (var i = 0; i < str.length; i++) {       
                if((i % 2) != 0 ){
                    newStr = newStr + '*';
                    //console.log(str[i]);
                } else{
                    newStr = newStr + str[i];
                }   
            }

          
            return newStr;
}
       