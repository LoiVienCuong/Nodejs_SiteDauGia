var express = require('express'),
    productRepo = require('../models/productRepo'),
    categoryRepo = require('../models/categoryRepo'),
    userRepo = require('../models/userRepo'),
    danhsachdaugiaRepo = require('../models/danhsachdaugiaRepo'),
    md5 = require('md5'),
    recaptcha = require('express-recaptcha');


recaptcha.init('6Ldm0yUUAAAAADCrSsJTyB7MSfbNqHPs6PZQCOQ9', '6Ldm0yUUAAAAAHHPL2z63y5f2ARwgEmclHOxGdDF');

var errorRecaptcha = false;

var r = express.Router();

var status = 0; // 0 have not login, 2 : logined, 1 : password or userId is wrong

var flag=false;
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
            		var minute =  60*1000 * 300;
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
            
              userRepo.addNewUser(req.body)
		      .then(function(data){
			      	 var vm = {
			            layout: false,
			        };
			        res.render('user/registerSuccess', vm);
			    })
		      .catch(function(err) {
			        
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
      if(userId){
          userRepo.loadListFavourite(userId)
              .then(function(pRows) {
                 var vm = {
                      layoutVM: res.locals.layoutVM,
                      products: pRows,
                      noProducts: pRows.length === 0
                  };
                res.render('user/danhsachyeuthich', vm);
            });
      }else{
        res.redirect('login');
      }
});

r.get('/xindangban',function(req,res){
     var userId = req.cookies.userLogin;

      if(userId){

        //neu da có yêu cầu trong database thì update 
        userRepo.loadPostListById(userId)
        .then(function(result){
            if(result.length==1){ //update 
               userRepo.updateAskForPostProduct(userId)
                .then(function(pRows) {

                  res.redirect('xindangban/phanhoi');

                }).fail(function(error){
                      console.log(error)
                });
            }
            else{
              //insert
              userRepo.insertAskForPostProduct(userId)
                .then(function(pRows) {

                  res.redirect('dangban/phanhoi');

                }).fail(function(error){
                      console.log(error)
                });
            }
           
        });
        //ngươc lại thì insert
          
      }else{
        res.redirect('login');
      }
});
r.get('/xindangban/phanhoi',function(req,res){

  var vm = {
    layout : false,
  };
  res.render("user/phanhoiyeucauxindangban", vm);
});

r.get('/thongtincanhan',function(req,res){
                var userId = req.cookies.userLogin;
                if(!userId){
                     res.redirect('login');
                  }else{
                      userRepo.loadAccount(userId)
                          .then(function(pRows) {
                             var vm = {
                                  layoutVM: res.locals.layoutVM,
                                  user: pRows[0],
                              };
                            res.render('user/thongtincanhan', vm);
                        });
                  }
});

r.get('/suathongtincanhan',function(req,res){
                var userId = req.cookies.userLogin;
                if(!userId){
                     res.redirect('login');
                  }else{
                      userRepo.loadAccount(userId)
                          .then(function(pRows) {
                          
                             var vm = {
                                  layoutVM: res.locals.layoutVM,
                                  user: pRows[0],
                                  PassWrong: flag,
                              };
                            res.render('user/suathongtincanhan', vm);
                        });
                  }
});

r.post('/suathongtincanhan',function(req,res){
                var userId = req.cookies.userLogin;
                if(!userId){
                     res.redirect('login');
                  }else{
                      userRepo.editUser(req.body)
                          .then(function(changedRows) {
                            if(changedRows>0)
                            {
                            flag=false;
                             res.redirect('thongtincanhan');
                           }
                          else  {
                            flag=true;
                            res.redirect('back');
                          }
                        }).catch(function(err) {
                            res.end('edit fail');
                          });
                  }
});

r.get('/sanphamdangdaugia',function(req,res){
                var userId = req.cookies.userLogin;
                if(!userId){
                     res.redirect('login');
                  }else{
                      userRepo.loadListBiding(userId)
                          .then(function(pRows) {
                           
                             var vm = {
                                  layoutVM: res.locals.layoutVM,
                                  products: pRows,
                                  noProducts: pRows.length === 0
                              };
                            res.render('user/sanphamdangdaugia', vm);
                        });
                  }
});

