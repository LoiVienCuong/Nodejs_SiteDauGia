var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');

exports.loadAll = function() {
    var sql = 'select * from loai';
    return db.load(sql);
}
exports.loadById = function(catId) {
     var obj = {
        catID: catId
    };
    var sql = mustache.render(
        'select * from loai where idLoaiSanPham = {{catID}}',
        obj
    );
    return db.load(sql);
}

exports.loadDetail = function(id) {
	var d = q.defer();

    var obj = {
        CatID: id
    };

    var sql = mustache.render(
        'select * from categories where CatID = {{CatID}}',
        obj
    );

    db.load(sql).then(function(rows) {
        d.resolve(rows);

    });

    return d.promise;
}

exports.insert = function(tenLoaiSanPham) {
    var entity = {
        tenLoaiSanPham: tenLoaiSanPham
    }
    var sql = mustache.render(
        'insert into loai(tenLoaiSanPham) values("{{tenLoaiSanPham}}")',
        entity
    );

    return db.insert(sql);
}

exports.update = function(idLoaiSanPham,tenLoaiSanPham) {
    var obj =
    {
        catId: idLoaiSanPham,
        catName: tenLoaiSanPham

    };
    var sql = mustache.render(
        'update loai set tenLoaiSanPham = "{{catName}}" where idLoaiSanPham = {{catId}}',
        obj
    );

    return db.update(sql);
}


exports.delete = function(entity) {
    var sql = mustache.render(
        'delete from categories where CatID = {{catId}}',
        entity
    );

    return db.delete(sql);
}

exports.delete = function(idLoaiSanPham) {
     var obj = {
        idLoaiSanPham: idLoaiSanPham
    };
    var sql = mustache.render(
        'delete from loai where idLoaiSanPham = {{idLoaiSanPham}}',
        obj
    );

    return db.delete(sql);
}