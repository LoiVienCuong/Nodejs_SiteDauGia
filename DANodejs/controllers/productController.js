var express = require('express'),
    formidable = require('formidable'),
    fs = require('fs'),
    path = require('path'),
    nodemailer = require("nodemailer"),
    productRepo = require('../models/productRepo'),
    categoryRepo = require('../models/categoryRepo'),
    userRepo = require('../models/userRepo'),
    danhsachdaugiaRepo = require('../models/danhsachdaugiaRepo'),
    danhsachdaugiathangRepo = require('../models/danhsachdaugiathangRepo'),
    helper = require('../fn/helper'),
     q = require('q');

var activeCategoty;
var activePro;
var r = express.Router();


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

r.get('/bycat/:id', function(req, res) {

        var catId = req.params.id;
        activeCategoty = catId;
        if (!catId) {
            res.redirect('/');
        }
       

        productRepo.loadAllByCat(catId)
            .then(function(pRows) {
                var vm = {
                    layoutVM: res.locals.layoutVM,
                    products: pRows,
                    activeCat : activeCategoty,
                    noProducts: pRows.length === 0
                };
                res.render('product/bycat', vm);
            });
});

r.post('/bycat/:id', function(req, res) {
        var catId = req.params.id;
        if (!catId) {
            res.redirect('/');
        }
        if(req.body.loaibtn==='1'){
            
            productRepo.sapxep_thoigian_loai_khongten(catId)
            .then(function(pRows) {
                var vm = {
                    layoutVM: res.locals.layoutVM,
                    products: pRows,
                    activeCat : activeCategoty,
                    noProducts: pRows.length === 0
                };
                res.render('product/bycat', vm);
            });
        
        }
        else
        {
              productRepo.sapxep_gia_loai_khongten(catId)
            .then(function(pRows) {
                var vm = {
                    layoutVM: res.locals.layoutVM,
                    products: pRows,
                    activeCat : activeCategoty,
                    noProducts: pRows.length === 0
                };
                res.render('product/bycat', vm);
            });
        }
       
});

//da sua 21/06/2017
r.get('/chitietsanpham/:id', function(req, res) {
      
        var proId = req.params.id;
       
        if (!proId) {
            res.redirect('/');
        }
       
            productRepo.loadProductById(proId)
                .then(function(pro) {
                        console.log(pro[0].tenSanPham);
                         categoryRepo.loadById(pro[0].loai)
                        .then(function(cat){
                            userRepo.loadUserById(pro[0].idNguoiBan)
                            .then(function(seller){
                                var id = pro[0].idNguoiGiaCaoNhat;
                                if(!id) id = -1;
                                userRepo.loadUserById(id)
                                .then(function(bestbuyer){
                                    danhsachdaugiaRepo.loadHistoryByIdSanPham(proId)
                                    .then(function(historyData){
                                        historyData.sort(function(a, b){
                                            return a.giaDau - b.giaDau;
                                        });
                                          var vm = {
                                            layoutVM: res.locals.layoutVM,
                                            products: pro,
                                            category: cat[0].tenLoaiSanPham,
                                            seller : seller,

                                            noBuyer : bestbuyer.length === 0,
                                            bestbuyer : bestbuyer,

                                            historyData : historyData,
                                            noHistory : historyData.length === 0,


                                            noProduct: pro.length === 0


                                          };
                                          
                                          res.render('product/ChiTietSanPham', vm);

                                    }).fail(function(error){console.log(error)});
                                       
                                }).fail(function(error){console.log(error)});
                               
                            }).fail(function(error){console.log(error)});
                           
                        }).fail(function(error){console.log(error)});

            }).fail(function(error){console.log(error)});
        
        /*productRepo.loadProductById(proId)
             .then(function(pro) {
                     
                     var vm = {
                            layoutVM: res.locals.layoutVM,
                            product: pro,
                            active : pro[0].idSanPham,
                            noProduct: pro.length === 0
                        };
                    res.render('product/ChiTietSanPham', vm);
                });*/


});