r.get('/sanphamdathang',function(req,res){
                var userId = req.cookies.userLogin;
                if(!userId){
                     res.redirect('login');
                  }else{
                      userRepo.loadListWin(userId)
                          .then(function(pRows) {
                            
                             var vm = {
                                  layoutVM: res.locals.layoutVM,
                                  products: pRows,
                                  noProducts: pRows.length === 0
                              };
                            res.render('user/sanphamdathang', vm);
                        });
                  }
});
r.post('/sanphamdathang',function(req,res){
               var userId = req.cookies.userLogin;
                if(!userId){
                     res.redirect('login');
                  }else{
                      userRepo.addComment(req.body)
                          .then(function(data) {
                           
                             
                            if(data>=0)
                            {
                                    userRepo.isCommentSeller(userId,req.body.idSanPham)
                                       .then(function(changedRows){
                                        if(changedRows>0)
                                        {
                                              if(req.body.chamdiem==+1)
                                              {

                                                   userRepo.increaseScore(req.body.idNguoiBan)
                                                   .then(function(changedRows){
                                                    if(changedRows>0)
                                                        res.redirect('sanphamdathang');
                                                    else
                                                         res.redirect('back');
                                                }).catch(function(err) {
                                                    res.end('update fail');
                                                });
                                              }
                                              else
                                              {
                                                    userRepo.decreaseScore(req.body.idNguoiBan)
                                                   .then(function(changedRows){
                                                    if(changedRows>0)
                                                        res.redirect('sanphamdathang');
                                                    else
                                                         res.redirect('back');
                                                }).catch(function(err) {
                                                    res.end('update fail');
                                              });
                                            }
                                        }
                                            
                                        else
                                        {
                                             res.redirect('back');
                                        }
                                    }).catch(function(err) {
                                        res.end('update fail');
                                    });
                                  
                              }
                          else{
                            res.redirect('back');
                          }
                        }).catch(function(err) {
                            res.end('insert fail');
                          });
                  }
});

r.get('/sanphamdaban',function(req,res){
                var userId = req.cookies.userLogin;
                if(!userId){
                     res.redirect('login');
                  }else{
                      userRepo.loadListSelled(userId)
                          .then(function(pRows) {
                            
                             var vm = {
                                  layoutVM: res.locals.layoutVM,
                                  products: pRows,
                                  noProducts: pRows.length === 0
                              };
                            res.render('user/sanphamdaban', vm);
                        });
                  }
});

r.post('/sanphamdaban',function(req,res){
               var userId = req.cookies.userLogin;
                if(!userId){
                     res.redirect('login');
                  }else{
                      userRepo.addCommentSeller(req.body)
                          .then(function(data) {
                           
                             
                            if(data>=0)
                            {
                                    userRepo.isCommentBider(req.body.idSanPham)
                                       .then(function(changedRows){
                                        if(changedRows>0)
                                        {
                                              if(req.body.chamdiem==+1)
                                              {

                                                   userRepo.increaseScore(req.body.idNguoiDung)
                                                   .then(function(changedRows){
                                                    if(changedRows>0)
                                                        res.redirect('sanphamdaban');
                                                    else
                                                         res.redirect('back');
                                                }).catch(function(err) {
                                                    res.end('update fail');
                                                });
                                              }
                                              else
                                              {
                                                    userRepo.decreaseScore(req.body.idNguoiDung)
                                                   .then(function(changedRows){
                                                    if(changedRows>0)
                                                        res.redirect('sanphamdaban');
                                                    else
                                                         res.redirect('back');
                                                }).catch(function(err) {
                                                    res.end('update fail');
                                              });
                                            }
                                        }
                                            
                                        else
                                        {
                                             res.redirect('back');
                                        }
                                    }).catch(function(err) {
                                        res.end('update fail');
                                    });
                                  
                              }
                          else{
                            res.redirect('back');
                          }
                        }).catch(function(err) {
                            res.end('insert fail');
                          });
                  }
});
r.get('/sanphamdangdang',function(req,res){
                var userId = req.cookies.userLogin;
                if(!userId){
                     res.redirect('login');
                  }else{
                      userRepo.loadSelling(userId)
                          .then(function(pRows) {
                           
                             var vm = {
                                  layoutVM: res.locals.layoutVM,
                                  products: pRows,
                                  noProducts: pRows.length === 0
                              };
                            res.render('user/sanphamdangdang', vm);
                        });
                  }
});

