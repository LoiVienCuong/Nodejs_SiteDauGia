var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');
    md5 = require('md5');
    helper = require('../fn/helper');


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

exports.updateAskForPostProduct = function(userId){
   
   
    var origin = new Date();

    var ngayDang = helper.convertNumber(origin.getDate());
    var thangDang = helper.convertNumber(origin.getMonth() + 1);
    var namDang = origin.getFullYear();
    var gioDang = helper.convertNumber(origin.getHours());
    var phutDang = helper.convertNumber(origin.getMinutes());
    var giayDang = helper.convertNumber(origin.getSeconds());
    var date = namDang + "-" + thangDang + "-" + ngayDang + " " + gioDang + ":" + phutDang + ":" + giayDang  ;
     console.log(date);
    var obj = {
        userId: userId,
        thoiDiemXinDuocBan : date
    };
    var sql = mustache.render(
        'update danhsachxinduocban set thoiDiemXinDuocBan = "{{thoiDiemXinDuocBan}}" where idNguoiDung = {{userId}}',
        obj
    );
    
    return db.update(sql);
    
}

exports.insertAskForPostProduct = function(userId){
   
   
    var origin = new Date();

    var ngayDang = helper.convertNumber(origin.getDate());
    var thangDang = helper.convertNumber(origin.getMonth() + 1);
    var namDang = origin.getFullYear();
    var gioDang = helper.convertNumber(origin.getHours());
    var phutDang = helper.convertNumber(origin.getMinutes());
    var giayDang = helper.convertNumber(origin.getSeconds());
    var date = namDang + "-" + thangDang + "-" + ngayDang + " " + gioDang + ":" + phutDang + ":" + giayDang  ;
     console.log(date);
    var obj = {
        userId: userId,
        thoiDiemXinDuocBan : date
    };
    var sql = mustache.render(
        'insert into danhsachxinduocban values({{userId}}, "{{thoiDiemXinDuocBan}}")',
        obj
    );
    
    return db.insert(sql);
    
}

exports.loadPostListById = function(userId){
    var obj = {
        userId: userId
    };
    var sql = mustache.render(
        'select * from danhsachxinduocban where idNguoiDung = {{userId}}',
        obj
    );
    return db.load(sql);
}

exports.loadAccount = function(userId){
    var obj = {
        userId: userId
    };
    var sql = mustache.render(
        'select * from nguoidung where idNguoiDung={{userId}}',
        obj
    );
    return db.load(sql);
}

exports.editUser = function(entity){
    var x = md5(entity.passWord);
    entity.passWord = x;
    var sql = mustache.render(
        'update nguoidung set hoTen="{{hoTen}}", email="{{email}}" where idNguoiDung= {{userId}} and passWord="{{passWord}}"',
        entity
    );
 
    return db.update(sql);

}
exports.resetPass = function(entity){
    var x = md5(entity.passWord_old);
    entity.passWord_old = x;
    var y = md5(entity.passWord);
    entity.passWord = y;
    var sql = mustache.render(
        'update nguoidung set passWord = "{{passWord}}" where idNguoiDung= {{userId}} and passWord="{{passWord_old}}"',
        entity
    );
 
    return db.update(sql);

}
exports.loadListBiding = function(userId){
    var obj = {
        userId: userId
    };
    var sql = mustache.render(
        'select s.idSanPham, s.tenSanPham,s.giaHienTai,s.giaMuaNgay,s.urlImage,s.luotBid,s.thoiDiemKetThuc,n.hoTen,d.giaDau from sanpham s,nguoidung n,danhsachdaugia d where d.idNguoiDung={{userId}} and d.giaDau=(SELECT MAX(d1.giaDau) from danhsachdaugia d1 WHERE d1.idSanPham=d.idSanPham) and s.tinhTrang=0 and s.idSanPham =d.idSanPham and s.idNguoiGiaCaoNhat=n.idNguoiDung',
        obj
    );
    return db.load(sql);
}
exports.loadListWin = function(userId){
    var obj = {
        userId: userId
    };
    var sql = mustache.render(
        'select s.idSanPham,s.tenSanPham,s.idNguoiBan,s.giaMuaNgay,s.urlImage,d.giaThang,d.idNguoiDung,d.nhanxet from sanpham s,danhsachdaugiathang d where d.idNguoiDung={{userId}} and s.idSanPham =d.idSanPham',
        obj
    );
    return db.load(sql);
}
exports.addComment = function(entity){
    console.log(entity.date);
    var sql = mustache.render(
        'insert into chitietdanhgia values({{idSanPham}},{{idNguoiDung}},{{idNguoiBan}},{{chamdiem}},"{{nhanxet}}","{{date}}")',
        entity
    );
    return db.insert(sql);

}
exports.increaseScore = function(idNguoiBan){
    var obj = {
        idNguoiBan: idNguoiBan
    };
    var sql = mustache.render(
        'update nguoidung set diemDanhGiaCong=diemDanhGiaCong+1 where idNguoiDung={{idNguoiBan}}',
        obj
    );
    return db.update(sql);

}
exports.decreaseScore = function(idNguoiBan){
    var obj = {
        idNguoiBan: idNguoiBan
    };
    var sql = mustache.render(
        'update nguoidung set diemDanhGiaTru=diemDanhGiaTru+1 where idNguoiDung={{idNguoiBan}}',
        obj
    );
    return db.update(sql);
}
exports.isComment = function(userId,idSanPham){
    var obj = {
        userId: userId,
        idSanPham: idSanPham
    };
    var sql = mustache.render(
        'update danhsachdaugiathang set nhanxet=1 where idNguoiDung={{userId}} and idSanPham={{idSanPham}}',
        obj
    );
    return db.update(sql);

}
exports.loadComment = function(userId){
    var obj = {
        userId: userId
    };
    var sql = mustache.render(
        'select s.idSanPham, s.tenSanPham, c.idNguoiDanhGia, c.congHayTru, c.nhanXet, c.thoiDiemDanhGia from sanpham s,chitietdanhgia c where c.idNguoiDuocDanhGia={{userId}} and s.idSanPham=c.idSanPham',
        obj
    );
    return db.load(sql);
}

exports.loadScore = function(userId){
    var obj = {
        userId: userId
    };
    var sql = mustache.render(
        'select diemDanhGiaCong, diemDanhGiaTru from nguoidung where idNguoiDung={{userId}}',
        obj
    );
    return db.load(sql);
}