r.get('/timkiem', function(req, res) {
         productRepo.search(req.query.ten)
            .then(function(pRows) {
                var vm = {
                    layoutVM: res.locals.layoutVM,
                    products: pRows,
                    ten: req.query.ten,
                    id: -1,
                    noProducts: pRows.length === 0
                };
                res.render('product/ketquatimkiem', vm);
            });
       
});
r.get('/timkiemtheoloai', function(req, res) {
         productRepo.search_loai(req.query.id,req.query.ten)
            .then(function(pRows) {
                var vm = {
                    layoutVM: res.locals.layoutVM,
                    products: pRows,
                    ten: req.query.ten,
                    id: req.query.id,
                    noProducts: pRows.length === 0
                };
                res.render('product/ketquatimkiem', vm);
            });
       
});



r.get('/favourite/:id', function(req, res){
    var userId = req.cookies.userLogin;
     if(userId){
          var proId = req.params.id;
           
            if (!proId) {
                console.log("none proid");
                res.redirect('back');
            }
           
           
            productRepo.insertFavourite(proId,userId)
                .then(function() {
                     console.log("proid");
                   res.redirect('back'); 
                });
        }
        else {
            res.redirect('/user/login');
        }

});

r.get('/delete/:id', function(req, res){
    var userId = req.cookies.userLogin;
     if(userId){
          var proId = req.params.id;
           
            if (!proId) {
                
                res.redirect('back');
            }
           
           
            productRepo.deleteFavouriteByProId(proId)
            .then(function() {
                   res.redirect('back'); 
            }).fail(function (error) {
                    console.log(error);
            });     
      }
      else {
            res.redirect('/user/login');
      }

});


