
exports.convertNumber = function(x) {
            if(x < 10){
                return "0" + x.toString();
            }
            else return x;
        }

exports.getDateFormated = function(origin){
    var ngayDang = this.convertNumber(origin.getDate());
    var thangDang = this.convertNumber(origin.getMonth() + 1);
    var namDang = origin.getFullYear();
    var gioDang = this.convertNumber(origin.getHours());
    var phutDang = this.convertNumber(origin.getMinutes());
    var giayDang = this.convertNumber(origin.getSeconds());
    var date = namDang + "-" + thangDang + "-" + ngayDang + " " + gioDang + ":" + phutDang + ":" + giayDang  ;
    return date;
}