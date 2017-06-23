var express = require('express'),
    productRepo = require('../models/productRepo'),
    categoryRepo = require('../models/categoryRepo'),
    userRepo = require('../models/userRepo'),
     q = require('q');

var activeCategoty;
var activePro;
var r = express.Router();

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
r.get('/chitietsanpham/:id', function(req, res) {
      
        var proId = req.params.id;
        activePro = proId;
        if (!proId) {
            res.redirect('/');
        }
        if(!req.cookies.userLogin) {
            res.redirect('/user/login');
        }else{
            productRepo.loadProductById(proId)
                .then(function(pro) {
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
                                       
                                });
                               
                            });
                           
                        });

            });
        }
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
r.post('/sapxep', function(req, res) {
        if(req.body.loaibtn==='1'){
            if(req.body.catID==="-1"){
                 productRepo.sapxep_thoigian(req.body)
                    .then(function(pRows) {
                        var vm = {
                            layoutVM: res.locals.layoutVM,
                            products: pRows,
                             ten: req.body.productName,
                             id: req.body.catID,
                            noProducts: pRows.length === 0
                        };
                        res.render('product/ketquatimkiem', vm);
                    });
                }
                else   
                {
                    productRepo.sapxep_thoigian_loai(req.body)
                    .then(function(pRows) {
                        var vm = {
                            layoutVM: res.locals.layoutVM,
                            products: pRows,
                             ten: req.body.productName,
                             id: req.body.catID,
                            noProducts: pRows.length === 0
                        };
                        res.render('product/ketquatimkiem', vm);
                    });
                }
        }
        else
        {
              if(req.body.catID==="-1"){
                 productRepo.sapxep_gia(req.body)
                    .then(function(pRows) {
                        var vm = {
                            layoutVM: res.locals.layoutVM,
                            products: pRows,
                             ten: req.body.productName,
                             id: req.body.catID,
                            noProducts: pRows.length === 0
                        };
                        res.render('product/ketquatimkiem', vm);
                    });
                }
                else   
                {
                    productRepo.sapxep_gia_loai(req.body)
                    .then(function(pRows) {
                        var vm = {
                            layoutVM: res.locals.layoutVM,
                            products: pRows,
                             ten: req.body.productName,
                             id: req.body.catID,
                            noProducts: pRows.length === 0
                        };
                        res.render('product/ketquatimkiem', vm);
                    });
                }
        }
       
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
    var giaDau = req.body.giaDau;
    var giaMuaNgay = req.body.giaMuaNgay;
    var luotBid = parseInt(req.body.luotBid);
    console.log(idUser + " " + idSanPham + " " + giaDau + " " + luotBid);
    /*productRepo.updateProductByGiaHienTaiVaNguoiGiaCaoNhat(idSanPham,idUser,giaDau).then(function(){


    }).fail(function(error){console.log(error)});*/
    q.all([
        productRepo.updateProductByGiaHienTaiVaNguoiGiaCaoNhat(idSanPham,idUser,giaDau,luotBid+1), //update sanpham tabel
       
    ]).spread(function(cRows, cRows2) {
        console.log(cRows);
        if(giaMuaNgay==giaDau) {

            //update in sanpham table , set tinhTrang = 1
            productRepo.updateEndAuction(idSanPham).fail(function(error){console.log(error)});

            //insert danh sach dau gia thang
            danhsachdaugiathangRepo.insertNewWinAuction(idSanPham, idUser, giaDau).fail(function(error){console.log(error)});
        }
       
            //insert danhsachdaugia, store history auction
        danhsachdaugiaRepo.insertDanhSachDauGia(idSanPham, idUser, giaDau).then(function(){
                res.redirect('back');
        });
       
    }).fail(function(error){
       console.log(error);
    });

});

//by Lê Anh Khôi 22/06/2017
r.post('/dangsanpham',function(req,res){
          var isWait = true;
          var userId = req.cookies.userLogin;
          var newDir ;
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

                        .then(function(rs){console.log("insert Succcess")})
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
                    res.redirect('back');
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
    //neu idUsser va idSanPham da có thi dung câu lệnh update
    //neu chưa có thì insert

    //neu giadau bang gia mua ngay thi nguoi da thang
      

module.exports = r;
