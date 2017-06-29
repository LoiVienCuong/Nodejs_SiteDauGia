var express = require('express'),
   productRepo = require('../models/productRepo'),
     categoryRepo = require('../models/categoryRepo');
       q = require('q'),
helper = require('../fn/helper');

var r = express.Router();


var isCookie;

r.get('/', function(req, res) {
    var userId = req.cookies.userLogin;
    if(!userId) userId = -1;

    q.all([
         categoryRepo .loadAll().fail(function(error){console.log(error)}),
         productRepo.loadFavourite(userId),
    ]).spread(function(cRows, cRows1) {
        var vm = {
            layout : false,
            categories : cRows,
            listFavourite : cRows1, 
            userId : userId
        }
        res.render("timkiem/index", vm);
    });


});
r.post('/result', function(req, res) {

    res.writeHead(200, { 
        'Content-Type': 'text/plain'
    });
    var products;
    

    if(req.body.idLoaiSanPham == 0){
        console.log("chua chon loai san pham");
        productRepo.search(req.body.tenSanPham).then(function(pRows){
            //console.log(pRows);
            products = pRows;
            var string = JSON.stringify(products);
          
            res.end(string);
           
               
        });
    }
    else{

        console.log("da chon loai san pham : " + req.body.idLoaiSanPham + "\n" + "ten san pham: " + req.body.tenSanPham);
        productRepo.search_loai(req.body.idLoaiSanPham, req.body.tenSanPham).then(function(pRows){
           // console.log(pRows);
           products = pRows;
            var string = JSON.stringify(products);
            
            res.end(string);
        });

    }  

});

r.get('/about', function(req, res) {
    var vm = {
    	layoutVM: res.locals.layoutVM
    };
    res.render('home/about', vm);
});


module.exports = r;