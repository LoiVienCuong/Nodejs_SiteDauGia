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
       
        productRepo.loadProductById(proId)
            .then(function(pro) {
                     categoryRepo.loadById(pro[0].loai)
                    .then(function(cat){
                        userRepo.loadUserById(pro[0].idNguoiBan)
                        .then(function(seller){
                            userRepo.loadUserById(pro[0].idNguoiGiaCaoNhat)
                            .then(function(bestbuyer){
                                      var vm = {
                                        layoutVM: res.locals.layoutVM,
                                        products: pro,
                                        category: cat[0].tenLoaiSanPham,
                                        seller : seller,
                                        bestbuyer : bestbuyer,
                                        noProduct: pro.length === 0
                                      };
                                      res.render('product/ChiTietSanPham', vm);
                            });
                           
                        });
                       
                    });

        });
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
            productRepo.updateEndAuction(idSanPham).fail(function(error){console.log(error)});
        }
       
            //insert
        productRepo.insertDanhSachDauGia(idSanPham, idUser, giaDau).then(function(){
                res.redirect('back');
        });
       
    }).fail(function(error){
       console.log(error);
    });

});
    //neu idUsser va idSanPham da có thi dung câu lệnh update
    //neu chưa có thì insert

    //neu giadau bang gia mua ngay thi nguoi da thang
      

module.exports = r;
