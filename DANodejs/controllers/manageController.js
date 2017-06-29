<<<<<<< HEAD
var express = require('express'),
	helper = require('../fn/helper')
   categoryRepo = require('../models/categoryRepo'),
   userRepo = require('../models/userRepo'),
   sellRepo = require('../models/sellPermissionListRepo'),
   productRepo = require('../models/productRepo');
r = express.Router();

r.get('/',function(req,res)
{
	if(req.cookies.userLogin){
		console.log(res.locals.layoutVM.viTri);
		if(res.locals.layoutVM.viTri != 2){
			 res.statusCode = 404;
   		 res.end('NOT FOUND!');
		}else{
			
			categoryRepo.loadAll().then(function(rows){
			var vm = {
				  layoutVM: res.locals.layoutVM,
				  categories: rows
			};

			 res.render('manage/manage', vm);
			});
	
		}

	}else{
		
	}
});


r.get('/remove/:id',function(req,res)
{
	var catId = req.params.id;
	productRepo.loadAllByCat(catId).then(function(rows)
	{
		if(rows.length == 0)
		{
			categoryRepo.delete(catId).then(function(){
				
				console.log("sanpham");
				var vm = {
			 		    layoutVM: res.locals.layoutVM,
					};
				res.redirect('/manage');
			});
		}
		else
		{
			console.log("error");
			var vm =
			{
				  layoutVM: res.locals.layoutVM,
				  redirectURL: "/manage",
				  errorMessage: "Vẫn còn sản phẩm loại này trong Cơ sở dữ liệu"
			}
			res.render('manage/error',vm);
		}
	});
});


r.get('/edit/:id',function(req,res)
{
	var catId = req.params.id;
	categoryRepo.loadById(catId).then(function(row){
		var vm = {
		   layoutVM: res.locals.layoutVM,
		  category: row
		}
		res.render('manage/editcategory', vm);
	});
});

r.post('/edit',function(req,res){
	console.log("edit");
	categoryRepo.update(req.body.idLoaiSanPham,req.body.tenLoaiSanPham).then(function(row)
		{
			var vm = {
		 		    layoutVM: res.locals.layoutVM,
			};
			res.redirect('/manage');

		});
});

r.get('/addcategory',function(req,res)
{

			var vm = {
		 		    layoutVM: res.locals.layoutVM,
			};
			res.render('manage/addcategory', vm);
	
});


r.post('/addcategory',function(req,res)
{
	console.log("add");
	categoryRepo.insert(req.body.tenLoaiSanPham).then(function()
		{
			var vm = {
		  		   layoutVM: res.locals.layoutVM,
			};
			res.redirect('/manage');
		});
});


r.get('/usermanage',function(req,res)
	{
		userRepo.loadAll().then(function(rows){
		var vm = {
		    layoutVM: res.locals.layoutVM,
		  users: rows
		};

		 res.render('manage/usermanage', vm);
	});
});


r.get('/usermanage/remove/:id',function(req,res)
	{
		var id = req.params.id;
		userRepo.deleteUserById(id).then(function(){
		var vm = {
		     layoutVM: res.locals.layoutVM,
		  
		};

		 res.redirect('/manage/usermanage');
	});
});

r.get('/usermanage/resetpass/:id',function(req,res)
	{
		var id = req.params.id;
		userRepo.resetPass2(id).then(function(){
			var vm = {
				   layoutVM: res.locals.layoutVM,
			};
			res.redirect('/manage/usermanage');	
		});
	});


r.get('/selllist',function(req,res)
	{
		sellRepo.loadAll().then(function(rows){
		var vm = {
		    layoutVM: res.locals.layoutVM,
		   permissions: rows
		}

		 res.render('manage/selllist', vm);
	});
});



r.get('/selllist/remove/:id',function(req,res)
	{
		console.log("remove");
		var id = req.params.id;
		sellRepo.deleteById(id).then(function()
			{
				var vm = {
				   layoutVM: res.locals.layoutVM,

				};
				res.redirect('manage/selllist');
			});
});

r.get('/selllist/accept/:id',function(req,res)
{
	console.log("accept");
	var id = req.params.id;
	var time = helper.getEndTime(7);
	userRepo.sellpermit(id).then(function()
	{
		sellRepo.deleteById(id).then(function()
			{
				userRepo.updateThoiDiemKetThucRaoBan(id,time).then(function()
				{
					
					var vm = {
					   layoutVM: res.locals.layoutVM,

					}
					res.redirect('/manage/selllist');
				});
			});			
	});
});

