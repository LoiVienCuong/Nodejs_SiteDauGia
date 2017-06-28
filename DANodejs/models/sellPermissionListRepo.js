var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');

exports.loadAll = function() {
    var sql = 'select * from danhsachxinduocban';
    return db.load(sql);
}

exports.deleteById = function(id){
	var obj = {
		userID: id
	}
	var sql = mustache.render(
        'delete from danhsachxinduocban where idNguoiDung = {{userID}}',
        obj
    );

    return db.delete(sql);
}