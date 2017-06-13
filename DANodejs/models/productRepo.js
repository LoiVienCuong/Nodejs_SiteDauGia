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