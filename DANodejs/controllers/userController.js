var express = require('express'),
    nodemailer = require("nodemailer"),
    productRepo = require('../models/productRepo'),
    categoryRepo = require('../models/categoryRepo'),
    userRepo = require('../models/userRepo'),
    danhsachdaugiaRepo = require('../models/danhsachdaugiaRepo'),
    md5 = require('md5'),
    helper = require('../fn/helper'),
    recaptcha = require('express-recaptcha');

//mail
/*var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "leanhkhoi1996@gmail.com",
        pass: "microsoft96"
    }
});*/

var smtpTransport = nodemailer.createTransport({
    host: 'localhost',
    service: "Gmail",
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'leanhkhoi1996@gmail.com',
        pass: 'microsoft96'
    }
});
var rand,mailOptions,host,link;

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
      	userRepo.loadAllUser().then(function(pRows){
           var vm = {
                        layout: false,
                        users : pRows,
                        captcha: recaptcha.render(),
                        errorRecaptcha : errorRecaptcha
                    };
        res.render('user/register', vm);
        }).fail(function(error){
            console.log(error);
        });
       

     }


});

r.post('/register', function(req, res) {
	recaptcha.verify(req, function(error){
        if(!error){
          	errorRecaptcha = false;
              //success code
            var rand=Math.floor(Math.random() + 54);
            rand = md5(rand);
            console.log("random generate : " + rand);
            //save in danh sach cho
            userRepo.deleteWaitUser(req.query.email).then(function(){
                userRepo.addNewWaitUser(req.body.idNguoiDung, req.body.hoTen, md5(req.body.passWord), req.body.email,rand)
                .then(function(){
                    var vm = {
                          layout: false,
                      };
                    res.render('user/registerSuccess', vm);
                })
                .fail(function(error){
                 console.log(error);
                });
            });
            
            //gui mail xac nhan
           
            host=req.get('host');
            link="http://"+req.get('host')+"/user/verify?verifycode="+rand + "&" + "email=" + req.body.email;
            mailOptions={
                    from: 'leanhkhoi1996@gmail.com',
                    to : req.body.email,
                    subject : "Please confirm your Email account",
                    html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
            }
            console.log(mailOptions);
            smtpTransport.sendMail(mailOptions, function(error, response){
             if(error){
                    console.log(error);
                  res.end("error");
             }else{
                    console.log("Message sent: " + response.message);
                    res.end("sent");
             }
            });
            
        
        }else{
           
           errorRecaptcha = true;
       		 console.log("unsuccess");
       		 res.redirect('back');
        }

    });

});

r.get('/verify',function(req,res){
  
    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {

        //load choxacnhanmail lay ra
        //neu lay ra co thi them vao database nguoidung va xoa
        //neu lay ra khong co thi thong bao, khong hop le, hoac ban da kich hoat tai khoan
        userRepo.loadWaitUser(req.query.email, req.query.verifycode).then(function(pRows){
                console.log(req.query.email, req.query.verifycode);
                if(pRows.length!=0){
                   q.all([
                      userRepo.addNewUser(pRows[0].idNguoiDung,pRows[0].hoTen, pRows[0].passWord, pRows[0].email),
                      userRepo.deleteWaitUser(req.query.email),
                  ]).spread(function(cRows,cRows1) {
                      res.redirect("/user/login");
                      console.log("Xác thực thành công!");
                      console.log(cRows1);
                  }).fail(function(error){console.log(error);});

                }else{
                    console.log("Không hợp lệ, dường như bạn đã kích hoạt trước đó!");
                }
        }).fail(function(error){console.log(error);});

    }
    else
    {
        res.end("<h1>Request is from unknown source");
    }

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

                  res.redirect('xindangban/phanhoi');

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
                     res.redirect('/user/login');
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
                     res.redirect('/user/login');
                  }else{
                      userRepo.loadAccount(userId)
                          .then(function(pRows) {
                            
                             var vm = {
                                  layoutVM: res.locals.layoutVM,
                                  user: pRows[0],
                                  PassWrong: flag,
                              };
                              flag=false;
                            res.render('user/suathongtincanhan', vm);
                        });
                  }
});

r.post('/suathongtincanhan',function(req,res){
                var userId = req.cookies.userLogin;
                if(!userId){
                     res.redirect('/user/login');
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
                     res.redirect('/user/login');
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
                     res.redirect('/user/login');
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
                     res.redirect('/user/login');
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
                     res.redirect('/user/login');
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
                     res.redirect('/user/login');
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
                     res.redirect('/user/login');
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
                     res.redirect('/user/login');
                  }else{
                      userRepo.loadAccount(userId)
                          .then(function(pRows) {
                            
                             var vm = {
                                  layoutVM: res.locals.layoutVM,
                                  user: pRows[0],
                                  PassWrong: flag,
                              };
                             flag=false;
                     
                            res.render('user/doimatkhau', vm);
                        });
                  }
});

r.post('/doimatkhau',function(req,res){
                var userId = req.cookies.userLogin;
                if(!userId){
                     res.redirect('/user/login');
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
                     res.redirect('/user/login');
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

r.get('/chitietdanhgia/:id', function(req, res) {

        var id = req.params.id;
        if (!id) {
            res.redirect('/');
        }
       

       var userId = req.cookies.userLogin;
                if(!userId){
                     res.redirect('/user/login');
                  }else{
                       userRepo.loadScore(id)
                          .then(function(user) {
                                  userRepo.loadComment(id)
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
      var emailNguoiBiCam = req.body.emailNguoiBiCam;
      console.log("Nguoi bi cam : " + idNguoiBiCam + "\n"
                + "Nguoi giu gia cao thu 2 : " + idNguoiGiuGiaCaoThuHai + "\n"
                + "Gia Dau Nguoi giu gia cao thu 2: " + giaDauNguoiGiuGiaCaoThuHai + "\n"
                + "Email Người bị cấm: " + emailNguoiBiCam);
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

      //send mail cho bi cam
      link="http://"+req.get('host')+"/product/chitietsanpham/" + idSanPham;
      mailOptions={
              from: 'leanhkhoi1996@gmail.com',
              to : emailNguoiBiCam,
              subject : "Bạn đã bị cấm khỏi một cuộc đấu giá",
              html : "Hello,<br> Please Click on the link to view detail.<br><a href="+link+">Click here to view</a>" 
      }
      console.log(mailOptions);
      smtpTransport.sendMail(mailOptions, function(error, response){
       if(error){
              console.log(error);
           
       }else{
              console.log("Message sent: " + response.message);
              
       }
      });
      //




      setTimeout(function(){
        res.redirect('back');
      }, 500);
     
    }
    else{
      res.redirect('/user/login');
    }
});




module.exports = r;