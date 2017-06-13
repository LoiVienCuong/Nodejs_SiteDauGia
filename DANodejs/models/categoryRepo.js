var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');

exports.loadAll = function() {
    var sql = 'select * from loai';
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

exports.insert = function(entity) {
    var sql = mustache.render(
        'insert into categories(CatName) values("{{catName}}")',
        entity
    );

    return db.insert(sql);
}

exports.update = function(entity) {
    var sql = mustache.render(
        'update categories set CatName = "{{catName}}" where CatID = {{catId}}',
        entity
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