
var fs = require('fs'),
    path = require('path'),
    mv = require('mv'),
    Entities = require('html-entities').XmlEntities,
    q = require('q');

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

///by Lê Anh Khôi  22/06/2017
exports.createDir = function(id){
      var dirname = path.dirname("public/image/sanpham_" + id + "/1.jpg");
      if (fs.existsSync(dirname)) {
        
        this.deleteAllFile(dirname);
        console.log("dir has existed : " + dirname + ".We deleted files in it");
      }
      else{
        console.log("dir has not existed. We created success");
        fs.mkdirSync(dirname);
      } 

      
     
      return dirname;
    
}

///by Lê Anh Khôi  22/06/2017
exports.deleteAllFile = function(dirname){
      var dirName = path.dirname(dirname + "/unknow");
      if (fs.existsSync(dirName)) {
        //delete
        fs.readdir(dirName, (err, files) => {
              if (err) throw error;

              for (const file of files) {
                fs.unlink(path.join(dirName, file), err => {
                  if (err) throw error;
                });

              }
        });
        
       
       }
      else console.log("Folder has not existed");     

}

///by Lê Anh Khôi 22/06/2017
exports.moveFilesInFolderToOtherFolder = function(sourceFolder, desFolder){
    var count = 1;
     if (fs.existsSync(sourceFolder)) {
        //delete
        fs.readdir(sourceFolder, (err, files) => {
              if (err) throw error;

              for (const file of files) {

                var sourcePath = sourceFolder + "/" +  count + "." + path.basename(file).split(".")[1]; //sourceFolder/1.jpg, 2.jpg,...
                var desPath = desFolder + "/" +  count + "." + path.basename(file).split(".")[1];

                fs.rename(sourceFolder + "/" +  path.basename(file), desPath , function(err){
                         if ( err ) console.log('ERROR: ' + err);
                } );
                count++;
                
                //move file to desFolder : public/image/sanpham_x
                    //console.log("source : " + sourceFolder + "/" +  path.basename(file));
                    //console.log("des : " + desFolder + "/" + path.basename(file));
               

              }


        });
       
      }
      else console.log("Folder has not existed when move files");     
}


exports.loadFilesImageFromFolder = function(number){
        var dirName = "public/image/sanpham_" + number ;
        var isEnd = false;
        var listFilesName = [];
        if (fs.existsSync(dirName)) {
            //delete
            fs.readdir(dirName, function(err, files) {

                  if (err) throw error;
                  
                  for (const file of files) {
                    var fileName = '#image#sanpham_' + number + '#' + path.basename(file); 
                    
                    listFilesName.push(fileName);
                    
                  }


            });
            setTimeout(function() {
                 if(listFilesName.length == 2) listFilesName.push("##null");
                 if(listFilesName.length == 1) {
                     listFilesName.push("##null");
                     listFilesName.push("##null");
                 }
                 isEnd = true;
                 console.log(listFilesName);
            }, 300);
            /*
            }*/
            while(!isEnd){
               
                return listFilesName;
            }
            

        }
        else{
            console.log("Folder has not existed");     
            return "";
        } 

}


exports.getEndTime = function(days) {

    Date.prototype.addDays = function(days) {
      var dat = new Date(this.valueOf());
      dat.setDate(dat.getDate() + days);
      return dat;
    }

    var dat = new Date().addDays(days);
    
    return this.getDateFormated(dat);

}

exports.decodeTextToHTML = function(input){
     var entities = new Entities();
     console.log(entities.decode(input));
     return entities.decode(input);
}

exports.formatExtraTime = function(amount) { //
    //lay giay
    var seconds = parseInt(amount/1000);

    //lay phut
    var minutes = parseInt(seconds/60);

    //laygio
    var hours = parseInt(minutes/60);

    ///lay ngay
    var days = parseInt(hours/24);

    var rs = days + " Days " + this.convertNumber(hours%24) + " : " + this.convertNumber(minutes%60) + " : " + this.convertNumber(seconds%60); 
    

    return rs;
}




