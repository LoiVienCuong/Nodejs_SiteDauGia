var q = require('q'),
    categoryRepo = require('../models/categoryRepo'),
    userRepo = require('../models/userRepo'),
    productRepo = require('../models/productRepo');
module.exports = function(req, res, next) {
	var isCookie = false;
	var userId = req.cookies.userLogin;
	if(userId){
			isCookie = true;
	}
	else{
			isCookie = false;
			userId = -1;
	}
	//if(req.cookies.userLogin)
    q.all([
    	categoryRepo.loadAll(),
    	userRepo.loadUserById(userId),
    	productRepo.loadFavourite(userId),
	]).spread(function(cRows, cRows2, cRows3) {
		if(isCookie){
			res.locals.layoutVM = {
				categories: cRows,
				isCookie : isCookie,
				userId : userId,
				hoTen : cRows2[0].hoTen,
				diemCong : cRows2[0].diemDanhGiaCong,
				diemTru : cRows2[0].diemDanhGiaTru,
				buocGia : cRows2[0].buocGia,
				productsFavourite : cRows3
				// suppliers: []
			};
		}
		else { 
			res.locals.layoutVM = {
				categories: cRows,
				isCookie : isCookie,
				userId : 'null',
				hoTen : 'null'
				// suppliers: []
			};
		}
    	next();
    });
}