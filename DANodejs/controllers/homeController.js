var express = require('express'),
   productRepo = require('../models/productRepo');
    
var r = express.Router();


var isCookie;

r.get('/', function(req, res) {
    /*productRepo.loadTop5Bid()
        .then(function(pRows) {
            var vm = {
                layoutVM: res.locals.layoutVM,
                productsBid: pRows,

                noProducts: pRows.length === 0
            };
            res.render('home/index', vm);
        });*/

	productRepo.loadTop5Bid()
        .then(function(bid) {
		productRepo.loadTop5Cost()
        .then(function(cost) {
			productRepo.loadTop5EndTime().then(function(endtime){
 				var vm = {
                layoutVM: res.locals.layoutVM,
                productsBid: bid,
                productsCost : cost,
                productsEndTime : endtime
               
                //noProducts: bid.length === 0
           		 };
            res.render('home/index', vm);
			});

			
		});
	});
});

module.exports = r;

r.get('/about', function(req, res) {
    var vm = {
    	layoutVM: res.locals.layoutVM
    };
    res.render('home/about', vm);
});


module.exports = r;