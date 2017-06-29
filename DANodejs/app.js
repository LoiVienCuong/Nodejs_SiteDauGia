var express = require('express'),
    handlebars = require('express-handlebars'),
    handlebars_sections = require('express-handlebars-sections'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    nodemailer = require("nodemailer"),
    q = require('q'),
    os = require("os");
    
    path = require('path'),
    wnumb = require('wnumb'),
    handle404 = require('./middle-wares/handle-404'),
    homeController = require('./controllers/homeController'),

    

    timkiemController = require('./controllers/timkiemController'),
    manageController = require('./controllers/manageController'),

   handleLayout = require('./middle-wares/handleLayout'),
   productController = require('./controllers/productController'),
   userController = require('./controllers/userController'),
   productRepo = require('./models/productRepo'),
   userRepo = require('./models/userRepo'),
   danhsachdaugiathangRepo = require('./models/danhsachdaugiathangRepo'),

   helper = require('./fn/helper');


   
var app = express();
app.use(cookieParser('my secret here'));

app.use(morgan('dev'));

app.engine('hbs', handlebars({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: 'views/_layouts/',
    partialsDir: 'views/_partials/',
    helpers: {
        section: handlebars_sections(),
        number_format: function (n) {
            var nf = wnumb({
                thousand: ','
            });
            return nf.to(n);
        },
        ifCond: function(v1, operator, v2, options) {
                 switch (operator) {
                    case '==':
                        return (v1 == v2) ? options.fn(this) : options.inverse(this);
                    case '===':
                        return (v1 === v2) ? options.fn(this) : options.inverse(this);
                    case '!=':
                        return (v1 != v2) ? options.fn(this) : options.inverse(this);
                    case '!==':
                        return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                    case '<':
                        return (v1 < v2) ? options.fn(this) : options.inverse(this);
                    case '<=':
                        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                    case '>':
                        return (v1 > v2) ? options.fn(this) : options.inverse(this);
                    case '>=':
                        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                    case '&&':
                        return (v1 && v2) ? options.fn(this) : options.inverse(this);
                    case '||':
                        return (v1 || v2) ? options.fn(this) : options.inverse(this);
                    default:
                        return options.inverse(this);
            }
        },
        json: function(context) {
                return JSON.stringify(context);
        },

        time_format: function(context) {
             var origin = new Date(context);
             var ngayDang = helper.convertNumber(origin.getDate());
             var thangDang = helper.convertNumber(origin.getMonth() + 1);
             var namDang = origin.getFullYear();
             var gioDang = helper.convertNumber(origin.getHours());
             var phutDang = helper.convertNumber(origin.getMinutes());
             var giayDang = helper.convertNumber(origin.getSeconds());
             return gioDang + ":" + phutDang + ":" + giayDang + " " + ngayDang + "/" + thangDang + "/" + namDang;
        },

        urlImage_format: function(str) {
            return str.split("#").join("/");
        },
        hoTen_format : function(str){
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
       

    }
}));
app.set('view engine', 'hbs');

app.use(express.static(
    path.resolve(__dirname, 'public')
));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));



app.use(handleLayout);
app.use('/', homeController);
app.use('/product', productController);
app.use('/user', userController);
app.use('/timkiem', timkiemController); //update 24/06/2017
app.use('/manage',manageController);
app.use(handle404);

app.listen(3000);

var smtpTransport = nodemailer.createTransport({
    host: 'localhost',
    service: "Gmail",
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'leanhkhoi1996@gmail.com',
        pass: 'microsoft96'
    }
});       //gmail
var rand,mailOptions,host,link;