r.get('/doimatkhau',function(req,res){
                var userId = req.cookies.userLogin;
                if(!userId){
                     res.redirect('login');
                  }else{
                      userRepo.loadAccount(userId)
                          .then(function(pRows) {
                            
                             var vm = {
                                  layoutVM: res.locals.layoutVM,
                                  user: pRows[0],
                                  PassWrong: flag,
                              };
                            res.render('user/doimatkhau', vm);
                        });
                  }
});

r.post('/doimatkhau',function(req,res){
                var userId = req.cookies.userLogin;
                if(!userId){
                     res.redirect('login');
                  }else{
                      userRepo.resetPass(req.body)
                          .then(function(changedRows) {
                           
                            if(changedRows>0)
                            {
                            flag=false;
                             res.redirect('logout');
                           }
                          else  {
                            flag=true;
                            res.redirect('back');
                          }
                        }).catch(function(err) {
                            res.end('edit fail');
                          });
                  }
});

r.get('/chitietdanhgia',function(req,res){
                var userId = req.cookies.userLogin;
                if(!userId){
                     res.redirect('login');
                  }else{
                       userRepo.loadScore(userId)
                          .then(function(user) {
                                  userRepo.loadComment(userId)
                                      .then(function(pRows) {
                                        
                                         var vm = {
                                              layoutVM: res.locals.layoutVM,
                                              user:user[0],
                                              comments: pRows,
                                              noComments: pRows.length === 0
                                          };
                                        res.render('user/chitietdanhgia', vm);
                                    });
                             });
                  }
});



///by Lê Anh Khôi
r.get('/dangsanpham',function(req,res){
   var userId = req.cookies.userLogin;

      if(userId){
        
        var vm = {
            layoutVM: res.locals.layoutVM,
            idNguoiDung : userId
          };
        res.render('product/formdangsanpham', vm);
      }
      else{
        res.redirect('/user/login');
      }
});
r.post('/ban', function(req,res){
    var userId = req.cookies.userLogin;
    if(userId){
      var idSanPham = req.body.idSanPham;
      var idNguoiBiCam = req.body.idNguoiBiCam;
      var idNguoiGiuGiaCaoThuHai = req.body.idNguoiGiuGiaCaoThuHai;
      var giaDauNguoiGiuGiaCaoThuHai = req.body.giaDauNguoiGiuGiaCaoThuHai;
      console.log("Nguoi bi cam : " + idNguoiBiCam + "\n"
                + "Nguoi giu gia cao thu 2 : " + idNguoiGiuGiaCaoThuHai + "\n"
                + "Gia Dau Nguoi giu gia cao thu 2: " + giaDauNguoiGiuGiaCaoThuHai + "\n");
      //update sanpham
      //update daugiasanpham
      if(idNguoiGiuGiaCaoThuHai == 'null'){
        console.log("chi can update bang daugiasanpham");
         danhsachdaugiaRepo.updateBannedUser(idSanPham, idNguoiBiCam, true).fail(function(error){
          console.log(error);
        })

      }else{
        console.log("phai update bang daugiasanpham va bang sanpham " + idNguoiGiuGiaCaoThuHai + giaDauNguoiGiuGiaCaoThuHai);
       productRepo.updateHighestUserAndHighestCost(idSanPham, idNguoiGiuGiaCaoThuHai, giaDauNguoiGiuGiaCaoThuHai).fail(function(error){
          console.log(error);
        })
        danhsachdaugiaRepo.updateBannedUser(idSanPham, idNguoiBiCam, true).fail(function(error){
          console.log(error);
        })

      }
      res.redirect('back');
    }else{
      res.redirect('/user/login');
    }


});
module.exports = r;