r.get('/manage/error',function(req,res)
{

	var vm =
	{
		layoutVM: res.locals.layoutVM,
		errorMessage: "",
		redirectURL: "/manage"

	};
	res.render('/manage/error',vm)
			
});

=======
var express = require('express'),
	helper = require('../fn/helper')
   categoryRepo = require('../models/categoryRepo'),
   userRepo = require('../models/userRepo'),
   sellRepo = require('../models/sellPermissionListRepo'),
   productRepo = require('../models/productRepo');
r = express.Router();

r.get('/',function(req,res)
{
	
	categoryRepo.loadAll().then(function(rows){
	var vm = {
		  layoutVM: res.locals.layoutVM,
		  categories: rows
	};

	 res.render('manage/manage', vm);
	});
	
	
});


r.get('/remove/:id',function(req,res)
{
	var catId = req.params.id;
	productRepo.loadAllByCat(catId).then(function(rows)
	{
		if(rows.length == 0)
		{
			categoryRepo.delete(catId).then(function(){
				
				console.log("sanpham");
				var vm = {
			 		    layoutVM: res.locals.layoutVM,
					};
				res.redirect('/manage');
			});
		}
		else
		{
			console.log("error");
			var vm =
			{
				  layoutVM: res.locals.layoutVM,
				  redirectURL: "/manage",
				  errorMessage: "Vẫn còn sản phẩm loại này trong Cơ sở dữ liệu"
			}
			res.render('manage/error',vm);
		}
	});
});


r.get('/edit/:id',function(req,res)
{
	var catId = req.params.id;
	categoryRepo.loadById(catId).then(function(row){
		var vm = {
		   layoutVM: res.locals.layoutVM,
		  category: row
		}
		res.render('manage/editcategory', vm);
	});
});

r.post('/edit',function(req,res){
	console.log("edit");
	categoryRepo.update(req.body.idLoaiSanPham,req.body.tenLoaiSanPham).then(function(row)
		{
			var vm = {
		 		    layoutVM: res.locals.layoutVM,
			};
			res.redirect('/manage');

		});
});

r.get('/addcategory',function(req,res)
{

			var vm = {
		 		    layoutVM: res.locals.layoutVM,
			};
			res.render('manage/addcategory', vm);
	
});


r.post('/addcategory',function(req,res)
{
	console.log("add");
	categoryRepo.insert(req.body.tenLoaiSanPham).then(function()
		{
			var vm = {
		  		   layoutVM: res.locals.layoutVM,
			};
			res.redirect('/manage');
		});
});


r.get('/usermanage',function(req,res)
	{
		userRepo.loadAll().then(function(rows){
		var vm = {
		    layoutVM: res.locals.layoutVM,
		  users: rows
		};

		 res.render('manage/usermanage', vm);
	});
});


r.get('/usermanage/remove/:id',function(req,res)
	{
		var id = req.params.id;
		userRepo.deleteUserById(id).then(function(){
		var vm = {
		     layoutVM: res.locals.layoutVM,
		  
		};

		 res.redirect('/manage/usermanage');
	});
});

r.get('/usermanage/resetpass/:id',function(req,res)
	{
		var id = req.params.id;
		userRepo.resetPass2(id).then(function(){
			var vm = {
				   layoutVM: res.locals.layoutVM,
			};
			res.redirect('/manage/usermanage');	
		});
	});


r.get('/selllist',function(req,res)
	{
		sellRepo.loadAll().then(function(rows){
		var vm = {
		    layoutVM: res.locals.layoutVM,
		   permissions: rows
		}

		 res.render('manage/selllist', vm);
	});
});



r.get('/selllist/remove/:id',function(req,res)
	{
		console.log("remove");
		var id = req.params.id;
		sellRepo.deleteById(id).then(function()
			{
				var vm = {
				   layoutVM: res.locals.layoutVM,

				};
				res.redirect('manage/selllist',vm);
			});
});

r.get('/selllist/accept/:id',function(req,res)
{
	console.log("accept");
	var id = req.params.id;
	var time = helper.getEndTime(7);
	userRepo.sellpermit(id).then(function()
	{
		sellRepo.deleteById(id).then(function()
			{
				userRepo.updateThoiDiemKetThucRaoBan(id,time).then(function()
				{
					
					var vm = {
					   layoutVM: res.locals.layoutVM,

					}
					res.redirect('/manage/selllist');
				});
			});			
	});
});

r.get('/manage/error',function(req,res)
{

	var vm =
	{
		layoutVM: res.locals.layoutVM,
		errorMessage: "",
		redirectURL: "/manage"

	};
	res.render('/manage/error',vm)
			
});

>>>>>>> origin/master
module.exports = r;