var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');

exports.loadAllByCat = function(catId) {
    var obj = {
        loai: catId
    };
    var sql = mustache.render(
        'select * from sanpham where loai = {{loai}}',
        obj
    );
    return db.load(sql);
}

exports.loadTop5Bid = function() {
  // var d = q.defer();
    var sql ='select * from sanpham order by luotBid desc limit 5';
       /*db.load(sql).then(function(rows) {
        d.resolve(rows);
    });*/

     
     return db.load(sql);
}
exports.loadTop5Cost = function() {
   
    //var d = q.defer();
    var sql ='select * from sanpham order by giaHienTai desc limit 5';
    // db.load(sql).then(function(rows) {
   //     d.resolve(rows);
   // });
     return db.load(sql);

}

exports.loadTop5EndTime = function() {
    //var d = q.defer();
    var sql ='select * from sanpham order by thoiDiemKetThuc desc limit 5';
    //db.load(sql).then(function(rows) {
     //   d.resolve(rows);
    //});
     return db.load(sql);
}


exports.loadBy5Hightest = function(catId) {
   
    var sql = mustache.render(
        'select * from sanpham'
    );
    return db.load(sql);
}

exports.search = function(ten) {
    var obj = {
        productName: ten
    };
    var sql = mustache.render(
        'select * from sanpham where tenSanPham like "%{{productName}}%"',
        obj
    );

    return db.load(sql);
}
exports.search_loai = function(id,ten) {
     var obj = {
        catID: id,
        productName: ten
    };
    var sql = mustache.render(
        'select * from sanpham where tenSanPham like "%{{productName}}%" and loai= {{catID}}',
        obj
    );

    return db.load(sql);
}
exports.sapxep_thoigian = function(entity) {
    var sql = mustache.render(
        'select * from sanpham where tenSanPham like "%{{productName}}%" order by thoiDiemKetThuc desc',
        entity
    );

    return db.load(sql);
}
exports.sapxep_thoigian_loai = function(entity) {
    var sql = mustache.render(
        'select * from sanpham where tenSanPham like "%{{productName}}%" and loai= {{catID}} order by thoiDiemKetThuc desc',
        entity
    );

    return db.load(sql);
}
exports.sapxep_gia = function(entity) {
    var sql = mustache.render(
        'select * from sanpham where tenSanPham like "%{{productName}}%" order by giaHienTai asc',
        entity
    );

    return db.load(sql);
}
exports.sapxep_gia_loai = function(entity) {
    var sql = mustache.render(
        'select * from sanpham where tenSanPham like "%{{productName}}%" and loai= {{catID}} order by giaHienTai asc',
        entity
    );

    return db.load(sql);
}


exports.sapxep_thoigian_loai_khongten= function(catId) {
    var obj = {
        loai: catId
    };
    var sql = mustache.render(
        'select * from sanpham where loai = {{loai}} order by thoiDiemKetThuc desc',
        obj
    );
    return db.load(sql);
}
exports.sapxep_gia_loai_khongten= function(catId) {
    var obj = {
        loai: catId
    };
    var sql = mustache.render(
        'select * from sanpham where loai = {{loai}} order by giaHienTai asc',
        obj
    );
    return db.load(sql);
}
exports.loadProductById = function(proId){
    var obj = {
        idSanPham: proId
    };
    var sql = mustache.render(
        'select * from sanpham where idSanPham = {{idSanPham}}',
        obj
    );
    return db.load(sql);
}

exports.loadFavourite = function(userId){
      var obj = {
        userId: userId
    };
    var sql = mustache.render(
        'select idSanPham from danhsachyeuthich where idNguoiDung = {{userId}}',
        obj
    );
    return db.load(sql);
}
exports.insertFavourite = function(proId, userId){
       var obj = {
        userId: userId,
        proId : proId
    };
    var sql = mustache.render(
        'insert into danhsachyeuthich values ({{proId}},{{userId}})',
        obj
    );
    return db.insert(sql);
}
