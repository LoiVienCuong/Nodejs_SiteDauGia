var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');
    helper = require('../fn/helper');


exports.loadHistoryByIdSanPham = function(idSanPham){
	var obj = {
        idSanPham: idSanPham
    };

	var sql = mustache.render(
        'select * from danhsachdaugia d, nguoidung n where idSanPham = {{idSanPham}} and d.idNguoiDung = n.idNguoiDung',
        obj
    );
    return db.load(sql);
}



exports.updateBannedUser = function(idSanPham, idNguoiDung, biCam){
	var obj = {
        idSanPham : idSanPham,
        idNguoiDung : idNguoiDung,
        biCam : biCam
    };

    var sql = mustache.render(
        'update danhsachdaugia set biCam = {{biCam}} where idSanPham = {{idSanPham}} and idNguoiDung = {{idNguoiDung}}', 
        obj
    );
    return db.update(sql);
}