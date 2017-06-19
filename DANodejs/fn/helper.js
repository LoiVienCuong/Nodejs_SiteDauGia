
exports.convertNumber = function(x) {
            if(x < 10){
                return "0" + x.toString();
            }
            else return x;
        }