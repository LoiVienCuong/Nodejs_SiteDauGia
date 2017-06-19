var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');
    md5 = require('md5');


exports.loadUserById = function(userId){
    var obj = {
        userId: userId
    };
    var sql = mustache.render(
        'select * from nguoidung where idNguoiDung = {{userId}}',
        obj
    );
    return db.load(sql);
}

exports.loadUserByIdAndPassWord = function(entity){
    
    //var passWord = md5(entity.passWord);
    //var passWord = entity.passWord;
    //console.log(passWord);
    var x = md5(entity.passWord);
    entity.passWord = x;
    //console.log(entity.passWord);
    var sql = mustache.render(
        'select * from nguoidung where idNguoiDung = {{userId}} and passWord = "{{passWord}}"',
        entity
    );
 
    return db.load(sql);
}
exports.addNewUser = function(entity){
    var x = md5(entity.passWord);
    entity.passWord = x;
    var sql = mustache.render(
        'insert into nguoidung(idNguoiDung, hoTen, passWord, email, diemDanhGiaCong, diemDanhGiaTru, viTri) values ({{idNguoiDung}}, "{{hoTen}}", "{{passWord}}", "{{email}}", 0, 0, 0)',
        entity
    );
 
    return db.insert(sql);

}

exports.loadListFavourite = function(userId){
      var obj = {
        userId: userId
    };
    var sql = mustache.render(
        'select * from sanpham where idSanPham in (select idSanPham from danhsachyeuthich where idNguoiDung={{userId}})',
        obj
    );
    return db.load(sql);
}