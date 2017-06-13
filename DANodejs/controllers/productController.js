var express = require('express'),
    productRepo = require('../models/productRepo');

var r = express.Router();

r.get('/bycat/:id', function(req, res) {

    var catId = req.params.id;
    if (!catId) {
        res.redirect('/');
    }
   

    productRepo.loadAllByCat(catId)
        .then(function(pRows) {
            var vm = {
                layoutVM: res.locals.layoutVM,
                products: pRows,
                noProducts: pRows.length === 0
            };
            res.render('product/bycat', vm);
        });
});
module.exports = r;
