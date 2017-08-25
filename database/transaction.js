var real_sql = "BEGIN TRANSACTION;" + ry + "END TRANSACTION;";

db.exec(real_sql, function (err, result) {
    if (err) {
        callback(err);
        return;
    }
    callback(null);
});