r.post('/daugia', function(req, res) {
    //update bang product, danh sach dau gia
    //lay cac thong tin : id nguoi dau gia, giadau, idSanpham
    var idUser = req.cookies.userLogin;
    var idSanPham = req.body.idSanPham;
    var giaDau = parseInt(req.body.giaDau);
    var giaMuaNgay = req.body.giaMuaNgay;
    var giaHienTai = parseInt(req.body.giaHienTai);
    var luotBid = parseInt(req.body.luotBid);
    var isAutoBID=req.body.AutoBID;
    var buocGia=parseInt(req.body.buocGia);
    var tuDongGiaHan = req.body.tuDongGiaHan;
    var thoiDiemKetThuc = req.body.thoiDiemKetThuc;
    tong=giaHienTai+buocGia;
    console.log(idUser + " " + idSanPham + " " + giaDau + " " + luotBid+ " "+ isAutoBID + " "+giaHienTai+" "+buocGia+ " "+ tong);

    //gui mail xac nhan
    var maillist  = [];
    var emailNguoiBan = req.body.emailNguoiBan;
    var emailNguoiGiaCaoNhat = req.body.emailNguoiGiaCaoNhat;
    var emailNguoiDauGia = req.body.emailNguoiDauGia;
    maillist[0] = emailNguoiBan;
    maillist[1] = emailNguoiDauGia;
    if(emailNguoiGiaCaoNhat != "null")
    maillist[2] = emailNguoiGiaCaoNhat;
    console.log("Mail nguoi ra gia cao truoc đó : " + emailNguoiGiaCaoNhat);

    console.log("Seller Mail : " + emailNguoiBan + "\n"
                + "Best Buyer Mail: " + emailNguoiGiaCaoNhat + "\n"
                + "Auctioneer Mail: " + emailNguoiDauGia);
    //Send mail
    link="http://"+req.get('host')+"/product/chitietsanpham/" + idSanPham;
    mailOptions={
            from: 'leanhkhoi1996@gmail.com',
            to :  maillist,
            subject : "Thay đổi sản phẩm đấu giá",
            html : "Hello,<br>Đã có cập nhật trên sản phẩm mà bạn đã tham gia, giá đấu và người giữ giá cao nhất đã thay đổi<br> Please Click on the link to view Detail.<br><a href="+link+">Click here to verify</a>" 
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
                console.log(error);
             
        }else{
                console.log("Message sent: " + response.message);
        }
    });

    ///end send mail

    //expand product end time
    if(tuDongGiaHan==1){
        var endTime = new Date(thoiDiemKetThuc);
        var now = new Date();
         var distance = Date.parse(endTime) - Date.parse(now);
        if( distance <= 5 * 60000){
            var newEndTime = new Date(endTime.setTime(endTime.getTime() + 10 * 60000 ));
            //console.log(endTime + " \\n" + newEndTime);
            productRepo.expandEndTime(idSanPham, helper.getDateFormated(newEndTime)).fail(function(error){
                console.log(error);
            });
        }
    }


    if(isAutoBID==1)
    {

            q.all([
                productRepo.loadDauGiaTudong(idSanPham).fail(function(error){console.log(error)}),
            ]).spread(function(cRows) {
                console.log(cRows);
                console.log("auto");
                if(giaMuaNgay==giaDau) {
                    productRepo.insertDanhSachDauGia(idSanPham, idUser,giaDau).fail(function(error){console.log(error)});
                    productRepo.updateEndAuction(idSanPham,luotBid+1,idUser,giaDau).fail(function(error){console.log(error)});
                    danhsachdaugiathangRepo.insertNewWinAuction(idSanPham, idUser, giaDau).fail(function(error){console.log(error)});
                    res.redirect('back');
                }
                 else
                {       
                         if(cRows.length>0)
                         {
                                var giaMax= parseInt(cRows[0].giaMax);
                                console.log(giaMax);
                                if(giaMax<giaDau)
                                {
                                        productRepo.updateDauGiaTudong(idSanPham, idUser, giaDau);
                                        productRepo.insertDanhSachDauGia(idSanPham, idUser,giaMax+buocGia);
                                        productRepo.updateProductByGiaHienTaiVaNguoiGiaCaoNhat(idSanPham,idUser,giaMax+buocGia,luotBid+1).then(function(){
                                                res.redirect('back');
                                         });; //update sanpham tabel

                                }
                                else if(giaMax>giaDau)
                                {
                                         productRepo.insertDanhSachDauGia(idSanPham, idUser,giaDau);
                                        productRepo.insertDanhSachDauGia(idSanPham, cRows[0].idNguoiDung, giaDau+buocGia);

                                        productRepo.updateProductByGiaHienTaiVaNguoiGiaCaoNhat(idSanPham,cRows[0].idNguoiDung,giaDau+buocGia,luotBid+2).then(function(){
                                            res.redirect('back');
                                     }); //update sanpham tabel

                                }
                                else
                                {
                                    productRepo.insertDanhSachDauGia(idSanPham, idUser,giaDau);
                                    productRepo.insertDanhSachDauGia(idSanPham, cRows[0].idNguoiDung,giaDau);
                                    productRepo.updateProductByGiaHienTaiVaNguoiGiaCaoNhat(idSanPham,cRows[0].idNguoiDung,giaDau,luotBid+2).then(function(){
                                            res.redirect('back');
                                     }); //update sanpham tabel

                                }

                         }
                         else
                         {
                            productRepo.insertDauGiaTuDong(idSanPham, idUser, giaDau);
                            productRepo.insertDanhSachDauGia(idSanPham, idUser,giaHienTai+buocGia);
                            productRepo.updateProductByGiaHienTaiVaNguoiGiaCaoNhat(idSanPham,idUser,giaHienTai+buocGia,luotBid+1).then(function(){
                                                res.redirect('back');
                                         });; //update sanpham tabel

                         }
                     
                }
            }).fail(function(error){
               console.log(error);
            });
    }
    else
    {
            q.all([
                productRepo.loadDauGiaTudong(idSanPham).fail(function(error){console.log(error)}),
            ]).spread(function(cRows) {
                console.log(cRows);
                
                if(giaMuaNgay==giaDau) {
                    productRepo.insertDanhSachDauGia(idSanPham, idUser,giaDau).fail(function(error){console.log(error)});
                    productRepo.updateEndAuction(idSanPham,luotBid+1,idUser,giaDau).fail(function(error){console.log(error)});
                    danhsachdaugiathangRepo.insertNewWinAuction(idSanPham, idUser, giaDau).fail(function(error){console.log(error)});
                    console.log("notauto");
                    res.redirect('back');
                }
                else
                {       
                         if(cRows.length>0)
                         {
                                var giaMax= parseInt(cRows[0].giaMax);
                                console.log(giaMax);
                                if(giaMax<giaDau)
                                {
                                         productRepo.deleteDauGiaTudong(idSanPham);
                                        productRepo.insertDanhSachDauGia(idSanPham, idUser,giaDau);
                                        productRepo.updateProductByGiaHienTaiVaNguoiGiaCaoNhat(idSanPham,idUser,giaDau,luotBid+1).then(function(){
                                                res.redirect('back');
                                         });; //update sanpham tabel

                                }
                                else if(giaMax>giaDau)
                                {
                                         productRepo.insertDanhSachDauGia(idSanPham, idUser,giaDau);
                                        productRepo.insertDanhSachDauGia(idSanPham, cRows[0].idNguoiDung, giaDau+buocGia);

                                        productRepo.updateProductByGiaHienTaiVaNguoiGiaCaoNhat(idSanPham,cRows[0].idNguoiDung,giaDau+buocGia,luotBid+2).then(function(){
                                            res.redirect('back');
                                     }); //update sanpham tabel

                                }
                                else
                                {
                                    productRepo.insertDanhSachDauGia(idSanPham, idUser,giaDau);
                                    productRepo.insertDanhSachDauGia(idSanPham, cRows[0].idNguoiDung,giaDau);
                                    productRepo.updateProductByGiaHienTaiVaNguoiGiaCaoNhat(idSanPham,cRows[0].idNguoiDung,giaDau,luotBid+2).then(function(){
                                            res.redirect('back');
                                     }); //update sanpham tabel

                                }

                         }
                         else
                         {
                            productRepo.insertDanhSachDauGia(idSanPham, idUser,giaDau);
                            productRepo.updateProductByGiaHienTaiVaNguoiGiaCaoNhat(idSanPham,idUser,giaDau,luotBid+1).then(function(){
                                                res.redirect('back');
                                         });; //update sanpham tabel

                }
                     
               }
            }).fail(function(error){
               console.log(error);
            });
    }

});


