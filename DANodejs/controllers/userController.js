var express = require('express'),
    productRepo = require('../models/productRepo'),
    categoryRepo = require('../models/categoryRepo'),
    userRepo = require('../models/userRepo'),
    md5 = require('md5'),
    recaptcha = require('express-recaptcha');


recaptcha.init('6Ldm0yUUAAAAADCrSsJTyB7MSfbNqHPs6PZQCOQ9', '6Ldm0yUUAAAAAHHPL2z63y5f2ARwgEmclHOxGdDF');

var errorRecaptcha = false;

var r = express.Router();

var status = 0; // 0 have not login, 2 : logined, 1 : password or userId is wrong

r.get('/login', function(req, res) {
	 errorRecaptcha = false;
  if(req.cookies.userLogin){
  	res.redirect('back');
  }else{
  	if(status===2) //het han login thi chuyen thanh chua login
  		status = 0;
  	 //neu nhap pass hoac user id sai

    var vm = {
        layout: false,
        state : status
    };
    res.render('user/login', vm);
  }

});

r.post('/login', function(req, res) {
		
		//console.log(req.body);
        userRepo.loadUserByIdAndPassWord(req.body)
            .then(function(pRows) {
            	if(pRows.length === 1){
            		var minute = 60 * 1000 * 5;
            		res.clearCookie('userLogin');
  					res.cookie('userLogin', pRows[0].idNguoiDung, { maxAge: minute });
  					status = 2;
               		res.redirect('back');
            	}
            	else{
            		status = 1;
            		res.redirect('back');
            	}
                
            });
       
});
r.get('/logout', function(req, res) {
     
      if(!req.cookies.userLogin){
      	res.redirect('login');
      }else{
      	res.clearCookie('userLogin');
      	status = 0;
      	res.redirect('login');
      }

  });

r.get('/register', function(req, res) {
      
      if(req.cookies.userLogin){
      	res.redirect('back');
      }
      else{
      	
        var vm = {
            layout: false,
            captcha: recaptcha.render(),
            errorRecaptcha : errorRecaptcha
        };
        res.render('user/register', vm);

     }


});

r.post('/register', function(req, res) {
	recaptcha.verify(req, function(error){
        if(!error){
        	errorRecaptcha = false;
            //success code
            console.log("success");
              userRepo.addNewUser(req.body)
		      .then(function(data){
			      	 var vm = {
			            layout: false,
			        };
			        res.render('user/registerSuccess', vm);
			    })
		      .catch(function(err) {
			        console.log(err);
			        res.end('insert fail');
		      	});

        }

        else{
            //error code 
            errorRecaptcha = true;
       		 console.log("unsuccess");
       		 res.redirect('back');
        }
    });

     
});

r.get('/danhsachyeuthich',function(req,res){
     var userId = req.cookies.userLogin;
                userRepo.loadListFavourite(userId)
                    .then(function(pRows) {
                       var vm = {
                            layoutVM: res.locals.layoutVM,
                            products: pRows,
                            noProducts: pRows.length === 0
                        };
                      res.render('user/danhsachyeuthich', vm);
                  });
});



module.exports = r;