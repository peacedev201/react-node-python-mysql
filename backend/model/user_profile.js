var db = require('./db');

exports.getUserList = (projection, callback) => {
    if (projection === '') projection = '*'
    db.query('SELECT ' + projection + ' FROM user_profile', [], function (err, rows) {
        if (err) return callback(err)
        return callback(err, rows);
    });
}