///by Lê Anh Khôi 22/06/2017
r.post('/dangsanpham',function(req,res){
          var isWait = true;
          var userId = req.cookies.userLogin;
          var newDir ;
          var proId;
          var resultFiles = [];
           
            //console.log(req.body.tenSanPham);
          if(userId){

            productRepo.loadProductWithMaxId().then(function(pRows){
                //tao thu muc moi nhat

                newDir = helper.createDir(pRows[0].idSanPham + 1);
                

                setTimeout(function() {
                    if(newDir!="")   helper.moveFilesInFolderToOtherFolder("uploads", newDir);
                    isWait = false;
                    //req.body ==> database

                }, 50);

                setTimeout(function() {

                    resultFiles = helper.loadFilesImageFromFolder(pRows[0].idSanPham + 1);
                    //console.log(resultFiles );

                 }, 200);

                setTimeout(function() {
                    if(isWait==false){
                        console.log(req.body);
                         //req.body ==> database
                        var idSanPham = pRows[0].idSanPham + 1;
                        proId = idSanPham;
                        var tenSanPham = req.body.tenSanPham;
                        var idLoaiSanPham = parseInt(req.body.idLoaiSanPham);
                        var giaHienTai = parseInt(req.body.giaKhoiDiem);
                        var giaMuaNgay = parseInt(req.body.giaMuaNgay);
                        var buocGia = parseInt(req.body.buocGia);
                        var thoiDiemKetThuc = helper.getEndTime(parseInt(req.body.thoiGian));
                        var thoiDiemDang = helper.getDateFormated(new Date());
                        var tuDongGiaHan = req.body.tuDongGiaHan;
                        var moTa = req.body.moTa;
                        moTa = helper.decodeTextToHTML(moTa) + '<p style="color:blue;font-size: 10px;">' + 'Update Time : ' + thoiDiemDang + '</p></br>'
                        var urlImage1 = resultFiles[0];
                        var urlImage2 = resultFiles[1];
                        var urlImage3 = resultFiles[2];
                        if(tuDongGiaHan)
                        console.log("Ten :" + tenSanPham + "\n" +
                                "id loai : " + idLoaiSanPham + "\n" +
                                "Gia Hien Tai :" + giaHienTai + "\n" +
                                "Gia Mua Ngay :" + giaMuaNgay + "\n" +
                                "Buoc Gia :" + buocGia + "\n" +
                                "Thoi Diem Dang :" + thoiDiemDang + "\n" +
                                "Thoi Diem Ket Thuc :" + thoiDiemKetThuc + "\n" +
                                "Tu dong gia han :" + tuDongGiaHan + "\n" +
                                "Mo Ta :" + moTa + "\n" +
                                "URL 1 :" + urlImage1 + "\n" +
                                "URL 2 :" + urlImage2 + "\n" +
                                "URL 3 :" + urlImage3 + "\n" );


                        //them moi san pham
                        productRepo.insertNewProduct(idSanPham, tenSanPham, idLoaiSanPham, giaHienTai, giaMuaNgay, userId, buocGia, thoiDiemDang,
                                                     thoiDiemKetThuc, moTa, tuDongGiaHan, urlImage1, urlImage2, urlImage3) //false is auto-extend

                        .then(function(rs){console.log("insert Succcess");
                    res.redirect('/product/chitietsanpham/' + idSanPham);})
                        .fail(function(err){console.log(err)});

                        /*console.log(tenSanPham + " " + idLoaiSanPham + " " + giaHienTai + " " + giaMuaNgay + " " + buocGia + " " + 
                        thoiDiemDang + " " + thoiDiemKetThuc + " " + moTa );*/
                        
                        //console.log(resultFiles[0], resultFiles[1], resultFiles[2] );
                        //tranfers thoiGianDauGia -> thoi diem ket thuc
                        //load image

                    }
                   
                }, 600);
               
            }).fail(function(error){console.log(error)});
         
            setTimeout(function() {
                    
            }, 1000);
          }
          else{
            res.redirect('/user/login');
          }

});
    //neu idUsser va idSanPham da có thi dung câu lệnh update
    //neu chưa có thì insert

    //neu giadau bang gia mua ngay thi nguoi da thang

    ///by Lê Anh Khôi
r.post('/upload', function(req, res){


  //deleteAllFile in folder
  helper.deleteAllFile('uploads');

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});      

r.post('/themmota',function(req, res){


    var userId = req.cookies.userLogin;
    if(userId){
        var moTa = req.body.addDetail;
        
        productRepo.getDetailFromProduct(req.body.idSanPham).then(function(result){
            
            moTa = helper.decodeTextToHTML(result[0].moTa) + moTa + '<p style="color:blue;font-size:10px;">' + "Update Time : " + helper.getDateFormated(new Date()) + '</p></br>'
            
                productRepo.updateDetailToProduct(req.body.idSanPham, moTa).then(function(result){
                    res.redirect("back");
                }).fail(function(error){
                    console.log(error);
                });
        });
    }else{
        res.redirect("/user/login");
    }


});

/*r.post('/expandEndTime', function(req, res){
    var idSanPham = req.body.idSanPham;
    console.log(idSanPham);
    //gia han them 10 phut
    

});*/

module.exports = r;
