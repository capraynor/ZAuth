/**
 * Created by raynorchan on 15-11-2.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    uId: String,
    uName: String,
    uPwd: String,
    uInfo: String
}, {collection: 'Users'});
mongoose.model('Users', UsersSchema);


module.exports = function (connection) {
    'use strict';
    return (connection || mongoose).model('Users');
};