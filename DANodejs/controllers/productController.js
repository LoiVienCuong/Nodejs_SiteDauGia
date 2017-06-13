var express = require('express'),
    productRepo = require('../models/productRepo');

var activeCategoty;
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


    r.post('/timkiem', function(req, res) {
         productRepo.search(req.body)
            .then(function(pRows) {
                var vm = {
                    layoutVM: res.locals.layoutVM,
                    products: pRows,
                    ten: req.body.productName,
                    id: -1,
                    noProducts: pRows.length === 0
                };
                res.render('product/ketquatimkiem', vm);
            });
       
});
r.post('/timkiemtheoloai', function(req, res) {
         productRepo.search_loai(req.body)
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
module.exports = r;