var myTimer = setInterval(function(){
    //console.log("timming...");
  
    //load all product auctioning
    productRepo.loadAllProductAuction().then(function(pRows){

        for(var i = 0 ; i < pRows.length; i++){
           
            if(i == pRows.length-1){

                                var endTime = new Date(pRows[i].thoiDiemKetThuc);  
                                var now = new Date();   
                                var distance = Date.parse(endTime) - Date.parse(now); 
                               // console.log("San Phẩm : " + pRows[i].tenSanPham + " Còn lại: " + helper.formatExtraTime(distance));

                                if(distance <= 0){
                                   // productRepo.loadProductById(pRows[i].idSanPham).then(function(rows){
                                   // console.log("id nguoiGiaCaoNhat before : " + pRows[i].idNguoiGiaCaoNhat);
                                        var idNguoiGiaCaoNhat = pRows[i].idNguoiGiaCaoNhat;
                                        if(!idNguoiGiaCaoNhat) idNguoiGiaCaoNhat = -1;
                                        var idNguoiBan = pRows[i].idNguoiBan;
                                        var idSanPham = pRows[i].idSanPham;
                                        var giaHienTai = pRows[i].giaHienTai;
                                        console.log("id nguoi gia cao nhat : " + idNguoiGiaCaoNhat + "\n"
                                                    + "id nguoi ban : " + idNguoiBan + "\n"
                                                    + "id San Pham : " + idSanPham + "\n"
                                                    + "gia hien tai : " + giaHienTai);

                                        q.all([
                                          productRepo.updateEndAuction(pRows[i].idSanPham).fail(function(error){console.log(error);}),
                                          userRepo.loadUserById(idNguoiBan).fail(function(error){console.log(error);}),
                                          userRepo.loadUserById(idNguoiGiaCaoNhat).fail(function(error){console.log(error);}),
                                        ]).spread(function(rs, nguoiBan, nguoiGiaCaoNhat) {
                                            if(!idNguoiGiaCaoNhat)
                                            idNguoiGiaCaoNhat = -1;
                                            console.log("rs  : " + rs + "\n" + "nguoiban : " + nguoiBan + "\n" + "giacao: " + nguoiGiaCaoNhat);

                                            //console.log("Người bán : " + nguoiBan[0].email  + "\n"
                                              //          +"Người giá cao nhất : " + nguoiGiaCaoNhat[0].email );

                                            //gui mail cho nguoi ban
                                            link="http://"+ "localhost:3000" +"/product/chitietsanpham/" + idSanPham;

                                                    //gui cho nguoi ban
                                            mailOptions={
                                                    from: 'leanhkhoi1996@gmail.com',
                                                    to : nguoiBan[0].email,
                                                    subject : "Sản Phẩm Rao Bán Đã Kết Thúc",
                                                    html : "Hello,<br>Đã có cập nhật trên sản phẩm mà bạn đã tham gia, sản phẩm bạn rao bán đã kêt thúc<br> Please Click on the link to view Detail.<br><a href="+link+">Click here to verify</a>" 
                                            }
                                            
                                            smtpTransport.sendMail(mailOptions, function(error, response){
                                                if(error){
                                                        console.log(error);
                                                      res.end("error");
                                                }else{
                                                        console.log("Message sent: " + response.message);
                                                }
                                            });
                                            ////finish gửi mail cho nguoi bán

                                            if(nguoiGiaCaoNhat.length != 0){
                                                    //send mail cho nguoi ban va nguoi gia cao nhat
                                                    danhsachdaugiathangRepo.insertNewWinAuction(idSanPham, idNguoiGiaCaoNhat, giaHienTai)
                                                    .then(function(){

                                                        link="http://"+"localhost:3000"+"/product/chitietsanpham/" + idSanPham;
                                                        //gui cho nguoi co gia cao nhat
                                                        mailOptions={
                                                                from: 'leanhkhoi1996@gmail.com',
                                                                to : nguoiGiaCaoNhat[0].email ,
                                                                subject : "Thắng Sản Phẩm Đã Đấu",
                                                                html : "Hello,<br>Bạn đã thằng một sản phẩm mà bạn đã tham gia đấu giá<br> Please Click on the link to view Detail.<br><a href="+link+">Click here to verify</a>" 
                                                        }
                                                        
                                                        smtpTransport.sendMail(mailOptions, function(error, response){
                                                            if(error){
                                                                    console.log(error);
                                                                  res.end("error");
                                                            }else{
                                                                    console.log("Message sent: " + response.message);
                                                            }
                                                        });
                                                       
                                                    }).fail(function(error){
                                                            console.log(error);
                                                    });
                                            }
                                            clearInterval(myTimer);
                                            console.log("Hết giờ");               
                                        }).fail(function(error){console.log(error);});
                                       
                                      
                                   
                                   // }).fail(function(error){console.log(error)});
                                
                                }
            } ///end if


        }   //end for


    });
    //calculate remainning time
    //if ==0



}, 1000);



