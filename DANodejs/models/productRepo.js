var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');
    helper = require('../fn/helper');
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

exports.deleteFavouriteByProId = function(proId) {
    var obj = {
        proId : proId
    };
    var sql = mustache.render(
        'delete from danhsachyeuthich where idSanPham = {{proId}}',
        obj
    );
    return db.delete(sql);
}
exports.updateProductByGiaHienTaiVaNguoiGiaCaoNhat = function(idSanPham, idNguoiDung, giaDau,luotBid){
     var obj = {
        idSanPham : idSanPham,
        idNguoiDung : idNguoiDung,
        giaDau : giaDau,
        luotBid : luotBid
    };
    var sql = mustache.render(
        'update sanpham set idNguoiGiaCaoNhat = {{idNguoiDung}}, giaHienTai = {{giaDau}}, luotBid = {{luotBid}} WHERE idSanPham = {{idSanPham}}',
        obj 
    );
    return db.update(sql);
}

exports.loadDanhSachDauGiaBySanPhamVaNguoiDauGia = function(idSanPham, idNguoiDung){
 var obj = {
        idSanPham : idSanPham,
        idNguoiDung : idNguoiDung,
        
    };
    var sql = mustache.render(
        'select * from danhsachdaugia where idSanPham = {{idSanPham}} and idNguoiDung = {{idNguoiDung}}',
        obj 
    );
    return db.load(sql);
}

exports.insertDanhSachDauGia = function(idSanPham, idNguoiDung, giaDau){
    var date = helper.getDateFormated(new Date());
    var obj = {
        idSanPham : idSanPham,
        idNguoiDung : idNguoiDung,
        giaDau : giaDau,
        thoiDiemDauGia : date
    };
    var sql = mustache.render(
        'insert into danhsachdaugia values({{idSanPham}}, {{idNguoiDung}}, {{giaDau}}, "{{thoiDiemDauGia}}", 0)',
        obj
    );
    return db.insert(sql);
}


exports.updateEndAuction = function(idSanPham){
    var obj = {
        idSanPham : idSanPham
    };
     var sql = mustache.render(
        'update sanpham set tinhTrang = 1 where idSanPham = {{idSanPham}}',
        obj 
    );

    return db.update(sql);
}
//dau gia tu dong

exports.loadDauGiaTudong = function(idSanPham){
    var obj = {
        idSanPham : idSanPham
    };
     var sql = mustache.render(
        'select * from daugiatudong where idSanPham = {{idSanPham}}',
        obj 
    );

    return db.load(sql);
}

exports.insertDauGiaTuDong = function(idSanPham, idNguoiDung, giaDau){
    var date = helper.getDateFormated(new Date());
    var obj = {
        idSanPham : idSanPham,
        idNguoiDung : idNguoiDung,
        giaDau : giaDau,
        thoiDiemDauGia : date
    };
    var sql = mustache.render(
        'insert into daugiatudong values({{idSanPham}}, {{idNguoiDung}}, {{giaDau}}, "{{thoiDiemDauGia}}")',
        obj
    );
    return db.insert(sql);
}

exports.updateDauGiaTudong = function(idSanPham, idNguoiDung, giaDau){
    var date = helper.getDateFormated(new Date());
    var obj = {
        idSanPham : idSanPham,
        idNguoiDung : idNguoiDung,
        giaDau : giaDau,
        thoiDiemDauGia : date
    };
    var sql = mustache.render(
        'update daugiatudong set idNguoiDung={{idNguoiDung}}, giaMax={{giaDau}}, thoiDiemDauGia="{{thoiDiemDauGia}}" where idSanPham={{idSanPham}}',
        obj
    );
    return db.update(sql);
}

exports.deleteDauGiaTudong = function(idSanPham){
    var obj = {
        idSanPham : idSanPham
    };
     var sql = mustache.render(
        'delete from daugiatudong where idSanPham = {{idSanPham}}',
        obj 
    );

    return db.delete(sql);
}

///by Lê Anh Khôi
exports.loadProductWithMaxId = function(){
    var sql = 'select * from sanpham order by idSanPham DESC LIMIT 1';
    return db.load(sql);
}
exports.insertNewProduct= function(idSanPham, tenSanPham, idLoaiSanPham, giaHienTai, giaMuaNgay,idNguoiBan, buocGia, thoiDiemDang, thoiDiemKetThuc, moTa,tuDongGiaHan, urlImage1, urlImage2, urlImage3){
    var obj = {
        idSanPham : idSanPham,
        tenSanPham: tenSanPham,
        idLoaiSanPham : idLoaiSanPham,
        giaHienTai : giaHienTai,
        giaMuaNgay : giaMuaNgay,
        idNguoiBan : idNguoiBan,
        buocGia : buocGia,
        thoiDiemDang : thoiDiemDang,
        thoiDiemKetThuc : thoiDiemKetThuc,
        moTa : moTa,
        tuDongGiaHan : tuDongGiaHan,
        urlImage1 : urlImage1,
        urlImage2 : urlImage2,
        urlImage3 : urlImage3
    };

    var sql = mustache.render(
              'insert into sanpham(idSanPham, tenSanPham, loai, giaHienTai, giaMuaNgay, idNguoiBan, buocGia, thoiDiemDang, thoiDiemKetThuc, moTa, luotBid, tinhTrang, tuDongGiaHan, urlImage1, urlImage2, urlImage3)' 
              + ' values ({{idSanPham}},"{{tenSanPham}}", {{idLoaiSanPham}}, {{giaHienTai}}, {{giaMuaNgay}}, {{idNguoiBan}}, {{buocGia}}, "{{thoiDiemDang}}", "{{thoiDiemKetThuc}}", "{{moTa}}",0 ,0 ,{{tuDongGiaHan}}, "{{urlImage1}}","{{urlImage2}}","{{urlImage3}}")',
        obj
    );
    return db.insert(sql);
}

exports.getDetailFromProduct = function(idSanPham){
     var obj = {
        idSanPham : idSanPham
     };

     var sql = mustache.render(
        'select moTa from sanpham where idSanPham = {{idSanPham}}',
        obj
     );
    return db.load(sql);
}

exports.updateDetailToProduct  =function(idSanPham, moTa){
    var obj = {
        moTa : moTa,
        idSanPham : idSanPham
    }; 
    var sql = mustache.render(
        'update sanpham set moTa = "{{moTa}}" where idSanPham = {{idSanPham}}',
        obj
        );

    return db.update(sql);
}

exports.updateHighestUserAndHighestCost = function(idSanPham,idNguoiGiaCaoNhat, giaHienTai){
    
    var obj = {
       idSanPham : idSanPham,
       idNguoiGiaCaoNhat : idNguoiGiaCaoNhat,
       giaHienTai : giaHienTai
    }; 
    var sql = mustache.render(
        'update sanpham set idNguoiGiaCaoNhat = {{idNguoiGiaCaoNhat}}, giaHienTai = {{giaHienTai}}  where idSanPham = {{idSanPham}}',
        obj
        );

    return db.update(sql);
}