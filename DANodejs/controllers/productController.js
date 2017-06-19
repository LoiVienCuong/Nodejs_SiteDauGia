var express = require('express'),
    productRepo = require('../models/productRepo'),
    categoryRepo = require('../models/categoryRepo'),
    userRepo = require('../models/userRepo');

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

                res.redirect('back');
            }
           
           
            productRepo.insertFavourite(proId,userId)
                .then(function() {
                   res.redirect('back'); 
                });
        }

});

module.exports = r;
