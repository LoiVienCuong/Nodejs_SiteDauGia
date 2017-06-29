var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');
    helper = require('../fn/helper');


exports.insertNewWinAuction = function(idSanPham, idNguoiDung, giaThang){
	var obj = {
        idSanPham: idSanPham,
        idNguoiDung : idNguoiDung,
        giaThang : giaThang
    };

	var sql = mustache.render(
        'insert into danhsachdaugiathang values ({{idSanPham}},{{idNguoiDung}},{{giaThang}},"0","0")',
        obj
    );
    return db.insert(sql);
}